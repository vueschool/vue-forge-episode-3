<script setup lang="ts">
import { Message, User } from "~~/types";

const me = ref<User>({
  id: "user",
  avatar: "/avatar.jpg",
  name: "You",
});
const bot = ref<User>({
  id: "assistant",
  avatar: "/bot.jpg",
  name: "Botman",
});

const users = computed(() => [me.value, bot.value]);

const messages = ref<Message[]>([]);

const usersTyping = ref<User[]>([]);

const messagesForAPI = computed(() =>
  messages.value.map((m) => ({
    role: m.userId,
    content: m.text,
  }))
);

const { chat } = useChatAi({ agent: "customerSupport" });
async function handleNewMessage(message: Message) {
  messages.value.push(message);
  usersTyping.value.push(bot.value);

  const res = await chat({ messages: messagesForAPI.value });

  if (!res || !res.choices[0].message?.content) return;

  const msg = {
    id: res.id,
    userId: bot.value.id,
    createdAt: new Date(),
    text: res.choices[0].message?.content,
  };
  messages.value.push(msg);
  usersTyping.value = [];
}
</script>
<template>
  <ChatBox
    :me="me"
    :users="users"
    :messages="messages"
    @new-message="handleNewMessage"
    :usersTyping="usersTyping"
  />
</template>
