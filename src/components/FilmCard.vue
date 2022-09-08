<template>
  <b-card
      v-b-modal.modal-scrollable
      v-if="KnownFor === false"
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
      @click="$emit('get-card-id', cardId), getActors(cardId)"
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
      style="height: 300px; width: 225px; overflow: hidden; text-overflow: ellipsis;"
      :aria-hidden="show ? 'true' : null"
      :title="title"
      :sub-title="
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
      class="text-muted form-control card-img-top b-card"
      @click="$emit('get-card-id', cardId), getActors(cardId)"
  >
  </b-card>
</template>

<script>
import {mapActions} from "vuex";

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
    originalLanguage: {
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
    KnownFor: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  methods: {
    ...mapActions(["getActors"]),
  },
};
</script>

<style scoped>
.text-muted {
  color: #fff !important;
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
  -webkit-transform: scale(1.05);
  -ms-transform: scale(1.05);
  transform: scale(1.05);
  z-index: 1;
}
</style>
