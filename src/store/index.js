import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import uniqby from "lodash.uniqby";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
    actors: [],
    focused: false,
    searchQuery: "",
    movieDetails: {},
    actorDetails: {},
    searchResults: [],
    isLoading: false,
  },
  getters: {
    uniqueMovies: (state) => {
      let uniqueMovies = uniqby(state.movies.results, "id");
      return uniqueMovies;
    },
    sortedMovies: (state) => {
      let obj = {
        movies: [],
        tvs: [],
        actors: [],
      };
      state.searchResults.results
          ? state.searchResults.results.forEach((el) => {
            if (el.media_type === "person") {
              obj.actors.push(el);
            } else if (el.media_type === "tv") {
              obj.tvs.push(el);
            } else {
              obj.movies.push(el);
            }
          })
          : (obj = 0);
      return obj;
    },
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.actorDetails = {};
      state.movieDetails = {};
      state.movies = { ...movies };
      state.searchQuery = "";
    },
    SET_SEARCH_QUERY(state, payload) {
      state.searchQuery = payload;
    },
    SET_ACTORS(state, actors) {
      state.actors = { ...actors };
    },
    SET_MULTI_SEARCH_MOVIES(state, {response, query}) {
      state.searchResults = { ...response };
      state.searchQuery = query;
    },
    SET_SEARCH_MOVIES(state, { response }) {
      state.searchQuery = "";
      state.searchResults = [];
      state.movies = { ...response };
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
    changeFocus(state, payload) {
      state.focused = payload;
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
        commit("SET_IS_LOADING", true);
        const { data } = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          options
        );
        commit("GET_MOVIES", data);
      } catch (e) {
        alert(e);
      } finally {
        commit("SET_IS_LOADING", false);
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
    async multiSearch({ commit }, query) {
      const options = {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          query,
          language: "en",
        },
      };
      try {
        if (query) {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/multi`,
            options
          );
          commit("SET_MULTI_SEARCH_MOVIES", { response: data, query });
        } else {
          return;
        }
      } catch (e) {
        alert(e);
      }
    },
    async movieSearch({ commit }, query) {
      const options = {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          query,
          language: "en",
        },
      };
      try {
        commit("SET_IS_LOADING", true);
        if (query) {
          const { data } = await axios.get(
              `https://api.themoviedb.org/3/search/movie`,
              options
          );
          commit("SET_SEARCH_MOVIES", { response: data });
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
