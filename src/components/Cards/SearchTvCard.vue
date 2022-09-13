<template>
  <router-link :to="`/tv/${tvId}`">
    <div
        :class="
        searchCard
          ? 'big-search-tv-card'
          : 'small-search-tv-card'
      "
        style="border: 1px solid #fff; margin-bottom: 10px; border-radius: 5px"
        class="d-flex"
        @click="$emit('get-tv-id', tvId)"
    >
      <div
          :class="
          searchCard
            ? 'big-search-tv-card-img'
            : 'small-search-tv-img-img'
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
              {{ name }}
            </h4>
            <span class="release-date align-self-end">{{
                releaseDate ? releaseDate : ""
              }}</span>
          </div>
          <p v-if="searchCard">{{ originalName }}</p>
          <p>
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
</style>
