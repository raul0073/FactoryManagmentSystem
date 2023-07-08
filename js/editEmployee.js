// function to set all input with employee data
const editEmployee = async () => {
  // get all htrml elements
  const nameInput = document.querySelector("#empFname");
  const yearInput = document.querySelector("#empYear");
  const depSelect = document.querySelector("#empDep");
  let addBtn = document.querySelector("[data-add-shift]");
  let updateBtn = document.querySelector("[data-update-shift]");

  // get emp data from session storage
  let emp_data = sessionStorage.getItem("TEMP_EMP");
  emp_data = JSON.parse(emp_data);
  console.log(emp_data);

  // set input value
  nameInput.value = emp_data["NAME"];
  yearInput.value = emp_data["YEAR"];

  // set add btn event and value
  addBtn.value = emp_data["ID"];
  addBtn.addEventListener("click", () => {
    location.href = "./addShiftToEmployee.html";
  });

  // set update btn value and event
  updateBtn.value = emp_data["ID"];
  updateBtn.addEventListener("click", async (e) => {
    // get id
    let id = e.target.value;

    // update department
    // dep obj
    const newEmp = {
      // manipulate string from html
      First_Name: nameInput.value.substring(0, nameInput.value.indexOf(" ")),
      Last_Name: nameInput.value.substring(nameInput.value.indexOf(" ") + 1),
      Strat_Work_Year: yearInput.value,
      Department_ID: depSelect.value,
    };

    // fetch params
    const params = {
      method: "PUT",
      body: JSON.stringify(newEmp),
      headers: { "Content-Type": "application/json" },
    };
    const url = `https://localhost:44333/api/Employees/${id}`;
    const resp = await fetch(url, params);
    const data = await resp.json();
    return data;
  });

  // get all departments data
  const url = "https://localhost:44333/api/Department";
  const resp = await fetch(url);
  const departmentsData = await resp.json();

  departmentsData.forEach((dep) => {
    let selectOption = document.createElement("option");
    selectOption.textContent = dep.Name;
    selectOption.value = dep.ID;
    depSelect.appendChild(selectOption);
  });
  // remove item ----- this doesnt workj
  sessionStorage.removeItem(emp_data);
};
