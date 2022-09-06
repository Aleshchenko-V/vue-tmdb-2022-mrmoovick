<template>
  <router-link :to="`/tv/${tvId}`">
    <b-card class="d-flex justify-content-center align-items-center" bg-variant="dark" text-variant="white"
            :title="name"
            :img-src="movieImage === ''
            ? NO_IMG_URL
            : 'https://image.tmdb.org/t/p/original' + movieImage" img-left
            @click="$emit('get-tv-id', tvId)">
      <b-card-text>
        <div class="d-flex flex-column mt-1">
          <p class="mb-0">{{ rating }} {{ originalName }}, {{ releaseDate ? releaseDate : '' }}</p>
        </div>
      </b-card-text>
    </b-card>
  </router-link>
</template>

<script>
export default {
  name: "SearchTvCard",
  data() {
    this.NO_IMG_URL = "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg";
    return {}
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
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
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
    height: 55px;
    margin-left: 20px;
  }
}
</style>
