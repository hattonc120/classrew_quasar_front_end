// import App from "./App.vue";
// const app = createApp(App);
// app.use(pinia);

import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

export const UserStore = defineStore("user", {
  state: () => ({
    backendApiUrl: null,
    // ----------------------------
    authenticated: false,
    id: null,
    username: null,
    password: null,
    forename: null,
    surname: null,
    schoolId: null,
    gender: null,
    year: null,
    house: null,
    tutorGroup: null,
    avatar: null,
    avatarStatus: null,
    totalPoints: null,
    spins: null,
    rawPoints: null,
    performanceValueCurrent: null,
    performanceValuePrevious: null,
    trend: null,
    suspensionDays: null,
    discriminateFlag: null,
    systemGroupMembership: null,
    studentConnectionCode: null,
    // --------------------------
    subscriptionType: null,
    isDigital: false,
    avatarTool: false,
    houseTool: false,
    luckySpinTool: false,
    memoTool: false,
    raffleTool: false,
    // --------------------------
    luckySpinnerLoadFlag: false,
    // --------------------------
    currentPageTitle: null,
    currentPageLogo: null,
  }),
  getters: {
    getAuthenticated: (state) => state.authenticated,
    getId: (state) => state.id,
    getUsername: (state) => state.username,
    getPassword: (state) => state.password,
    getForename: (state) => state.forename,
    getSurname: (state) => state.surname,
    getSchoolId: (state) => state.schoolId,
    getGender: (state) => state.gender,
    getYear: (state) => state.year,
    getHouse: (state) => state.house,
    getTutorGroup: (state) => state.tutorGroup,
    getAvatar: (state) => state.avatar,
    getAvatarStatus: (state) => state.avatarStatus,
    getTotalPoints: (state) => state.totalPoints,
    getSpins: (state) => state.spins,
    getRawPoints: (state) => state.rawPoints,
    getPerformanceValueCurrent: (state) => state.performanceValueCurrent,
    getPerformanceValuePrevious: (state) => state.performanceValuePrevious,
    getTrend: (state) => state.trend,
    getSuspensionDays: (state) => state.suspensionDays,
    getDiscriminateFlag: (state) => state.discriminateFlag,
    getSystemGroupMembership: (state) => state.systemGroupMembership,
    getStudentConnectionCode: (state) => state.studentConnectionCode,
    // ----------------------------------------------
    getSubscriptionType: (state) => state.subscriptionType,
    getAvatarTool: (state) => state.avatarTool,
    getHouseTool: (state) => state.houseTool,
    getLuckySpinTool: (state) => state.luckySpinTool,
    getMemoTool: (state) => state.memoTool,
    getRaffleTool: (state) => state.raffleTool,
    // ----------------------------------------------
    getCurrentPageTitle: (state) => state.currentPageTitle,
    getCurrentPageLogo: (state) => state.currentPageLogo,
    // -------------
  },
  actions: {
    async getSanctumCookie() {
      if (process.env.DEV) {
        this.backendApiUrl = "http://api.classroom_rewards.co.uk";
      } else {
        this.backendApiUrl = "http://api.classroom_rewards.co.uk";
      }
      console.log(this.backendApiUrl);
      try {
        await axios.get(`${this.backendApiUrl}/sanctum/csrf-cookie`);
      } catch (error) {
        if (error) throw error;
      }
    },
    async login(username, password, schoolId) {
      try {
        return await axios.post(`${this.backendApiUrl}/spa_login`, {
          username,
          password,
          schoolId,
        });
      } catch (error) {
        console.log(error);
        if (error) throw error;
      }
    },

    getStudentAvatar() {
      switch (this.authenticated) {
        case false:
          return "/images/quasar_logo.png";
          break;
        case true:
          if (!this.avatar) {
            var str = "src/assets/xxx_avatar.png";
            str = str.replace("xxx", this.gender);
            return str;
          } else {
            return `${this.backendApiUrl}/storage/${this.schoolId}/studentavatars/${this.avatar}`;
          }
      }
    },

    getTeacherAvatar(avatarId, teacherGender, schoolId) {
      if (!avatarId) {
        var str = "/images/xxx_avatar.png";
        str = str.replace("xxx", teacherGender);
        // console.log(str);
        return str;
      } else {
        return `${this.backendApiUrl}/storage/${schoolId}/teacheravatars/${avatarId}`;
      }
    },

    getStudentHeaderFullName() {
      switch (this.authenticated) {
        case false:
          return " Time to log in";
          break;
        case true:
          return ` ${this.forename.toUpperCase()} ${this.surname.toUpperCase()} `;
          break;
      }
    },

    getStudentPerformanceGraphic() {
      return this.authenticated
        ? `/images/performance_${this.performanceValueCurrent}.png`
        : null;
    },

    getStudentPerformanceText() {
      switch (this.performanceValueCurrent) {
        case 1:
          return "also ran";
          break;
        case 2:
          return "BRONZE";
          break;
        case 3:
          return "SILVER";
          break;
        case 4:
          return "GOLD";
          break;
        case 5:
          return "ELITE";
          break;
      }
    },

    getStudentFooterPastoralGroups() {
      switch (this.authenticated) {
        case false:
          return " Classroom Rewards Ltd ©";
          break;
        case true:
          return ` ${this.tutorGroup.toUpperCase()} : ${this.house.toUpperCase()} `;
          break;
      }
    },

    authenticate() {
      if (!this.authenticated) {
        this.authenticated = false;
        this.router.push("/login");
      }
    },

    setAuthenticated(val) {
      this.authenticated = val;
    },

    resetFlags() {
      this.luckySpinnerLoadFlag = true;
    },

    setCurrentPageHeaderData(pageTitle) {
      this.currentPageTitle = pageTitle;
      // this.currentPageLogo = "fa-solid fa-house-chimney-user";
      switch (pageTitle) {
        case "Home":
          this.currentPageLogo = "fa-solid fa-house-chimney-user";
          break;
        case "My Rewards":
          this.currentPageLogo = "fa-solid fa-star";
          break;
        case "My Reward Events":
          this.currentPageLogo = "fa-solid fa-gift";
          break;
        case "Change My Avatar":
          this.currentPageLogo = "fa-solid fa-user";
          break;
        case "Bank A Reward Code":
          this.currentPageLogo = "fa-solid fa-coins";
          break;
        case "Lucky Spinner":
          this.currentPageLogo = "fa-solid fa-dharmachakra";
          break;

        case "My Messages":
          this.currentPageLogo = "fa-solid fa-message";
          break;
        case "Change My Password":
          this.currentPageLogo = "fa-solid fa-user-secret";
          break;
        default:
          this.currentPageLogo = "fa-solid fa-key";
      }
    },

    setUser(payload) {
      if (payload.authenticated) this.authenticated = payload.authenticated;
      if (payload.id) this.id = payload.id;
      if (payload.username) this.username = payload.username;
      if (payload.password) this.password = payload.password;
      if (payload.forename) this.forename = payload.forename;
      if (payload.surname) this.surname = payload.surname;
      if (payload.school_id) this.schoolId = payload.school_id;
      if (payload.gender) this.gender = payload.gender;
      if (payload.year) this.year = payload.year;
      if (payload.house) this.house = payload.house;
      if (payload.tutor_group) this.tutorGroup = payload.tutor_group;
      if (payload.avatar) this.avatar = payload.avatar;
      if (payload.avatar_status) this.avatarStatus = payload.avatar_status;
      if (payload.total_points) this.totalPoints = payload.total_points;
      if (payload.spins) this.spins = payload.spins;
      if (payload.raw_points) this.rawPoints = payload.raw_points;
      if (payload.performance_value_current)
        this.performanceValueCurrent = payload.performance_value_current;
      if (payload.performance_value_previous)
        this.performanceValuePrevious = payload.performance_value_previous;
      if (payload.trend) this.Trend = payload.trend;
      if (payload.suspension_days)
        this.suspensionDays = payload.suspension_days;
      if (payload.discriminate_flag)
        this.discriminateFlag = payload.discriminate_flag;
      if (payload.system_group_membership)
        this.systemGroupMembership = payload.system_group_membership;
      if (payload.student_connection_code)
        this.studentConnectionCode = payload.student_connection_code;
      // ---------------------------------------
      if (payload.subscription_type)
        this.subscriptionType = payload.subscription_type;
      this.isDigital = payload.subscription_type == "digital" ? true : false;
      if (payload.avatar_tool)
        this.avatarTool = payload.avatar_tool == 1 ? true : false;
      if (payload.house_tool)
        this.houseTool = payload.house_tool == 1 ? true : false;
      if (payload.lucky_spin_tool)
        this.luckySpinTool = payload.lucky_spin_tool == 1 ? true : false;
      if (payload.memo_tool)
        this.memoTool = payload.memo_tool == 1 ? true : false;
      if (payload.raffle_tool)
        this.raffleTool = payload.raffle_tool == 1 ? true : false;
    },
    clearUser() {
      this.authenticated = false;
      this.id = null;
      this.username = null;
      this.password = null;
      this.forename = null;
      this.surname = null;
      this.schoolId = null;
      this.gender = null;
      this.year = null;
      this.house = null;
      this.tutorGroup = null;
      this.avatar = null;
      this.avatarStatus = null;
      this.totalPoints = null;
      this.spins = null;
      this.rawPoints = null;
      this.performanceValueCurrent = null;
      this.performanceValuePrevious = null;
      this.trend = null;
      this.suspensionDays = null;
      this.discriminateFlag = null;
      this.systemGroupMembership = null;
      this.studentConnectionCode = null;
      // ---------------------------------
      this.subscriptionType = null;
      this.avatarTool = null;
      this.houseTool = null;
      this.luckySpinTool = null;
      this.memoTool = null;
      this.raffleTool = null;
      // --------------------------
      this.luckySpinnerLoadFlag = false;
      // --------------------------
    },
  },

  persist: {
    storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
  },
});
