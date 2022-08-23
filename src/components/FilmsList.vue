<template>
  <div class="list-group list-group-horizontal d-flex flex-wrap justify-content-center align-items-center">
    <div class="card list-group-item m-1" style="width: 450px;" v-for="film in data.items" :key="film.id">
      <img :src="'https://image.tmdb.org/t/p/original' + film.backdrop_path" class="card-img-top" alt="...">
      <div class="card-body" style="height: 400px;">
        <h5 class="card-title"> {{film.title}} </h5>
        <p style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 10; -webkit-box-orient: vertical;">{{ film.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FilmsList",
  data() {
    return {
      data: [],
    }
  },
  methods: {
    async fetchFilms() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/list/1?api_key=${process.env.VUE_APP_API_KEY}&language=ru`);
        this.data = response.data;
        console.log(this.data)
      }catch (e) {
        alert(e);
      }
    }
  },
  created() {
    this.fetchFilms();
  }

}
</script>

<style scoped>

</style>
