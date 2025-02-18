<script setup lang="ts">
import { ref } from "vue";
import { useFetch } from "@/utils/fetch"; // Assuming you have a fetch utility
import { useAuth0 } from "@auth0/auth0-vue"; // Assuming you're using Auth0 for authentication
import router from "@/utils/router"; // Assuming you have a router setup
import { useUser } from "@/utils/userProvider";

const email = ref("");
const firstname = ref("");
const lastname = ref("");
const phone = ref("");
const address = ref({
  street: "",
  city: "",
  postal: "",
  state: "",
  country: "",
});

const auth0 = useAuth0();
const user = useUser();
const token = auth0.getAccessTokenSilently();

const submit = async () => {
  try {
    const response = await useFetch(
      `${import.meta.env.BACKEND_URL}/api/v1/users`,
      {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          Authorization: `Bearer ${await token}`,
        }),
        body: JSON.stringify({
          email: email.value,
          firstname: firstname.value,
          lastname: lastname.value,
          phone: phone.value,
          address: address.value,
        }),
      }
    );
    console.log("Registration successful:", response);
    setTimeout(async () => {
      await user.refreshUser();
      router.push("/");
    }, 100);
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
</script>

<template>
  <form @submit.prevent="submit">
    <h1>{{ $t("user-registration") }}</h1>
    <div class="input-group">
      <label for="email">{{ $t("email") }}</label>
      <input id="email" v-model="email" type="email" required />
    </div>
    <div class="input-group">
      <label for="firstname">{{ $t("firstname") }}</label>
      <input id="firstname" v-model="firstname" required />
    </div>
    <div class="input-group">
      <label for="lastname">{{ $t("lastname") }}</label>
      <input id="lastname" v-model="lastname" required />
    </div>
    <div class="input-group">
      <label for="phone">{{ $t("phone") }}</label>
      <input id="phone" v-model="phone" type="tel" required />
    </div>
    <div class="input-group">
      <label for="street">{{ $t("street") }}</label>
      <input id="street" v-model="address.street" required />
    </div>
    <div class="input-group">
      <label for="city">{{ $t("city") }}</label>
      <input id="city" v-model="address.city" required />
    </div>
    <div class="input-group">
      <label for="postal">{{ $t("postal") }}</label>
      <input id="postal" v-model="address.postal" required />
    </div>
    <div class="input-group">
      <label for="state">{{ $t("state") }}</label>
      <input id="state" v-model="address.state" required />
    </div>
    <div class="input-group">
      <label for="country">{{ $t("country") }}</label>
      <input id="country" v-model="address.country" required />
    </div>
    <button type="submit">{{ $t("register") }}</button>
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
