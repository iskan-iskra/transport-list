<script setup lang="ts">
import { makeCodeFromName } from "@/tools";
import { IAttribute } from "@/types";
import { AttributePayload } from "@/types/transport";
import { reactive, ref, watch, watchEffect } from "vue";

type IAttributeNewNameList = "color" | "weight" | "size";

const emits = defineEmits(["cancel-attribute", "apply-attribute"]);

const attributePayload = reactive<AttributePayload>({});

const alertAttributeName = ref<boolean>(false);

const selectedAttrNewType = ref<IAttributeNewNameList>("color");

const attributeTypeList = ref<IAttributeNewNameList[]>([
  "color",
  "weight",
  "size",
]);

const setDefaultValuesBySelectedAttrType = (value: IAttributeNewNameList) => {
  switch (value) {
    case "color":
      attributePayload.size = undefined;
      attributePayload.weight = undefined;
      attributePayload.color = "#000000";
      break;
    case "size":
      attributePayload.color = undefined;
      attributePayload.weight = undefined;
      attributePayload.size = {
        height: 0,
        width: 0,
      };
      break;
    case "weight":
      attributePayload.color = undefined;
      attributePayload.size = undefined;
      attributePayload.weight = 0;
      break;
  }
};

const clearAttributePayload = () => {
  for (const key of Object.keys(attributePayload)) {
    delete attributePayload[key as keyof IAttribute];
  }
};

const cancelHandler = () => {
  clearAttributePayload();
  emits("cancel-attribute");
};

const applyHanlder = () => {
  if (!attributePayload.name?.length) {
    alertAttributeName.value = true;
    return;
  }
  emits("apply-attribute", attributePayload);
};

watchEffect(() => {
  attributePayload.code =
    makeCodeFromName(attributePayload.name || "") || undefined;

  if (attributePayload.name?.length) {
    alertAttributeName.value = false;
  }
});

watch(selectedAttrNewType, (value) =>
  setDefaultValuesBySelectedAttrType(value)
);
</script>

<template>
  <div>
    <button @click="cancelHandler">Cancel</button>
    <button @click="applyHanlder">Ok</button>
  </div>
  <div>
    <select v-model="selectedAttrNewType">
      <option
        v-for="(attributeType, index) in attributeTypeList"
        :key="index"
        :value="attributeType"
      >
        {{ attributeType }}
      </option>
    </select>
  </div>

  <div>
    <span>Name of attribute: </span>
    <input
      :class="{ error: alertAttributeName }"
      v-model="attributePayload.name"
      type="text"
      placeholder="name"
    />
  </div>

  <div v-if="selectedAttrNewType === 'color'">
    <span>Color:</span>
    <input type="color" v-model="attributePayload.color" />
  </div>
  <div v-if="selectedAttrNewType === 'size'">
    <div>Size:</div>
    <div>
      <span>width: </span>
      <input type="number" v-model="attributePayload.size!.width" />
    </div>
    <div>
      <span>height: </span>
      <input type="number" v-model="attributePayload.size!.height" />
    </div>
  </div>
  <div v-if="selectedAttrNewType === 'weight'">
    <span>Weight:</span>
    <input type="number" v-model="attributePayload.weight" />
  </div>
</template>

<style lang="scss" scoped>
.error {
  border-color: red;
  position: relative;
}
</style>
