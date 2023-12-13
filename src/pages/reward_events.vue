<template>
  <q-page class="flex flex-center bg-dark">
    <q-timeline class="q-pa-md q-ma-xl text-white">
      <q-timeline-entry
        v-for="ev in rewardEvents"
        :key="ev.id"
        :color="getColor(ev.raffleScope)"
        :avatar="getGraphic(ev.raffleName, ev.raffleScope)"
        :title="ev.raffleName"
        :subtitle="globals.formatDataUF(ev.raffleDate)"
        :body="body"
        >{{ ev.details }}
      </q-timeline-entry>
    </q-timeline>
  </q-page>
</template>

<script setup>
import { UserStore } from "src/stores/user-store";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import globals from "src/globals/globals.js";
import { Loading, QSpinnerGears } from "quasar";

const userStore = UserStore();
userStore.resetFlags();
userStore.setCurrentPageHeaderData("My Reward Events");

const router = useRouter();

let rewardEvents = ref([]);

// rewardEvents = [1, 2, 3, 4, 5];

Loading.show({ spinner: QSpinnerGears });

axios
  .post(
    `${userStore.backendApiUrl}/students/retrieve_raffles`,
    {},
    {
      headers: {
        //"Content-Type": "multipart/form-data",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      },
    }
  )
  .then(function (response) {
    Loading.hide();
    if (response.status >= 200 && response.status < 300) {
      userStore.setAuthenticated(true);
    }
    var data = response.data.rewardEvents;
    data = data.sort((a, b) => {
      if (a.raffleDate < b.raffleDate) {
        return -1;
      }
    });
    rewardEvents.value = data;
    // console.log(data);
  })
  .catch(function (error) {
    Loading.hide();
    router.push("login");
    userStore.setAuthenticated(false);
    // console.log(error);
    // console.log("FAILURE!!");
  });

function getColor(scope) {
  switch (scope) {
    case "school":
      return "blue";
      break;
    case "national":
      return "red";
      break;
  }
}

function getGraphic(raffleName, raffleScope) {
  switch (raffleName) {
    case "Xmas National Raffle":
      return "/images/xmas.gif";
      break;
    case "Easter National Raffle":
      return "/images/easter.gif";
      break;
    case "Summer National Raffle":
      return "/images/summer.gif";
      break;
    default:
      return "/images/trophy.png";
  }
}
</script>

<style>
.q-icon img {
  width: 60px !important;
  height: 60px !important;
  z-index: 1000 !important;
}

.q-timeline__dot-img {
  padding: 2px;
  /* width: 40px !important;
  height: 40px !important;
  z-index: 1000 !important; */
}
</style>
