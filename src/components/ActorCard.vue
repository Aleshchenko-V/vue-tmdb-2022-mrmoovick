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
        class="text-muted card-text form-control card-img-top b-card" style="box-sizing: content-box;"
        @click="$emit('get-actor-id', actorId)"
    >
    </b-card>
  </router-link>
</template>

<script>
export default {
  name: "ActorCard",
  data: () => ({
    show: false,
    NO_IMG_URL: 'https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg',
  }),
  props: {
    name: {
      type: String,
      required: true,
    },
    knownForDepartment: {
      type: String,
      required: true,
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
      required: true,
    },
    actorId: {
      type: Number,
      required: true,
    }
  },
};
</script>

<style scoped>
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
.form-control {
  color: orange;
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
}
.b-card:hover {
  -webkit-transform: scale(1.05);
  -ms-transform: scale(1.05);
  transform: scale(1.05);
  z-index: 1;
}
</style>

