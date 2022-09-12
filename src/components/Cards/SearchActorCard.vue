<template>
  <router-link :to="`/actor/${actorId}`">
    <div
      :style="
        searchCard
          ? 'height: 150px; width: 650px'
          : 'height: 75px; width: 445px'
      "
      style="border: 1px solid #fff; margin-bottom: 10px; border-radius: 5px"
      class="d-flex"
      @click="$emit('get-actor-id', actorId)"
    >
      <div
        :style="
          searchCard
            ? 'height: 150px; width: 200px'
            : 'height: 75px; width: 100px'
        "
      >
        <img
          style="
            height: 100%;
            width: 100px;
            padding: 0;
            border-radius: 5px;
            display: inline-block;
          "
          :src="
            profileImage === ''
              ? NO_IMG_URL
              : 'https://image.tmdb.org/t/p/original' + profileImage
          "
          alt="Poster"
        />
      </div>

      <div :class="!searchCard ? 'd-flex' : 'd-flex align-items  w-100'">
        <h4 class="m-2" :class="!searchCard ? 'decrease-font-size' : ''">
          {{ name }}
        </h4>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "SearchActorCard",
  data() {
    this.NO_IMG_URL =
      "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg";
    return {};
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    actorId: {
      type: Number,
      required: true,
    },
    searchCard: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: #fff;
}

.card {
  height: 60px;
  font-size: 12px;
  margin-top: 5px;

  h4 {
    font-size: 14px;
    margin: 0;
  }

  img {
    width: 55px;
    height: 100%;
    margin-left: 20px;
    border-radius: 10px;
  }
  .big-img img {
    width: 400px;
  }
  .release-date {
    color: orange !important;
  }
}
.decrease-font-size {
  font-size: 18px;
  width: 250px;
}
</style>
