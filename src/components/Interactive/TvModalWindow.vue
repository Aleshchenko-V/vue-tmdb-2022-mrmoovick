<template>
  <div>
    <b-modal
        id="modal-scrollable"
        size="lg"
        scrollable
        title="Tv Details"
        :hide-footer="true"
        body-class="modal-window"
        @hidden="clearMovieDetails"
    >
      <div class="movie-details d-flex flex-column">
        <div class="d-flex flex-row">
          <div class="d-flex justify-content-center">
            <img
                width="300"
                class="movie-details__poster"
                :src="
                !tvDetails.backdrop_path
                  ?  NO_IMG_URL
                  : 'https://image.tmdb.org/t/p/w500' +
                    tvDetails.backdrop_path
              "
                alt="poster"
            />
          </div>
          <div class="wrapper-details">
            <div class="details-info">
              <h2>{{ tvDetails.name }}</h2>
              <div class="details-item">
                <div class="details-subtitle">Original Name:</div>
                <div class="details-subitem">
                  {{ tvDetails.original_name }}
                </div>
              </div>
              <div class="details-item">
                <div class="details-subtitle">Status:</div>
                <div class="details-subitem">
                  {{ tvDetails.status }}
                </div>
              </div>
              <div class="details-item">
                <div class="details-subtitle">Type:</div>
                <div class="details-subitem">
                  {{ tvDetails.type }}
                </div>
              </div>
              <div class="details-item">
                <div class="details-subtitle">Genres:</div>
                <div class="details-subitem">{{ genres }}</div>
              </div>
              <div class="details-item">
                <div class="details-subtitle">Release Date:</div>
                <div class="details-subitem">{{ tvDetails.first_air_date }}</div>
              </div>
              <div class="details-item">
                <div class="details-subtitle">Last Release Date:</div>
                <div class="details-subitem">
                  {{ tvDetails.last_air_date }}
                </div>
              </div>
              <div class="details-item">
                <div class="details-subtitle">Number of episodes:</div>
                <div class="details-subitem">
                  {{ tvDetails.number_of_episodes }}
                </div>
              </div>
              <div class="details-item">
                <div class="details-subtitle">Number of seasons:</div>
                <div class="details-subitem">
                  {{ tvDetails.number_of_seasons }}
                </div>
              </div>
              <div class="details-item">
                <div class="details-subtitle">Rating:</div>
                <div class="details-subitem">
                  {{ tvDetails.vote_average }} / {{ tvDetails.vote_count }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tvDescription">
          <h3>Description:</h3>
          <p>{{ tvDetails.overview }}</p>
        </div>
        <div class="movie-details__actor-cast">
          <h3>Seasons:</h3>
          <seasons-list/>
        </div>
        <div class="movie-details__actor-cast">
          <h3>Actors:</h3>
          <actor-list/>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import ActorList from "@/components/Lists/ActorsList";
import SeasonsList from "@/components/Lists/SeasonsList";
import constants from "@/constants";

export default {
  name: 'TvModalWindow',
  components: {SeasonsList, ActorList},
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
    ...mapMutations(["clearMovieDetails"]),
  },
  computed: {
    ...mapState(["tvDetails"]),
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
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin: 0 10px;
}

.details-subitem {
  display: flex;
  justify-content: center;
  font-size: 12px;
}

.wrapper-details {
  display: flex;
  flex-direction: column;
}

.details-subtitle {
  font-size: 14px;
}

.tvDescription {
  margin-top: 40px;
}

.movie-details__actor-cast {
  margin-top: 10px;
}
</style>
