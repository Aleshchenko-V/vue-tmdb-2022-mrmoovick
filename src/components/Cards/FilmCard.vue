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
      @click="getMovieCard(cardId)"
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
import {mapActions} from "vuex";
import constants from "@/constants";

export default {
  name: "FilmCard",
  data: () => ({
    show: false,
    NO_IMG_URL: constants.NO_IMG_URL,
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
    getMovieCard(cardId) {
      this.$emit('get-movie-card-id', cardId);
      this.getMovieActors(cardId)
    },
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
  width: 360px;
  height: 550px;
  border: 0;
  background-color: #1e1b26;
  color: #fff;
  transition: all 0.5s ease;
}

.b-card:hover {
  transform: scale(1.05);
  z-index: 1;
}
</style>
