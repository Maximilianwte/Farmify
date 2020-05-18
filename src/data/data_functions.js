import axios from "axios";
import store from "../store";

let localURL = "http://localhost:8888/.netlify/functions";
let productionURL = "https://gallant-wing-60a535.netlify.app/.netlify/functions";
let activeURL = localURL;

let logic_functions = {
    create_user(in_file) {
         return axios.post(activeURL + "/user_functions/create_user", in_file).then(response => {
          return response
        })
      },
    update_userAccess(in_file, value) {
      if (value == "email") {
        return axios.post(activeURL + "/user_functions/update_userAccess/email", in_file).then(response => {
          return response;
        })
      }
      else {
        return axios.post(activeURL + "/user_functions/update_userAccess/password", in_file).then(response => {
          return response;
        })
      }
    },
    send_login(in_file) {
        return axios.post(activeURL + "/user_functions/read_user", in_file).then(response => {
          return response.data
        })
      },
    get_groups() {
      return axios.get(activeURL + "/farm_functions/read_allGroups",).then(response => {
        return response.data
      })
    },
    updateSavedFarms() {
      var reqObject = {
        Email: store.state.profile.data.Email,
        SavedFarms: store.state.profile.data.savedFarms
      }
      axios.post(activeURL + "/user_functions/update_savedFarms", reqObject).then(response => {
        return 200})
    },
    updateLocation() {
      var reqObject = {
        Email: store.state.profile.data.Email,
        Location: store.state.location,
        GeoCode: store.state.geoCode
      }
      axios.post(activeURL + "/user_functions/update_location", reqObject).then(response => {
        return 200})
    },
    get_geoCodeOpenCage(location) {
      return axios.get('https://api.opencagedata.com/geocode/v1/json?key=d066a4fbf9964946af519566f421efbb&q='+ encodeURIComponent(location) +'&pretty=1&no_annotations=1',).then(response => {
      return [response.data.results[0].geometry.lng,response.data.results[0].geometry.lat]
      })
    }
}



export default logic_functions