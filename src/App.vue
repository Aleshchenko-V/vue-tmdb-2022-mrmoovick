<template>
  <div id="app">
    <scroll-to-top />
    <page-header />
    <films-list />
  </div>
</template>

<script>
import FilmsList from "@/components/FilmsList";
import PageHeader from "@/components/PageHeader.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";

export default {
  name: "App",
  components: { FilmsList, PageHeader, ScrollToTop },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
#app {
  display: flex;
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  justify-content: center;
  flex-direction: column;
}
</style>
