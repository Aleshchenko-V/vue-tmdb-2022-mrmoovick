<template>
  <div>
    <div class="d-flex flex-row container">
      <div class="d-flex flex-row">
        <b-list-group horizontal class="flex-sm-wrap">
          <b-list-group-item
            class="w-auto m-2 p-0 border-0 d-flex justify-content-center align-items-start rounded-circle card"
            v-for="{
              id,
              name,
              known_for_department,
              popularity,
              profile_path,
              character,
            } in actors"
            :key="id"
          >
            <actor-card
              :name="name"
              :knownForDepartment="known_for_department || ''"
              :popularity="popularity"
              :profilePath="profile_path || ''"
              :character="character"
              :actorId="id"
              @get-actor-id="getActorDetails($event)"
            >
            </actor-card>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
import ActorCard from "@/components/Cards/ActorCard";
import { mapActions, mapState } from "vuex";

export default {
  name: "ActorList",
  components: { ActorCard },
  methods: {
    ...mapActions(["getActorDetails"]),
  },
  computed: {
    ...mapState(["actors"]),
  },
};
</script>

<style scoped>
.card {
  border-radius: 20px;
}
.container {
  max-width: 1160px;
}
.spinner {
  height: 888px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
