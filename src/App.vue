<template>
  <div id="app">
    <search />
    <films-list />
  </div>
</template>

<script>
import FilmsList from "@/components/FilmsList";
import Search from "@/components/Search";
export default {
  name: "App",
  components: { FilmsList, Search },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
