<template>
  <div class="about">
    <actor-list />
  </div>
</template>

<script>

import ActorList from "@/components/ActorList";
export default {
  name: 'HomeView',
  components: {
    ActorList,
  }
}

</script>
