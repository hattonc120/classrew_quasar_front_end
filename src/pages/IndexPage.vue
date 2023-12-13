<template>
  <q-page class="flex flex-center bg-dark">
    <q-card-section
      class="flex column flex-center justify-around text-h4 text-white"
    >
      <q-avatar style="width: 30vh; height: 30vh"
        ><img :src="userStore.getStudentAvatar()" />
      </q-avatar>
      <div>{{ userStore.forename }} {{ userStore.surname }}</div>
      <div>{{ userStore.getStudentPerformanceText() }} Learner</div>
      <div>{{ totalPoints }} Points</div>
      <q-avatar style="width: 30vh; height: 30vh"
        ><img :src="userStore.getStudentPerformanceGraphic()" />
      </q-avatar>
    </q-card-section>
  </q-page>
</template>

<script setup>
import { UserStore } from "src/stores/user-store";
import { ref } from "vue";
import axios from "axios";

const userStore = UserStore();
userStore.authenticate();
userStore.setCurrentPageHeaderData("Home");

userStore.resetFlags();

var totalPoints = ref(userStore.getTotalPoints);
</script>
