<template>
  <b-card
    :aria-hidden="show ? 'true' : null"
    :title="name"
    :sub-title="airDate"
    :img-src="
      posterPath === ''
        ? NO_IMG_URL
        : 'https://image.tmdb.org/t/p/original' + posterPath
    "
    footer-tag="footer"
    img-alt="Image"
    img-top
    tag="article"
    class="text-muted card-text form-control card-img-top b-card"
  >
  </b-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SeasonCard",
  data: () => ({
    show: false,
    NO_IMG_URL:
      "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg",
  }),
  props: {
    name: {
      type: String,
      required: true,
    },
    airDate: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    posterPath: {
      type: String,
      required: true,
    },
    seasonId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions(["getMovieActors"]),
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}

.text-muted {
  color: #fff !important;
}

.card-body {
  padding: 0.5rem;
}

.card-subtitle {
  font-size: 13px;
  color: #000 !important;
}

.card-title {
  font-size: 18px;
  color: #000;
}

.card-text {
  font-size: 14px;
  color: #fff;
}

.form-control:focus {
  background-color: #1e1b26;
  box-shadow: none;
}

.card-img-top {
  min-width: 138px;
  width: 138px;
  height: 145px;
  display: block;
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
  width: 135px;
  height: 250px;
  border: 0;
  background-color: beige;
  color: #fff;
  transition: all 0.5s ease;
  overflow: hidden;
  box-sizing: content-box;

  &:hover {
    -webkit-transform: scale(1.03);
    -ms-transform: scale(1.03);
    transform: scale(1.03);
    z-index: 1;
    box-shadow: -7px 7px 6px rgb(255 255 255 / 60%);
  }
}
</style>
