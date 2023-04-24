<script setup lang="ts">
const form = ref({
  url: "",
  temperature: 1,
});

const twitterCard = ref();
const facebookCard = ref();

const { generate: generateImage } = useImageAi();
async function handleImport(e: typeof form.value) {
  form.value = { ...e };
  if (!form.value.url) return;
  twitterCard.value.generate();
  facebookCard.value.generate();
  generateImage(form.value.url);
}
</script>
<template>
  <div class="mx-5">
    <h1 class="text-4xl my-10">Social Media Post Generator</h1>
    <UrlForm v-bind="form" @submit="handleImport"></UrlForm>
    <div>
      <CardTwitter ref="twitterCard" v-bind="form" />
      <CardFacebook ref="facebookCard" v-bind="form" />
      <CardImages :url="form.url" />
    </div>
  </div>
</template>
