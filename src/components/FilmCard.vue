<template>
      <b-card
          :title=title
          :sub-title="originalLanguage + ', ' + originalTitle"
          :img-src="'https://image.tmdb.org/t/p/original' + backdropPath"
          footer-tag="footer"
          img-alt="Image"
          img-top
          tag="article"
          style="width: 420px; height: 600px; border: 0;"
          class="mb-2"
      >
        <b-card-text style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 7; -webkit-box-orient: vertical;">
          {{ overview }}
        </b-card-text>
        <template #footer>
          <div style="display: flex; flex-direction: row; justify-content:space-between;">
            <p>{{ overallRating }}</p>
            <p>{{ releaseDate }}</p>
          </div>
        </template>
      </b-card>
</template>

<script>
export default {
  name: "FilmCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    backdropPath: {
      type: String,
      required: true
    },
    overview: {
      type: String,
      required: true,
    },
    originalLanguage: {
      type: String,
      required: true,
    },
    originalTitle: {
      type: String,
      required: true
    },
    releaseDate: {
      type: String,
      required: true
    },
    overallRating: {
      type: Number,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>
