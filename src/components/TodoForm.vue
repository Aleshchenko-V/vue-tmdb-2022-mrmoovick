<template>
  <form class="create-task" @submit.prevent="addNewTask">
    <div class="create-task__dateInput">
      <label>Task Deadline</label>
      <input type="date" v-model="expiresTaskDate"/>
    </div>
    <input
        type="text"
        placeholder="Input new task"
        v-model.trim="newTodoTask"
        required
    />
    <textarea v-model.trim="description" placeholder="Input description" maxlength="150"/>
    <button class="custom-btn btn">add task</button>
  </form>
</template>

<script>
export default {
name: 'TodoForm',
  data() {
    return {
      todoId: 1,
      newTodoTask: '',
      description: '',
      expiresTaskDate: '',
    }
  },
  methods: {
    addNewTask() {
        let task = {
          id: this.todoId++,
          title: this.newTodoTask,
          description: this.description,
          expiresTaskDate: this.expiresTaskDate,
        };
        this.newTodoTask = '';
        this.description = '';
        this.expiresTaskDate = '';
        this.$emit('addNewTask', task);
      }
    },
}
</script>

<style scoped>
@import '../styles/index.scss';
.create-task__dateInput {
  width: 110px
}
</style>
