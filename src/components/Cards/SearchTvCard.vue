<template>
  <router-link :to="`/tv/${tvId}`">
    <div
      :style="
        searchCard
          ? 'height: 150px; width: 650px'
          : 'height: 75px; width: 445px;'
      "
      style="
        border: 1px solid #fff;
        margin-bottom: 10px;
        border-radius: 5px;
        position: relative;
      "
      class="d-flex"
      @click="$emit('get-tv-id', tvId)"
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

      <div :class="!searchCard ? 'd-flex align-items-center' : 'd-flex'">
        <div class="d-flex flex-start flex-column m-2 text-left">
          <div class="d-flex">
            <h4 :class="!searchCard ? 'decrease-font-size' : ''">
              {{ name }}
            </h4>
            <span
              class="release-date align-self-end"
              style="
                color: orange;
                position: absolute;
                right: 10px;
                bottom: 10px;
              "
              >{{ releaseDate ? releaseDate : "" }}</span
            >
          </div>
          <p v-if="searchCard">{{ originalName }}</p>
          <p
            style="position: absolute; right: 10px; top: 5px"
            :style="rating > 6 ? 'color: green' : 'color: red'"
          >
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
    name: {
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
    originalName: {
      type: String,
      required: true,
    },
    movieImage: {
      type: String,
      required: true,
    },
    tvId: {
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
.decrease-font-size {
  font-size: 18px;
  width: 250px;
}
</style>
