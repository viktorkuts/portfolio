<script setup lang="ts">
import { RouterLink } from "vue-router";
import "@/style.css";
import {
  FileTextIcon,
  BriefcaseIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
  ToolIcon,
  GlobeIcon,
} from "vue3-feather";
import { useAuth0 } from "@auth0/auth0-vue";
import { useUser } from "./utils/userProvider";
import { UserType } from "./utils/models/User";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStorage } from "@vueuse/core";

const auth0 = useAuth0();
const { user, isLoading } = useUser();

const login = () => {
  auth0.loginWithRedirect();
};

const logout = () => {
  auth0.logout({ logoutParams: { returnTo: window.location.origin } });
};

const i18n = useI18n({ useScope: "global" });

const switchLang = () => {
  i18n.locale.value == "en"
    ? (i18n.locale.value = "fr")
    : (i18n.locale.value = "en");

  localStorage.setItem("locale", i18n.locale.value);
};
</script>

<template>
  <ul>
    <li>
      <RouterLink to="/home">
        <home-icon size="2x" />
        {{ $t("Home") }}
      </RouterLink>
    </li>
    <li>
      <RouterLink to="/blog">
        <file-text-icon size="2x" />
        {{ $t("blog") }}
      </RouterLink>
    </li>
    <li>
      <RouterLink to="/home#projects">
        <briefcase-icon size="2x" />
        {{ $t("Projects") }}
      </RouterLink>
    </li>
    <li v-if="auth0.user?.value?.sub">
      <a>
        <user-icon size="2x" />
        {{ $t("profile") }}
      </a>
    </li>
    <li v-if="!isLoading && user?.value?.type == UserType.USER">
      <RouterLink to="/admin">
        <tool-icon size="2x" />
        {{ $t("admin") }}
      </RouterLink>
    </li>
    <li>
      <a @click="switchLang">
        <globe-icon size="2x" />
        {{
          $t("language-i18n-locale-value-touppercase", [
            i18n.locale.value.toUpperCase(),
          ])
        }}
      </a>
    </li>
    <li>
      <a v-if="auth0.isAuthenticated.value" @click="logout">
        <log-out-icon size="2x" />
        {{ $t("logout") }}
      </a>
      <a v-else @click="login">
        <log-in-icon size="2x" />
        {{ $t("login") }}
      </a>
    </li>
  </ul>
  <main>
    <RouterView :sysuser="user" />
  </main>
</template>

<style>
ul {
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-color);
  height: 5vh;
  padding: 2vw;
  list-style: none;
}

li > * {
  padding: 5px;
  background-color: var(--primary-bg);
  width: fit-content;
  height: 40px;
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 3px 0px 1px #1b1b1b;
  border-radius: 5px;
  cursor: pointer;
}

li > a > svg {
  padding-right: 10px;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
