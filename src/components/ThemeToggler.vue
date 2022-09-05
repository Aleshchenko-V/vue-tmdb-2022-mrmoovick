<template>
  <button class="btn-toggle btn btn-secondary" @click="toggleTheme">
    <span v-if="currentTheme() === 'dark'">
      <img src="@/assets/moon.svg" alt="moon"
    /></span>
    <span v-else-if="currentTheme() === 'light'">
      <img src="@/assets/sun.svg" alt="sun"
    /></span>
  </button>
</template>

<script>
export default {
  name: "ThemeToggler",
  data: () => ({ theme: "light" }),
  methods: {
    //toggleTheme() {
    //  console.log(this.theme);
    //  this.theme = this.theme === "light" ? "dark" : "light";
    //  console.log(this.theme);
    //  localStorage.setItem("theme", this.theme);
    //},
    toggleTheme() {
      console.log("cur", this.currentTheme());
      const theme = localStorage.getItem("theme");
      console.log(theme);
      if (theme === "dark") {
        console.log("if");
        localStorage.setItem("theme", "light");
        console.log(localStorage.getItem("theme"));
      } else {
        console.log("else");
        localStorage.setItem("theme", "dark");
        console.log(localStorage.getItem("theme"));
      }
      console.log("cur", this.currentTheme());
    },
    currentTheme() {
      this.theme = localStorage.getItem("theme");
      return this.theme;
    },
  },
};
</script>

<style scoped>
.btn-toggle {
  display: flex;
  justify-content: center;
  margin: auto;
  width: 60px;
  text-align: center;
  transition: all 1 ease;
}
.btn-toggle:focus,
.btn-toggle:active {
  box-shadow: none;
}
</style>
