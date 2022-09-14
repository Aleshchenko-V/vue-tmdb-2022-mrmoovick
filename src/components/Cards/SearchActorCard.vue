<template>
  <router-link :to="`/actor/${actorId}`">
    <div
      :class="searchCard ? 'big-search-card' : 'small-search-card'"
      style="
        border: 1px solid #fff;
        margin-bottom: 10px;
        border-radius: 5px;
        font-family: 'Oswald';
      "
      class="d-flex"
      @click="$emit('get-actor-id', actorId)"
    >
      <div
        :style="searchCard ? 'big-search-card-img' : 'small-search-card-img'"
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
import constants from "@/constants";

export default {
  name: "SearchActorCard",
  data: () => ({
    NO_IMG_URL: constants.NO_IMG_URL,
  }),
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
}
.decrease-font-size {
  font-size: 18px;
  width: 250px;
}
.actor-card {
  box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  transition: 0.5s all ease;
}
.actor-card:hover {
  scale: 1.05;
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.25);
}
.big-search-card {
  height: 150px;
  width: 650px;
}

.big-search-card-img {
  height: 150px;
  width: 100px;
}

.small-search-card {
  height: 75px;
  width: 445px;
}

.small-search-card-img {
  height: 75px;
  width: 75px;
}
</style>
