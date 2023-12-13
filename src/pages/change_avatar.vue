<template>
  <q-page padding class="flex flex-center bg-dark text-h6">
    <q-dialog v-model="imageFail">
      <q-card>
        <!-- <q-div class="bg-warning"> -->
        <q-card-section class="bg-negative flex row justify-between">
          <div class="text-h4 text-white">Warning !</div>
          <q-avatar square>
            <img alt="Quasar logo" src="/refuse.gif" />
          </q-avatar>
        </q-card-section>
        <!-- </q-div> -->
        <q-card-section class="q-mt-lg q-pt-none text-h5">
          Image refused !
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
    <q-stepper
      ref="stepper"
      v-model="step"
      header-nav
      :style="
        $q.platform.is.mobile
          ? 'min-width: 100vw; min-height: 50vh'
          : 'min-width: 50vw; min-height: 50vh'
      "
      :class="$q.platform.is.mobile ? 'full-width' : ''"
      animated
      dark
      flat
      alternative-labels
      :vertical="$q.platform.is.mobile"
      header-class="text-bold"
    >
      <q-step
        :name="1"
        title="Create It"
        caption=""
        prefix="1"
        done
        active-color="orange"
        done-color="green"
        done-icon="done"
      >
        <div class="Flex column flex-center justify-around">
          <!-- <q-img src="https://picsum.photos/1200/900"></q-img> -->
          <div>Click/tap the image below to create a fun avatar.</div>
          <div>
            <a href="https://avatarmaker.com" target="_blank" outlined>
              <q-img
                style="width: 250px; height: auto"
                src="/images/avatar_maker.gif"
              />
            </a>
          </div>
          <div><strong>Download as a 200x200 png.</strong></div>
        </div>
      </q-step>
      <!-- ============================================================================================ -->
      <q-step
        :name="2"
        title="Select It"
        caption=""
        prefix="2"
        :disable="step < 2"
        done
        active-color="orange"
        done-color="green"
        done-icon="done"
      >
        <!-- <q-img :src="userStore.getStudentAvatar()"></q-img> -->
        <div class="flex justify-around">
          <q-avatar
            size="200px"
            outlined
            label=""
            @click="$refs.fileRef.pickFiles()"
          >
            <q-img :src="targetImageUrl" circle></q-img>
          </q-avatar>
        </div>
        <div class="flex row flex-center">
          Click/tap the image above to select the new avatar from your phone.
        </div>
        <q-file
          ref="fileRef"
          v-model="file"
          outlined
          class="hidden"
          label=""
          accept=".png"
          max-files="1"
          max-file-size="76800"
          @update:model-value="checkAcceptableFile"
          @rejected="onRejected"
        >
          <template #prepend>
            <q-icon name="account_circle" />
          </template>
        </q-file>
      </q-step>
      <!-- ============================================================================================ -->
      <q-step
        :name="3"
        title="Upload It"
        caption=""
        prefix="3"
        :disable="step < 3"
        done
        active-color="orange"
        done-color="green"
        done-icon="done"
      >
        <div class="flex column justify-around items-center">
          <q-avatar size="200px" outlined>
            <q-img :src="targetImageUrl" circle></q-img>
          </q-avatar>
          <q-btn
            class="q-mt-md"
            color="secondary"
            icon="file_upload"
            icon-right="file_upload"
            label="upload"
            @click="uploadAvatar()"
          />
        </div>
      </q-step>
      <!-- ============================================================================================ -->
      <q-step
        :name="4"
        title="Did It"
        caption=""
        prefix="4"
        :disable="step < 4"
        done
        active-color="green"
      >
        <div class="flex column flex-center">
          <q-avatar size="200px" outlined>
            <q-img :src="targetImageUrl" circle></q-img>
          </q-avatar>
          <span class="text-green"> Your new avatar has uploaded </span>
          <div>
            Once it has been approved it will appear in the rewards system.
          </div>
        </div>
      </q-step>
      <!-- ============================================================================================ -->
      <template #navigation>
        <q-stepper-navigation class="row">
          <q-btn
            v-show="step > 1"
            color="primary"
            :label="step === 4 ? 'start again' : 'back'"
            class="q-ml-sm"
            @click="
              if (step == 4) {
                step = 1;
              } else {
                $refs.stepper.previous();
                setStepperState();
              }
            "
          ></q-btn>
          <q-space></q-space>
          <q-btn
            v-show="step < 3"
            color="primary"
            :label="step === 4 ? 'Finish' : 'next'"
            :disabled="(step > 1 && newAvatarSelected == false) || step == 3"
            @click="
              $refs.stepper.next();
              step++;
              setStepperState();
            "
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<script setup>
import { UserStore } from "src/stores/user-store";
import { ref } from "vue";
import { Notify } from "quasar";
import axios from "axios";
import { useRouter } from "vue-router";
import { Loading, QSpinnerGears } from "quasar";

const userStore = UserStore();
userStore.authenticate();
userStore.resetFlags();
userStore.setCurrentPageHeaderData("Change My Avatar");

const router = useRouter();

const step = ref(1);

var wrongFileSound = new Audio("/sounds/wrong.mp3");
let imageFail = ref(false);
let newAvatarSelected = ref(false);
let uploaded = ref(false);

let file = ref(null);

const errorsMap = {
  accept: "Only png images allowed",
  "max-file-size": "Max file size exceeded",
};

let targetImageUrl = ref(userStore.getStudentAvatar());

Loading.show({ spinner: QSpinnerGears });

// check logged in
http: axios
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

function checkAcceptableFile() {
  if (file.value.name.indexOf("AvatarMaker") == -1) {
    imageFail.value = true;
    wrongFileSound.play();
    targetImageUrl.value = userStore.getStudentAvatar();
    file.value = null;
  } else {
    displayNewAvatarBeforeUpload();
    step.value++;
  }
}

function displayNewAvatarBeforeUpload() {
  targetImageUrl.value = URL.createObjectURL(file.value);
  newAvatarSelected.value = true;
}

function onRejected(rejectedFiles) {
  targetImageUrl.value = userStore.getStudentAvatar();
  imageFail.value = true;
  wrongFileSound.play();
  file.value = null;
  // rejectedFiles.forEach((rejectedFile) => {
  //   const errorMessage = errorsMap[rejectedFile.failedPropValidation];
  //   if (!errorMessage) return;
  //   if (rejectedFile.failedPropValidation) {
  //     Notify.create({
  //       message: errorMessage,
  //       type: "negative",
  //     });
  //   }
  // });
}

function setStepperState() {
  switch (step.value) {
    case 1:
      imageFail.value = false;
      targetImageUrl.value = userStore.getStudentAvatar();
      newAvatarSelected.value = false;
      break;
    case 2:
      imageFail.value = false;
      targetImageUrl.value = userStore.getStudentAvatar();
      newAvatarSelected.value = false;
      file.value = null;
      break;
    case 3:
      imageFail.value = false;
      newAvatarSelected.value = true;
      break;
  }
}

function uploadAvatar() {
  Loading.show({
    // spinner: QSpinnerGears,
    // other props
  });

  let data = new FormData();
  data.append("file", file.value);

  // console.log(file);
  // return;

  axios
    .post(`${userStore.backendApiUrl}/students/upload_new_avatar`, data, {
      headers: {
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      },
    })
    .then(function (response) {
      // console.log(response.data);
      Loading.hide();
      userStore.avatar = response.data;
      step.value++;
    })
    .catch(function (error) {
      Loading.hide();
      router.push("login");
      // console.log(error);
      // console.log("FAILURE!!");
    });
}
</script>
