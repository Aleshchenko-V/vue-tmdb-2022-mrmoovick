<template>
  <div id="app" @click.stop="changeVisible(false)">
    <div class="collage" />
    <page-header />
    <router-view />
    <scroll-up :scroll-duration="1000" :scroll-y="1000"></scroll-up>
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
[theme="dark"] body {
  background: #ee4b2b !important;
}
[theme="light"] body {
  background: #9ad4d6 !important;
}
[theme="dark"] .site-navbar {
  background: rgb(34 34 34) !important;
}
[theme="light"] .site-navbar {
  background: #6bbd99 !important;
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
}
[theme="dark"] .site-logo {
  margin-left: 10px;
  color: #fff;
  text-shadow: 0px 4px 10px rgba(179, 147, 211, 0.8);
  text-decoration: none;
}
[theme="light"] .site-logo {
  margin-left: 10px;
  color: #fff;
  text-shadow: 0px 4px 10px rgba(19, 19, 19, 0.8);
  text-decoration: none;
}
[theme="light"] .site-logo:hover {
  text-shadow: 4px 8px 10px rgba(245, 244, 247, 0.8);
}
[theme="dark"] .site-logo:hover {
  text-shadow: 4px 8px 10px rgba(179, 147, 211, 0.8);
}
[theme="light"] .film-list .b-card {
  background-color: #6bbd99 !important;
}
[theme="dark"] .film-list .b-card {
  background-color: rgb(34 34 34) !important;
}
[theme="light"] .tv-list .b-card {
  background-color: #6bbd99 !important;
}
[theme="dark"] .tv-list .b-card {
  background-color: rgb(34 34 34) !important;
}
[theme="light"] .actor-list .b-card {
  background-color: beige !important;
}
[theme="dark"] .actor-list .b-card {
  background-color: beige !important;
}
[theme="light"] .b-card.big:focus {
  background-color: #6bbd99;
}
[theme="dark"] .b-card.big:focus {
  background-color: rgb(34 34 34) !important;
}
[theme="dark"] .discovery-label {
  color: #fff;
}
[theme="light"] .discovery-label {
  color: #000;
}
[theme="light"] .film-list .form-control {
  color: orange;
}
[theme="dark"] .film-list .form-control {
  color: rgb(34 34 34) !important;
}
[theme="light"] .b-sidebar {
  color: rgb(34 34 34) !important;
  background: #f5fbef;
}
[theme="dark"] .b-sidebar {
  color: #fff !important;
  background: rgb(34 34 34) !important;
}
[theme="light"] .tag {
  color: rgb(34 34 34) !important;
  background: #c4e8c2;
}
[theme="dark"] .tag {
  color: #fff !important;
  background: #ee4b2b !important;
}
[theme="light"] .custom-select {
  color: rgb(34 34 34) !important;
  background: #c4e8c2;
}
[theme="dark"] .custom-select {
  color: #fff !important;
  background: #ee4b2b;
}
[theme="light"] input[type="range"]::-webkit-slider-thumb {
  color: rgb(34 34 34) !important;
  background: #c4e8c2 !important;
}
[theme="dark"] input[type="range"]::-webkit-slider-thumb {
  color: #fff !important;
  background: #ee4b2b !important;
}
[theme="light"] .highlight {
  background: #6bbd99 !important;
}
[theme="dark"] .highlight {
  background: rgba(179, 147, 211, 0.8) !important;
}
[theme="light"] .modal-window {
  background-color: #6bbda4;
}
[theme="dark"] .modal-window {
  background-color: rgb(34 34 34) !important;
}
[theme="light"] .b-card {
  background-color: #6bbda4 !important;
}
[theme="dark"] .b-card {
  background-color: rgb(34 34 34) !important;
}
[theme="light"] #window {
  background-color: rgb(70 160 148);
}
[theme="dark"] #window {
  background-color: rgb(34 34 34);
}
[theme="light"] .theme-togler {
  color: rgb(70 160 148) !important;
}
[theme="dark"] .theme-togler {
  color: rgb(34 34 34) !important;
}
.collage {
  height: 300px;
  background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0.5)),
    url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftecake.com%2Fwp-content%2Fuploads%2F2020%2F12%2F1_eqpRo4-2-CbTDd-ZbNagVA.jpeg&f=1&nofb=1");
  background-size: cover;
  background-position: top;
}
</style>
