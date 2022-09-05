<template>
  <div :class="{ show: visible }" class="scroll-to-top" @click="backToTop">
    <img src="@/assets/up-arrow.png" alt="arrow" width="50px" />
  </div>
</template>

<script>
export default {
  name: "ScrollToTop",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    trackScroll() {
      var scrolled = window.pageYOffset;
      var coords = document.documentElement.clientHeight;
      if (scrolled > coords) {
        this.visible = true;
      }
      if (scrolled < coords) {
        this.visible = false;
      }
    },
    backToTop() {
      if (window.pageYOffset > 0) {
        window.scrollBy(0, -80);
        setTimeout(this.backToTop, 0);
      }
    },
  },
  created() {
    window.addEventListener("scroll", this.trackScroll);
  },
};
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 80px;
  right: 40px;
  z-index: 9999;
  cursor: pointer;
  display: none;
}
.scroll-to-top :hover {
  transform: scale(1.05);
}
.show {
  display: block;
}
</style>
