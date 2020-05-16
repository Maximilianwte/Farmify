import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: "theme_dark",
    auth: false,
    signupPageCode: 0,
    cookies: {
      asked: false,
      accepted: false
    },
    profile: {
      data: {
        Name: "",
        FamilyName: "",
        Joined: "",
        Email: "",
        Country: "",
        Password: "",
        savedFarms: [1, 3],
        location: "16 Palga Cres, Perth, Australia",
        geoCode: [115.866786, -31.925272],
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
          location: [139.77096, -21.79611]
        },
        {
          id: 2,
          name: "The All Natural Farm",
          adress: "Engawala, 6750 Nothern Territory",
          phone: "+613 5480 9088",
          website: "farm.co.au",
          email: "tom@hennsy.co.au",
          category: "Berry Farm",
          location: [132.72096, -23.75611]
        },
        {
          id: 3,
          name: "Barnyard Milk Products Pty LTD",
          adress: "Bremner Ct, Moama NSW 2731",
          phone: "+613 5480 9088",
          website: "farm.co.au",
          category: "Cattle Farm",
          location: [125.77096, -17.79611]
        },
        {
          id: 4,
          name: "The Estate Yellowdine",
          adress: "Yellowdine, 6224 Western Australia",
          category: "Vineyard",
          email: "tom@hennsy.co.au",
          phone: "+613 5480 9088",
          location: [115.866686, -31.965272]
        },
        {
          id: 5,
          name: "Berry Barn",
          adress: "Divine, 2004 New South Wales",
          category: "Berry Farm",
          website: "farm.co.au",
          location: [116.866686, -25.965272]
        },
        {
          id: 6,
          name: "The Meat Corp LTD",
          adress: "Melbourne, 3943 Victoria",
          email: "tom@hennsy.co.au",
          phone: "+613 5480 9088",
          category: "Cattle Farm",
          location: [114.866686, -22.965272]
        }
      ],
      active: [],
      active_ids: []
    },
    groups: {
      data: [{
          id: "g1",
          farmsIncluded: [1, 2, 3],
          numberInGroup: 3,
          location: [134.866686, -20.965272]
        },
        {
          id: "g2",
          farmsIncluded: [5, 6],
          numberInGroup: 2,
          location: [115.866686, -23.965272]
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
      state.profile.data.Name = payload.Name;
      state.profile.data.FamilyName = payload.FamilyName;
      state.profile.data.Email = payload.Email;
      state.profile.data.Joined = payload.Joined;
      state.profile.data.Country = payload.Country;
      state.profile.data.Password = payload.Password;
    },
    updateUserAccess(state, payload) {
      if (payload.valueID == "email") {
        state.profile.data.Email = payload.value
      } else {
        state.profile.data.Password = payload.value
      }
    },
    setFarmGroups(state, payload) {
      state.groups.data = payload;
    },
    updateGeoCode(state, payload) {
      state.profile.data.geoCode = payload;
    },
    updateFarmsToShow(state, payload) {
      state.farms.active = payload;
    },
    updateFarmIDSToShow(state, payload) {
      state.farms.active_ids = payload;
    },
    handleSavedFarm(state, payload) {
      var savedFarms = state.profile.data.savedFarms
      if (!savedFarms.includes(payload)) {
        savedFarms.push(payload);
      } else {
        savedFarms.splice(savedFarms.indexOf(payload), 1);
      }
    },
    pushSignUpPageCode(state, payload) {
      state.signupPageCode = payload;
    }
  },
  actions: {

  }
})