import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
    searchQuery: '',
    currentPage: 1,
  },
  getters: {
    movies: (state) => state.movies,
    searchQuery: (state) => state.searchQuery,
    currentMoviesPage: (state) => state.currentPage,
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = {...movies};
    },
    SET_MOVIES(state, movies) {
      state.movies = movies.response;
      state.searchQuery = movies.query;
      state.currentPage = 1;
    },
    NEXT_MOVIES_PAGE(state, movies) {
      state.movies = {...movies};
      state.currentPage = movies.page;
    }
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
        if(query) {
          const response = await axios.get(
              `https://api.themoviedb.org/3/search/movie`,
              options
          );
          commit("SET_MOVIES", {response: response.data, query});
        } else {
          return;
        }
      } catch (e) {
        alert(e);
      }
    },
    async getMovies({commit}){
      const options = {
        params: {api_key: process.env.VUE_APP_API_KEY, language: "ru"}
      };
      try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/popular", options);
        commit("GET_MOVIES", response.data)
      } catch (e) {
        alert(e);
      }
    },
    async nextMoviesPage({commit}, {page, query}) {
      const options = {
        params: {api_key: process.env.VUE_APP_API_KEY, query, language: "ru", page}
      }
      if (query) {
        try {
          const response = await axios.get("https://api.themoviedb.org/3/search/movie", options)
          commit("NEXT_MOVIES_PAGE", response.data)
        } catch (e) {
          alert(e);
        }
      } else {
        try {
          const response = await axios.get("https://api.themoviedb.org/3/movie/popular", options)
          commit("NEXT_MOVIES_PAGE", response.data)
        } catch (e) {
          alert(e);
        }
      }
    }
  },

  modules: {},
});
