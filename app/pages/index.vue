<template>
  <div
    class="w-screen h-screen bg-[url(/images/landing-page-bg.jpg)] bg-center bg-cover overflow-hidden relative grid place-content-center gap-5"
  >
    <h1 class="text-white text-5xl text-center">0p5.dev</h1>
    <p class="text-white text-2xl text-center">
      The deployment platform
      <span class="text-primary">for developers </span>
      <span class="text-secondary">by developers</span>
    </p>
    <div class="flex justify-center gap-5">
      <UButton color="primary" size="xl">Documentation</UButton>
      <UButton color="secondary" size="xl" to="/login">Login</UButton>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
