<template>
  <div>
    <b-modal
      id="modal-scrollable"
      size="lg"
      scrollable
      title="Деталі фільму"
      :hide-footer="true"
      body-class="modal-window"
    >
      <div class="movie-details d-flex">
        <div class="d-flex justify-content-center">
          <img
            width="300"
            class="movie-details__poster"
            :src="
              movieDetails.poster_path === null
                ? 'https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg'
                : 'https://image.tmdb.org/t/p/original' +
                  movieDetails.poster_path
            "
            alt="poster"
          />
        </div>
        <div class="wrapper-details">
          <div class="details-info">
            <h2>{{ movieDetails.title }}</h2>
            <div class="details-item">
              <div class="details-subtitle">Жанри:</div>
              <div class="details-subitem">{{ genres }}</div>
            </div>
            <div class="details-item">
              <div class="details-subtitle">Дата виходу:</div>
              <div class="details-subitem">{{ movieDetails.release_date }}</div>
            </div>
            <div class="details-item">
              <div class="details-subtitle">Рейтинг:</div>
              <div class="details-subitem">
                {{ movieDetails.vote_average }} / {{ movieDetails.vote_count }}
              </div>
            </div>
            <div class="details-item">
              <div class="details-subtitle">Бюджет:</div>
              <div class="details-subitem">
                {{ movieDetails.budget || "Невідомо" }}
              </div>
            </div>
            <div class="details-item mb-3">
              <div class="details-subtitle">Прибуток:</div>
              <div class="details-subitem">
                {{ movieDetails.revenue || "Невідомо" }}
              </div>
            </div>
          </div>
          <div class="description">
            <h3>Опис:</h3>
            <p>{{ movieDetails.overview }}</p>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["movieDetails"]),
  },
  props: {
    genres: {
      type: String,
      require: true,
    },
  },
  methods: {
    getGenres(movie) {
      return movie.map((el) => el.name).join(", ");
    },
  },
};
</script>

<style>
.movie-details__poster {
  border-radius: 10px;
}
.modal-window {
  background: #343a40;
  color: #fff;
}
.details-info {
  padding-left: 15px;
  width: 350px;
}
.details-item {
  margin: auto;
  display: flex;
  justify-content: space-between;
}
.details-subitem {
  display: flex;
  justify-content: center;
}
.wrapper-details {
  display: flex;
  flex-direction: column;
}
.details-subtitle {
  font-size: 14px;
}
.description {
  padding-left: 15px;
}
</style>
