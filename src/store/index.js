import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import uniqby from "lodash.uniqby";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
    movieDetails: {},
  },
  getters: {
    uniqueMovies: (state) => {
      let uniqueMovies = uniqby(state.movies.results, "id");
      return uniqueMovies;
    },
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = { ...movies };
    },
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    GET_MOVIE_DETAILS(state, movie) {
      state.movieDetails = movie;
    },
  },
  actions: {
    async searchMovies({ commit }, query) {
      const options = {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          query,
          language: "uk",
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
    async getMovies({ commit }) {
      const options = {
        params: { api_key: process.env.VUE_APP_API_KEY, language: "uk" },
      };
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          options
        );
        commit("GET_MOVIES", response.data);
      } catch (e) {
        alert(e);
      }
    },
    async getMovieDetails({ commit }, movieId) {
      const options = {
        params: { api_key: process.env.VUE_APP_API_KEY, language: "uk" },
      };
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          options
        );
        commit("GET_MOVIE_DETAILS", response.data);
      } catch (e) {
        alert(e);
      }
    },
  },

  modules: {},
});
