<template>
  <q-page padding> Bank A Reward Code Page</q-page>
</template>

<script setup>
import { onMounted, onBeforeMount, onBeforeUnmount, onUnmounted } from "vue";
import { UserStore } from "src/stores/user-store";
const userStore = UserStore();
userStore.authenticate();
userStore.setCurrentPageHeaderData("Bank A Reward Code");

onBeforeMount(() => {
  console.log("onBeforeMount called!");
});
</script>
