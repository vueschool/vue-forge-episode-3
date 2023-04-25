<script setup lang="ts">
// @ts-expect-error I couldn't find any types for vue 3 markdownit
import Markdown from "vue3-markdown-it";
import type { Message, User } from "@/types";
defineProps<{
  message?: Message;
  user?: User;
  myMessage?: boolean;
}>();
</script>
<template>
  <div
    class="chat"
    :class="{
      'chat-end': myMessage,
      'chat-start': !myMessage,
    }"
  >
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="user?.avatar" />
      </div>
    </div>
    <div class="chat-header mb-2">
      {{ user?.name }}
      <time v-if="message" class="text-xs opacity-50">{{
        useTimeAgo(message?.createdAt).value
      }}</time>
    </div>
    <div
      data-test="chat-bubble-text"
      class="chat-bubble py-0 prose prose-sm bg-white dark:bg-gray-900 max-w-max w-full"
      :class="{
        'dark:bg-gray-700 bg-gray-600 dark:text-inherit text-white': myMessage,
      }"
    >
      <slot>
        <Markdown :source="message?.text" class="w-full" />
      </slot>
    </div>
    <!-- <div class="chat-footer opacity-50">Delivered</div> -->
  </div>
</template>
<style scoped>
:deep(code) {
  background: none;
  @apply overflow-x-auto w-full;
}
:deep(pre) {
  @apply dark:bg-[rgba(0,0,0,.3)] overflow-x-auto w-full;
}
</style>
