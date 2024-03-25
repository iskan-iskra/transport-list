import { transportApi } from "@/api";
import { IProduct, IProductPayload } from "@/types";
import { computed, ref } from "vue";

const storeDefaultValue: IProduct[] = [];

export default function () {
  const store = ref<IProduct[]>(storeDefaultValue);

  const hardClear = () => {
    store.value = storeDefaultValue;
  };

  const list = computed<IProduct[]>(() => store.value);

  const getTransportList = async () => {
    try {
      const res = await transportApi.getTransportList();
      store.value = res;
    } catch (error) {
      hardClear();
      throw error;
    }
  };

  const createTransport = async (payload: IProductPayload) => {
    try {
      const res = await transportApi.createTransport(payload);
      store.value = [res, ...store.value];
    } catch (error) {
      throw error;
    }
  };

  const deleteTransport = async (id: number) => {
    try {
      await transportApi.deleteTransportById(id);
      store.value = store.value.filter((el) => el.id !== id);
    } catch (error) {
      throw error;
    }
  };

  const editTransport = async (
    id: number,
    payload: Partial<IProductPayload>
  ) => {
    try {
      const res = await transportApi.updateTransportById(id, payload);
      const reqTransportIndex = store.value.findIndex((el) => el.id === id);
      if (reqTransportIndex !== -1) {
        store.value.splice(reqTransportIndex, 1, res);
      } else {
        store.value = [...store.value, res];
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    list,
    hardClear,
    getTransportList,
    createTransport,
    deleteTransport,
    editTransport,
  };
}
