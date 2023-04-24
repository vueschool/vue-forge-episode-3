<script setup lang="ts">
defineProps({
  url: { required: true, type: String },
});

const gradients = [
  {
    start: "#00af99",
    finish: "#90c73f",
  },
  {
    start: "#b2a8cb",
    finish: "#fe9173",
  },
  {
    start: "#9afcf7",
    finish: "#6e7cfa",
  },
  {
    start: "#d54c7f",
    finish: "#ed4758",
  },
];
</script>
<template>
  <CardGeneric title="Images">
    <template #body>
      <div class="md:flex gap-2 flex-wrap">
        <div
          v-for="gradient in gradients"
          class="mb-5 md:mb-0 md:w-1/3 flex-grow"
        >
          <ImagePlaceholder :loading="false" :gradient="gradient" />
        </div>
      </div>
    </template>
    <div v-if="url">
      <button class="btn btn-primary">Regenerate</button>
    </div>
  </CardGeneric>
</template>
