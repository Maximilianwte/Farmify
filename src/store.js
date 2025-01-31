import Vue from 'vue'
import Vuex from 'vuex'

import farmsData from "./data/Farms.json";
import farmFunctions from "./data/farm_functions";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: "theme_light",
    auth: true,
    signupPageCode: 0,
    cookies: {
      asked: false,
      accepted: false
    },
    profile: {
      data: {
        Name: "Peter",
        FamilyName: "Dinklage",
        Joined: "30.04.2020",
        Email: "",
        Country: "",
        Password: "",
        SavedFarms: [1, 3],
        Location: "16 Palga Cres, Perth, Australia",
        Geo: [115.866786, -31.925272],
      }
    },
    farms: {
      data: farmsData,
      active: farmsData,
      activeFarmIDs: null
    }
  },
  mutations: {
    toggleTheme(state) {
      state.theme = state.theme == "theme_light" ? "theme_dark" : "theme_light"
    },
    setAuth(state, payload) {
      state.auth = payload
    },
    cookiesAnswered(state, payload) {
      state.cookies.asked = true;
      state.cookies.accepted = payload;
    },
    updateProfile(state, payload) {
      for (var key in payload) {
        try {
          state.profile.data[key] = payload[key];
        } catch (e) {
          console.log(e)
        }
      }
    },
    pushSignUpPageCode(state, payload) {
      state.signupPageCode = payload;
    },
    handleSavedFarm(state, payload) {
      var savedFarms = state.profile.data.SavedFarms
      if (!savedFarms.includes(payload)) {
        savedFarms.push(payload);
      } else {
        savedFarms.splice(savedFarms.indexOf(payload), 1);
      }
    },
    setFarms(state, payload) {
      state.farms.data = payload;
    },
    setFarmGroups(state, payload) {
      state.groups.data = payload;
    },
    updateFarmsToShow(state, payload) {
      state.farms.active = payload;
      state.farms.activeFarmIDs = farmFunctions.filterFarms2(payload);
    }
  },
  actions: {

  }
})