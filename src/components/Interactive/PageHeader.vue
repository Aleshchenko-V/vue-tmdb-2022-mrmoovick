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
            @click="getMovies"
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
  </div>
</template>

<script>
import SearchMovie from "./SearchMovie";
import {mapActions} from "vuex";
import SearchModal from "@/components/Interactive/SearchModal";

export default {
  name: "PageHeader",
  components: {
    SearchModal,
    SearchMovie,
  },
  methods: {
    ...mapActions(["getMovies"]),
  },
};
</script>

<style scoped>
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
