<template>
  <div class="overflow-auto">
    <b-pagination @page-click="paginationCurrentPage" v-model="currentMoviesPage" :total-rows="totalRows"
                  pills>

    </b-pagination>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Pagination",
  props: {
    totalRows: {
      type: Number,
      required: true,
    },
  },
  methods: {
    paginationCurrentPage(event, page) {
      this.$emit("paginationCurrentPage", {
        currentPage: page,
      })
    },
  },
  computed: {
    ...mapGetters(['currentMoviesPage'])
  }
}
</script>

<style scoped>

</style>
