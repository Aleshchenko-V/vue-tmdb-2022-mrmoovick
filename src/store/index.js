import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
    searchQuery: "",
  },
  getters: {
    getMovies: (state) => state.movies,
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
  },
  actions: {
    async searchMovies({ commit }, query) {
      const options = {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          query,
          language: "ru",
        },
      };
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          options
        );
        commit("SET_MOVIES", response.data);
      } catch (e) {
        alert(e);
      }
    },
  },

  modules: {},
});
