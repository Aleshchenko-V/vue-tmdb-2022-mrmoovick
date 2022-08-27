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
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  justify-content: center;
  align-items: center;
  justify-content: center;
  align-items: center;
}
</style>
