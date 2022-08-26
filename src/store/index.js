import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: []
  },
  getters: {
    movies: state => state.data,
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.data = movies;
    },
  },
  actions: {
    getMovies({commit}) {
      return axios.get(`https://api.themoviedb.org/3/list/1`, {params: {api_key: process.env.VUE_APP_API_KEY, language: 'ru'}})
          .then(res => {
            let movies = res.data;
            commit('GET_MOVIES', movies)
          }).catch(err => {
            alert(err);
      })
    },
  },
  modules: {
  }
})
