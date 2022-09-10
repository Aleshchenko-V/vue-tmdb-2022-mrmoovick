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
}

.form-control {
  color: orange;
  background: #f5fbef;
}

.form-control:focus {
  background-color: #1e1b26;
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

.b-card__text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
}

.b-card {
  width: 340px;
  height: 500px;
  border: 0;
  border-radius: 15px !important;
  /*background-color: #a799b7;*/
  background-color: rgb(34 34 34);
  color: #fff;
  transition: all 0.5s ease;
}
.b-card:focus {
  background-color: rgb(34 34 34);
}
.b-card:hover {
  -webkit-transform: scale(1.02);
  -ms-transform: scale(1.02);
  transform: scale(1.02);
  z-index: 1;
  box-shadow: 0px 0px 0px 2px rgb(255 255 255), 0px 2px 4px rgb(255 255 255),
    0px 4px 8px rgb(255 255 255), 0px 8px 16px rgb(255 255 255),
    6px -6px 18px rgb(255 0 0 / 60%);
  /*box-shadow: 6px -6px 18px rgb(255 0 0 / 60%);*/
}
</style>
