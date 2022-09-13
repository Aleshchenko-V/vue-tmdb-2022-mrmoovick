<template>
  <div class="theme-togler">
    <div @click="colorMode = colorMode === 'dark' ? 'light' : 'dark'">
      <img
        v-if="colorMode === 'dark'"
        src="../../assets/dark_mode.svg"
        alt="dark-mode"
      /><img v-else src="../../assets/light_mode.svg" alt="light-mode" />
    </div>
  </div>
</template>

<script>
import { useDark, useToggle, useColorMode } from "@vueuse/core";

export default {
  name: "DarkMode",
  setup() {
    const isDark = useDark({ selector: "html" });
    const colorMode = useColorMode({
      modes: {
        dark: "dark",
        light: "light",
      },
      attribute: "theme",
    });

    const toggleDark = useToggle(isDark);

    return { colorMode, toggleDark };
  },
};
</script>

<style scoped>
.theme-togler {
  position: absolute;
  top: 100px;
  right: -100px;
}
</style>
