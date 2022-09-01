<template>
  <div class="home">
    <movie-search />
    <films-list/>
  </div>
</template>

<script>

import FilmsList from "@/components/FilmsList";
import MovieSearch from "@/components/MoviesSearch";
export default {
  name: 'HomeView',
  components: {
    MovieSearch,
    FilmsList,
  }
}
</script>
