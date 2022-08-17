<template>
  <div class="todo">
    <template class="todo-intarface">
      <h1
        :class="{
          red: checkCountOfDoneTask() < 0.5,
          yellow: checkCountOfDoneTask() >= 0.5 && checkCountOfDoneTask() < 1,
          green: checkCountOfDoneTask() === 1,
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
    </template>
    <ul class="todo-list">
      <li
        v-for="(t, idx) of todos"
        :key="idx"
        class="todo-item"
        @click.self="removeTodo(idx)"
      >
        <input
          class="todo-checkbox"
          @change.self="changeStatus(t)"
          type="checkbox"
          name="is-done"
        />
        <span :class="{ done: t.status }" @click="removeTodo(idx)"
          >{{ `${idx + 1}.` }} {{ t.title }}</span
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
    changeStatus(task) {
      task.status = !task.status;
    },
    removeTodo(idx) {
      this.todos = this.todos.filter((el, id) => id !== idx);
    },
    checkCountOfDoneTask() {
      const res =
        this.todos.filter((el) => el.status).length / this.todos.length;
      return res;
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

.todo-intarface {
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
  width: 50%;
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
