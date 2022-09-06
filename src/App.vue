<template>
  <div id="app" @click.stop="changeVisible(false)">
    <page-header/>
    <router-view/>
  </div>
</template>

<script>
import PageHeader from "@/components/UI/PageHeader";
import {mapMutations} from "vuex";

export default {
  name: "App",
  components: {PageHeader},
  methods: {
    ...mapMutations(["changeVisible"]),
  }
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
