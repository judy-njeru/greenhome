import * as actionTypes from "../actionTypes/actionTypes";
import firebase from 'firebase';

// const baseUrl = 'https://graent-heimili-backend.herokuapp.com/api';
let baseUrl = process.env.BASEURL || 'http://localhost:3003';
baseUrl = baseUrl + '/api';

function requestSessionLogin() {
  return {
    type: actionTypes.REQUEST_SESSION_LOGIN
  };
}

function receiveSessionLogin(profileData) {
  return {
    type: actionTypes.RECEIVE_SESSION_LOGIN,
    profileData
  };
}

export const sessionLogin = (profileData, cb) =>{
  return dispatch => {
    dispatch(requestSessionLogin());
    const url = `${baseUrl}/sessionLogin`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Accept','application/json');

    firebase.auth().currentUser.getIdToken().then((idToken)=>{
      profileData.realToken = idToken;
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          // csrfToken: csrfToken
        }),
        headers: headers,
        credentials: 'include', // Don't forget to specify this if you need cookies
      }).then(response => {
        getProfile(cb);
        dispatch(receiveSessionLogin(profileData));
      })
      .catch( err => {
        console.log("The error is ", err)
      });
    });
  }
}

function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}

export const getProfile = (cb) =>{
  fetch(baseUrl + "/profile", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      'Accept':'application/json'
    }),
    credentials: 'include', // Don't forget to specify this if you need cookies
  })
  .then(handleErrors)
  .then(response =>
    response.json()
  )
  .then(response => {
    cb(response);
  })
  .catch(err => {
    console.log("The error is ", err)
  });
}

/*
 * Questions
 */

function requestQuestions() {
  return {
    type: actionTypes.REQUEST_QUESTIONS
  };
}

function receiveQuestions(questions) {
  return {
    type: actionTypes.RECEIVE_QUESTIONS,
    questions
  };
}

export const getQuestions = () => {
  return dispatch => {
    dispatch(requestQuestions());
    const url = `${baseUrl}/questions`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Accept','application/json');
    fetch(url, {
      headers: headers,
      method: "GET",
      credentials: 'include', // Don't forget to specify this if you need cookies
    })
    .then(response =>
      response.json()
    )
    .then(response => {
      dispatch(receiveQuestions(response));
    })
    .catch( err => {
      console.log("The error is ", err);
      receiveQuestions([]);
    });
  }
}

 /*
  * CHOICES
  */

function requestChoices() {
  return {
    type: actionTypes.REQUEST_CHOICES
  };
}

function receiveChoices(choices) {
  return {
    type: actionTypes.RECEIVE_CHOICES,
    choices
  };
}

export const getChoices = () => {
  return dispatch => {
    dispatch(requestChoices());
    const url = `${baseUrl}/questionChoices`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Accept','application/json');
    fetch(url, {
      headers: headers,
      method: "GET",
      credentials: 'include', // Don't forget to specify this if you need cookies
    })
    .then(response =>
      response.json()
    )
    .then(response => {
      dispatch(receiveChoices(response));
    })
    .catch( err => {
      console.log("The error is ", err);
      receiveChoices([]);
    });
  }
}

function toggleChoiceAction(id) {
  return {
    type: actionTypes.TOGGLE_CHOICE,
    id
  };
}

export const toggleChoice = (id) => {
  return dispatch => {
    dispatch(toggleChoiceAction(id));
  }
}

function requestUpsertChoices() {
  return {
    type: actionTypes.REQUEST_UPSERT_CHOICES
  };
}

function receiveUpsertChoices(choices) {
  return {
    type: actionTypes.RECEIVE_UPSERT_CHOICES,
    choices
  };
}

export const postChoices = (choices, cb) => {
  return dispatch => {
    const body = { unSelectedChoices: choices };
    dispatch(requestChoices());
    const url = `${baseUrl}/questionChoices`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Accept','application/json');
    fetch(url, {
      headers: headers,
      method: "POST",
      body: JSON.stringify(body),
      credentials: 'include', // Don't forget to specify this if you need cookies
    })
    .then(response =>
      response.json()
    )
    .then(response => {
      dispatch(receiveChoices([]));
      cb();
    })
    .catch( err => {
      console.log("The error is ", err);
      dispatch(receiveChoices([]));
      cb(err);
    });
  }
}

const requestChecklist = ()=> {
  return {
    type: actionTypes.REQUEST_CHECKLIST
  };
}

const receiveChecklist = () =>{
  return {
    type: actionTypes.RECEIVE_CHECKLIST
  };
}

export const getChecklist = () => {
  return dispatch => {
    dispatch(requestChecklist());
    const url = `${baseUrl}/checklist`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Accept','application/json');
    fetch(url, {
      headers: headers,
      method: "GET",
      credentials: 'include', // Don't forget to specify this if you need cookies
    })
    .then(response =>
      response.json()
    )
    .then(response => {
      dispatch(receiveChecklist(response));
    })
    .catch( err => {
      console.log("The error is ", err);
      receiveChecklist([]);
    });
  }
}


// Get user checklist
const requestUserChecklist = ()=> {
  return {
    type: actionTypes.REQUEST_USER_CHECKLIST
  };
}

const receiveUserChecklist = (userchecklist) =>{
  return {
    type: actionTypes.RECEIVE_USER_CHECKLIST,
    userchecklist
  };
}

//toggle userchecklist

function toggleUserChecklistAction(id) {
  return {
    type: actionTypes.TOGGLE_USER_CHECKLIST,
    id
  };
}

export const toggleUserChecklist = (id) => {
  return dispatch => {
    dispatch(toggleUserChecklistAction(id));
  }
}

export const getUserChecklist = () => {
  return dispatch => {
    dispatch(requestUserChecklist());
    const url = `${baseUrl}/userchecklist`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Accept','application/json');
    fetch(url, {
      headers: headers,
      method: "GET",
      credentials: 'include', // Don't forget to specify this if you need cookies
    })
    .then(response =>
      response.json()
    )
    .then(response => {
      dispatch(receiveUserChecklist(response));
    })
    .catch( err => {
      console.log("The error is ", err);
      receiveUserChecklist([]);
    });
  }
}

/*
 * Checklist steps
 */

function requestChecklistSteps() {
  return {
    type: actionTypes.REQUEST_CHECKLIST_STEPS
  };
}

function receiveChecklistSteps(checklist_steps) {
  return {
    type: actionTypes.RECEIVE_CHECKLIST_STEPS,
    checklist_steps
  };
}

export const getChecklistSteps = () => {
  return dispatch => {
    dispatch(requestChecklistSteps());
    const url = `${baseUrl}/checkliststeps`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Accept','application/json');
    fetch(url, {
      headers: headers,
      method: "GET",
      credentials: 'include', // Don't forget to specify this if you need cookies
    })
    .then(response =>
      response.json()
    )
    .then(response => {
      dispatch(receiveChecklistSteps(response));
    })
    .catch( err => {
      console.log("The error is ", err);
      receiveChecklistSteps([]);
    });
  }
}

export const CurrentStep = (current_step)=> {
  return {
    type: actionTypes.CURRENT_STEP,
    current_step
  };
}
