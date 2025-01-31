import Vue from 'vue'
import Vuex from 'vuex'

import farmsData from "./data/Farms.json";
import groupData from "./data/Groups.json.json";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: "theme_light",
    auth: false,
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
      data: [{
          id: 1,
          name: "Peter Dierks Apple Tree Farm",
          adress: "Middleton, 2405 Queensland",
          phone: "+613 5480 9088",
          website: "farm.co.au",
          email: "max@mail.com",
          category: "General Farm",
          cropCode: "1",
          geoLocation: [139.77096, -21.79611]
        },
        {
          id: 2,
          name: "The All Natural Farm",
          adress: "Engawala, 6750 Nothern Territory",
          phone: "+613 5480 9088",
          website: "farm.co.au",
          email: "tom@hennsy.co.au",
          category: "Berry Farm",
          cropCode: "2",
          geoLocation: [132.72096, -23.75611]
        },
        {
          id: 3,
          name: "Barnyard Milk Products Pty LTD",
          adress: "Bremner Ct, Moama NSW 2731",
          phone: "+613 5480 9088",
          website: "farm.co.au",
          category: "Cattle Farm",
          cropCode: "7",
          geoLocation: [125.77096, -17.79611]
        },
        {
          id: 4,
          name: "The Estate Yellowdine",
          adress: "Yellowdine, 6224 Western Australia",
          category: "Vineyard",
          cropCode: "3",
          email: "tom@hennsy.co.au",
          phone: "+613 5480 9088",
          geoLocation: [115.866686, -31.965272]
        },
        {
          id: 5,
          name: "Berry Barn",
          adress: "Divine, 2004 New South Wales",
          category: "Berry Farm",
          cropCode: "2",
          website: "farm.co.au",
          geoLocation: [116.866686, -25.965272]
        },
        {
          id: 6,
          name: "The Meat Corp LTD",
          adress: "Melbourne, 3943 Victoria",
          email: "tom@hennsy.co.au",
          cropCode: "7",
          phone: "+613 5480 9088",
          category: "Cattle Farm",
          geoLocation: [114.866686, -22.965272]
        }
      ],
      active: [],
      active_ids: [0, 1, 2, 3, 4, 5, 6]
    },
    groups: {
      data: [{
          id: "g1",
          farmsIncluded: [1, 2, 3],
          numberInGroup: 3,
          geoLocation: [134.866686, -20.965272]
        },
        {
          id: "g2",
          farmsIncluded: [5, 6],
          numberInGroup: 2,
          geoLocation: [115.866686, -23.965272]
        }
      ],
      active: []
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
    },
    updateFarmIDSToShow(state, payload) {
      state.farms.active_ids = payload;
    },
  },
  actions: {

  }
})