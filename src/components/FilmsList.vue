<template>
  <div class="d-flex justify-content-center align-items-end" style="max-width: 1200px" v-if="!loading">
      <b-list-group horizontal class="flex-sm-wrap ">
        <b-list-group-item class="w-auto m-1 d-flex justify-content-center align-items-start" v-for="movie in movies.items" :key="movie.id">
          <film-card
              :title="movie.title"
              :backdropPath="movie.backdrop_path"
              :overview="movie.overview"
              :originalLanguage="movie.original_language"
              :originalTitle="movie.original_title"
              :releaseDate="movie.release_date"
              :overallRating="movie.vote_average"
          >
          </film-card>
        </b-list-group-item>
      </b-list-group>
  </div>
  <div style="height: 888px; display: flex; justify-content: center; align-items: center" v-else>
    <b-spinner label="Loading..."></b-spinner>
  </div>
</template>

<script>
import FilmCard from "@/components/FilmCard";
import { mapGetters } from "vuex";

export default {
  name: "FilmsList",
  components: {FilmCard},
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async fetchFilms() {
      this.loading = true;

      await this.$store.dispatch('getMovies');

      this.loading = false;
    },
  },
  created() {
    this.fetchFilms()
  },
  computed: {
      ...mapGetters(['movies']),
  }

}
</script>

<style scoped>

</style>
