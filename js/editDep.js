let departmentName = document.getElementById("depName");
let departmentManager = document.getElementById("depManager");
let selectParent = document.querySelector("select");

// get departemnt data from  local storage
const getDepartmentData = async () => {
    let departmentName = document.getElementById("depName");
    let departmentManager = document.getElementById("depManager");
    // get department data from session storage
    let dep_data = sessionStorage.getItem("DEP_TO_EDIT")
    dep_data = JSON.parse(dep_data)

    // update html elements wityh calue
    // create the first option on select
    let option = document.createElement("option");
    option.textContent = `${dep_data["DEP_MANAGER"]} - Current Manager`; 
    option.disabled = true;
    option.selected = true;
    option.value = dep_data["DEP_MANAGER_ID"];
    selectParent.appendChild(option);

    departmentName.value = dep_data["DEP_NAME"]; 
    departmentName.name = dep_data["DEP_ID"]; 
}


// function will fill select option with managers or employees
const getPotentialManagers =  async () => {

    const url = "https://localhost:44333/api/Employees";
    const resp = await fetch(url)
    const employees = await resp.json();

    // create a seperation in the dropdown
    let newDisablewdOption = document.createElement("option");
    newDisablewdOption.textContent = " - All Employees";
    newDisablewdOption.disabled = true;
    selectParent.insertAdjacentElement("beforeend",newDisablewdOption)

    // now create all employees options
    employees.forEach(emp => {
        let option = document.createElement("option");
        option.textContent = emp.First_Name + " " + emp.Last_Name
        option.value = emp.ID
        selectParent.insertAdjacentElement("beforeend", option);
    } )
    
}



// function will edit departmetn
const editDepartment = async () => {
    
    // get values for put method
    let managerID = departmentManager.value;
    let departmentID = departmentName.name;
    departmentName = departmentName.value;

    // update department
    const newDep = {
        "Name" : departmentName,
        "Manager" : managerID
    }

    // fetch params
    const params = {
        method: "PUT",
        body : JSON.stringify(newDep),
        headers : {"Content-Type" : "application/json"}
    }

    // fetch put
    const url = `https://localhost:44333/api/Department/${departmentID}`;
    const resp = await fetch(url, params);
    const departments = await resp.json();
    return departments
}


