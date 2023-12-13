<template>
  <q-page padding> Logout Page </q-page>
</template>

<script setup>
import axios from "axios";
import { UserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";
import { Loading, QSpinnerGears } from "quasar";

const userStore = UserStore();
const router = useRouter();

userStore.setCurrentPageHeaderData("Log Out");
userStore.resetFlags();

Loading.show({ spinner: QSpinnerGears });

axios
  .post(
    `${userStore.backendApiUrl}/students/logout`,
    {}
    // {
    //   headers: {
    //     //"Content-Type": "multipart/form-data",
    //     "Access-Control-Allow-Methods":
    //       "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    //   },
    // }
  )
  .then(function (response) {
    // console.log(response.data);
    // console.log(response.status);
    if (response.status >= 200 && response.status < 300) {
      router.push("login");
    }
    Loading.hide();
    //self.rewards = JSON.parse(response.data);
    // self.rewards = response.data;
  })
  .catch(function (error) {
    Loading.hide();
    // console.log("Status :" + error.response.status);
    router.push("login");
    userStore.clearUser();
    // self.processErrorResponseStatus(error.response.status);
    // console.log(error);
    // console.log("FAILURE!!");
  });
</script>
