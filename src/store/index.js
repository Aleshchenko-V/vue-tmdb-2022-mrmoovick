import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import uniqby from "lodash.uniqby";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: [],
        actors: [],
        tvs: [],
        uniqueMovies: [],
        searchQuery: "",
        selectedSearchQuery: "",
        movieDetails: {},
        actorDetails: {},
        tvDetails: {},
        searchResults: [],
        isLoading: false,
        isVisible: false,
        isShown: false,
    },
    getters: {
        uniqueMovies: ({uniqueMovies, movies}) => {
            uniqueMovies = uniqby(movies.results, "id");
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
            state.movies = {};
            state.actorDetails = {};
            state.movieDetails = {};
            state.movies = [];
            state.searchQuery = "";
            state.selectedSearchQuery = "";
            state.movies = movies;
        },
        SET_SEARCH_QUERY(state, payload) {
            state.searchQuery = payload;
        },
        SET_ACTORS(state, actors) {
            state.actors = {results: {...actors.cast}};
        },
        SET_MULTI_SEARCH_MOVIES(state, {response, query}) {
            state.searchResults = [];
            state.searchResults = {...response};
            state.searchQuery = query;
        },
        SET_SEARCH_MOVIES(state, {response}) {
            state.movies = [];
            state.searchResults = [];
            state.selectedSearchQuery = state.searchQuery;
            state.searchQuery = "";
            state.movies = response;
        },
        SET_SEARCH_ACTORS(state, {response}) {
            state.actors = {};
            state.searchResults = [];
            state.actors = response;
        },
        SET_SEARCH_TVS(state, {response}) {
            state.tvs = {};
            state.searchQuery = "";
            state.searchResults = [];
            state.tvs = response;
        },
        SET_MOVIE_DETAILS(state, movie) {
            state.actorDetails = {};
            state.tvDetails = {};
            state.movieDetails = {};
            state.movieDetails = movie;
        },
        SET_ACTOR_DETAILS(state, actor) {
            state.actorDetails = {};
            state.tvDetails = {};
            state.movieDetails = {};
            state.actorDetails = actor;
        },
        SET_TV_DETAILS(state, tv) {
            state.actorDetails = {};
            state.tvDetails = {};
            state.movieDetails = {};
            state.tvDetails = tv;
        },
        NEXT_MOVIES_PAGE(state, response) {
            state.movies.results = [...state.movies.results, ...response.results];
            state.movies.page = response.page;
        },
        NEXT_ACTOR_PAGE(state, response) {
            state.actors.results = [...state.actors.results, ...response.results];
            state.actors.page = response.page;
        },
        clearMovieDetails(state) {
            state.movieDetails = {};
        },
        changeVisible(state, payload) {
            state.isVisible = payload;
        },
        SET_IS_LOADING(state, payload) {
            state.isLoading = payload;
        },
        SET_SHOW(state, payload) {
            state.isShown = payload;
        }
    },
    actions: {
        async getMovies({commit}) {
            const options = {
                params: {api_key: process.env.VUE_APP_API_KEY, language: "en"},
            };
            try {
                commit("SET_IS_LOADING", true);
                const {data} = await axios.get(
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
        async getActors({commit}, movieId) {
            const options = {
                params: {api_key: process.env.VUE_APP_API_KEY, language: "en"},
            };
            try {
                const {data} = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                    options
                );
                commit("SET_ACTORS", data);
            } catch (e) {
                alert(e);
            }
        },
        async multiSearch({commit}, query) {
            const options = {
                params: {
                    api_key: process.env.VUE_APP_API_KEY,
                    query,
                    language: "en",
                },
            };
            try {
                if (query) {
                    commit("SET_SHOW", true);
                    const {data} = await axios.get(
                        `https://api.themoviedb.org/3/search/multi`,
                        options
                    );
                    commit("SET_MULTI_SEARCH_MOVIES", {response: data, query});
                } else {
                    commit("SET_SHOW", true);
                    return;
                }
            } catch (e) {
                alert(e);
            } finally {
                commit("SET_SHOW", false);
            }
        },
        async movieSearch({commit}, query) {
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
                    const {data} = await axios.get(
                        `https://api.themoviedb.org/3/search/movie`,
                        options
                    );
                    commit("SET_SEARCH_MOVIES", {response: data});
                } else {
                    return;
                }
            } catch (e) {
                alert(e);
            } finally {
                commit("SET_IS_LOADING", false);
            }
        },
        async actorSearch({commit}, query) {
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
                    const {data} = await axios.get(
                        `https://api.themoviedb.org/3/search/person`,
                        options
                    );
                    commit("SET_SEARCH_ACTORS", {response: data});
                } else {
                    return;
                }
            } catch (e) {
                alert(e);
            } finally {
                commit("SET_IS_LOADING", false);
            }
        },
        async tvSearch({commit}, query) {
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
                    const {data} = await axios.get(
                        `https://api.themoviedb.org/3/search/tv`,
                        options
                    );
                    commit("SET_SEARCH_TVS", {response: data});
                } else {
                    return;
                }
            } catch (e) {
                alert(e);
            } finally {
                commit("SET_IS_LOADING", false);
            }
        },
        async getMovieDetails({commit}, movieId) {
            const options = {
                params: {api_key: process.env.VUE_APP_API_KEY, language: "en"},
            };

            try {
                const {data} = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}`,
                    options
                );
                commit("SET_MOVIE_DETAILS", data);
            } catch (e) {
                alert(e);
            }
        },
        async getActorDetails({commit}, actorId) {
            const options = {
                params: {api_key: process.env.VUE_APP_API_KEY, language: "en"},
            };
            try {
                const {data} = await axios.get(
                    `https://api.themoviedb.org/3/person/${actorId}`,
                    options
                );
                commit("SET_ACTOR_DETAILS", data);
            } catch (e) {
                alert(e);
            }
        },
        async getTvDetails({commit}, tvId) {
            const options = {
                params: {api_key: process.env.VUE_APP_API_KEY, language: "en"},
            };
            try {
                const {data} = await axios.get(
                    `https://api.themoviedb.org/3/tv/${tvId}`,
                    options
                );
                commit("SET_TV_DETAILS", data);
            } catch (e) {
                alert(e);
            }
        },
        async getNextMoviesPage({commit}, {page, query}) {
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
                    const {data} = await axios.get(
                        "https://api.themoviedb.org/3/search/movie",
                        options
                    );
                    commit("NEXT_MOVIES_PAGE", data);
                } catch (e) {
                    alert(e);
                }
            } else {
                try {
                    const {data} = await axios.get(
                        "https://api.themoviedb.org/3/movie/popular",
                        options
                    );
                    commit("NEXT_MOVIES_PAGE", data);
                } catch (e) {
                    alert(e);
                }
            }
        },
        async getNextActorPage({commit}, {page, query}) {
            const options = {
                params: {
                    api_key: process.env.VUE_APP_API_KEY,
                    query,
                    language: "en",
                    page,
                },
            };
            try {
                const {data} = await axios.get(
                    "https://api.themoviedb.org/3/search/person",
                    options
                );
                commit("NEXT_ACTOR_PAGE", data);
            } catch (e) {
                alert(e);
            }
        },

        getFilms({state, dispatch}) {
            if (state.searchQuery) {
                dispatch("movieSearch", state.searchQuery);
            } else {
                dispatch("getMovies");
            }
        },
    },

    modules: {},
});
