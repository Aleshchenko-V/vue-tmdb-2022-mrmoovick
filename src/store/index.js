import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import uniqby from "lodash.uniqby";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
    actors: [],
    searchQuery: '',
    movieDetails: {},
    actorDetails: {},
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
      state.searchQuery = '';
    },
    SET_ACTORS(state, actors) {
      state.actors = { ...actors }
    },
    SET_MOVIES(state, movies) {
      state.movies = movies.response;
      state.searchQuery = movies.query;
    },
    SET_MOVIE_DETAILS(state, movie) {
      state.movieDetails = movie;
    },
    SET_ACTOR_DETAILS(state, actor) {
      state.actorDetails = {};
      state.actorDetails = actor;
    },
    NEXT_MOVIES_PAGE(state, movies) {
      state.movies.results = [...state.movies.results, ...movies.results];
      state.movies.page = movies.page;
    },
    clearMovieDetails(state) {
      state.movieDetails = {};
    }
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
      try {
        if(query) {
          const { data } = await axios.get(
              `https://api.themoviedb.org/3/search/movie`,
              options
          );
          commit("SET_MOVIES", {response: data, query});
        } else {
          return;
        }
      } catch (e) {
        alert(e);
      }
    },
    async getMovieDetails({ commit }, movieId) {
      const options = {
        params: { api_key: process.env.VUE_APP_API_KEY, language: "en" },
      };
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          options
        );
        commit("SET_MOVIE_DETAILS", data);
      } catch (e) {
        alert(e);
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
    async nextMoviesPage({commit}, {page, query}) {
      const options = {
        params: {api_key: process.env.VUE_APP_API_KEY, query, language: "en", page}
      }
      if (query) {
        try {
          const { data } = await axios.get("https://api.themoviedb.org/3/search/movie", options)
          commit("NEXT_MOVIES_PAGE", data)
        } catch (e) {
          alert(e);
        }
      } else {
        try {
          const { data } = await axios.get("https://api.themoviedb.org/3/movie/popular", options)
          commit("NEXT_MOVIES_PAGE", data)
        } catch (e) {
          alert(e);
        }
      }
    }
  },

  modules: {},
});
