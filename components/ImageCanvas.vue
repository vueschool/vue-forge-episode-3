<script setup>
import { toJpeg } from "html-to-image";

const props = defineProps({
  bgImage: String, // the base64 encoded string of the image generated from DALL-E
  title: String, // the title of the article scraped from the page
  gradient: Object, // the gradient background for this image
});
</script>
<template>
  <div>
    <!-- Use html-to-image to generate your images here -->
  </div>
</template>
