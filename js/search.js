// function will look for search term in db and return dep or name
const getSearchResult = async () => {
  // get html elements
  let searchElem = document.querySelector("[data-search-input]");

  // search url
  try {
    const url = "https://localhost:44333/api/EmployeesWithDepartmentInfo/";
    const resp = await fetch(url);
    const data = await resp.json();

    // set earch term to lowercase
    let searchTerm = searchElem.value;
    searchTerm.toLowerCase();

    // look for search term
    let searchResults = data.filter(
      (value) =>
        value.First_Name.toLowerCase().includes(searchTerm) ||
        value.Last_Name.toLowerCase().includes(searchTerm) ||
        (value.Department_Name &&
          value.Department_Name.toLowerCase().includes(searchTerm))
    );

    // redirect to results page
    location.href = "./searchResults.html";
    let searchResultsData = window.encryptObject(searchResults, key);
    sessionStorage.setItem("SEARCH_RES", searchResultsData);
    setTimeout(deleteSessionData, 1000);
  } catch (error) {
    console.error(error);
  }
};


// function will get results from session storage and present in table
const searchResultPage = () => {

  // get data
  let data = sessionStorage.getItem("SEARCH_RES");
  data = window.decryptObject(data, key);
  // traget html elem
  const tableElem = document.querySelector("table");

  // loop through data
  data.forEach((user) => {
    // create row
    let trCells = document.createElement("tr");
    tableElem.appendChild(trCells);

    // loop through all of user data and add to cell
    for (value in user) {
      let cell = document.createElement("td");
      cell.textContent = user[value];

      // dont present these keys
      if (value === "ID" || value === "Department_ID") {
        false;
        
      } else {
        trCells.appendChild(cell);
      }
    }
  });
};
