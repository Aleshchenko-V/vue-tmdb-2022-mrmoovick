<template>
  <div class="todo">
    <h1
      :class="{
        red: checkCountOfDoneTask < 0.5,
        yellow: checkCountOfDoneTask >= 0.5 && checkCountOfDoneTask < 1,
        green: checkCountOfDoneTask === 1,
      }"
    >
      TODO LIST
    </h1>
    <input
      class="todo-input"
      v-on:keydown.enter="addTodo"
      type="text"
      v-model="todo"
    />
    <button class="todo-btn" @click="addTodo">add new task</button>
    <ul class="todo-list">
      <li
        v-for="(task, index) of todos"
        :key="task.title"
        class="todo-item"
        @click.self="removeTask(index)"
      >
        <input
          class="todo-checkbox"
          @change.self="task.status = !task.status"
          type="checkbox"
          name="is-done"
        />
        <span :class="{ done: task.status }" @click="removeTask(index)"
          >{{ `${index + 1}.` }} {{ task.title }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ToDo",
  data() {
    return {
      todos: [],
      todo: "",
    };
  },
  methods: {
    addTodo() {
      if (this.todo) {
        this.todos.push({
          title: this.todo,
          status: false,
        });
      }
      this.todo = "";
    },
    removeTask(index) {
      this.todos = this.todos.filter((task, id) => id !== index);
    },
  },

  computed: {
    checkCountOfDoneTask() {
      return (
        this.todos.filter((task) => task.status).length / this.todos.length
      );
    },
  },
};
</script>

<!-- add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.done {
  text-decoration: line-through;
}

.todo {
  margin: auto;
  width: 600px;
}

.todo-list {
  text-align: center;
  margin-top: 2rem;
}

.todo-item {
  text-align: left;
  padding: 0.5rem 2rem;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}

.todo-input {
  padding: 0.5rem 2rem;
  border-radius: 5px;
  margin-top: 3rem;
  margin-right: 3rem;
}

.todo-btn {
  padding: 0.5rem 2rem;
  border-radius: 5px;
}

.todo-checkbox {
  transform: scale(1.5);
  margin-right: 1.5rem;
}

.green {
  color: green;
}

.red {
  color: red;
}

.yellow {
  color: yellow;
}
</style>
