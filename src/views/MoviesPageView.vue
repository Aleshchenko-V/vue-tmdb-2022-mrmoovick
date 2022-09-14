<template>
  <div>
    <films-list />
  </div>
</template>

<script>
import FilmsList from "@/components/Lists/FilmsList";
export default {
  name: "MoviesPageView",
  components: {
    FilmsList,
  },
};
</script>
