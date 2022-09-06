<template>
  <div id="app">
    <page-header />
    <router-view />
    <scroll-up :scroll-duration="1000" :scroll-y="250"></scroll-up>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import ScrollUp from "vue-scroll-up";
import "vue-scroll-up/dist/style.css";

export default {
  name: "App",
  components: { PageHeader, ScrollUp },
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
