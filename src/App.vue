<template>
  <div id="app" @click.stop="changeVisible(false)">
    <page-header />
    <router-view />
    <scroll-up :scroll-duration="1000" :scroll-y="250"></scroll-up>
  </div>
</template>
<script>
import PageHeader from "@/components/UI/PageHeader";
import ScrollUp from "vue-scroll-up";
import "vue-scroll-up/dist/style.css";
import { mapMutations } from "vuex";

export default {
  name: "App",
  components: { PageHeader, ScrollUp },
  methods: {
    ...mapMutations(["changeVisible"]),
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  position: relative;
  font-family: "Lobster", "Creepster", "Oswald", Avenir, Helvetica, Arial,
    sans-serif, cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  justify-content: center;
  flex-direction: column;
}
</style>
