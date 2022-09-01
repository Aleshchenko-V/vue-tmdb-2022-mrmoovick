<template>
  <div>
    <div class="d-flex flex-row container" v-if="!loading">
      <div class="d-flex flex-row">
          <b-list-group horizontal class="flex-sm-wrap">
              <b-list-group-item
                  class="w-auto m-2 p-0 border-0 d-flex justify-content-center align-items-start rounded-circle card"
                  v-for="actor in actors"
                  :key="actor.id"
              >
                  <actor-card
                      :name="actor.name"
                      :knownForDepartment="actor.known_for_department || ''"
                      :popularity="actor.popularity"
                      :profilePath="actor.profile_path || ''"
                      :character="actor.character"
                      :actorId="actor.id"
                      @getActorId="getActorDetails"
                  >
                  </actor-card>
              </b-list-group-item>
          </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
import ActorCard from "@/components/ActorCard";
import { mapState } from "vuex";

export default {
  name: "ActorList",
  components: { ActorCard },
  data() {
    return {
      loading: false,
      slickOptions: {
        slidesToShow: 3,
      },
    }
  },
  methods: {
    async getActorDetails(actorId) {
      await this.$store.dispatch("getActorDetails", actorId);
    },
  },
  computed: {
    ...mapState(["actors"]),
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
