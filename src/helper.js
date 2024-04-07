import axios from "axios";

// Return user first
export function userFirstName(prop) {
    // let nameArray = prop.split(' ');
    // return nameArray[0];
  }


  export function test(prop) {
    return axios.get(`${prop}`)
    .then((response) => {
      return response.data;
    })
  }