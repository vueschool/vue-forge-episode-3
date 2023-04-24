<script setup lang="ts">
defineProps({
  url: { required: true, type: String },
});

const { image, state, title, generate } = useImageAi();

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
  <CardGeneric title="Images" :state="state">
    <template #body>
      <div class="md:flex gap-2 flex-wrap">
        <div
          v-for="gradient in gradients"
          class="mb-5 md:mb-0 md:w-1/3 flex-grow"
        >
          <div v-if="image">
            <ImageCanvas :bgImage="image" :title="title" :gradient="gradient" />
            <span class="text-sm">(right click image to save)</span>
          </div>

          <ImagePlaceholder
            :loading="state === 'loading'"
            v-else
            :gradient="gradient"
          />
        </div>
      </div>
    </template>
    <div v-if="url">
      <button class="btn btn-primary">Regenerate</button>
    </div>
  </CardGeneric>
</template>
