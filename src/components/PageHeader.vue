<template>
  <div class="container-lg sticky-top">
    <b-navbar
      variant="secondary"
      class="site-navbar d-flex juctify-content-between pl-3 rounded-bottom"
    >
      <a href="#" class="site-logo">
        <img src="@/assets/site-logo.png" alt="logo" width="60px" />
      </a>
      <b-navbar-brand href="#" class="d-flex flex-column"></b-navbar-brand>

      <search-movie />
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
  </div>
</template>

<script>
import SearchMovie from "./SearchMovie.vue";
//import { mapState } from "vuex";
export default {
  name: "PageHeader",
  components: {
    SearchMovie,
  },
  //computed: {
  //  ...mapState(["isLoading"]),
  //},
};
</script>

<style>
div.container-fluid {
  padding: 0px !important;
  margin: 0px !important;
}
.site-navbar {
  padding-right: 30px !important;
}
.site-logo {
  margin-left: 10px;
}
/*.container-lg {
  border-radius: 10px !important;
}*/
</style>
