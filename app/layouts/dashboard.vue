<template>
  <div>
    <UHeader>
      <template #left>
        <h1 class="text-xl font-semibold">0p5.dev</h1>
      </template>
      <template #right>
        <div class="flex items-center gap-4">
          <UUser :name="user as string" size="xl" />
          <UButton size="xl" color="neutral">Logout</UButton>
        </div>
      </template>
    </UHeader>

    <slot />
  </div>
</template>

<script setup lang="ts">
const { user } = useAuth();
</script>

<style scoped></style>
