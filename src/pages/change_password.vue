<template>
  <q-page padding class="flex flex-center">
    <q-dialog v-model="alertFail">
      <q-card>
        <!-- <q-div class="bg-warning"> -->
        <q-card-section class="bg-warning flex row justify-between">
          <div class="text-h4">Error !</div>
          <q-avatar>
            <img alt="Quasar logo" src="/images/sad.png" />
          </q-avatar>
        </q-card-section>
        <!-- </q-div> -->
        <q-card-section class="q-mt-lg q-pt-none text-h5">
          Your current password is wrong. Try again.
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
    <q-dialog v-model="alertSuccess">
      <q-card>
        <!-- <q-div class="bg-warning"> -->
        <q-card-section class="bg-positive flex row justify-between">
          <div class="text-h4">Password changed !</div>
        </q-card-section>
        <!-- </q-div> -->
        <q-card-section class="q-mt-lg q-pt-none text-h5">
          Your password has been changed.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="OK"
            color="primary"
            class="text-h4"
            @click="homeRedirect"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-form
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
      class="fit column q-pa-lg q-mx-xl shadow-2 bg-blue-1 text-h1"
      action=""
      @submit="onSubmit"
    >
      <q-input
        v-model="form.currentPassword"
        label="Type Current Password"
        type="password"
        name="currentPassword"
        placeholder="type current password"
        class="text-h5"
        :rules="[lettersNumberOnlyRule]"
      />
      <q-input
        v-model="form.newPassword"
        label="New Password"
        type="password"
        name="newPassword"
        placeholder="type new password"
        class="text-h5"
        :rules="[lettersNumberOnlyRule]"
      />
      <q-input
        v-model="form.confirmNewPassword"
        label="Confirm New Password"
        type="password"
        name="confirmewPassword"
        placeholder="type new password again"
        class="text-h5"
        :rules="[newPasswordComparison]"
      />
      <q-btn type="submit" label="Change it" class="q-mt-xl bg-green-5"></q-btn>
    </q-form>
  </q-page>
</template>

<script setup>
import { UserStore } from "src/stores/user-store";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { Loading, QSpinnerGears } from "quasar";

const userStore = UserStore();
userStore.authenticate();
userStore.resetFlags();
userStore.setCurrentPageHeaderData("Change My Password");

const router = useRouter();
let alertFail = ref(false);
let alertSuccess = ref(false);

const form = ref({
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

Loading.show({ spinner: QSpinnerGears });

// redirect to login page if not logged in
axios
  .post(
    `${userStore.backendApiUrl}/students/spa_auth_test`,
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
  })
  .catch(function (error) {
    Loading.hide();
    router.push("login");
    // console.log(error);
    // console.log("FAILURE!!");
  });

const lettersNumberOnlyRule = (val) =>
  (val && val.length >= 6 && /^[A-Za-z0-9]*$/.test(val)) ||
  "passwords must be at least 6 characters long!";

const newPasswordComparison = (val) =>
  val == form.value.newPassword || "new password does not match!";

function homeRedirect() {
  router.push("/");
}

function onSubmit(event) {
  event.preventDefault();
  Loading.show({
    // spinner: QSpinnerGears
  });

  axios
    .post(
      `${userStore.backendApiUrl}/students/change_student_password`,
      {
        username: userStore.getUsername,
        schoolId: userStore.getSchoolId,
        currentPassword: form.value.currentPassword,
        newPassword: form.value.newPassword,
      },
      {
        headers: {
          //"Content-Type": "multipart/form-data",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        },
      }
    )
    .then(function (response) {
      // console.log(response.data);
      Loading.hide();
      // if (response.status >= 200 && response.status < 300) {
      //   console.log("success status");
      //   userStore.setAuthenticated(true);
      // }
      if (response.data.detail == "wrong current password") {
        //self.rewards = JSON.parse(response.data);
        // self.rewards = response.data;
        alertFail.value = true;
      } else {
        alertSuccess.value = true;
      }
    })
    .catch(function (error) {
      Loading.hide();
      console.log("Status :" + error.response.status);
      router.push("login");
      // self.processErrorResponseStatus(error.response.status);
      console.log(error);
      console.log("FAILURE!!");
    });
}
</script>
