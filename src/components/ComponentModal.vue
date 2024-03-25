<script setup lang="ts">
const props = defineProps({
  modalState: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <Teleport to="body" v-if="props.modalState">
    <div class="component-modal__wrapper">
      <div class="component-modal__container">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.component-modal {
  &__wrapper {
    position: fixed;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(108, 122, 137, 0.4);
  }

  &__container {
    width: 50%;
    min-width: 300px;
    max-width: 500px;
    height: max-content;
    max-height: 500px;
    min-height: 100px;
    background-color: white;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
