<template>
  <b-list-group horizontal class="flex-sm-wrap align-items-start justify-content-center" v-if="!loading">
    <b-list-group-item class="w-auto m-1 d-flex justify-content-center align-items-start" v-for="film in $store.getters.data.items" :key="film.id">
      <film-card
          :title="film.title"
          :backdropPath="film.backdrop_path"
          :overview="film.overview"
          :originalLanguage="film.original_language"
          :originalTitle="film.original_title"
          :releaseDate="film.release_date"
          :overallRating="film.vote_average"
      >
      </film-card>
    </b-list-group-item>
  </b-list-group>
  <div style="height: 888px; display: flex; justify-content: center; align-items: center" v-else>
    <b-spinner label="Loading..."></b-spinner>
  </div>
</template>

<script>
import FilmCard from "@/components/FilmCard";

export default {
  name: "FilmsList",
  components: {FilmCard},
  data() {
    return {
      loading: true,
    }
  },
  methods: {
    async fetchFilms() {
      await this.$store.dispatch('getMovies');

      this.loading = false;
    }
  },
  mounted() {
    this.fetchFilms()
  },

}
</script>

<style scoped>

</style>
