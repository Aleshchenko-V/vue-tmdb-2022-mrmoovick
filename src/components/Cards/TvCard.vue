<template>
  <b-card
    v-b-modal.modal-scrollable
    :aria-hidden="show ? 'true' : null"
    :title="name"
    :sub-title="
      originalName + ', ' + (firstAirDate !== '' ? firstAirDate : 'unknown')
    "
    :img-src="
      backdropPath === ''
        ? NO_IMG_URL
        : 'https://image.tmdb.org/t/p/original' + backdropPath
    "
    footer-tag="footer"
    img-alt="Image"
    img-top
    tag="article"
    class="text-muted card-text form-control card-img-top b-card"
    @click="$emit('get-tv-card-id', tvId), getTvActors(tvId)"
  >
    <b-card-text class="b-card__text">
      {{ overview }}
    </b-card-text>
    <template #footer>
      <div class="b-card__footer">
        <b-form-rating
          readonly
          :value="overallRating"
          stars="10"
        ></b-form-rating>
      </div>
    </template>
  </b-card>
</template>

<script>
import { mapActions } from "vuex";
import constants from "@/constants";

export default {
  name: "TvCard",
  data: () => ({
    show: false,
    NO_IMG_URL: constants.NO_IMG_URL,
  }),
  props: {
    name: {
      type: String,
      required: true,
    },
    backdropPath: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    firstAirDate: {
      type: String,
      required: true,
    },
    overallRating: {
      type: Number,
      required: true,
    },
    tvId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions(["getTvActors"]),
  },
};
</script>

<style scoped>
.text-muted {
  color: #fff !important;
}

.card-text {
  font-size: 14px;
  color: #fff;
}

.form-control {
  color: orange;
}

.form-control:focus {
  background-color: #1e1b26;
  box-shadow: none;
}

.card-img-top {
  border-radius: 10px;
}

.b-card__footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.b-card {
  width: 340px;
  height: 500px;
  border: 0;
  border-radius: 15px !important;
  background-color: #6bbd99;
  color: #fff;
  transition: all 0.5s ease;
}
.card-body {
  overflow: hidden;
  margin-bottom: 10px;
}
.b-card:focus {
  background-color: #6bbd99;
}
.b-card:hover {
  transform: scale(1.05);
  z-index: 1;
  box-shadow: 7px 7px 6px rgb(255 255 255 / 60%);
}
</style>
