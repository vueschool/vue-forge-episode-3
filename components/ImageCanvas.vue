<script setup>
import { toJpeg } from "html-to-image";

const props = defineProps({
  bgImage: String, // the base64 encoded string of the image generated from DALL-E
  title: String, // the title of the article scraped from the page
  gradient: Object, // the gradient background for this image
});

const src = ref("");
const image = ref();

onMounted(() => {
  toJpeg(image.value, {
    cacheBust: true,
    style: {
      opacity: 1,
      position: "relative",
    },
  }).then((dataUrl) => (src.value = dataUrl));
});
</script>
<template>
  <div>
    <!--  -->
    <div
      ref="image"
      class="image pointer-events-none"
      :class="{ hidden: src, 'opacity-0': !src, absolute: !src }"
      :style="` width: 1200px; height: 614px; background: linear-gradient(to right, ${gradient.start} , ${gradient.finish})`"
    >
      <img
        :src="bgImage"
        class="absolute top-0 left-0 bottom-0 mix-blend-soft-light w-[40%] object-cover h-full"
      />
      <div class="box">
        <div class="controls flex gap-2 pt-2 pb-4">
          <div class="bg-[#fd5150] w-4 h-4 rounded-full"></div>
          <div class="bg-[#febb02] w-4 h-4 rounded-full"></div>
          <div class="bg-[#00cb1c] w-4 h-4 rounded-full"></div>
        </div>
        <span>{{ title }}</span>
      </div>
    </div>
    <img :src="src" />
  </div>
</template>

<style scoped>
.image {
  @apply relative;
}
.box {
  @apply bg-white p-10 rounded-lg absolute top-[10%] left-[20%] right-[10%] bottom-[8%] text-[#373737] flex justify-center items-center;
  font-size: 60px;
  font-weight: bold;
  line-height: 1.2;
}
.controls {
  position: absolute;
  top: 10px;
  left: 10px;
  border-bottom: 1px solid gray;
  width: calc(100% - 20px);
}
</style>
