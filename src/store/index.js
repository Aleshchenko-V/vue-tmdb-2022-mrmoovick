import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import uniqueId from "lodash.uniqueid"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
    searchQuery: '',
  },
  getters: {
    uniqueMovies: (state) => {
      state.movies.results.forEach(el => {
        el.id = uniqueId(el.id)
      })
      return state.movies;
    },
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = {...movies};
      state.searchQuery = '';
    },
    SET_MOVIES(state, movies) {
      state.movies = movies.response;
      state.searchQuery = movies.query;
    },
    NEXT_MOVIES_PAGE(state, movies) {
      state.movies.results = [...state.movies.results, ...movies.results];
      state.movies.page = movies.page;
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
