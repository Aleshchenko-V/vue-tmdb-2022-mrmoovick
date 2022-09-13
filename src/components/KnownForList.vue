<template>
  <div>
    <div
        class="d-flex p-0 flex-row justify-content-center align-items-end container "
    >
      <div class="d-flex flex-row">
        <b-list-group horizontal class="flex-sm-wrap">
          <b-list-group-item
              class="w-auto m-2 p-0 border-0 d-flex justify-content-center align-items-start rounded-circle rounded"
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
                @get-card-id="showKnownForList"
                :knownFor="true"
            >
            </film-card>
          </b-list-group-item>
        </b-list-group>
        <modal-window :genres="filteredGenres"/>
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
  methods: {
    async showKnownForList(card) {
      await this.getMovieDetails(card);
    },
    ...mapActions(["getMovieDetails"]),
  },
  computed: {
    filteredGenres() {
      const unFilteredGenres = this.movieDetails.genres ? this.movieDetails.genres.map((el) => el.name) : [];
      return unFilteredGenres.length > 3
          ? unFilteredGenres.slice(0, 3).join(", ") + "..."
          : unFilteredGenres.join(", ");
    },
    ...mapState(["movieDetails", "actorKnownFor"]),
  },
};
</script>

<style scoped>

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
