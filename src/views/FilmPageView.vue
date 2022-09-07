<template>
  <div class="movie-details d-flex flex-column container-lg mt-3 text-light">
    <div class="d-flex flex-row">
      <div class="d-flex justify-content-center">
        <img
            width="300"
            height="450"
            class="movie-details__poster"
            :src="
            !movieDetails.poster_path
              ? NO_IMG_URL
              : 'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path
          "
            alt="poster"
        />
      </div>
      <div class="wrapper-details">
        <h1>{{ movieDetails.title }}</h1>
        <div class="details-info">
          <div class="details-item">
            <div class="details-subtitle">Genres:</div>
            <div class="details-subitem">{{ movieDetails.genres ? getGenres() : '' }}</div>
          </div>
          <div class="details-item">
            <div class="details-subtitle">Release Date:</div>
            <div class="details-subitem">{{ movieDetails.release_date }}</div>
          </div>
          <div class="details-item">
            <div class="details-subtitle">Rating:</div>
            <div class="details-subitem">
              {{ movieDetails.vote_average }} / {{ movieDetails.vote_count }}
            </div>
          </div>
          <div class="details-item">
            <div class="details-subtitle">Budget:</div>
            <div class="details-subitem">
              {{ movieDetails.budget || "unknown" }}
            </div>
          </div>
          <div class="details-item mb-3">
            <div class="details-subtitle">Revenue:</div>
            <div class="details-subitem">
              {{ movieDetails.revenue || "unknown" }}
            </div>
          </div>
        </div>
        <div class="description">
          <h3>Description:</h3>
          <p>{{ movieDetails.overview }}</p>
        </div>
      </div>
    </div>
    <div class="movie-details__actor-cast"></div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  name: "MoviesPageView",
  data: () => ({
    NO_IMG_URL:
        "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg",
  }),

  mounted() {
    this.getMovieDetails(this.$route.params.id);
  },
  methods: {
    getGenres() {
      const unFilteredGenres = this.movieDetails.genres.map((el) => el.name);
      return unFilteredGenres.length > 3
          ? unFilteredGenres.slice(0, 3).join(", ") + "..."
          : unFilteredGenres.join(", ");
    },
    ...mapActions(["getMovieDetails"]),
  },
  computed: {
    ...mapState(["movieDetails"]),
  },
};
</script>
