<template>
  <div>
    <div class="d-flex flex-row container">
      <div class="d-flex flex-row">
        <b-list-group horizontal class="flex-sm-wrap">
          <b-list-group-item
              class="w-auto m-2 p-0 border-0 d-flex justify-content-center align-items-start rounded-circle card slide"
              v-for="{
              id,
              name,
              air_date,
              overview,
              poster_path,
              season_number,
            } in tvDetails.seasons"
              :key="id"
              @click="getSeason(season_number), clearFilters()"
          >
            <season-card
                :name="name"
                :airDate="air_date || ''"
                :overview="overview"
                :posterPath="poster_path || ''"
                :seasonId="id"
            >
            </season-card>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
import SeasonCard from "@/components/Cards/SeasonCard";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "SeasonsList",
  components: {SeasonCard},
  methods: {
    getSeason(seasonNumber) {
      this.getSeasonDetails({
        tvId: this.tvDetails.id,
        seasonNumber
      })
      this.$router.replace(`/tv/${this.tvDetails.id}/season/${seasonNumber}`)
    },
    ...mapActions(['getSeasonDetails']),
    ...mapMutations(['clearFilters']),
  },
  computed: {
    ...mapState(['tvDetails']),
  },
}
</script>

<style scoped>

</style>
