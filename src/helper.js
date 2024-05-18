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

// Highlight search words
export function renderedQuestion(param, param2) {
  let title = param.split(' ');
  let array = [];
  for (let word of title) {
      if (word.toLowerCase().includes(param2.toLowerCase())) {
          array.push(`<span class="highlight">${word}</span>`);
      } else {
          array.push(word);
      }
  }
  return array.join(' ');
}

export function scienceBrnaches() {
  return ([
    "Agriculture",
    "Biochemistry",
    "Biological and Biomedical Sciences",
    "Biomedical Engineering",
    "Biotechnology",
    "Chemistry",
    "Engineering",
    "Environmental Sciences",
    "Life Sciences",
    "Physical Sciences",
    "Physics"
]);
};