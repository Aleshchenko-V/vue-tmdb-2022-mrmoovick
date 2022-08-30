<template>
  <div>
    <b-modal
      id="modal-scrollable"
      size="lg"
      scrollable
      title="Scrollable Content"
    >
      <div class="moovie-details d-flex">
        <div class="d-flex justify-content-center">
          <img
            width="300"
            :src="
              getMovieDetails.poster_path === null
                ? 'https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg'
                : 'https://image.tmdb.org/t/p/original' +
                  getMovieDetails.poster_path
            "
            alt="poster"
          />
        </div>
        <div>
          <h2>{{ getMovieDetails.title }}</h2>
          <p>Genre {{ getMovieDetails.genres }}</p>
          <p>{{}}</p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["getMovieDetails"]),
  },
};
</script>

<style></style>
