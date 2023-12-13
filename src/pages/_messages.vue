
<template>
  <!-- <q-page padding class="flex row justify-center items-top w-75"> -->
  <q-page padding class="">
    <q-list bordered>
      <q-expansion-item
        v-for="memo in memoData"
        :key="memo.id"
        :label="memo.teacher"
      >
        <template #header>
          <q-item-section :memo="memo" avatar>
            <div>
              <q-avatar v-show="userStore.avatarTool" size="40px">
                <img
                  :src="
                    userStore.getTeacherAvatar(
                      memo.teacherAvatar,
                      memo.teacherGender,
                      userStore.schoolId
                    )
                  "
                />
              </q-avatar>
              <q-avatar size="40px">
                <img :src="globals.getSubjectGraphic(memo.subject)" />
              </q-avatar>
            </div>
          </q-item-section>
          <q-item-section class="text-h6">
            {{ memo.teacher }} to {{ memo.collection }}
          </q-item-section>
          <q-item-section :memo="memo" avatar>
            <q-avatar
              size="40px"
              :class="memo.importance == 'urgent' ? 'blink' : ''"
            >
              <img :src="globals.getMemoContextGraphic(memo.importance)" />
            </q-avatar>
          </q-item-section>
        </template>
        <div class="text-h6">{{ memo.message }}</div>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>




<script setup>
import { ref } from "vue";
import axios from "axios";
import { UserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";
import globals from "src/globals/globals.js";

import { Loading, QSpinnerGears } from "quasar";

const userStore = UserStore();
userStore.authenticate();
userStore.resetFlags();
userStore.setCurrentPageHeaderData("My Messages");

const router = useRouter();

const memoData = ref([]);

Loading.show({ spinner: QSpinnerGears });

axios
  .post(
    `${userStore.backendApiUrl}/students/retrieve_memos`,
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
    // console.log(response.data);
    // console.log(response.data.allMemos);
    // console.log(response.data.allMemos.length);
    // console.log(typeof response.data);
    // memoData = response.data;
    Loading.hide();
    memoData.value = response.data.allMemos;

    //self.rewards = JSON.parse(response.data);
    // self.rewards = response.data;
  })
  .catch(function (error) {
    Loading.hide();
    router.push("login");
    // console.log(error);
    // console.log("FAILURE!!");
  });
</script>

<style>
.q-table__top {
  background-color: lightgray;
}
.blink {
  animation: blink-animation 1s steps(5, start) infinite;
  -webkit-animation: blink-animation 1s steps(5, start) infinite;
}
@keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
@-webkit-keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
</style>
