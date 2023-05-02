<script setup lang="ts">
const isExtension =useIsExtension()

const form = ref({
  url: useRoute().query.url as string || "",
  temperature: 1,
});

const twitterCard = ref();
const facebookCard = ref();

const { generate: generateImage } = useImageAi();

onMounted(()=>{
  if(form.value.url){
  handleImport({...form.value})
}
})

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
    <h1 v-if="!isExtension" class="text-4xl my-10">Social Media Post Generator</h1>
    <UrlForm v-if="!isExtension" v-bind="form" @submit="handleImport"></UrlForm>
    <div>
      <CardTwitter ref="twitterCard" v-bind="form" />
      <CardFacebook ref="facebookCard" v-bind="form" />
      <CardImages :url="form.url" />
    </div>
  </div>
</template>
