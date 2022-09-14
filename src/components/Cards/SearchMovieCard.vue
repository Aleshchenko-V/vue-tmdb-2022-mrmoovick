<template>
  <router-link :to="`/movie/${movieId}`">
    <div
      :class="searchCard ? 'big-search-movie-card' : 'small-search-movie-card'"
      style="
        border: 1px solid #fff;
        margin-bottom: 10px;
        border-radius: 5px;
        font-family: 'Oswald';
      "
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

      <div :class="!searchCard ? 'd-flex align-items-center' : 'd-flex'">
        <div class="d-flex flex-start flex-column m-2 text-left">
          <div class="d-flex">
            <h4
              :class="!searchCard ? 'decrease-font-size' : ''"
              :style="!searchCard ? '' : 'width: 400px'"
            >
              {{ title }}
            </h4>
            <span
              class="release-date align-self-end"
              style="position: absolute; right: 10px; top: 10px"
              >{{ releaseDate ? releaseDate : "" }}</span
            >
          </div>
          <p v-if="searchCard">
            {{ originalTitle }}
          </p>
          <b-form-rating
            v-if="searchCard"
            style="position: absolute; right: 125px; bottom: 5px; width: 100px"
            readonly
            :value="rating"
            stars="10"
            size="sm"
            variant="warning"
          ></b-form-rating>
          <p v-else style="position: absolute; right: 10px; bottom: -5px">
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

.card {
  height: 60px;
  font-size: 12px;
  margin-top: 5px;
  object-fit: contain;

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
}
.decrease-font-size {
  font-size: 18px;
  width: 250px;
}
.b-rating {
  background-color: inherit;
  border: none;
}
.movie-card:hover {
  scale: 1.05;
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
}
.movie-card {
  box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  transition: 0.5s all ease;
}
</style>
