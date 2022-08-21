<template>
  <div class="todo-tasks">
    <div class="todo-tasks__tasks">
      <h1
          class="title"
      >
        Todo Creator
      </h1>
      <todo-form @addNewTask="addNewTask"></todo-form>
    </div>
  </div>
</template>

<script>
import TodoForm from "@/components/TodoForm";
export default {
name: 'TodoTasks',
  components: {TodoForm},
  methods: {
    addNewTask() {
      this.$store.dispatch('addNewTask');
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
