<script setup lang="ts">
import { ref } from "vue";
import { useFetch } from "@/utils/fetch";
import type { BlogPostResponse } from "@/utils/models/BlogModel";
import router from "@/utils/router";
import { useAuth0 } from "@auth0/auth0-vue";

const title = ref("");
const content = ref("");
const vis = ref("PUBLIC");
const auth0 = useAuth0();
const token = auth0.getAccessTokenSilently();

const submit = async () => {
  try {
    useFetch<BlogPostResponse>(
      `${import.meta.env.BACKEND_URL}/api/v1/blog/posts`,
      {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          Authorization: `Bearer ${await token}`,
        }),
        body: JSON.stringify({
          title: title.value,
          content: content.value,
          visibility: vis.value,
        }),
      }
    );
  } catch (error) {
    console.error("Error creating post:", error);
  }
  setTimeout(() => {
    router.push("/blog");
  }, 100);
};
</script>

<template>
  <!-- <Banner
    message="There was an error submitting the post"
    :type="AlertType.ERROR"
  ></Banner> -->
  <form @submit.prevent="submit">
    <div class="input-group">
      <label for="title">{{ $t("title") }}</label>
      <input id="title" v-model="title" />
    </div>
    <div class="input-group">
      <label for="content">{{ $t("content") }}</label>
      <textarea id="content" v-model="content" />
    </div>
    <div class="input-group">
      <label for="vis">{{ $t("visibility") }}</label>
      <select id="vis" v-model="vis">
        <option value="PUBLIC">{{ $t("public") }}</option>
        <option value="PRIVATE">{{ $t("private") }}</option>
        <option value="UNLISTED">{{ $t("unlisted") }}</option>
      </select>
    </div>
    <button type="submit">{{ $t("submit") }}</button>
  </form>
</template>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
}

form {
  margin: 10vw;
}
</style>
