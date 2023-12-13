<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-positive text-white" height-hint="98">
      <q-toolbar class="flex row justify-between">
        <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->
        <!-- <q-avatar><img :src="userStore.getStudentAvatar()" /></q-avatar> -->
        <q-avatar :class="userStore.getCurrentPageLogo"></q-avatar>
        <q-toolbar-title>
          <div class="text-h4">{{ userStore.getCurrentPageTitle }}</div>
        </q-toolbar-title>
        <q-btn
          v-show="userStore.authenticated"
          dense
          flat
          round
          icon="menu"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-show="userStore.authenticated"
      v-model="rightDrawerOpen"
      show-if-above
      side="right"
      bordered
    >
      <q-item v-if="true" v-ripple clickable to="/">
        <q-item-section avatar>
          <q-icon name="fa-solid fa-house-chimney-user" color="gray" />
        </q-item-section>
        <q-item-section> Home </q-item-section>
      </q-item>

      <q-separator />

      <q-item v-if="true" v-ripple clickable to="rewards">
        <q-item-section avatar>
          <q-icon name="fa-solid fa-star" color="blue" />
        </q-item-section>
        <q-item-section> My Rewards </q-item-section>
      </q-item>

      <q-item v-if="true" v-ripple clickable to="reward_events">
        <q-item-section avatar>
          <q-icon name="fa-solid fa-gift" color="green" />
        </q-item-section>
        <q-item-section> My Reward Events </q-item-section>
      </q-item>

      <q-separator />

      <q-item v-if="userStore.avatarTool" v-ripple clickable to="change_avatar">
        <q-item-section avatar>
          <q-icon name="fa-solid fa-user" color="red" />
        </q-item-section>
        <q-item-section> Change My Avatar </q-item-section>
      </q-item>

      <q-item
        v-if="userStore.isDigital"
        v-ripple
        clickable
        to="bank_a_reward_code"
      >
        <q-item-section avatar>
          <q-icon name="fa-solid fa-coins" color="orange" />
        </q-item-section>
        <q-item-section> Bank A Reward Code </q-item-section>
      </q-item>

      <q-item
        v-if="userStore.getLuckySpinTool"
        v-ripple
        clickable
        to="lucky_spinner"
      >
        <q-item-section avatar>
          <q-icon name="fa-solid fa-dharmachakra" color="purple" />
        </q-item-section>
        <q-item-section> Lucky Spinner </q-item-section>
      </q-item>

      <q-item v-if="userStore.memoTool" v-ripple clickable to="messages">
        <q-item-section avatar>
          <q-icon name="fa-solid fa-message" color="brown" />
        </q-item-section>
        <q-item-section> My Messages </q-item-section>
      </q-item>

      <q-separator />

      <q-item v-if="true" v-ripple clickable to="change_password">
        <q-item-section avatar>
          <q-icon name="fa-solid fa-user-secret" color="black" />
        </q-item-section>
        <q-item-section> Change My Password </q-item-section>
      </q-item>

      <q-item v-if="true" v-ripple clickable to="log_out">
        <q-item-section avatar>
          <q-icon name="fa-solid fa-right-from-bracket" color="indigo" />
        </q-item-section>
        <q-item-section> Log Out </q-item-section>
      </q-item>

      <q-separator />

      <!-- <q-list v-for="(menuItem, index) in menuList" :key="index">
        <q-item
          v-if="menuItem.visible"
          v-ripple
          clickable
          :active="menuItem.label === 'Outbox'"
          :to="menuItem.to"
        >
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" :color="menuItem.color" />
          </q-item-section>
          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>
        <q-separator v-if="menuItem.separator" :key="'sep' + index" />
      </q-list> -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-warning text-black" height-hint="98">
      <q-toolbar class="flex row justify-between">
        <!-- <q-avatar class="q-mr-md">
          <img alt="Quasar logo" src="~assets/gift.png" />

        </q-avatar> -->

        <q-toolbar-title class="flex row">
          <q-avatar><img :src="userStore.getStudentAvatar()" /></q-avatar>
          <div>{{ userStore.getStudentFooterPastoralGroups() }}</div>
        </q-toolbar-title>
        <!-- <q-avatar class="q-mr-md">
          <img alt="Quasar logo" src="~assets/trophy.png" />
        </q-avatar> -->
        <i v-if="onlineStatus" class="text-blue-10 fa-solid fa-wifi fa-2xl"></i>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { UserStore } from "src/stores/user-store";

const userStore = UserStore();

const rightDrawerOpen = ref(false);

const onlineStatus = ref(navigator.onLine);

const menuList = [];

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>
