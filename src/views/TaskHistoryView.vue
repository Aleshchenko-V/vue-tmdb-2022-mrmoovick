<template>
  <div class="todo-tasks">
    <div class="todo-tasks__tasks">
      <h1
          class="title"
          :class="{red: numberOfCheckedTodos === 0, yellow: numberOfCheckedTodos < 1 && numberOfCheckedTodos >= 0.5, green: numberOfCheckedTodos === 1}"
      >
        Todo List
      </h1>
      <ul>
        <li v-for="(item, index) in $store.getters.items"
            :key="item.id"
            :title="item.title"
            class="task"
        >
          <input type="checkbox" v-model="item.checked" />
          <span :class="{isChecked: item.checked}" @click="showTodoDetails(item.id)"
          >{{index + 1}} - {{ item.title }}</span
          >
          <button class="custom-btn btn" @click.stop="removeTask(index)">delete</button>
        </li>
      </ul>
      <todo-details>
        <template v-if="$store.getters.selectedItem.expiresTaskDate" v-slot:time>
          <span> Need to be done before {{ $store.getters.selectedItem.expiresTaskDate }} </span>
        </template>
        <template>
          <span class="TodoDetails__title" :class="{isChecked: $store.getters.selectedItem.checked}">
            Title - {{ $store.getters.selectedItem.title }}
          </span>
          <span class="TodoDetails__description">
            {{ $store.getters.selectedItem.description }}
          </span>
        </template>
        <template v-slot:edit>
          <h2>Edit todo</h2>
          <div class="TodoDetails__buttons">
            <input v-model="newTitle" type="text" placeholder="Title"/><input v-model="newDescription" type="text" placeholder="Description"/><button @click="editTask" style="margin-top: 4px" class="custom-btn btn">Edit</button>
          </div>
        </template>
      </todo-details>
    </div>
  </div>
</template>

<script>
import TodoDetails from "@/components/TodoDetails";

export default {
  name: 'TaskHistoryView',
  components: {
    TodoDetails
  },
  data() {
    return {
      newTitle: '',
      newDescription: '',
    }
  },
  methods: {
    showTodoDetails(index) {
      this.$store.dispatch('selectItem', index)
      this.$store.dispatch('showAndHideModal', true);
    },
    removeTask() {
      this.$store.dispatch('removeTask')
    },
    editTask() {
      let item = {
        title: this.newTitle,
        description: this.newDescription
      };
      this.$store.dispatch('editItem', item);
      this.newTitle = '';
      this.newDescription = '';
      this.$store.dispatch('showAndHideModal', false);
    }
  },
  computed: {
    numberOfCheckedTodos() {
      return this.$store.getters.items.filter((item) => item.checked).length / this.$store.getters.items.length
    },
  },
}
</script>
