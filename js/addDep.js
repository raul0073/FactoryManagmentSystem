


// function will add department to db
const addDep = async () => {
      // html elemetns
      let depName = document.querySelector("[data-departmentName]").value;
      let depManager = document.querySelector("[data-departmentManager]").value;
      
      console.log(depName + " - " + depManager);
    // new department values
    const newDep = {
        "Name" : depName,
        "Manager" : depManager
    }
    // post method params
    const params = {
                method : 'POST',
                body : JSON.stringify(newDep),
                headers : {"Content-Type" : "application/json"}
            }
    
    // get datra
    const url = `https://localhost:44333/api/Department`
    
    // handle promise
    const resp = await fetch(url, params);
    const data = await resp.json();
    return data
};


const addDepDetails = async () => {
  // get select element
  const select = document.querySelector("#managersList");
    // getr managers name from session
    let managersNames = sessionStorage.getItem("DEP_MANAGERS_NAMES");
    // if theres value
    if (managersNames) {
      try {
        // convert back from json string to js obj
        const managerDetailsObj = JSON.parse(managersNames);
        // noooooww fucking loop through the managers name object -------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!---------- 2hrs it took!!!!!!!!!!!!!!
        for (let depID in managerDetailsObj) {
            // set encrypted data to the iteration
          let encodedData = managerDetailsObj[depID];
          // decrypt
          let decryptedObj = encodedData
          // prove im right
             let selectOption = document.createElement("option");
             selectOption.innerText = decryptedObj.managerName
             selectOption.value = decryptedObj.managerID;
             select.appendChild(selectOption)
             let spanText = document.createElement("span");
             spanText.innerText = ` - ${decryptedObj.depName}`
             selectOption.appendChild(spanText);
        }

      const url = "https://localhost:44333/api/Employees";
      const resp = await fetch(url)
      const employees = await resp.json();

      // create a seperation in the dropdown
      let newDisablewdOption = document.createElement("option");
      newDisablewdOption.textContent = " - All Employees";
      newDisablewdOption.disabled = true;
      select.insertAdjacentElement("beforeend",newDisablewdOption)

    // now create all employees options
    employees.forEach(emp => {
        let option = document.createElement("option");
        option.textContent = emp.First_Name + " " + emp.Last_Name
        option.value = emp.ID
        select.insertAdjacentElement("beforeend", option);
    } )      

        // specify the error
      } catch (error) {
        console.error("Error while decrypting managersNames:", error);
      }
    } else {
      console.error("managersNames is empty or not available in sessionStorage");
    }
  };

  // fire func
