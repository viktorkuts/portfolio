<script setup lang="ts">
import { ref } from "vue";
import { AlertType } from "@/utils/models/Shared";

const props = defineProps<{
  message: string;
  type: AlertType;
}>();

const isVisible = ref(true);

const dismissBanner = () => {
  isVisible.value = false;
};
</script>

<template>
  <div v-if="isVisible" :class="['warning-banner', props.type]">
    <span class="message">{{ props.message }}</span>
    <button class="dismiss-button" @click="dismissBanner">X</button>
  </div>
</template>

<style scoped>
.warning-banner {
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.warning {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.dismiss-button {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: inherit;
}
</style>
