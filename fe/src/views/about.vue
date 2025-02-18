<script setup lang="ts">
import { computed } from "vue";
import { useFetch } from "@/utils/fetch";
import BlogPost from "@/components/blog/BlogPost.vue";
import type { BlogPostResponse } from "@/utils/models/BlogModel";
import router from "@/utils/router";

const { data: posts, error } = useFetch<BlogPostResponse[]>(
  `${import.meta.env.BACKEND_URL}/api/v1/blog/posts`
);

const isLoading = computed(() => !posts.value && !error.value);
const hasPosts = computed(() => posts.value && posts.value.length > 0);

const addBlogRedirect = () => {
  router.push("/blog/add");
};
</script>

<template>
  <h1>{{ $t("blog") }}</h1>
  <button @click="addBlogRedirect()">{{ $t("add-blog-post") }}</button>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">
    {{ $t("error-loading-posts-error-message", [error.message]) }}
  </div>
  <div v-else-if="!hasPosts">{{ $t("no-blog-posts-available") }}</div>
  <div v-else>
    <BlogPost
      v-for="post in posts"
      :key="post.postId"
      :title="post.title"
      :date="new Date(post.publicationDate)"
    />
  </div>
</template>
