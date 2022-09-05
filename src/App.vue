<template>
  <div id="app">
    <page-header />
    <theme-toggler />
    <films-list />
  </div>
</template>

<script>
import FilmsList from "@/components/FilmsList";
import PageHeader from "@/components/PageHeader";
import ThemeToggler from "./components/ThemeToggler.vue";

export default {
  name: "App",
  components: { FilmsList, PageHeader, ThemeToggler },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  justify-content: center;
  flex-direction: column;
}
</style>
