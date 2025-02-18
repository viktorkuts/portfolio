<template>
  <form @submit.prevent="submit">
    <h1>{{ $t("testimonial-submission") }}</h1>
    <div class="input-group">
      <label for="title">{{ $t("title") }}</label>
      <input id="title" v-model="title" required />
    </div>
    <div class="input-group">
      <label for="comment">{{ $t("comment") }}</label>
      <textarea id="comment" v-model="comment" required></textarea>
    </div>
    <button type="submit">{{ $t("submit") }}</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFetch } from "@/utils/fetch";
import { useAuth0 } from "@auth0/auth0-vue";
import router from "@/utils/router";

const title = ref("");
const comment = ref("");

const auth0 = useAuth0();
const token = auth0.getAccessTokenSilently();

const submit = async () => {
  try {
    const response = await useFetch(
      `${import.meta.env.BACKEND_URL}/api/v1/comments/testimonials`,
      {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          Authorization: `Bearer ${await token}`,
        }),
        body: JSON.stringify({
          title: title.value,
          comment: comment.value,
        }),
      }
    );
    console.log("Comment submitted successfully:", response);
    router.push("/");
  } catch (error) {
    console.error("Error submitting comment:", error);
  }
};
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
}
form {
  margin: 10vw;
}
</style>
