<script setup lang="ts">
import { ref, watchEffect } from "vue";
import ComponentModal from "./ComponentModal.vue";

const emits = defineEmits(["create-transport"]);

const modalState = ref<boolean>(false);

const transportName = ref<string>();

const transportNameError = ref<boolean>(false);

const createTranportModalOpen = () => {
  modalState.value = true;
};

const cancelHanlder = () => {
  transportName.value = undefined;
  modalState.value = false;
};

const applyHandler = () => {
  if (!transportName.value?.length) {
    transportNameError.value = true;
    return;
  }
  emits("create-transport", transportName.value);
  transportName.value = undefined;
  modalState.value = false;
};

watchEffect(() => {
  if (transportName.value?.length) {
    transportNameError.value = false;
  }
});
</script>
<template>
  <div><button @click="createTranportModalOpen">create transport</button></div>
  <ComponentModal :modal-state="modalState">
    <div>
      <button @click="cancelHanlder">cancel</button>
      <button @click="applyHandler">apply</button>
    </div>
    <div>
      <span></span>
      <input
        type="text"
        v-model="transportName"
        :class="{ error: transportNameError }"
      />
    </div>
  </ComponentModal>
</template>
<style scoped lang="scss">
.error {
  border-color: red;
}
</style>
