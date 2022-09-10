<template>
  <div class="container-lg sticky-top">
    <b-navbar
      variant="secondary"
      class="site-navbar d-flex justify-content-between rounded-bottom"
    >
      <router-link to="/" class="site-logo">
        <h2
          class="site-logo"
          @click="getMovies(), $refs.filter.clearHighlights(), clearFilters()"
        >
          MrMoovick
        </h2>
      </router-link>
      <div style="width: 750px">
        <search-movie />
        <search-modal />
      </div>
      <div class="logos d-flex">
        <a href="https://www.themoviedb.org/?language=en" target="_blank"
          ><img src="@/assets/tmdb-logo.svg" alt="tmdb-logo" width="40px;"
        /></a>
        <h2>&nbsp;|&nbsp;</h2>
        <a
          href="https://github.com/TheSecondCore/vue-internship-2022-tmdb"
          target="_blank"
        >
          <img src="@/assets/github-logo.svg" alt="github-logo" width="40px;" />
        </a>
      </div>
    </b-navbar>
    <button
      v-b-toggle.sidebar-1
      style="
        position: absolute;
        left: -380px;
        top: 450px;
        border: 0;
        background-color: inherit;
      "
      v-if="$route.path === '/' && selectedSearchQuery === ''"
    >
      <img
        width="96px"
        height="96px"
        src="../../assets/ftline-double-line-arrow-end.svg"
      />
    </button>
    <b-sidebar
      id="sidebar-1"
      title="Filters"
      backdrop
      v-show="$route.path === '/' && selectedSearchQuery === ''"
      shadow
    >
      <my-filter ref="filter" />
    </b-sidebar>
  </div>
</template>

<script>
import SearchMovie from "./SearchMovie";
import { mapActions, mapMutations, mapState } from "vuex";
import SearchModal from "@/components/UI/SearchModal";
import MyFilter from "@/components/UI/MyFilter";

export default {
  name: "PageHeader",
  components: {
    MyFilter,
    SearchModal,
    SearchMovie,
  },
  methods: {
    ...mapActions(["getMovies"]),
    ...mapMutations(["clearFilters"]),
  },
  computed: {
    ...mapState(["selectedSearchQuery", "selectedGenres", "selectedValue"]),
  },
};
</script>

<style scoped lang="scss">
.container-lg {
  padding: 0px !important;
  margin: auto !important;
}

.site-navbar {
  padding-right: 30px;
  //background-color: #dabdab !important;
  background: rgb(34 34 34) !important;
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
}

.site-logo {
  margin-left: 10px;
  //color: #f5e2c8;
  color: #fff;
  text-shadow: 0px 4px 10px rgba(179, 147, 211, 0.8);
  text-decoration: none;
}
.site-logo:hover {
  text-shadow: 0px 8px 20px rgba(169, 104, 234, 0.8),
    7px 8px 20px rgba(245, 24, 3, 0.8);
}
</style>
