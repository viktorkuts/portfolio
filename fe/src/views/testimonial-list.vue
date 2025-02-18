<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFetch } from "@/utils/fetch";
import { CommentStatus, type CommentResponse } from "@/utils/models/Comments";
import { useAuth0 } from "@auth0/auth0-vue";

const { getAccessTokenSilently } = useAuth0();
let pendingTestimonials = ref();
let approvedTestimonials = ref();
const pendingError = ref<string | null>(null);
const approvedError = ref<string | null>(null);
const isLoadingPending = ref(true);
const isLoadingApproved = ref(true);

// Fetch pending testimonials
const fetchPendingTestimonials = async () => {
  try {
    const token = await getAccessTokenSilently();
    const response = await useFetch<CommentResponse[]>(
      `${
        import.meta.env.BACKEND_URL
      }/api/v1/comments/testimonials?status=PENDING`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    pendingTestimonials = response.data;
    console.log(response.data);
    console.log(pendingTestimonials);
  } catch (error) {
    pendingError.value =
      "Error: " + error || "Error loading pending testimonials";
  } finally {
    isLoadingPending.value = false;
  }
};

// Fetch approved testimonials
const fetchApprovedTestimonials = async () => {
  try {
    const token = await getAccessTokenSilently();
    const response = await useFetch<CommentResponse[]>(
      `${
        import.meta.env.BACKEND_URL
      }/api/v1/comments/testimonials?status=APPROVED`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    approvedTestimonials = response.data;
  } catch (error) {
    approvedError.value =
      "Error: " + error || "Error loading approved testimonials";
  } finally {
    isLoadingApproved.value = false;
  }
};

// Approve testimonial
const approveTestimonial = async (id: string) => {
  try {
    const token = await getAccessTokenSilently();
    await fetch(`${import.meta.env.BACKEND_URL}/api/v1/comments/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: CommentStatus.APPROVED,
      }),
    });
    // Optionally refetch testimonials after approval
    await fetchPendingTestimonials();
    await fetchApprovedTestimonials();
  } catch (error) {
    console.error("Error approving testimonial:", error);
  }
  location.reload();
};

// Reject testimonial
const rejectTestimonial = async (id: string) => {
  try {
    const token = await getAccessTokenSilently();
    await fetch(`${import.meta.env.BACKEND_URL}/api/v1/comments/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: CommentStatus.REJECTED,
      }),
    });
    // Optionally refetch testimonials after rejection
    await fetchPendingTestimonials();
    await fetchApprovedTestimonials();
  } catch (error) {
    console.error("Error rejecting testimonial:", error);
  }
  location.reload();
};

// Fetch testimonials on component mount
onMounted(() => {
  fetchPendingTestimonials();
  fetchApprovedTestimonials();
});
</script>

<template>
  <h1>Testimonials</h1>

  <h2>Pending Testimonials</h2>
  <div v-if="isLoadingPending">Loading pending testimonials...</div>
  <div v-else-if="pendingError">
    Error loading pending testimonials: {{ pendingError }}
  </div>
  <div v-else-if="!pendingTestimonials && !pendingTestimonials?.length">
    No pending testimonials available!
  </div>
  <div v-else>
    <ul>
      <li v-for="testimonial in pendingTestimonials" :key="testimonial.id">
        <p>
          <strong
            >{{ testimonial.user.userInfo.firstName }}
            {{ testimonial.user.userInfo.lastName }}</strong
          >: <strong>{{ testimonial.title }}</strong>
          <br />
          {{ testimonial.comment }}
        </p>
        <button @click="approveTestimonial(testimonial.id)">Approve</button>
        <button @click="rejectTestimonial(testimonial.id)">Reject</button>
      </li>
    </ul>
  </div>

  <h2>Approved Testimonials</h2>
  <div v-if="isLoadingApproved">Loading approved testimonials...</div>
  <div v-else-if="approvedError">
    Error loading approved testimonials: {{ approvedError }}
  </div>
  <div v-else-if="!approvedTestimonials && approvedTestimonials?.length">
    No approved testimonials available!
  </div>
  <div v-else>
    <ul>
      <li v-for="testimonial in approvedTestimonials" :key="testimonial.id">
        <p>
          <strong
            >{{ testimonial.user.userInfo.firstName }}
            {{ testimonial.user.userInfo.lastName }}</strong
          >: <strong>{{ testimonial.title }}</strong>
          <br />
          {{ testimonial.comment }}
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
button {
  background-color: white;
}
</style>
