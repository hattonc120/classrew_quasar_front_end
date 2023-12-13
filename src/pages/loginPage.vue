<template>
  <q-page class="flex flex-center" padding>
    <q-dialog v-model="alert">
      <q-card>
        <!-- <q-div class="bg-warning"> -->
        <q-card-section class="bg-warning flex row justify-between">
          <div class="text-h4">Login Error !</div>
          <q-avatar>
            <img alt="Quasar logo" src="/images/sad.png" />
          </q-avatar>
        </q-card-section>
        <!-- </q-div> -->
        <q-card-section class="q-mt-lg q-pt-none text-h5">
          Check your username and school id carefully and type in your password
          again.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="OK"
            color="primary"
            class="text-h4"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-card class="bg-green-2 full-width" style="max-width: 370px">
      <q-card-section style="font-size: 1.4em" class="text-center">
        <img
          alt="Quasar logo"
          src="/images/front_carrots.png"
          style="width: 20vh; height: 20vh"
        />
        <q-card-section>
          <q-input
            v-model="form.username"
            outlined
            label="Username"
            class="bg-grey-1 border-black q-mb-md"
          />
          <q-input
            v-model="form.password"
            outlined
            label="Password"
            class="bg-grey-1 q-mb-md"
            type="Password"
            text="secret"
          />
          <q-input
            v-model="form.schoolid"
            outlined
            label="School ID"
            class="bg-grey-1 q-mb-md"
            type="number"
            :maxlength="6"
          />
        </q-card-section>
        <q-btn label="Login" color="primary" @click="login" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Loading, QSpinnerGears } from "quasar";
import axios from "axios";
import { UserStore } from "src/stores/user-store";

const router = useRouter();

const userStore = UserStore();
userStore.setCurrentPageHeaderData("Time To Log In");

console.log(userStore.authenticated);

let alert = ref(false);

const form = ref({
  username: localStorage.getItem("username"),
  password: localStorage.getItem("password"),
  schoolid: localStorage.getItem("schoolid"),
});

userStore.clearUser();

// form.value.username = localStorage.getItem("username");
// localStorage.getItem("password", form.value.password);
// localStorage.getItem("schoolid", form.value.schoolid);

async function login() {
  console.log("hello world");

  Loading.show({ spinner: QSpinnerGears });

  // console.log(form.value.username, form.value.password, form.value.schoolid);
  await userStore.getSanctumCookie(); // get the cookie to enable auth attempt

  // login the user
  const response = await userStore.login(
    form.value.username,
    form.value.password,
    form.value.schoolid
  );
  if (response.data != "login failure") {
    userStore.setAuthenticated(true);
    userStore.getStudentAvatar();
    router.push("/");
    localStorage.setItem("username", form.value.username);
    localStorage.setItem("password", form.value.password);
    localStorage.setItem("schoolid", form.value.schoolid);
  } else if (response.data == "login failure") {
    alert.value = true;
  }

  console.log(response);

  userStore.setUser(response.data); // set user data in the user (pinia) store

  Loading.hide();
}
</script>

<style>
</style>

