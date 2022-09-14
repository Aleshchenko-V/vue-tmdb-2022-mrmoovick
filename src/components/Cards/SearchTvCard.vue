<template>
  <router-link :to="`/tv/${tvId}`">
    <div
        :class="searchCard ? 'big-search-tv-card' : 'small-search-tv-card'"
        style="
        border: 1px solid #fff;
        margin-bottom: 10px;
        border-radius: 5px;
        position: relative;
        font-family: 'Oswald';
      "
        class="tv-card d-flex"
        @click="$emit('get-tv-id', tvId)"
    >
      <div
          :class="
          searchCard ? 'big-search-tv-card-img' : 'small-search-tv-img-img'
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

      <div :style="searchCard ? 'width: 200px' : 'width: 100px'">
        <div class="d-flex flex-start flex-column m-2 text-left">
          <div class="d-flex">
            <h4
                :class="!searchCard ? 'decrease-font-size' : ''"
                :style="!searchCard ? '' : 'width: 400px'"
            >
              {{ name }}
            </h4>
            <span
                class="release-date align-self-end"
                style="position: absolute; right: 10px; top: 10px"
            >{{ releaseDate ? releaseDate : "" }}</span
            >
          </div>
          <p v-if="searchCard">{{ originalName }}</p>
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
  name: "SearchTvCard",
  data: () => ({
    NO_IMG_URL: constants.NO_IMG_URL,
  }),
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

.big-search-tv-card {
  height: 150px;
  width: 600px;
}

.big-search-tv-card-img {
  height: 150px;
  width: 200px;
}

.small-search-tv-card {
  height: 75px;
  width: 460px;
}

.small-search-tv-card-img {
  height: 75px;
  width: 100px;
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
}

.decrease-font-size {
  font-size: 18px;
  width: 250px;
}

.b-rating {
  background-color: inherit;
  border: none;
}

.tv-card {
  box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  transition: 0.5s all ease;
}

.tv-card:hover {
  scale: 1.02;
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
}
</style>
