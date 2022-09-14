<template>
  <b-card
    v-b-modal.modal-scrollable
    :aria-hidden="show ? 'true' : null"
    :title="title"
    :sub-title="
      originalTitle +
      ', ' +
      (releaseDate !== '' ? releaseDate.slice(0, 4) : 'unknown')
    "
    :img-src="
      backdropPath === ''
        ? NO_IMG_URL
        : 'https://image.tmdb.org/t/p/original' + backdropPath
    "
    footer-tag="footer"
    img-alt="Image"
    img-top
    tag="article"
    class="text-muted card-text form-control card-img-top b-card"
    @click="$emit('get-movie-card-id', cardId), getMovieActors(cardId)"
  >
    <b-card-text class="b-card__text">
      {{ overview }}
    </b-card-text>
    <template #footer>
      <div class="b-card__footer">
        <b-form-rating
          readonly
          :value="overallRating"
          stars="10"
        ></b-form-rating>
      </div>
    </template>
  </b-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FilmCard",
  data: () => ({
    show: false,
    NO_IMG_URL:
      "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg",
  }),
  props: {
    title: {
      type: String,
      required: true,
    },
    backdropPath: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    originalTitle: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    overallRating: {
      type: Number,
      required: true,
    },
    cardId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions(["getMovieActors"]),
  },
};
</script>

<style scoped>
.text-muted {
  color: #fff !important;
}

.card-text {
  font-size: 14px;
  color: #fff;
  text-align: justify;
}

.form-control {
  color: orange;
  background: #f5fbef;
}

.form-control:focus {
  box-shadow: none;
}

.card-img-top {
  border-radius: 10px;
}

.b-card__footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.card-body {
  overflow: hidden;
  text-align: center;
  font-family: "Oswald";
}

.b-card {
  width: 360px;
  height: 550px;
  border: 0;
  border-radius: 15px !important;
  color: #fff;
  transition: all 0.5s ease;
}

.b-card:hover {
  -webkit-transform: scale(1.02);
  -ms-transform: scale(1.02);
  transform: scale(1.02);
  z-index: 1;
  box-shadow: 7px 7px 6px rgb(255 255 255 / 60%);
}
.card-footer {
  background: none;
}
</style>
