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
                @get-actor-id="getActor($event, name)"
                :big="big"
            >
            </actor-card>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
    <div v-show="big" ref="observer"></div>
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
  mixins: [observerMixin('actors')],
  methods: {
    getActor(event, name) {
      this.$emit('close-modal', this.closeModal)
      this.getActorDetails(event)
      this.getActorKnownFor(name)
      this.clearFilters()
    },
    compareTotalResults() {
      if (this.actors.total_results > 10000) {
        this.totalResults = 10000;
      } else {
        this.totalResults = this.actors.total_results;
      }
    },
    getActor(event, name) {
      this.$emit('close-modal', this.closeModal)
      this.getActorDetails(event)
      this.getActorKnownFor(name)
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
}

.spinner {
  height: 888px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
