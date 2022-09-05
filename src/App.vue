<template>
  <div id="app">
    <back-to-top />
    <search />
    <films-list />
  </div>
</template>

<script>
import FilmsList from "@/components/FilmsList";
import Search from "@/components/Search";
import BackToTop from "@/components/BackToTop";
export default {
  name: "App",
  components: { FilmsList, Search, BackToTop },
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
  align-items: center;
  flex-direction: column;
}
</style>
