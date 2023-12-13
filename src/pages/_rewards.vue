
<template>
  <q-page padding class="flex row justify-center items-center bg-dark">
    <q-table
      :rows="rewardDataPortrait"
      row-key="id"
      separator="cell"
      :class="{ hidden: hidePortraitTable }"
      :pagination="{
        sortBy: 'date',
        // descending: false,
        rowsPerPage: 10,
        page: 1, // set start page
      }"
      :columns="[
        {
          name: 'teacher',
          label: 'Rewards in last 2 weeks...',
          field: 'teacher',
          align: 'left',
          // sortable: true,
          headerClasses: 'bg-blue-3',
          headerStyle: 'font-size: 1.1em',
        },
      ]"
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="teacher" style="font-size: 1.1em">
            <q-avatar v-show="userStore.avatarTool" size="35px">
              <img
                :src="
                  userStore.getTeacherAvatar(
                    props.row.teacherAvatar,
                    props.row.teacherGender,
                    userStore.schoolId
                  )
                "
              />
            </q-avatar>
            {{ props.row.teacher }} : {{ props.row.value }} point(s)

            <q-avatar size="35px">
              <img :src="globals.getSubjectGraphic(props.row.subject)" />
            </q-avatar>
            {{ props.row.subject }}
          </q-td>
          <!-- <q-td key="subject" style="font-size: 1.1em">
            <q-avatar size="40px">
              <img :src="globals.getSubjectGraphic(props.row.subject)" />
            </q-avatar>
            {{ props.row.subject }}
          </q-td> -->
          <!-- <q-td key="value" style="font-size: 2em; text-align: center" class="">
            {{ props.row.value }}
          </q-td> -->
        </q-tr>
      </template>
    </q-table>
    <q-table
      :rows="rewardDataLandscape"
      title="LRewards in last 2 weeks..."
      row-key="id"
      separator="cell"
      :class="{ hidden: hideLandscapeTable }"
      :pagination="{
        sortBy: 'date',
        // descending: false,
        rowsPerPage: 10,
        page: 1, // set start page
      }"
      :columns="[
        {
          name: 'date',
          label: 'WHEN',
          field: (row) => `${globals.formatDataUF(row.date)}`,
          align: 'left',
          // sortable: true,
          headerClasses: 'bg-blue-3',
          headerStyle: 'font-size: 1.1em',
        },
        {
          name: 'teacher',
          label: 'FROM',
          field: 'teacher',
          align: 'left',
          // sortable: true,
          headerClasses: 'bg-blue-3',
          headerStyle: 'font-size: 1.1em',
        },
        {
          name: 'subject',
          label: 'SUBJECT',
          field: 'subject',
          align: 'left',
          // sortable: true,
          headerClasses: 'bg-blue-3',
          headerStyle: 'font-size: 1.1em',
        },
        {
          name: 'value',
          label: 'VALUE',
          field: 'value',
          align: 'center',
          sortable: true,
          headerClasses: 'bg-blue-3',
          headerStyle: 'font-size: 1.1em',
        },
      ]"
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="date">
            {{ `${globals.formatDataUF(props.row.date)}` }}
          </q-td>
          <q-td key="teacher" style="font-size: 1.1em">
            <q-avatar v-show="userStore.avatarTool" size="40px">
              <img
                :src="
                  userStore.getTeacherAvatar(
                    props.row.teacherAvatar,
                    props.row.teacherGender,
                    userStore.schoolId
                  )
                "
              />
            </q-avatar>
            {{ props.row.teacher }}
          </q-td>
          <q-td key="subject" style="font-size: 1.1em">
            <q-avatar size="40px">
              <img :src="globals.getSubjectGraphic(props.row.subject)" />
            </q-avatar>
            {{ props.row.subject }}
          </q-td>
          <q-td key="value" style="font-size: 2em; text-align: center" class="">
            {{ props.row.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
  <q-resize-observer @resize="onResize" />
</template>


<script setup>
import { ref } from "vue";
import axios from "axios";
import { UserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";
import globals from "src/globals/globals.js";
import { Loading, QSpinnerGears } from "quasar";

const userStore = UserStore();
userStore.resetFlags();

const router = useRouter();

const rewardDataPortrait = ref([]);
const rewardDataLandscape = ref([]);

let today = new Date();

let hidePortraitTable = ref(false);
let hideLandscapeTable = ref(false);

// userStore.authenticate();
userStore.setCurrentPageHeaderData("My Rewards");

function onResize(size) {
  if (size.width > size.height) {
    // console.log("showL");
    hidePortraitTable.value = true;
    hideLandscapeTable.value = false;
  } else {
    // console.log("showP");
    hidePortraitTable.value = false;
    hideLandscapeTable.value = true;
  }
}

Loading.show({ spinner: QSpinnerGears });

axios
  .post(
    `${userStore.backendApiUrl}/students/retrieve_rewards_history`,
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
    // console.log(response.data);
    if (response.status >= 200 && response.status < 300) {
      userStore.setAuthenticated(true);
    }
    rewardDataLandscape.value = response.data;
    rewardDataPortrait.value = response.data;
  })
  .catch(function (error) {
    Loading.hide();
    router.push("login");
    userStore.setAuthenticated(false);
    // console.log(error);
    // console.log("FAILURE!!");
  });
</script>

<style>
.q-table__top {
  background-color: lightgray;
}
.hidden {
  display: none;
}
</style>
