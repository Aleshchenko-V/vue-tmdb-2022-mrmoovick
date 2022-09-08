<template>
  <div class="container-lg">
    <div v-if="searchResults.results.length !== 0">
      <h2 style="color: #fff">You are most likely looking for:</h2>
      <div v-show="sortedTypes ? sortedTypes.movies.length !== 0 : false">
        <h2 class="mb-2">Movies</h2>
        <div
          class="d-flex justify-content-center"
          v-for="{
            id,
            original_title,
            vote_average,
            backdrop_path,
            title,
            release_date,
          } in sortedTypes.movies ? decreaseData(sortedTypes.movies) : []"
          :key="id"
        >
          <search-movie-card
            :searchCard="true"
            :original-title="original_title"
            :rating="vote_average"
            :movieImage="backdrop_path || ''"
            :title="title"
            :release-date="release_date ? getYear(release_date) : ''"
            :movie-id="id"
            @get-movie-id="getMovieDetails($event)"
          />
        </div>
        <div
          class="d-flex justify-content-end mt-2 seeMore"
          @click="makeOptionalResponseAndRedirect('movies')"
        >
          see more...
        </div>
      </div>
      <div v-show="sortedTypes ? sortedTypes.tvs.length !== 0 : false">
        <h2 class="mt-2">Tvs</h2>
        <div
          class="d-flex justify-content-center"
          v-for="{
            id,
            name,
            original_name,
            first_air_date,
            vote_average,
            poster_path,
          } in sortedTypes.tvs ? decreaseData(sortedTypes.tvs) : []"
          :key="id"
        >
          <search-tv-card
            :searchCard="true"
            :name="name"
            :original-name="original_name"
            :release-date="first_air_date ? getYear(first_air_date) : ''"
            :rating="vote_average"
            :movieImage="poster_path || ''"
            :tv-id="id"
            @get-tv-id="getTvDetails($event)"
          />
        </div>
        <div
          class="d-flex justify-content-end mt-2 seeMore"
          @click="makeOptionalResponseAndRedirect('tvs')"
        >
          see more...
        </div>
      </div>
      <div v-show="sortedTypes ? sortedTypes.actors.length !== 0 : false">
        <h2 class="mt-2">Actors</h2>
        <div
          class="d-flex justify-content-center"
          v-for="{ id, name, profile_path } in sortedTypes.actors
            ? decreaseData(sortedTypes.actors)
            : []"
          :key="id"
        >
          <search-actor-card
            :searchCard="true"
            :actor-id="id"
            :name="name"
            :profile-image="profile_path || ''"
            @get-actor-id="getActorDetails($event)"
          />
        </div>
        <div
          class="d-flex justify-content-end mt-2 seeMore"
          @click="makeOptionalResponseAndRedirect('actors')"
        >
          see more...
        </div>
      </div>
    </div>
    <div v-else style="color: #fff">
      Unfortunately, your search returned no results...
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import SearchMovieCard from "@/components/Cards/SearchMovieCard";
import SearchActorCard from "@/components/Cards/SearchActorCard";
import SearchTvCard from "@/components/Cards/SearchTvCard";

export default {
  name: "SearchModal",
  components: {
    SearchTvCard,
    SearchActorCard,
    SearchMovieCard,
  },
  methods: {
    decreaseData(data) {
      let arr = [];
      if (data.length > 5) {
        arr = data.splice(0, 5);
      } else {
        arr = data;
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
    makeOptionalResponseAndRedirect(type) {
      switch (type) {
        case "movies":
          this.$router.replace("/");
          this.movieSearch(this.searchQuery);
          break;
        case "actors":
          this.$router.replace("/actors");
          this.actorSearch(this.searchQuery);
          break;
        case "tvs":
          this.$router.replace("/tvs");
          this.tvSearch(this.searchQuery);
          break;
      }
    },
    ...mapActions([
      "getActorDetails",
      "getMovieDetails",
      "getTvDetails",
      "movieSearch",
      "actorSearch",
      "tvSearch",
    ]),
  },
  computed: {
    ...mapGetters(["sortedTypes"]),
    ...mapState(["searchQuery", "isVisible", "searchResults"]),
  },
};
</script>

<style scoped lang="scss">
.seeMore {
  color: #fff;

  &:hover {
    cursor: pointer;
  }
}
</style>
