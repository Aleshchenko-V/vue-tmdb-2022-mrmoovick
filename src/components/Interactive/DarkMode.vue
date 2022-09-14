<template>
  <div class="theme-toggler">
    <label class="switch">
      <input
          @click="colorMode = colorMode === 'dark' ? 'light' : 'dark'"
          class="switch__input"
          type="checkbox"
      />
      <span class="switch__slider"></span>
    </label>
  </div>
</template>

<script>
import {useDark, useToggle, useColorMode} from "@vueuse/core";

export default {
  name: "DarkMode",
  setup() {
    const isDark = useDark({selector: "html"});
    const colorMode = useColorMode({
      modes: {
        dark: "dark",
        light: "light",
      },
      attribute: "theme",
    });

    const toggleDark = useToggle(isDark);

    return {colorMode, toggleDark};
  },
};
</script>

<style scoped>
.theme-toggler {
  margin-right: 10px;
}

.switch {
  position: relative;
  display: inline-block;

  width: 3.8rem;
  height: 2rem;
}

.switch__input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch__slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: #ff4754;
  border-radius: 1rem;

  transition: background 0.2s;
  cursor: pointer;
}

.switch__slider::before {
  content: "";

  position: absolute;
  left: 0.2rem;
  top: 50%;
  transform: translateY(-50%);

  height: 1.6rem;
  width: 1.6rem;
  border-radius: 1.6rem;

  background: #040404;
  transition: transform 0.2s, width 0.2s, background 0.2s;
}

.switch__input:checked + .switch__slider {
  background: #f9f9f9;
}

.switch__input:not(:checked):active + .switch__slider::before {
  width: 2.4rem;
}

.switch__input:checked:active + .switch__slider::before {
  transform: translate(1rem, -50%);
  width: 2.4rem;
}

.switch__input:checked + .switch__slider::before {
  transform: translate(1.8rem, -50%);
}
</style>
