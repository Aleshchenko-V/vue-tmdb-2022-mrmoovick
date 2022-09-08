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
        path: "/tvs",
        name: "tvs",
        component: () => import("@/views/TvsPageView"),
    },
    {
        path: "/actors",
        name: "actors",
        component: () => import("@/views/ActorsPageView"),
    },
    {
        path: "/actor/:id",
        name: "actor",
        component: () => import("@/views/ActorPageView"),
    },
    {
        path: "/movie/:id",
        name: "movie",
        component: () => import("@/views/FilmPageView"),
    },
    {
        path: "/tv/:id",
        name: "tv",
        component: () => import("@/views/TVPageView"),
    },
    {
        path: "/tv/:id/season/:season_number",
        name: "season",
        component: () => import("@/views/SeasonPageView"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
