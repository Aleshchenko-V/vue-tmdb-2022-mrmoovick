<template>
  <div class="container mt-3">
    <div class="d-flex actor-details">
      <div class="actor-details-left-side d-flex flex-column">
        <div class="actor-details-left-side__img">
          <img :src="actorDetails.profile_path ? 'https://image.tmdb.org/t/p/original' + actorDetails.profile_path : 'https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg'"/>
        </div>
        <div class="actor-details-left-side__personal-info">
          <h4>Personal Info</h4>
          <div class="personal-info__details">
            <div class="details__item"><h5>Known For</h5><p>{{actorDetails.known_for_department}}</p></div>
            <div class="details__item"><h5>Gender</h5><p>{{getGender()}}</p></div>
            <div class="details__item"><h5>Birthday</h5><p>{{!actorDetails.birthday ? '' : getAliveYears()}}</p></div>
            <div class="details__item"><h5>Place of Birth</h5><p>{{actorDetails.place_of_birth}}</p></div>
            <div class="details__item"><h5>Also Known As</h5><p>{{!actorDetails.also_known_as ? actorDetails.name : actorDetails.also_known_as[0]}}</p></div>
          </div>
        </div>
      </div>
      <div class="actor-details-right-side">
        <h1>{{actorDetails.name}}</h1>
        <h2>Biography</h2>
        <p>{{actorDetails.biography}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ActorDetails",
  mounted() {
      this.$store.dispatch('getActorDetails', this.$route.params.id);
  },
  methods: {
    getGender() {
      if(this.actorDetails.gender === 2) {
        return 'Male'
      } else if(this.actorDetails.gender === 1) {
        return 'Female'
      } else {
        return 'Unknown'
      }
    },
    getAliveYears() {
      let date = new Date;
      let aliveYears = date.getFullYear() - this.actorDetails.birthday.slice(0, 4);
      return `${this.actorDetails.birthday} (${aliveYears} years old)`
    }
  },
  computed: {
    ...mapState(['actorDetails'])
  }
}
</script>

<style scoped lang="scss">
.actor-details {
  color: #ffffff99;
}
.actor-details-left-side__img {
  width: 300px;
  height: 450px;
  img {
    display: block;
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
    border-radius: 8px;
  }
}
.actor-details-left-side__personal-info {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}
.personal-info__details {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}
.details__item {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin-top: 10px;
  p {
    text-align: left;
  };
}
.actor-details-right-side {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  p {
    margin-top: 20px;
    text-align: justify;
    font-size: 18px;
    line-height: 30px;
    text-indent: 4em;
  }
}

</style>
