<template>
  <div class="container-lg">
    <div
      v-if="searchResults.results ? searchResults.results.length !== 0 : false"
    >
      <h2 style="color: #fff; margin-top: 10px; margin-bottom: 15px">
        You are most likely looking for:
      </h2>
      <div
        v-show="sortedTypes.movies ? sortedTypes.movies.length !== 0 : false"
      >
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
          } in sortedTypes.movies ? sortedTypes.movies : []"
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
      <div v-show="sortedTypes.tvs ? sortedTypes.tvs.length !== 0 : false">
        <h2 class="mt-2 ml-5">Tvs</h2>
        <div
          class="d-flex justify-content-center"
          v-for="{
            id,
            name,
            original_name,
            first_air_date,
            vote_average,
            poster_path,
          } in sortedTypes.tvs ? sortedTypes.tvs : []"
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
      <div
        v-show="sortedTypes.actors ? sortedTypes.actors.length !== 0 : false"
      >
        <h2 class="mt-2 ml-5">Actors</h2>
        <div
          class="d-flex justify-content-center"
          v-for="{ id, name, profile_path } in sortedTypes.actors
            ? sortedTypes.actors
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
          class="d-flex justify-content-end mt-2 mb-3 seeMore"
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
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import SearchMovieCard from "@/components/Cards/SearchMovieCard";
import SearchActorCard from "@/components/Cards/SearchActorCard";
import SearchTvCard from "@/components/Cards/SearchTvCard";

export default {
  name: "AllContentView",
  components: {
    SearchTvCard,
    SearchActorCard,
    SearchMovieCard,
  },
  methods: {
    getYear: (data) => (data ? data.slice(0, 4) : ""),
    makeOptionalResponseAndRedirect(type) {
      this.clearSelectedQuery();
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
    ...mapMutations(["clearSelectedQuery"]),
  },
  computed: {
    ...mapGetters(["sortedTypes"]),
    ...mapState(["searchQuery", "isSearchModalVisible", "searchResults"]),
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
