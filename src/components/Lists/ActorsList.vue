<template>
  <div>
    <div class="d-flex flex-row container">
      <div class="d-flex flex-row">
        <b-list-group horizontal class="flex-sm-wrap">
          <b-list-group-item
            class="w-auto m-2 p-0 border-0 d-flex justify-content-center align-items-start rounded-circle card slide"
            v-for="{
              id,
              name,
              known_for_department,
              popularity,
              profile_path,
              character,
            } in uniqueActors"
            :key="id"
          >
            <actor-card
              :name="name"
              :knownForDepartment="known_for_department || ''"
              :popularity="popularity"
              :profilePath="profile_path || ''"
              :character="character"
              :actorId="id"
              @get-actor-id="getActorDetails($event), clearFilters()"
              :big="big"
            >
            </actor-card>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
    <div v-show="big" ref="observer" style="border: 1px solid #46a094"></div>
  </div>
</template>

<script>
import ActorCard from "@/components/Cards/ActorCard";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "ActorsList",
  components: { ActorCard },
  data: () => ({
    totalResults: 0,
    currentPage: 1,
  }),
  methods: {
    compareTotalResults() {
      if (this.actors.total_results > 10000) {
        this.totalResults = 10000;
      } else {
        this.totalResults = this.actors.total_results;
      }
    },
    ...mapActions(["getActorDetails", "getNextActorPage"]),
    ...mapMutations(["clearFilters"]),
  },
  computed: {
    ...mapState(["actors", "searchQuery"]),
    ...mapGetters(["uniqueActors"]),
  },
  props: {
    big: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  created() {},
  mounted() {
    setTimeout(() => {
      const observer = new IntersectionObserver(async (entries) => {
        if (
          entries[0].intersectionRatio > 0 &&
          this.currentPage !== this.actors.total_pages
        ) {
          if (this.actors.total_pages === 1) {
            return;
          }
          if (this.searchQuery && this.currentPage !== this.actors.page) {
            this.currentPage = 1;
          }
          this.currentPage += 1;
          await this.getNextActorPage({
            page: this.currentPage,
            query: this.searchQuery,
          });
          this.compareTotalResults();
        }
      }, {});
      observer.observe(this.$refs.observer);
    }, 1000);
  },
};
</script>

<style scoped>
.card {
  border-radius: 20px;
}

.container {
  max-width: 1160px;
}

.spinner {
  height: 888px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
