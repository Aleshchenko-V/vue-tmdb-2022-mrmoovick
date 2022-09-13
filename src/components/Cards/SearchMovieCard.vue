<template>
  <router-link :to="`/movie/${movieId}`">
    <div
        :class="
        searchCard
          ? 'big-search-movie-card'
          : 'small-search-movie-card'
      "
        style="border: 1px solid #fff; margin-bottom: 10px; border-radius: 5px"
        class="d-flex"
        @click="$emit('get-movie-id', movieId)"
    >
      <div
          :class="
          searchCard
            ? 'big-search-movie-card-img'
            : 'small-search-movie-img-img'
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
import constants from "@/constants";

export default {
  name: "SearchMovieCard",
  data: () => ({
    NO_IMG_URL: constants.NO_IMG_URL,
  }),
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

.big-search-movie-card {
  height: 150px;
  width: 600px;
}

.big-search-movie-card-img {
  height: 150px;
  width: 200px;
}

.small-search-movie-card {
  height: 75px;
  width: 460px;
}

.small-search-movie-card-img {
  height: 75px;
  width: 100px;
}
</style>
