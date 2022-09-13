<template>
  <div class="container-lg sticky-top">
    <b-navbar
        variant="secondary"
        class="site-navbar d-flex justify-content-between rounded-bottom"
    >
      <router-link to="/" class="site-logo">
        <img
            src="@/assets/site-logo.png"
            alt="logo"
            width="60px"
            @click="homeRedirection()"
        />
      </router-link>
      <div style="width: 750px">
        <search-movie/>
        <search-modal/>
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
          <img src="@/assets/github-logo.svg" alt="github-logo" width="40px;"/>
        </a>
      </div>
    </b-navbar>
    <button v-b-toggle.sidebar-1
            style="position: absolute; left: -380px; top: 450px; border: 0; background-color: inherit;"
            v-if="$route.path === '/' && selectedSearchQuery === ''">
      <img width="96px" height="96px" src="https://img.freepik.com/free-icon/right-arrow_318-9141.jpg?w=2000"/>
    </button>
    <b-sidebar id="sidebar-1" title="Filters"
               backdrop
               v-show="$route.path === '/' && selectedSearchQuery === '' "
               shadow>
      <my-filter ref="filter"/>
    </b-sidebar>
  </div>
</template>

<script>
import SearchMovie from "./SearchMovie";
import {mapActions, mapMutations, mapState} from "vuex";
import SearchModal from "@/components/Interactive/SearchModal";
import MyFilter from "@/components/Interactive/MyFilter";

export default {
  name: "PageHeader",
  components: {
    MyFilter,
    SearchModal,
    SearchMovie,
  },
  methods: {
    homeRedirection() {
      this.getMovies();
      this.$refs.filter.clearHighlights();
      this.clearFilters()
    },
    ...mapActions(["getMovies"]),
    ...mapMutations(["clearFilters"])
  },
  computed: {
    ...mapState(['selectedSearchQuery', 'selectedGenres', 'selectedValue']),
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
}

.site-logo {
  margin-left: 10px;
}
</style>
