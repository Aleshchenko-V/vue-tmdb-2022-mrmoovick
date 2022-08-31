<template>
  <div>
    <div class="d-flex flex-column justify-content-center align-items-end container" v-if="!loading">
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
  name: "FilmsList",
  components: { ActorCard },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async fetchActors() {
      this.loading = true;
      console.log(this.$store.state.actors);
      await this.$store.dispatch("getActors");
      console.log(this.$store.state.actors);
      this.loading = false;
    },
  },
  created() {
    this.fetchActors();
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
