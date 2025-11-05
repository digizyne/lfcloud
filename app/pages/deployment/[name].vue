<template>
  <UContainer>
    <p v-if="status === 'pending'">Loading deployment...</p>
    <p v-else-if="status === 'error'">Error loading deployments: {{ error }}</p>
    <div v-else-if="status === 'success'">
      <UPageHeader :title="deployment.name" :ui="{ root: 'border-b-0' }">
        <template #headline>
          <UBadge
            :color="deployment.status === 'Ready' ? 'success' : 'error'"
            :label="deployment.status"
          />
        </template>
        <template #description>
          <div class="flex gap-1 items-center">
            <p>First deployed</p>
            <UIcon name="ph:dot-duotone" />
            <p>
              {{
                new Date(deployment.created_time).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </p>
          </div>
          <div class="flex gap-1 items-center">
            <p>Last deployed</p>
            <UIcon name="ph:dot-duotone" />
            <p>
              {{
                new Date(deployment.updated_time).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </p>
          </div>
        </template>
      </UPageHeader>
      <UPageFeature
        title="URL"
        :description="deployment.url"
        icon="ph:share-duotone"
        :to="deployment.url"
        target="_blank"
        class="mb-5"
      />
      <UPageFeature
        title="Container Image"
        :description="deployment.image"
        icon="ph:cube-duotone"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

const {
  data: deployment,
  status,
  error,
} = await useLazyFetch<any>(`/api/deployments/${useRoute().params.name}`, {
  method: "GET",
  credentials: "include",
});
</script>

<style scoped></style>
