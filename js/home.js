
// check if session is valid if not redirect 403
const checkSessionToken = () => {
    //decrypt session data
    let sessionObj = sessionStorage.getItem("SESSION_OBJ");
    sessionObj = window.decryptObject(sessionObj, key);
    sessionObj? false : location.href = "./403.html"
}


// display user full name from session storage
const checkForFullName = () => {
  // get html elem
    const fullNameElem = document.querySelector(".welcomeMsg");
    //decrypt session data
    let sessionObj = sessionStorage.getItem("SESSION_OBJ");
    sessionObj = window.decryptObject(sessionObj, key);
    // present full name in top bar
    fullNameElem.innerText = sessionObj.name;
    console.log(sessionObj.name);
  };
  

// log user out and clear session
const handleLogout = () =>{
  sessionStorage.clear();
  location.href = "/entry.html"
}