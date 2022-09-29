<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="logout()">logout</button>
  </div>
</template>
<script setup lang="ts">
import { useKeycloak } from "../store/keycloak";
const store = useKeycloak();
function logout() {
  store.data.logout();
}
</script>
