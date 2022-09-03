<template>
  <div class="todo-tasks">
    <div class="todo-tasks__tasks">
      <h1
          class="title"
          :class="{red: numberOfCheckedTodos === 0, yellow: numberOfCheckedTodos < 1 && numberOfCheckedTodos >= 0.5, green: numberOfCheckedTodos === 1}"
      >
        Todo List
      </h1>
      <todo-form @addNewTask="addNewTask"></todo-form>
      <ul>
        <li v-for="(item, index) in items"
            :key="item.id"
            :title="item.title"
            class="task"
        >
          <input type="checkbox" v-model="item.checked" />
          <span :class="{isChecked: item.checked}" @click="showTodoDetails(item)"
          >{{index + 1}} - {{ item.title }}</span
          >
          <button class="custom-btn btn" @click.stop="removeTask(index)">delete</button>
        </li>
      </ul>
      <todo-details ref="modal" @close="hideTodoDetails">
            <template v-if="selectedItem.expiresTaskDate" v-slot:time>
              <span> Need to be done before {{ selectedItem.expiresTaskDate }} </span>
            </template>
            <span class="TodoDetails__title" :class="{isChecked: selectedItem.checked}">
              Title - {{ selectedItem.title }}
            </span>
            <span class="TodoDetails__description">
              {{ selectedItem.description }}
            </span>
      </todo-details>
    </div>
  </div>
</template>

<script>
import TodoForm from "@/components/TodoForm";
import TodoDetails from "@/components/TodoDetails";
export default {
name: 'TodoTasks',
  components: {TodoForm, TodoDetails},
  data: function() {
    return {
      items: [],
      selectedItem: {},
    }
  },
  methods: {
    removeTask(index) {
      this.items.splice(index, 1);
    },
    addNewTask(task) {
      this.items = [...this.items, task];
    },
    showTodoDetails(item) {
      this.selectedItem = { ...item };
      this.$refs.modal.open();
    },
    hideTodoDetails(page) {
      page.close();
    }
  },
  computed: {
    numberOfCheckedTodos() {
          return this.items.filter((item) => item.checked).length / this.items.length;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
