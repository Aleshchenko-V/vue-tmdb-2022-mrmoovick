<template>
  <router-link :to="`/movie/${movieId}`">
    <div
      :style="
        searchCard
          ? 'height: 150px; width: 600px'
          : 'height: 75px; width: 460px'
      "
      style="border: 1px solid #fff; margin-bottom: 10px; border-radius: 5px"
      class="d-flex"
      @click="$emit('get-movie-id', movieId)"
    >
      <div
        :style="
          searchCard
            ? 'height: 150px; width: 200px'
            : 'height: 75px; width: 100px'
        "
      >
        <img
          style="
            height: 100%;
            width: 100%;
            padding: 0;
            border-radius: 5px;
            display: inline-block;
          "
          :src="
            movieImage === ''
              ? NO_IMG_URL
              : 'https://image.tmdb.org/t/p/original' + movieImage
          "
          alt="Poster"
        />
      </div>

      <div>
        <div class="d-flex flex-start flex-column m-2 text-left">
          <div class="d-flex">
            <h4>
              {{ title }}
            </h4>
            <span class="release-date align-self-end" style="color: orange">{{
              releaseDate ? releaseDate : ""
            }}</span>
          </div>
          <p v-if="searchCard">{{ originalTitle }}</p>
          <p :style="rating > 6 ? 'color: green' : 'color: red'">
            {{ rating }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "SearchMovieCard",
  data() {
    this.NO_IMG_URL =
      "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg";
    return {};
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    originalTitle: {
      type: String,
      required: true,
    },
    movieImage: {
      type: String,
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    searchCard: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: #fff;
}

.card {
  height: 60px;
  font-size: 12px;
  margin-top: 5px;

  h4 {
    font-size: 14px;
    margin: 0;
  }

  img {
    width: 55px;
    height: 100%;
    margin-left: 20px;
    border-radius: 10px;
  }
  .big-img img {
    width: 400px;
  }
  .release-date {
    color: orange !important;
  }
}
</style>
