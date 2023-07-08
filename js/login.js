// imports from CryptoJS
const { AES, enc } = window.CryptoJS;
//  set key for object the function will create
const key = "vNgWkgAGVU2h78F";

// today
let date = new Date();
date = date.getUTCDate();
date = Number(date);

//  global functions for encrypting and decrypting objects
window.encryptObject = (object, key) => {
  const jsonString = JSON.stringify(object);
  const encryptedValue = AES.encrypt(jsonString, key).toString();
  return encryptedValue;
};

window.decryptObject = (encryptedValue, key) => {
  const decryptedString = AES.decrypt(encryptedValue, key).toString(
    CryptoJS.enc.Utf8
  );
  const decryptedObject = JSON.parse(decryptedString);
  return decryptedObject;
};

// create number of action object in local storage
const createNOA = (id, noa) => {
  // Retrieve the existing NOA object from local storage
  let lStorage_Obj = localStorage.getItem(`NOA_TOKEN_${id}`);
  lStorage_Obj = JSON.parse(lStorage_Obj);

  // Get the current date
  const currentDate = new Date().getUTCDate();

  // in case of null
  lStorage_Obj = lStorage_Obj || {};

  // Check if the stored date is different from the current date
  if (lStorage_Obj && lStorage_Obj.date !== currentDate) {
    // Update the NOA object for the new day
    lStorage_Obj.updatedNOA = noa;
    lStorage_Obj.previousNOA = noa;
    lStorage_Obj.date = currentDate;
  }

  // Save the updated NOA object to local storage
  localStorage.setItem(`NOA_TOKEN_${id}`, JSON.stringify(lStorage_Obj));
};

// check number of action object for this user in local storage
const checkNOA = (id, noa) => {
  let data = localStorage.getItem(`NOA_TOKEN_${id}`);
  data = JSON.parse(data);

  // check if user has actions remaing in this 24hrs
  if (
    Number(data.user) === Number(id) &&
    Number(data.date) === Number(date) &&
    Number(data.updatedNOA) === 0
  ) {
    // if so, kickoput
    kickOutNow();
  }
  //' check if this is the same day as the last session and actions number is not 0
  if (Number(data.updatedNOA) != 0 && Number(data.date) === Number(date)) {
    createNOA(id, data.updatedNOA);
  } else {
    // if all is wrong, create new noa token
    createNOA(id, noa);
  }
};


// function will cretate a seesion storage object
const createSessionObject = (fname, usname, noa, id) => {
  // create unique token for this session
  let token = Math.random().toString(36).slice(3, -1);
  // Create an object with the user's data
  let empObj = {
    name: fname,
    username: usname,
    numberOfActions: noa,
    defaultNOA: noa,
    sessionToken: token,
    sessionStartTime: date,
    id: id,
  };
  // Encrypt the object
  let encryptedSession_Obj = window.encryptObject(empObj, key);
  sessionStorage.setItem("SESSION_OBJ", encryptedSession_Obj);
};

// function will handle login
const handleLogin = async () => {
  // Get user's data from the database
  const url = "https://localhost:44333/api/Login/";
  const response = await fetch(url);
  const usersData = await response.json();

  // Get user input from the document
  const usernameInput = document.querySelector("[data-usernameInput]").value;
  const passwordInput = document.querySelector("[data-passwordInput]").value;

  // findd the user in the data and check the remaining NOA
  const foundUser = usersData.find(
    (user) => user.Username === usernameInput && user.Password === passwordInput
  );

  if (foundUser) {
    // check the remaining NOA for the user
    let data = localStorage.getItem(`NOA_TOKEN_${foundUser.ID}`);
    data = JSON.parse(data);

    if (data && (data.updatedNOA === 0 || data.updatedNOA == null)) {
      checkNOA(foundUser.ID, foundUser.NOA);
      // user has no remaining NOA, prevent login
    } else {
      // update or create the NOA object and create the session object
      data.updatedNOA == 0
        ? checkNOA(foundUser.ID, foundUser.NOA)
        : createNOA(foundUser.ID, foundUser.NOA);
      createSessionObject(
        foundUser.Full_Name,
        foundUser.Username,
        foundUser.NOA,
        foundUser.ID
      );

      // Redirect to the home page
      setTimeout(kickOutNow, 60 * 60 * 1000);
      location.href = "../templates/home.html";
    }
  } else {
    console.log("details dont match");
  }
};

const kickOut = () => {
  let sessionObj = sessionStorage.getItem("SESSION_OBJ");
  sessionObj = window.decryptObject(sessionObj, key);
  let localObj = localStorage.getItem(`NOA_TOKEN_${sessionObj.id}`);
  localObj = JSON.parse(localObj);

  console.log(Number(localObj.updatedNOA));

  if (Number(localObj.updatedNOA) === 0) {
    sessionStorage.clear();
    clearInterval(KickOutLoop);
    kickOutNow();
  }
};

const KickOutLoop = setInterval(kickOut, 5000);

// function to kick out of session immediately
const kickOutNow = () => {
  console.log("kickOut");
  sessionStorage.clear();
  location.href = "../templates/403timeOut.html";
};
