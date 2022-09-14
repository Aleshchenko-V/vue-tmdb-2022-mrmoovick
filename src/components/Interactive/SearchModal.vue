<template>
  <div>
    <div
        v-show="sortedTypes && searchQuery && isSearchModalVisible"
        id="searchModalWindow"
    >
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
          } in sortedTypes.movies ? sortedTypes.movies : []"
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
            class="d-flex justify-content-end mt-2 see-more"
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
            backdrop_path,
          } in sortedTypes.tvs ? sortedTypes.tvs : []"
            :key="id"
        >
          <search-tv-card
              :name="name"
              :original-name="original_name"
              :release-date="first_air_date ? getYear(first_air_date) : ''"
              :rating="vote_average"
              :movieImage="backdrop_path || ''"
              :tv-id="id"
              @get-tv-id="getTvDetails($event)"
          />
        </div>
        <div
            class="d-flex justify-content-end mt-2 see-more"
            @click="makeOptionalResponseAndRedirect('tvs')"
        >
          see more...
        </div>
      </div>
      <div v-show="sortedTypes ? sortedTypes.actors.length !== 0 : false">
        <h2 class="mt-2">Actors</h2>
        <div
            v-for="{ id, name, profile_path } in sortedTypes.actors
            ? sortedTypes.actors
            : []"
            :key="id"
        >
          <search-actor-card
              :actor-id="id"
              :name="name"
              :profile-image="profile_path || ''"
              @get-actor-id="getActor($event, name)"
          />
        </div>
        <div
            class="d-flex justify-content-end mt-2 see-more"
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
    getActor(id, name) {
      this.getActorDetails(id);
      this.getActorKnownFor(name);
    },
    getYear: (data) => (data ? data.slice(0, 4) : ""),
    makeOptionalResponseAndRedirect(type) {
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
      "getActorKnownFor"
    ]),
    ...mapMutations(["clearSelectedQuery"]),
  },
  computed: {
    ...mapGetters(["sortedTypes"]),
    ...mapState(["searchQuery", "isSearchModalVisible"]),
  },
};
</script>

<style scoped lang="scss">
#searchModalWindow {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-left: 3px;
  height: 675px;
  background: #46a094;
  opacity: 0.9;
  text-align: center;
  padding: 15px;
  border: 3px solid white;
  border-radius: 10px;
  color: #0000cc;
  position: absolute;
  left: 47%;
  right: 0;
  top: 40px;
  bottom: 0;
  z-index: 2;
  overflow-y: auto;
  transform: translate(-59%);

  h2 {
    color: #fff;
  }
}

.see-more {
  color: #fff;

  &:hover {
    cursor: pointer;
  }
}
</style>
