<template>
  <div :class="theme" class="min-h-screen w-screen relative text-main_primary bg-bg_primary pb-8">
    <div id="header" class="flex pt-4 pl-4 items-center absolute text-bg_primary">
      <router-link class="mr-4 flex items-center" to="/"><svg class="svg-xl svg-light"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M363.6 262.3a10 10 0 0 0-6.1-6.6c-.6-.2-5.6-2-13.2-3.1a85 85 0 0 0 19.3-83.4 10 10 0 0 0-6.1-6.6 86 86 0 0 0-53.8.6 89.8 89.8 0 0 0 2.5-21.4 85 85 0 0 0-45.3-75.7 10 10 0 0 0-9-.3c-2 1-46 22-46 76 0 7.8 1 15 2.5 21.4a86 86 0 0 0-53.9-.6 10 10 0 0 0-6.1 6.6 85 85 0 0 0 19.3 83.4 71.1 71.1 0 0 0-13.2 3 10 10 0 0 0-6.1 6.7 85 85 0 0 0 21.4 85.5 83 83 0 0 0 76.1 23.9V437a10 10 0 0 0 20 0v-65.5a83 83 0 0 0 76.3-23.8 85 85 0 0 0 21.4-85.5zM246 340.5c-.2 4.5-.8 8.3-1.4 11a64.5 64.5 0 0 1-60.5-17.8 64.5 64.5 0 0 1-17.9-60.5 67 67 0 0 1 37.2 2.6c7.7 3 15.7 7.7 23.3 15.3a63.8 63.8 0 0 1 19.3 42.7v6.7zm0-93c-.2 4.4-.8 8.3-1.4 11a66.5 66.5 0 0 1-38-2.9 66 66 0 0 1-22.5-15 64.5 64.5 0 0 1-17.9-60.5c10.7-2.3 37.5-5 60.5 17.9l.4.4 2.6 2.9c12 13.5 15.8 27.9 16.3 39.4v6.7zm10.2-50.3a68 68 0 0 1-13.7-11.6 63.8 63.8 0 0 1-16.5-43.8A64.6 64.6 0 0 1 256 86.4a64.5 64.5 0 0 1 30.2 55.4 63.8 63.8 0 0 1-30.1 55.4zm9.9 47a63.3 63.3 0 0 1 19.9-46.6 64.5 64.5 0 0 1 60-17.5c2.5 11.5 4.9 37.8-17.9 60.5a66 66 0 0 1-26.8 16.6 66.4 66.4 0 0 1-33.7 1.3c-.7-3.3-1.5-8.2-1.5-14v-.3zm62 89.5a64.5 64.5 0 0 1-60.4 17.9 64.9 64.9 0 0 1 17.8-60.5 66 66 0 0 1 26.9-16.6c14.2-4.4 27-2.8 33.6-1.3 2.5 11.4 4.9 37.8-17.9 60.5z" />
          <path
            d="M309.4 5.6A254.3 254.3 0 0 0 75 75 254.3 254.3 0 0 0 0 256c0 57 19.2 112.6 54.1 157.4a37.7 37.7 0 0 0 5 47.4 37.8 37.8 0 0 0 53.8 0 37.7 37.7 0 0 0 0-53.7A37.7 37.7 0 0 0 69 400 236.3 236.3 0 0 1 305.2 25.2a10 10 0 1 0 4.2-19.6zm-236 415.6a18 18 0 0 1 25.4 0 17.9 17.9 0 0 1 0 25.5 18 18 0 0 1-25.5-25.5zM457.9 98.6a37.7 37.7 0 0 0-5-47.4 37.7 37.7 0 0 0-53.8 0 37.8 37.8 0 0 0 0 53.7A37.7 37.7 0 0 0 443 112a236.3 236.3 0 0 1-228.7 376.3 10 10 0 0 0-3.5 19.7A254.3 254.3 0 0 0 437 437a254.3 254.3 0 0 0 75-181c0-57-19.2-112.6-54.1-157.4zm-19.2-7.8a17.9 17.9 0 0 1-25.5 0 18 18 0 1 1 25.5 0zM168.1 475.1l-3.7 9.3 3.7-9.3a10 10 0 0 0-7.5 18.5l.3.2a10 10 0 0 0 7.2-18.7zM351.8 18.5h-.2a10 10 0 0 0-7.4 18.5h.1a10 10 0 0 0 13-5.4c2.1-5.2-.4-11-5.5-13z" />
        </svg>
        <h1 class="px-4 text-2xl hover:text-main_secondary">Farmify</h1>
      </router-link>
    </div>
    <Navigation class="absolute right-0 mt-4 mr-2" />
    <div id="footer"
      class="absolute bottom-0 flex justify-between items-center text-md hover:text-main_secondary h-8 w-screen bg-bg_primary text-main_primary">
      <router-link to="/imprint">
        <h5 class="px-4">Imprint</h5>
      </router-link>
      <p class="px-6">Copywright 2020.</p>
    </div>
    <div v-if="cookiesAccepted == false" id="cookieQ" style="z-index: 100"
      class="text-lg fixed bottom-0 right-0 mb-4 mr-4 bg-bg_primary border-4 border-main_focus rounded-sm flex">
      <h6 class="px-4 py-4">We use cookies for our services.</h6>
        <button @click="answerCookies(true)"
          class="px-8 rounded-sm py-2 mb-2 mt-2 mr-2 bg-main_focus hover:bg-main_focus_active">Accept</button>
    </div>
    <router-view />
  </div>
</template>

<script>
  import store from "./store";
  import Navigation from "./components/Navigation";
  import cookie_functions from "./utilities/cookie_functions";
  import data_functions from "./data/data_functions";

  export default {
    components: {
      Navigation
    },
    data() {
      return {

      }
    },
    computed: {
      theme() {
        return store.state.theme;
      },
      cookiesAccepted() {
        return store.state.cookies.asked;
      }
    },
    mounted() {
      let result = cookie_functions.getCookie("acceptCookies");
      if (result == "true") {
        store.commit("cookiesAnswered", true);
      };
      // toggle get_groups off. So that we dont consume firestore on mass.
      /* data_functions.get_groups().then(groups => {
        store.commit("setFarmGroups", groups)
      }) */
    },
    methods: {
      answerCookies(answer) {
        store.commit("cookiesAnswered", answer);
        if (answer == true) {
          cookie_functions.setCookie("acceptCookies", "true", 90);
        }
      }
    }
  }
</script>

<style src="./main.css" />