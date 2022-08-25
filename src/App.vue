<template>
  <div id="app">
    <films-list />
  </div>
</template>

<script>

import FilmsList from "@/components/FilmsList";
export default {
  name: 'App',
  components: {FilmsList},
}
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
