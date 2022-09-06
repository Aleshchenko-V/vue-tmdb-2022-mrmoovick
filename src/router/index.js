import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/MoviesPageView"),
  },
  {
    path: "/actor/:id",
    name: "actor",
    component: () => import("@/views/ActorPageView"),
  },
  {
    path: "/film/:id",
    name: "film",
    component: () => import("@/views/FilmPageView"),
  },
  {
    path: "/tv/:id",
    name: "tv",
    component: () => import("@/views/TVPageView"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
