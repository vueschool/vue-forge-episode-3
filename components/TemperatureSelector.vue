<script setup lang="ts">
defineProps<{
  modelValue: number;
}>();
defineEmits<{
  (e: "update:modelValue", payload: number): void;
}>();
</script>
<template>
  <input
    :value="modelValue"
    @input="
      $emit(
        'update:modelValue',
        Number(($event.target as HTMLInputElement).value)
      )
    "
    max="1"
    min="0"
    step=".1"
    type="range"
    class="w-full range range-secondary"
  />
  Temperature: {{ modelValue }}
  <span class="font-bold" v-if="modelValue >= 0.5">
    - More random, creative, and risky</span
  >
  <span class="font-bold" v-else> - More focused, deterministic, and safe</span>
</template>
