<script setup lang="ts">
defineProps({
  image: String,
  title: String,
  subtitle: String,
  description: String,
});
</script>

<template>
  <div class="card">
    <img :src="title" />
    <div class="card-sub-section">
      <h2>{{ title }}</h2>
      <h3 v-if="subtitle">{{ subtitle }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  color: var(--text-color);
  background-color: var(--primary-bg);
  border-radius: 2em;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.card-sub-section {
  display: flex;
  flex-direction: column;
}
</style>
