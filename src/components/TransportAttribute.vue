<script setup lang="ts">
import { isColorHexCode } from "@/tools";
import { IAttribute } from "@/types";
import { PropType } from "vue";

const props = defineProps({
  attribute: {
    type: Object as PropType<IAttribute>,
    required: true,
  },
});

const emits = defineEmits(["delete-attribute"]);

const deleteHandler = () => emits("delete-attribute");
</script>

<template>
  <div class="transport-attribute__container">
    <h3>{{ props.attribute.name }}</h3>

    <div v-if="'color' in props.attribute">
      <span>Color: </span>
      <input
        v-if="isColorHexCode(props.attribute.color)"
        type="color"
        :value="props.attribute.color"
        disabled
      />
      <span v-else>
        {{ props.attribute.color }}
      </span>
    </div>

    <div v-if="'size' in props.attribute">
      <span>SIZE: </span>
      <br />
      <span>height: </span>
      <span>{{ props.attribute.size.height }}</span>
      <br />
      <span>width: </span>
      <span>{{ props.attribute.size.width }}</span>
    </div>

    <div v-if="'weight' in props.attribute">
      <span>weight: </span>
      <span> {{ props.attribute.weight }}</span>
    </div>

    <div>
      <button @click="deleteHandler">delete attr</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.transport-attribute {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px;
    border: 1px solid gray;
  }
}
h3 {
  margin: 0;
}
</style>
