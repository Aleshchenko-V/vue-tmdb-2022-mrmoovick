<template>
  <div>
    <b-modal
        id="modal-scrollable"
        size="lg"
        scrollable
        title="Movie Details"
        :hide-footer="true"
        body-class="modal-window"
        @hidden="clearMovieDetails"
        @hide="closeModal"
    >
      <div class="movie-details d-flex flex-column">
        <div class="d-flex flex-row">
          <div class="d-flex justify-content-center">
            <img
                width="300"
                class="movie-details__poster"
                :src="
                !movieDetails.poster_path
                  ?  NO_IMG_URL
                  : 'https://image.tmdb.org/t/p/w500' +
                    movieDetails.poster_path
              "
                alt="poster"
            />
          </div>
          <div class="wrapper-details">
            <div class="details-info">
              <h2>{{ movieDetails.title }}</h2>
              <div class="details-item">
                <div class="details-subtitle">Genres:</div>
                <div class="details-subitem">{{ genres }}</div>
              </div>
              <div class="details-item">
                <div class="details-subtitle">Release Date:</div>
                <div class="details-subitem">{{ movieDetails.release_date }}</div>
              </div>
              <div class="details-item">
                <div class="details-subtitle">Rating:</div>
                <div class="details-subitem">
                  {{ movieDetails.vote_average }} / {{ movieDetails.vote_count }}
                </div>
              </div>
              <div class="details-item">
                <div class="details-subtitle">Budget:</div>
                <div class="details-subitem">
                  {{ movieDetails.budget || "unknown" }}
                </div>
              </div>
              <div class="details-item mb-3">
                <div class="details-subtitle">Revenue:</div>
                <div class="details-subitem">
                  {{ movieDetails.revenue || "unknown" }}
                </div>
              </div>
            </div>
            <div class="description">
              <h3>Description:</h3>
              <p>{{ movieDetails.overview }}</p>
            </div>
          </div>
        </div>
        <div class="movie-details__actor-cast">
          <h3>Actors:</h3>
          <actor-list @close-modal="closeModal" :big="false"/>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import ActorList from "@/components/Lists/ActorsList";
import constants from "@/constants";

export default {
  name: 'MovieModalWindow',
  components: {ActorList},
  data: () => ({
    NO_IMG_URL: constants.NO_IMG_URL,
  }),
  props: {
    genres: {
      type: String,
      require: true,
    },
  },
  methods: {
    getGenres(movie) {
      return movie.map((el) => el.name).join(", ");
    },
    closeModal() {
      this.$bvModal.hide('modal-scrollable');
    },
    ...mapMutations(["clearMovieDetails"]),
  },
  computed: {
    ...mapState(["movieDetails"]),
  },
};
</script>

<style>
.movie-details__poster {
  border-radius: 10px;
}

.modal-window {
  background: #343a40;
  color: #fff;
}

.details-info {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 15px;
  margin-top: 15px;
  width: 100%;
}

.details-item {
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.details-subitem {
  display: flex;
  justify-content: center;
}

.wrapper-details {
  display: flex;
  flex-direction: column;
}

.details-subtitle {
  font-size: 14px;
}

.description {
  padding-left: 15px;
  margin-top: 25px;
}

.movie-details__actor-cast {
  margin-top: 10px;
}
</style>
