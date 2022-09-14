<template>
  <div class="header sticky-top" sticky-header style="min-width: 600px">
    <b-navbar
      variant="secondary"
      class="site-navbar d-flex justify-content-between rounded-bottom"
    >
      <router-link to="/" class="site-logo">
        <h2 class="site-logo" @click="homeRedirection()">MrMoovick</h2>
      </router-link>
      <div style="width: 750px; position: relative">
        <search-movie />
        <search-modal />
      </div>

      <div class="logos d-flex">
        <div class="theme-wrapper"><dark-mode /></div>
        <a
          class="brand-icon"
          href="https://www.themoviedb.org/?language=en"
          target="_blank"
          ><img src="@/assets/tmdb-logo.svg" alt="tmdb-logo" width="40px;"
        /></a>
        <h2 class="separator">&nbsp;|&nbsp;</h2>
        <a
          class="brand-icon"
          href="https://github.com/TheSecondCore/vue-internship-2022-tmdb"
          target="_blank"
        >
          <img src="@/assets/github-logo.svg" alt="github-logo" width="40px;" />
        </a>
      </div>
    </b-navbar>
    <b-sidebar
      id="sidebar-1"
      title="Filters"
      backdrop
      v-show="$route.path === '/' && isDiscovery"
      shadow
      @hidden="changeIsDiscovery(!isDiscovery)"
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
import DarkMode from "@/components/UI/DarkMode";

export default {
  name: "PageHeader",
  components: {
    MyFilter,
    SearchModal,
    SearchMovie,
    DarkMode,
  },
  methods: {
    homeRedirection() {
      this.getMovies();
      this.$refs.filter.clearHighlights();
      this.clearFilters();
    },
    ...mapActions(["getMovies"]),
    ...mapMutations(["clearFilters", "changeIsDiscovery"]),
  },
  computed: {
    ...mapState([
      "selectedSearchQuery",
      "selectedGenres",
      "selectedValue",
      "isDiscovery",
    ]),
  },
};
</script>

<style scoped lang="scss">
.header {
  padding: 0px !important;
}

.site-navbar {
  padding-right: 30px;
  background: #6bbd99 !important;
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
}

.site-logo {
  margin-left: 10px;
  color: #fff;
  text-shadow: 0px 4px 10px rgba(19, 19, 19, 0.8);
  text-decoration: none;
}
.site-logo:hover {
  text-shadow: 0px 4px 10px rgba(245, 244, 247, 0.8);
}

.separator {
  color: #fff;
}
.theme-wrapper {
  display: flex;
  margin: auto;
}
</style>
