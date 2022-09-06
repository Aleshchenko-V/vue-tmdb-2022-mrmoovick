<template>
  <div class="home">
    <todo-tasks/>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoTasks from "@/components/TodoTasks";

export default {
  name: 'HomeView',
  components: {
    TodoTasks,
  }
}
</script>
