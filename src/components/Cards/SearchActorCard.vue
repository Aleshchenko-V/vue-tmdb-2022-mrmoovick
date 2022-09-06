<template>
  <b-card class="d-flex justify-content-center align-items-center" bg-variant="dark" text-variant="white" :title="name"
          :img-src="profileImage === ''
          ? NO_IMG_URL
          : 'https://image.tmdb.org/t/p/original' + profileImage" img-left>
  </b-card>
</template>

<script>
export default {
  name: "SearchActorCard",
  data() {
    this.NO_IMG_URL = "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg";
    return {}
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  height: 60px;
  margin-top: 5px;

  h4 {
    font-size: 18px;
    margin: 0;
  }

  img {
    width: 55px;
    height: 55px;
    margin-left: 20px;
  }
}
</style>
