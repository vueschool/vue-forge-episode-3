<template>
  <div class="max-w-full w-[900px] m-auto">
    <NuxtErrorBoundary>
      <SocialMediaPostGenerator />
      <ChatWidget />
      <template #error="{ error }">
        <div>
          <p class="text-4xl pt-10">⚠️ A fatal error has occurred:</p>
          <p>{{ error }}</p>
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
