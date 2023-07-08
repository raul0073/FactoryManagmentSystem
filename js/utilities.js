



// function will handle number of action deduction or renewal
const handleNumberOfAction = async () => {
  
  // Get user's last session details
  let sessionObj = sessionStorage.getItem("SESSION_OBJ");
  sessionObj = window.decryptObject(sessionObj, key);

  // Get NOA number from local storage
  let localObj = localStorage.getItem(`NOA_TOKEN_${sessionObj.id}`);
  localObj = JSON.parse(localObj);

  let newNOANumber = Number(localObj.updatedNOA - 1);
  let currentNOA;


  // If NOA is 0, check date
  if (newNOANumber === 0) {
    // Fetch URL to validate NOA from the database
    let url = `https://localhost:44333/api/Login/${sessionObj.id}`;
    let userResp = await fetch(url);
    let userData = await userResp.json();

    // Compare DB NOA with the last session NOA
    let previousNOA = Number(localObj.previousNOA);
    currentNOA = Number(userData.NOA);

    let diff = currentNOA - previousNOA;

    // If there's no difference, NOA is 0
    if (diff === 0) {
      kickOutNow();
      // Set blocked
      return;
    }
  }

  let newLocalObj = {
    date: localObj.date,
    updatedNOA: newNOANumber,
    previousNOA: currentNOA,
    user: localObj.user,
  };

  // Set the updated object in local storage
  localStorage.setItem(`NOA_TOKEN_${sessionObj.id}`, JSON.stringify(newLocalObj));

  // Show user the number of action status
  let msgElem = document.querySelector("[data-feedbackMsg]");
  msgElem.classList.toggle("active");
  msgElem.innerText = `Your Number of actions has been updated.\nYou have ${newNOANumber} actions left.`;
};



// fuction go back
const goBack = () => {
  window.history.back();
}


// fuction go back and clear used session storage objects
const goBackAndClear = () => {
  window.history.back();
  sessionStorage.removeItem("SEARCH_RES");
  sessionStorage.removeItem("TEMP_EMP");
}


// export to ecel btn, appears in dep and employees page
const btnExport = document.querySelector("#export");
// ------- CHAT GPT WORK ------------------
// Export table to Excel
var exportToExcel = function() {
  
    let table = document.querySelector("table");
    let tableHeader = document.querySelector(".pageHeader").innerText;
    let fileName = tableHeader + "_export";
  
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.table_to_sheet(table);
  
    let columnIndexToOmit = 2; 
  
    for (let i = 0; i < worksheet["!ref"].split(":")[1].replace(/\D/g, ""); i++) {
      let cellIndex = XLSX.utils.encode_col(columnIndexToOmit);
      let cellAddress = cellIndex + (i + 1);
  
      if (worksheet[cellAddress]) {
        delete worksheet[cellAddress];
      }
    }
  
    XLSX.utils.book_append_sheet(workbook, worksheet, tableHeader);
    let excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    let blob = new Blob([excelFile], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    btnExport.href = URL.createObjectURL(blob);
    btnExport.download = fileName + ".xlsx";
  };
  

if(btnExport == null){
  false
}
else{
  btnExport.addEventListener("click", exportToExcel);
}

