<template>
  <div>
    <div class="d-flex flex-row container">
      <div class="d-flex flex-row justify-content-between">
        <b-list-group
            horizontal
            class="flex-sm-wrap d-flex justify-content-start"
        >
          <b-list-group-item
              class="actor-list w-auto mt-2 mb-2 p-0 border-0 d-flex justify-content-center align-items-start rounded-circle card slide"
              style="background: inherit"
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
                @get-actor-id="getActor($event, name)"
                :big="big"
            >
            </actor-card>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
    <div v-show="big" ref="observer" style="border: 1px solid #9ad4d6"></div>
  </div>
</template>

<script>
import ActorCard from "@/components/Cards/ActorCard";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import {observerMixin} from "@/mixins/observerMixin";

export default {
  name: "ActorsList",
  components: {ActorCard},
  data: () => ({
    totalResults: 0,
    currentPage: 1,
  }),
  mixins: [observerMixin("actors")],
  methods: {
    getActor(event, name) {
      this.$emit("close-modal", this.closeModal);
      this.getActorDetails(event);
      this.getActorKnownFor(name);
      this.clearFilters();
    },
    compareTotalResults() {
      if (this.actors.total_results > 10000) {
        this.totalResults = 10000;
      } else {
        this.totalResults = this.actors.total_results;
      }
    },
    ...mapActions(["getActorDetails", "getNextActorPage", "getActorKnownFor"]),
    ...mapMutations(["clearFilters"]),
  },
  computed: {
    ...mapState(["actors", "searchQuery", "selectedSearchQuery"]),
    ...mapGetters(["uniqueActors"]),
  },
  props: {
    big: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 20px;
}

.container {
  max-width: 1160px;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.spinner {
  height: 888px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
