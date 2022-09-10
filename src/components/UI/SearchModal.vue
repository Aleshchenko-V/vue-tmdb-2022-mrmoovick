<template>
  <div>
    <div v-show="sortedTypes && searchQuery && isVisible" id="window">
      <div
          v-show="
          sortedTypes
            ? sortedTypes
              ? sortedTypes.movies.length !== 0
              : false
            : false
        "
      >
        <h2 class="mb-2">Movies</h2>
        <div
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
            v-for="{ id, name, profile_path } in sortedTypes.actors
            ? decreaseData(sortedTypes.actors)
            : []"
            :key="id"
        >
          <search-actor-card
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
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import SearchMovieCard from "@/components/Cards/SearchMovieCard";
import SearchActorCard from "@/components/Cards/SearchActorCard";
import SearchTvCard from "@/components/Cards/SearchTvCard";

export default {
  name: "SearchModal",
  components: {SearchTvCard, SearchActorCard, SearchMovieCard},
  methods: {
    decreaseData(data) {
      let arr = [];
      let flag = data ? data.length > 5 : 0;
      if (flag) {
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
      this.clearSelectedQuery();
      switch (type) {
        case "movies":
          if (this.$route.path !== "/") this.$router.replace("/");
          this.movieSearch(this.searchQuery);
          break;
        case "actors":
          if (this.$route.path !== "/actors") this.$router.replace("/actors");
          this.actorSearch(this.searchQuery);
          break;
        case "tvs":
          if (this.$route.path !== "/tvs") this.$router.replace("/tvs");
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
    ...mapMutations(["clearSelectedQuery"])
  },
  computed: {
    ...mapGetters(["sortedTypes"]),
    ...mapState(["searchQuery", "isVisible"]),
  },
};
</script>

<style scoped lang="scss">
#window {
  display: flex;
  flex-direction: column;
  width: 510px;
  height: 675px;
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

.seeMore {
  color: #fff;

  &:hover {
    cursor: pointer;
  }
}
</style>
