<script setup lang="ts">
import Card from "@/components/Card.vue";
import { useFetch } from "@/utils/fetch";
import type { CommentResponse } from "@/utils/models/Comments";
import type { ResumeResponse } from "@/utils/models/ResumeModel";
import { UserType, type UserResponse } from "@/utils/models/User";
import router from "@/utils/router";
import { useUser } from "@/utils/userProvider";
import { useAuth0 } from "@auth0/auth0-vue";
import { computed, watch } from "vue";
import type { ShallowRef } from "vue";
import { useI18n } from "vue-i18n";
const props = defineProps(["sysuser"]);
const { data: resume, error: errorResume } = useFetch<ResumeResponse>(
  `${import.meta.env.BACKEND_URL}/api/v1/resumes/main`
);
const { data: testimonials, error: errorTest } = useFetch<CommentResponse[]>(
  `${import.meta.env.BACKEND_URL}/api/v1/comments/testimonials`
);
const i18n = useI18n({ useScope: "global" });

const isLoadingWorks = computed(() => !resume.value && !errorResume.value);
const hasWorks = computed(
  () => resume.value?.works && resume.value.works.length > 0
);
const isLoadingTest = computed(() => !resume.value && !errorTest.value);
const hasTestimonials = computed(
  () => testimonials.value && testimonials.value.length > 0
);
const locale = computed(() => {
  return i18n.locale.value === "fr" ? "french" : "original";
});

const auth = useAuth0();

const addTestimonial = () => {
  if (auth.isAuthenticated.value) {
    router.push(
      props.sysuser.value?.email ? "/submit-testimonial" : "/register"
    );
  } else {
    auth.loginWithRedirect();
  }
};

const manageTestimonial = () => {
  router.push("/list-testimonials");
};
</script>

<template>
  <div>
    <div class="about-section section">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkL0f-sLte6yAoN30TS40N2HhCqFO_LVVt4Q&s"
      />
      <div class="about-sub-section">
        <h1>Viktor Kuts</h1>
        <h3>{{ $t("3rd-year-computer-science-student") }}</h3>
      </div>
    </div>
    <div class="work-section section">
      <h1>{{ $t("work-experience") }}</h1>
      <div class="work-container">
        <p v-if="isLoadingWorks">Loading..</p>
        <p v-else-if="errorResume">
          {{ $t("there-was-an-error-error", [errorResume]) }}
        </p>
        <p v-else-if="!hasWorks">{{ $t("no-work-experience") }}</p>
        <Card
          v-else
          v-for="work in resume?.works"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkL0f-sLte6yAoN30TS40N2HhCqFO_LVVt4Q&s"
          :title="work.position[locale]"
          :subtitle="work.company.name"
          :description="work.description[locale]"
        />
      </div>
    </div>
    <div class="testimonials-section section">
      <h1>{{ $t("testimonials") }}</h1>
      <button @click="addTestimonial">{{ $t("add-testimonial") }}</button>
      <button
        v-if="props.sysuser?.value?.type == UserType.USER"
        @click="manageTestimonial"
      >
        {{ $t("manage-testimonials") }}
      </button>
      <div class="testimonials-container">
        <p v-if="isLoadingTest">Loading..</p>
        <p v-else-if="errorTest">
          {{ $t("there-was-an-error-error", [errorTest]) }}
        </p>
        <p v-else-if="!hasTestimonials">{{ $t("no-testimonials") }}</p>
        <Card
          v-else
          v-for="testimonial in testimonials"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkL0f-sLte6yAoN30TS40N2HhCqFO_LVVt4Q&s"
          :title="testimonial.comment"
          :subtitle="`${testimonial.user.userInfo.firstName}
        ${testimonial.user.userInfo.lastName} - ${testimonial.title}`"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  margin: 3vw;
}
.section {
  color: var(--text-color);
  background-color: var(--secondary-bg);
  border-radius: 2em;
}
.about-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.desc-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.work-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.work-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
}

.testimonials-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.testimonials-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
}

.about-section > img {
  margin: 2vh;
  border-radius: 50%;
}
.about-sub-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
