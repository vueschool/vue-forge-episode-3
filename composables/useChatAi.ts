import type { Agent } from "@/agents";

import type { AsyncState } from "@/types";
import type { CreateChatCompletionResponse } from "openai";

export const useChatAi = ({ agent }: { agent: Agent }) => {
  const state = ref<AsyncState>(null);
  const error = ref();
  const res = ref<CreateChatCompletionResponse>();

  const usage = computed(() => res.value?.usage);
  const choices = computed(() => res.value?.choices || []);
  const hasChoices = computed(() => choices.value.length);
  const firstChoice = computed(() => choices.value.at(0));
  const firstMessage = computed(() => firstChoice.value?.message);

  async function chat(options: Record<string, any>) {
    try {
      res.value = undefined;
      state.value = "loading";

      const result = await fetchWithTimeout<CreateChatCompletionResponse>(
        `/api/ai`,
        {
          method: "POST",
          body: {
            ...options,
            agent,
          },
        }
      );
      if (!result.choices || !result.usage) {
        throw new Error("Invalid AI response");
      }

      res.value = result;
      state.value = "complete";
      return res.value;
    } catch (err) {
      state.value = "error";
      error.value = err;
    }
  }

  return {
    state,
    chat,
    choices,
    usage,
    firstChoice,
    hasChoices,
    firstMessage,
    res,
  };
};
