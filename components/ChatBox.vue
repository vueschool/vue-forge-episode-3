<script setup lang="ts">
import { nanoid } from "nanoid";
import { Message, User } from "~~/types";
const props = withDefaults(
  defineProps<{
    messages: Message[];
    users: User[];
    me: User;
    usersTyping?: User[];
  }>(),
  {
    usersTyping: () => [],
  }
);

defineEmits<{
  (e: "newMessage", payload: Message): void;
}>();

const open = ref(false);

function getUser(id: string) {
  return props.users.find((user) => user.id === id);
}

// focus input whenever chatbox is opened
const input = ref();
watch(open, () => {
  if (!open.value) return;
  nextTick(() => {
    (input.value as HTMLInputElement).focus();
  });
});

// keep messages anchored to bottom
const messageBox = ref();
watch(
  () => props.messages,
  () => {
    nextTick(
      () => (messageBox.value.scrollTop = messageBox.value.scrollHeight)
    );
  },
  { deep: true }
);
</script>
<template>
  <div class="fixed bottom-[10px] right-[10px]">
    <button v-show="!open" @click="open = true" class="bg-blue-500 p-3 rounded">
      <IconChat class="h-8 w-8 text-white" />
    </button>
    <div
      v-if="open"
      class="box bg-gray-300 dark:bg-gray-800 rounded w-[450px] overflow-hidden"
    >
      <!-- Header -->
      <header
        class="dark:bg-gray-900 bg-gray-200 px-4 flex justify-between items-center"
      >
        Customer Support Chat
        <button class="p-4 pr-0" @click="open = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </header>
      <!-- Messages -->
      <div class="messages p-4 overflow-y-scroll max-h-[80vh]" ref="messageBox">
        <div v-if="!messages.length" class="text-center w-[350px] m-auto">
          <strong class="text-lg">Chat with Botman!</strong>
          <p>Our A.I. powered assistant</p>
          <strong class="block mt-10">Go ahead and ask us something:</strong>
          <ul class="list-inside list-disc text-left">
            <li>What is social media post generator?</li>
            <li>How can I get human support?</li>
            <li>How was this tool built?</li>
          </ul>
        </div>
        <ChatBubble
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :user="getUser(message.userId)"
          :my-message="message.userId === me.id"
        />

        <ChatBubble v-for="user in usersTyping" :key="user.id" :user="user">
          <AppLoading />
        </ChatBubble>
      </div>
      <!-- Footer -->
      <footer class="p-2">
        <input
          ref="input"
          class="input w-full px-2 block"
          type="text"
          placeholder="Type your message"
          @keypress.enter="
            $emit('newMessage', {
              id: nanoid(),
              userId: me.id,
              createdAt: new Date(),
              text: ($event.target as HTMLInputElement).value,
            });
            ($event.target as HTMLInputElement).value = '';
          "
        />

        <div class="h-6 py-1 px-2 text-sm italic">
          <span v-if="usersTyping.length">
            {{ usersTyping.map((user) => user.name).join(" and ") }}
            {{ usersTyping.length === 1 ? "is" : "are" }} typing
          </span>
        </div>
      </footer>
    </div>
  </div>
</template>
