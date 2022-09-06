<template>
  <div>
    <div v-show="sortedMovies && searchQuery && focused" id="window">
      <div>
        <h2 class="mb-2" v-show="sortedMovies ? sortedMovies.movies.length !== 0 : false">Movies</h2>
        <div v-for="movie in sortedMovies.movies ? decreaseData(sortedMovies.movies) : []" :key="movie.id">
          <search-movie-card :original-title="movie.original_title" :rating="movie.vote_average"
                             :movieImage="movie.backdrop_path || ''" :title="movie.title"
                             :release-date="movie.release_date ? getYear(movie.release_date): ''"/>
        </div>
      </div>
      <div>
        <h2 class="mt-2" v-show="sortedMovies ? sortedMovies.tvs.length !== 0 : false">Tvs</h2>
        <div v-for="tv in sortedMovies.tvs ? decreaseData(sortedMovies.tvs) : []" :key="tv.id">
          <search-tv-card :name="tv.name" :original-name="tv.original_name"
                          :release-date="tv.first_air_date ? getYear(tv.first_air_date): ''"
                          :rating="tv.vote_average" :movieImage="tv.poster_path || ''"/>
        </div>
      </div>
      <div>
        <h2 class="mt-2" v-show="sortedMovies ? sortedMovies.actors.length !== 0 : false">Actors</h2>
        <div v-for="actor in sortedMovies.actors ? decreaseData(sortedMovies.actors) : [] " :key="actor.id">
          <search-actor-card :name="actor.name" :profile-image="actor.profile_path || ''"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import SearchMovieCard from "@/components/Cards/SearchMovieCard";
import SearchActorCard from "@/components/Cards/SearchActorCard";
import SearchTvCard from "@/components/Cards/SearchTvCard";

export default {
  name: "SearchModal",
  components: { SearchTvCard, SearchActorCard, SearchMovieCard },
  methods: {
    decreaseData(data) {
      let arr = [];
      if (data.length > 5) {
        arr = data.splice(0, 5);
      } else {
        arr = data
      }
      return arr;
    },
    getYear(data) {
      if (data) {
        return data.slice(0, 4);
      } else {
        return "";
      }
    },
  },
  computed: {
    ...mapGetters(["sortedMovies"]),
    ...mapState(["searchQuery", "focused"]),
  }
}
</script>

<style scoped lang="scss">

#window {
  display: flex;
  flex-direction: column;
  width: 510px;
  height: 900px;
  background: #212529;
  opacity: 0.95;
  text-align: center;
  padding: 15px;
  border: 3px solid white;
  border-radius: 10px;
  color: #0000cc;
  position: absolute;
  left: 229px;
  right: 0;
  top: 57px;
  bottom: 0;
  z-index: 2;
  overflow-y: auto;

  h2 {
    color: red;
  }
}

</style>
