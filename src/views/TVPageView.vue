<template>
  <div class="movie-details d-flex flex-column container-lg mt-3 text-light">
    <div class="d-flex flex-row">
      <div class="d-flex justify-content-center">
        <img
            width="300"
            height="450"
            class="movie-details__poster"
            :src="
            !tvDetails.poster_path
              ? NO_IMG_URL
              : 'https://image.tmdb.org/t/p/w500' + tvDetails.poster_path
          "
            alt="poster"
        />
      </div>
      <div class="wrapper-details">
        <div class="details-info">
          <h1>{{ tvDetails.name }}</h1>

          <div class="details-item">
            <div class="details-subtitle">
              {{ tvDetails.original_name }}
            </div>
          </div>
          <div class="details-item">
            <div class="details-subtitle">Genres:</div>
            <div class="details-subitem">{{ tvDetails.genres ? getGenresNames(tvDetails.genres) : '' }}</div>
          </div>
          <div class="details-item">
            <div class="details-subtitle">Number of episodes:</div>
            <div class="details-subitem">
              {{ tvDetails.number_of_episodes }}
            </div>
          </div>
          <div class="details-item">
            <div class="details-subtitle">Number of seasons:</div>
            <div class="details-subitem">
              {{ tvDetails.number_of_seasons }}
            </div>
          </div>
          <div class="details-item">
            <div class="details-subtitle">Rating:</div>
            <div class="details-subitem">
              {{ tvDetails.vote_average }} / {{ tvDetails.vote_count }}
            </div>
          </div>
          <div class="details-item">
            <div class="details-subtitle">Status:</div>
            <div class="details-subitem">
              {{ tvDetails.status || "Невідомо" }}
            </div>
          </div>
          <div class="details-item mb-3">
            <div class="details-subtitle">Last air date:</div>
            <div class="details-subitem">
              {{ tvDetails.last_air_date || "Невідомо" }}
            </div>
          </div>
        </div>
        <div class="description">
          <h3>Overview:</h3>
          <p>{{ tvDetails.overview }}</p>
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

  mounted() {
    this.getTvDetails(this.$route.params.id);
  },
  methods: {
    getGenresNames(arrayOfGenres) {
      return arrayOfGenres.map((el) => el.name).join(", ");
    },
    ...mapActions(["getTvDetails"]),
  },
  computed: {
    ...mapState(["tvDetails"]),
  },
};
</script>
