<template>
  <div>
    <movie-search />
    <films-list/>
  </div>
</template>

<script>

import FilmsList from "@/components/FilmsList";
import MovieSearch from "@/components/MoviesSearch";
export default {
  name: 'MoviesPageView',
  components: {
    MovieSearch,
    FilmsList,
  }
}
</script>
