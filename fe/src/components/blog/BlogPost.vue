<script setup lang="ts">
defineProps({
  title: String,
  date: Date,
});
</script>

<template>
  <div class="blog-post">
    <h2>{{ $t("title-title", [title]) }}</h2>
    <h2>
      {{
        $t("date-published-date-tolocaletimestring", [
          date?.toLocaleTimeString(),
        ])
      }}
    </h2>
  </div>
</template>

<style scoped>
.blog-post {
  display: flex;
  flex-direction: column;
  background-color: var(--accent-fg);
  border-radius: 20px;
  padding: 20px;
  margin: 10px;
}
</style>
