<script setup lang="ts">
import { IAttribute, IProduct } from "@/types";
import TransportAttribute from "./TransportAttribute.vue";
import TransportAttributeCreate from "./TransportAttributeCreate.vue";
import ComponentModal from "./ComponentModal.vue";
import { PropType, ref, toRaw } from "vue";

const props = defineProps({
  product: { type: Object as PropType<IProduct>, required: true },
});

const emits = defineEmits(["delete-item", "edit-item"]);

const modalState = ref<boolean>(false);

const addAttribute = () => {
  modalState.value = true;
};

const closeModal = () => {
  modalState.value = false;
};

const deleteAttribute = (index: number) => {
  const reqItem = structuredClone(toRaw(props.product));
  reqItem.attributes.splice(index, 1);
  emits("edit-item", reqItem);
};

const applyAttribute = (payload: IAttribute) => {
  const reqItem = structuredClone(toRaw(props.product));
  reqItem.attributes.push(payload);
  emits("edit-item", reqItem);
  closeModal();
};

const deleteItem = () => emits("delete-item");
</script>

<template>
  <div class="transport-item__container">
    <h3 class="transport-item__title">{{ props.product.name }}</h3>
    <div>
      <button @click="deleteItem">delete</button>
      <button @click="addAttribute">add attr</button>
    </div>

    <hr />
    <div
      class="transport-item__attributes"
      v-if="props.product.attributes.length"
    >
      <div>Attributes:</div>
      <template
        v-for="(attribute, index) in props.product.attributes"
        :key="index"
      >
        <TransportAttribute
          :attribute="attribute"
          @delete-attribute="() => deleteAttribute(index)"
        />
      </template>
    </div>
    <div v-else>Attributes are empty</div>
  </div>

  <ComponentModal :modal-state="modalState">
    <TransportAttributeCreate
      @cancel-attribute="closeModal"
      @apply-attribute="applyAttribute"
    />
  </ComponentModal>
</template>

<style scoped lang="scss">
.transport-item {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px;
    border: 1px solid black;
  }

  &__title {
    padding: 0;
    margin: 0;
  }

  &__attributes {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}
</style>
