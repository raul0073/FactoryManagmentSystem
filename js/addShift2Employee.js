// html parent element
let selectEmpsElem = document.querySelector("[data-shift-employees]");
// get html elem
const shiftsElem = document.querySelector("[data-shifts]");

const getAllEmployees = async () => {
  // btns
  const btnGetEmps = document.querySelector("[data-get-all-employees]");

  //get this employee details
  let emp_data = sessionStorage.getItem("TEMP_EMP");
  // parse data
  emp_data = JSON.parse(emp_data);

  let thisEmpId = emp_data["ID"];
  let thisEmpName = emp_data["NAME"];
  let selectedOption = document.createElement("option");

  // set first option to be this user selected
  selectedOption.innerText = thisEmpName;
  selectedOption.selected = true;
  selectedOption.value = thisEmpId;
  selectEmpsElem.insertAdjacentElement("afterbegin", selectedOption);

  // add get all emps option
  btnGetEmps.addEventListener("click", async () => {
    // fetch url and response
    const url = "https://localhost:44333/api/EmployeeWithShiftInfo";

    const resp = await fetch(url);
    const employees = await resp.json();

    employees.forEach((employee) => {
      let option = document.createElement("option");
      option.value = employee.id;
      option.innerText = employee.FullName;
      option.id = "employeeName";
      selectEmpsElem.insertAdjacentElement("beforeend", option);
    });
    btnGetEmps.innerHTML = `Employees added to select &#8593;`;
  });
};

// function will add shift to employee
const AddShiftToEmployee = async () => {
  // fetch all shifts
  const url = "https://localhost:44333/api/Shifts";
  const resp = await fetch(url);
  const shiftsData = await resp.json();

  // loop through shifts
  shiftsData.forEach((shift) => {
    let option = document.createElement("option");

    // set each option value as id number
    option.value = shift.ID;

    // present a normal formatted date
    let formattedDate = new Date(shift.Date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // option inner as date obj
    option.innerText = formattedDate;
    shiftsElem.insertAdjacentElement("beforeend", option);
  });

  // add bt
  const btnAddShift = document.querySelector("[data-add-shifttoemployee]");
  const empData = document.querySelector("[data-shift-employees]");
  // fetch post
  btnAddShift.addEventListener("click", async () => {
    const addShiftObj = {
      Shift_ID: shiftsElem.value,
      Employee_ID: Number(empData.value),
    };
    console.log(addShiftObj);
    // post method params
    const params = {
      method: "POST",
      body: JSON.stringify(addShiftObj),
      headers: { "Content-Type": "application/json" },
    };

    const url2 = `https://localhost:44333/api/EmployeeShift/`;
    const resp2 = await fetch(url2, params);
    const shiftsData2 = await resp2.json();
    console.log(shiftsData2);
    return shiftsData2;
  });
};
