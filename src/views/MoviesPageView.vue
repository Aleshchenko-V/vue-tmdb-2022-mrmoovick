<template>
  <div class="home">
    <films-list/>
  </div>
</template>

<script>

import FilmsList from "@/components/FilmsList";
export default {
  name: 'HomeView',
  components: {
    FilmsList,
  }
}
</script>
