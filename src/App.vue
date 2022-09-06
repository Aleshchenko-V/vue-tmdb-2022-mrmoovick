<template>
  <div id="app">
    <page-header />
    <router-view />
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";

export default {
  name: "App",
  components: { PageHeader },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  justify-content: center;
  flex-direction: column;
}
</style>
