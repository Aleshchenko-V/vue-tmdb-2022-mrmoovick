<template>
  <div>
    <div
        class="d-flex p-0 flex-row justify-content-center align-items-end container "
    >
      <div class="d-flex flex-row">
        <b-list-group horizontal class="flex-sm-wrap">
          <b-list-group-item
              class="w-auto m-2 p-0 border-0 d-flex justify-content-center align-items-start rounded-circle card"
              v-for="{
              title,
              backdrop_path,
              overview,
              original_language,
              original_title,
              release_date,
              vote_average,
              id,
              media_type,
            } in actorKnownFor"
              :key="id"
          >
            <film-card
                v-if="media_type === 'movie'"
                :title="title"
                :backdropPath="backdrop_path || ''"
                :overview="overview"
                :originalLanguage="original_language"
                :originalTitle="original_title"
                :releaseDate="release_date || ''"
                :overallRating="vote_average"
                :cardId="id"
                @get-card-id="getChosenMovieDetails"
                :known-for="true"
            >
            </film-card>
          </b-list-group-item>
        </b-list-group>
        <modal-window :genres="genres"/>
      </div>
    </div>
  </div>
</template>

<script>
import FilmCard from "@/components/FilmCard";
import ModalWindow from "@/components/ModalWindow";

import {mapActions, mapState} from "vuex";

export default {
  name: "KnownForList",
  components: {FilmCard, ModalWindow},
  data: () => ({
    genres: "",
  }),
  methods: {
    async getChosenMovieDetails(card) {
      await this.getMovieDetails(card);
      const unFilteredGenres = this.movieDetails.genres.map((el) => el.name);
      this.genres =
          unFilteredGenres.length > 3
              ? unFilteredGenres.slice(0, 3).join(", ") + "..."
              : unFilteredGenres.join(", ");
    },
    ...mapActions(["getMovieDetails"]),
  },
  computed: {
    ...mapState(["movieDetails", "actorKnownFor"]),
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
