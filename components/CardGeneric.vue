<script setup lang="ts">
import type { AsyncState } from "~~/types";
const props = defineProps<{
  title?: string;
  body?: string;
  state?: AsyncState;
}>();

defineEmits<{
  (e: "update:body", payload: string): void;
}>();

const textarea = ref();

watch(
  () => props.body,
  () => {
    nextTick(() => {
      if (!textarea.value) return;
      textarea.value.style.height = "";
      textarea.value.style.height = textarea.value.scrollHeight + "px";
    });
  }
);

const isError = computed(() => props.state === "error");
const isLoading = computed(() => props.state === "loading");
</script>
<template>
  <div class="card bg-base-100 shadow-xl border-t-4 border-primary">
    <div class="card-body">
      <h2 class="card-title">
        <slot name="title">{{ title }}</slot>
        <AppLoading v-if="isLoading" />
        <span v-if="isError" class="text-red-500 text-sm font-normal">
          Error generating announcement
        </span>
      </h2>

      <div>
        <hr class="opacity-10 pb-5" />
        <div>
          <slot name="body">
            <textarea
              ref="textarea"
              v-if="body"
              class="w-full bg-transparent font-sans text-lg resize-none mb-5 p-2"
              :value="body"
              @input="
                $emit(
                  'update:body',
                  ($event.target as HTMLTextAreaElement)?.value || ''
                )
              "
            ></textarea>
            <div v-else>
              <span class="italic opacity-80"
                >Import an article to generate an announcement</span
              >
            </div>
          </slot>
        </div>
      </div>

      <div class="card-actions justify-end">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
