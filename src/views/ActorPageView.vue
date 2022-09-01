<template>
  <div class="actor-card">
    <actor-details />
  </div>
</template>

<script>

import ActorDetails from "@/components/ActorDetails";
export default {
  name: 'HomeView',
  components: {
    ActorDetails,
  }
}

</script>
