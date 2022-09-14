<template>
  <div class="container mt-3">
    <div class="d-flex actor-details">
      <div class="actor-details-left-side d-flex flex-column">
        <div class="actor-details-left-side__img">
          <img
            :src="
              actorDetails.profile_path
                ? 'https://image.tmdb.org/t/p/original' +
                  actorDetails.profile_path
                : 'https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg'
            "
          />
        </div>
        <div class="actor-details-left-side__personal-info">
          <h4>Personal Info</h4>
          <div class="personal-info__details">
            <div class="details__item">
              <h5 if="actorDetails.known_for_department">Known For</h5>
              <p>{{ actorDetails.known_for_department }}</p>
            </div>
            <div class="details__item">
              <h5 v-if="actorDetails.gender">Gender</h5>
              <p>{{ getGender() }}</p>
            </div>
            <div class="details__item">
              <h5 v-if="actorDetails.birthday">Birthday</h5>
              <p>{{ !actorDetails.birthday ? "" : getAge() }}</p>
            </div>
            <div class="details__item">
              <h5 v-if="actorDetails.place_of_birth">Place of Birth</h5>
              <p>{{ actorDetails.place_of_birth }}</p>
            </div>
            <div class="details__item">
              <h5
                v-if="
                  actorDetails.also_known_as
                    ? actorDetails.also_known_as.length !== 0
                    : false
                "
              >
                Also Known As
              </h5>
              <p>
                {{
                  !actorDetails.also_known_as
                    ? actorDetails.name
                    : actorDetails.also_known_as[0]
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="actor-details-right-side">
        <h1>{{ actorDetails.name }}</h1>
        <h2 v-if="actorDetails.biography">Biography</h2>
        <p v-if="actorDetails.biography">{{ actorDetails.biography }}</p>
        <h2 v-if="actorKnownFor">Known for</h2>
        <known-for-list />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import get from "lodash/get";
import KnownForList from "@/components/Lists/KnownForList";

export default {
  name: "ActorPageView",
  components: { KnownForList },
  mounted() {
    this.getActorDetails(this.$route.params.id);
  },
  methods: {
    getGender() {
      return get([null, "Female", "Male"], this.actorDetails.gender, "Unknown");
    },
    getAge() {
      let date = new Date();
      let age = date.getFullYear() - this.actorDetails.birthday.slice(0, 4);
      return `${this.actorDetails.birthday} (${age} years old)`;
    },
    ...mapActions(["getActorDetails"]),
  },
  computed: {
    ...mapState(["actorDetails", "actorKnownFor"]),
  },
};
</script>

<style scoped lang="scss">
.actor-details {
  color: #ffffff;
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
  align-items: flex-start;
  justify-content: flex-start;
  h4 {
    color: #ffffffc8;
  }
}

.personal-info__details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.details__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 10px;

  p {
    text-align: left;
  }
}

.actor-details-right-side {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-left: 30px;

  p {
    margin-top: 20px;
    text-align: justify;
    font-size: 18px;
    line-height: 30px;
    text-indent: 4em;
  }
  h1 {
    color: #ffffff;
  }
  h2 {
    color: #ffffffc8;
  }
}
</style>
