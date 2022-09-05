import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import uniqby from "lodash.uniqby";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
    actors: [],
    searchQuery: "",
    movieDetails: {},
    actorDetails: {},
    isLoading: false,
  },
  getters: {
    uniqueMovies: (state) => {
      let uniqueMovies = uniqby(state.movies.results, "id");
      return uniqueMovies;
    },
    searchQuery: (state) => state.searchQuery,
    isLoading: (state) => state.isLoading,
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.actorDetails = {};
      state.movieDetails = {};
      state.movies = { ...movies };
      state.searchQuery = "";
    },
    UPDATE_SEARCH(state, payload) {
      state.searchQuery = payload;
    },
    SET_ACTORS(state, actors) {
      state.actors = { ...actors };
    },
    SET_MOVIES(state, movies) {
      state.movieDetails = {};
      state.movies = movies.response;
      state.searchQuery = movies.query;
    },
    SET_MOVIE_DETAILS(state, movie) {
      state.movieDetails = movie;
    },
    SET_ACTOR_DETAILS(state, actor) {
      state.actorDetails = {};
      state.movieDetails = {};
      state.actorDetails = actor;
    },
    NEXT_MOVIES_PAGE(state, movies) {
      state.movies.results = [...state.movies.results, ...movies.results];
      state.movies.page = movies.page;
    },
    clearMovieDetails(state) {
      state.movieDetails = {};
    },
    SET_IS_LOADING(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async getMovies({ commit }) {
      const options = {
        params: { api_key: process.env.VUE_APP_API_KEY, language: "en" },
      };
      try {
        const { data } = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          options
        );
        commit("GET_MOVIES", data);
      } catch (e) {
        alert(e);
      }
    },
    async getActors({ commit }, movieId) {
      const options = {
        params: { api_key: process.env.VUE_APP_API_KEY, language: "en" },
      };
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          options
        );
        const { cast } = data;
        commit("SET_ACTORS", cast);
      } catch (e) {
        alert(e);
      }
    },
    async searchMovies({ commit }, query) {
      const options = {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          query,
          language: "en",
        },
      };
      commit("SET_IS_LOADING", true);
      try {
        if (query) {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/movie`,
            options
          );
          commit("SET_MOVIES", { response: data, query });
        } else {
          return;
        }
      } catch (e) {
        alert(e);
      } finally {
        commit("SET_IS_LOADING", false);
      }
    },
    async getMovieDetails({ commit }, movieId) {
      const options = {
        params: { api_key: process.env.VUE_APP_API_KEY, language: "en" },
      };
      commit("SET_IS_LOADING", true);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          options
        );
        commit("SET_MOVIE_DETAILS", data);
      } catch (e) {
        alert(e);
      } finally {
        commit("SET_IS_LOADING", false);
      }
    },
    async getActorDetails({ commit }, actorId) {
      const options = {
        params: { api_key: process.env.VUE_APP_API_KEY, language: "en" },
      };
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}`,
          options
        );
        commit("SET_ACTOR_DETAILS", data);
      } catch (e) {
        alert(e);
      }
    },
    async getNextMoviesPage({ commit }, { page, query }) {
      const options = {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          query,
          language: "en",
          page,
        },
      };
      if (query) {
        try {
          const { data } = await axios.get(
            "https://api.themoviedb.org/3/search/movie",
            options
          );
          commit("NEXT_MOVIES_PAGE", data);
        } catch (e) {
          alert(e);
        }
      } else {
        try {
          const { data } = await axios.get(
            "https://api.themoviedb.org/3/movie/popular",
            options
          );
          commit("NEXT_MOVIES_PAGE", data);
        } catch (e) {
          alert(e);
        }
      }
    },
    updateSearch({ commit }, val) {
      commit("UPDATE_SEARCH", val.trim());
    },
    getFilms({ state, dispatch }) {
      if (state.searchQuery) {
        dispatch("searchMovies", state.searchQuery);
      } else {
        dispatch("getMovies");
      }
    },
  },

  modules: {},
});
