<template>
  <div>
    <films-list />
  </div>
</template>

<script>
import FilmsList from "@/components/FilmsList";
export default {
  name: "MoviesPageView",
  components: {
    FilmsList,
  },
};
</script>
