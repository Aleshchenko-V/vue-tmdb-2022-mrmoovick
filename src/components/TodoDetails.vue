<template>
  <div class="TodoDetails"
       v-show="show" @click.self="hide">
    <div class="TodoDetails__content">
      <slot name="time"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoDetails',
  data() {
    return {
      show: false
    }
  },
  methods: {
    hide() {
      this.show = false;
    },
    onClose() {
      this.$emit("close", this);
    },
    open() {
      this.show = true;
    }
  }
}
</script>

<style scoped>

  .TodoDetails {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 1;
  }
  .TodoDetails__content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    word-wrap: break-word;
    word-break: break-all;
    padding: 10px;
    background: white;
    border-radius: 12px;
    height: 300px;
    width: 700px;

  }
  .TodoDetails__title {
    font-size: 32px;
    font-weight: bold;
  }
  .TodoDetails__description {
    margin: auto;
    font-size: 24px;
    font-style: italic;
  }

  .isChecked {
    text-decoration: line-through;
  }

</style>
