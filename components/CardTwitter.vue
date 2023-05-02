<script setup lang="ts">
const props = defineProps<{
  url: string;
  temperature: number;
}>();

const { chat, state, firstMessage } = useChatAi({ agent: "twitter" });
const generate = () => nextTick(() => chat(props));
defineExpose({ generate });

const postURL = computed(
  () =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      firstMessage.value?.content || ""
    )}`
);
</script>
<template>
  <CardGeneric
    title="Twitter"
    :state="state"
    :body="firstMessage?.content.trim()"
    @update:body="firstMessage ? (firstMessage.content = $event) : null"
    class="mb-10"
  >
    <div
      v-if="firstMessage?.content.trim()"
      class="flex w-full justify-between items-center"
    >
      <div class="text-xs">
        Character Count:
        <strong>{{ firstMessage?.content.length }}</strong>
      </div>
      <div>
        <button class="btn btn-neutral" @click="generate()">Regenerate</button>
        <a class="btn btn-primary" :href="postURL" target="_blank">Post</a>
      </div>
    </div>
  </CardGeneric>
</template>
