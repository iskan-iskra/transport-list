<script setup lang="ts">
import { useTransportStore } from "@/composables";
import { onMounted, ref, computed } from "vue";
import TransportItem from "./TransportItem.vue";
import TransportCreate from "./TransportCreate.vue";

const {
  getTransportList,
  deleteTransport,
  editTransport,
  createTransport,
  list,
} = useTransportStore();

type EditTransportFunction = typeof editTransport;
type DeleteTransportFunction = typeof deleteTransport;
type CreateTransportFunction = typeof createTransport;

const isLoading = ref<boolean>(false);

const isError = ref<boolean>(false);

const loadingStatus = computed<string>(() => {
  if (isLoading.value) {
    return "Загурзка";
  }
  if (isError.value) {
    return "Ошибка";
  }

  return "Все ок";
});

const init = async () => {
  try {
    isLoading.value = true;
    isError.value = false;
    await getTransportList();
  } catch (error) {
    console.log(error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const createItem = async (...args: Parameters<CreateTransportFunction>) => {
  try {
    isLoading.value = true;
    isError.value = false;
    await createTransport(...args);
  } catch (error) {
    console.log(error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const deleteItem = async (...args: Parameters<DeleteTransportFunction>) => {
  try {
    isLoading.value = true;
    isError.value = false;
    await deleteTransport(...args);
  } catch (error) {
    console.log(error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const editItem = async (...args: Parameters<EditTransportFunction>) => {
  try {
    isLoading.value = true;
    isError.value = false;
    await editTransport(...args);
  } catch (error) {
    console.log(error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await init();
});
</script>

<template>
  <div>
    <span>состояние: </span>
    <span>{{ loadingStatus }}</span>
  </div>
  <div v-if="!isLoading">
    <TransportCreate
      @create-transport="(value: string) => createItem({
      name: value,
      attributes: []
    })"
    />
  </div>
  <hr />
  <div class="tranposrt-list__wrapper" :class="{ 'disable-clicks': isLoading }">
    <template v-for="product in list" :key="product.id">
      <TransportItem
        :product="product"
        @delete-item="() => deleteItem(product.id)"
        @edit-item="(payload) => editItem(product.id, payload)"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.tranposrt-list {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}

.disable-clicks {
  pointer-events: none;
}
</style>
