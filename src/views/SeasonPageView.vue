<template>
  <div class="container mt-3" style="padding: 0">
    <div class="d-flex actor-details">
      <div class="actor-details-left-side d-flex flex-column">
        <div class="actor-details-left-side__img">
          <img
              width="550px" height="800px"
              :src="seasonDetails.poster_path ? 'https://image.tmdb.org/t/p/original' + seasonDetails.poster_path : 'https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg'"/>
        </div>
      </div>
      <div style="margin: 0 auto; font-size: 28px; padding: 20px; color: #fff">
        <h3>Description:</h3>
        <p>{{ seasonDetails.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "SeasonPageView",
  computed: {
    ...mapState(['seasonDetails']),
  },
}
</script>

<style scoped>

</style>
