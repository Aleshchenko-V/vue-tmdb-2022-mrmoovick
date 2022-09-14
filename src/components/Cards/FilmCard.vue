<template>
  <b-card
    v-b-modal.modal-scrollable
    v-if="knownFor === false"
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
  <b-card
    v-else
    v-b-modal.modal-scrollable
    style="
      height: 300px;
      width: 225px;
      overflow: hidden;
      text-overflow: ellipsis;
    "
    :aria-hidden="show ? 'true' : null"
    :title="title"
    :sub-title="releaseDate !== '' ? releaseDate.slice(0, 4) : 'unknown'"
    :img-src="
      backdropPath === ''
        ? NO_IMG_URL
        : 'https://image.tmdb.org/t/p/original' + backdropPath
    "
    footer-tag="footer"
    img-alt="Image"
    img-top
    tag="article"
    class="text-muted form-control card-img-top b-card"
    @click="$emit('get-card-id', cardId), getMovieCard(cardId)"
  >
  </b-card>
</template>

<script>
import { mapActions } from "vuex";
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
    knownFor: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    getMovieCard(cardId) {
      this.$emit("get-movie-card-id", cardId);
      this.getMovieActors(cardId);
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
  transform: scale(1.05);
  z-index: 1;
  box-shadow: 7px 7px 6px rgb(255 255 255 / 60%);
}
.card-footer {
  background: none;
}
</style>
