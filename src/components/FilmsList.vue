<template>
  <div>
    <div class="d-flex flex-column justify-content-center align-items-end container" v-if="!loading">
      <div class="d-flex flex-row">
        <b-list-group horizontal class="flex-sm-wrap">
          {{uniqueMovies}}
          <b-list-group-item class="w-auto m-2 p-0 border-0 d-flex justify-content-center align-items-start rounded-circle card" v-for="movie in movies.results" :key="movie.id">
            <film-card
                :title="movie.title"
                :backdropPath="movie.backdrop_path || ''"
                :overview="movie.overview"
                :originalLanguage="movie.original_language"
                :originalTitle="movie.original_title"
                :releaseDate="movie.release_date || ''"
                :overallRating="movie.vote_average"
            >
            </film-card>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
    <div class="spinner" v-else>
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div ref="observer"></div>
  </div>
</template>

<script>
import FilmCard from "@/components/FilmCard";
import {mapGetters, mapState} from "vuex";
export default {
  name: "FilmsList",
  components: {FilmCard},
  data() {
    return {
      loading: false,
      totalResults: 0,
      currentPage: 1,
    }
  },
  methods: {
    compareTotalResults() {
      if (this.movies.total_results > 10000) {
        this.totalResults = 10000;
      } else {
        this.totalResults = this.movies.total_results;
      }
    },
    async fetchFilms() {
      this.loading = true;
      await this.$store.dispatch('getMovies');
      this.compareTotalResults();
      this.loading = false;
    },
    async nextPage(currentPage) {
      this.loading = true;
      await this.$store.dispatch("nextMoviesPage", {page: Object.values(currentPage)[0], query: this.searchQuery});
      this.compareTotalResults();
      this.loading = false;
    },
  },
  created() {
    this.fetchFilms()
  },
  mounted() {
    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting && this.currentPage !== this.movies.total_pages) {
        if(this.movies.total_pages === 1) {
          return;
        }
        if (this.searchQuery && this.currentPage !== this.movies.page) {
          this.currentPage = 1;
        }
        this.currentPage += 1;
        await this.$store.dispatch("nextMoviesPage", {page: this.currentPage, query: this.searchQuery});
      }
    }, {})
    observer.observe(this.$refs.observer)
  },
  computed: {
    ...mapGetters(['uniqueMovies']),
    ...mapState(['movies', 'searchQuery'])
  }
}
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
