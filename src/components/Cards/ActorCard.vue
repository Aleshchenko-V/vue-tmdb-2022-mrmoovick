<template>
  <router-link :to="`/actor/${actorId}`">
    <b-card
        :aria-hidden="show ? 'true' : null"
        :title="name"
        :sub-title="character"
        :img-src="profilePath === ''
          ? NO_IMG_URL
          :'https://image.tmdb.org/t/p/original' + profilePath"
        img-alt="Image"
        img-top
        tag="article"
        :class="big ? 'big-b-card big-card-img-top' :'text-muted card-text form-control card-img-top b-card'"
        style="box-sizing: content-box;"
        @click="$emit('get-actor-id', actorId)"
    >
    </b-card>
  </router-link>
</template>

<script>
import constants from "@/constants";

export default {
  name: "ActorCard",
  data: () => ({
    show: false,
    NO_IMG_URL: constants.NO_IMG_URL,
  }),
  props: {
    name: {
      type: String,
      required: true,
    },
    knownForDepartment: {
      type: String,
      required: false,
    },
    popularity: {
      type: Number,
      required: true,
    },
    profilePath: {
      type: String,
      required: true,
    },
    character: {
      type: String,
      required: false,
    },
    actorId: {
      type: Number,
      required: true,
    },
    big: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.text-muted {
  color: #fff !important;
}
.card-body {
  padding: 0.5rem;
}
.card-subtitle {
  font-size: 13px;
}
.card-title {
  font-size: 18px;
}
.card-text {
  font-size: 14px;
  color: #fff;
}

.form-control:focus {
  background-color: #1e1b26;
  box-shadow: none;
}
.card-img-top {
  min-width: 138px;
  width: 138px;
  height: 145px;
  display: block;
  border-radius: 10px;
}
.b-card__footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.b-card__text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
}
.b-card {
  width: 135px;
  height: 250px;
  border: 0;
  background-color: #1e1b26;
  color: #fff;
  transition: all 0.5s ease;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
    z-index: 1;
  }
}

.big-b-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 360px;
  height: 400px;
  border: 0;
  background-color: #1e1b26;
  color: #fff;
  transition: all 0.5s ease;
  overflow: hidden;

  img {
    width: 340px;
    height: 300px;
    display: block;
    margin-top: 10px;
    border-radius: 10px;
  }

  &:hover {
    transform: scale(1.05);
    z-index: 1;
  }

  h4 {
    margin-top: 20px;
    font-size: 24px;
  }
}
</style>

