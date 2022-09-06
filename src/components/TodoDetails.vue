<template>
  <div class="TodoDetails"
       v-show="this.$store.getters.show" @click.self="hide">
    <div class="TodoDetails__content">
      <slot name="time"></slot>
      <slot></slot>
      <slot name="edit"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoDetails',
  methods: {
    hide() {
        this.$store.dispatch('showAndHideModal', false);
    },
  }
}
</script>

<style scoped>

@import '../styles/index.scss';

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

  .TodoDetails__buttons {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }

  .TodoDetails__buttons input[type='text'] {
    display: block;
    height: calc(2.25rem + 2px);
    padding: 0.275rem 0.5rem;
    margin-right: 10px;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #bdbdbd;
    border-radius: 0.25rem;
  }

  .isChecked {
    text-decoration: line-through;
  }

</style>
