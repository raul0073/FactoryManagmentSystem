// get all employees with shifts details
const getEmployees = async () => {
  // fetch url and response
  const url = "https://localhost:44333/api/EmployeeWithShiftInfo";
  const resp = await fetch(url);
  const employees = await resp.json();

  // table element from document
  const tableElem = document.querySelector("tbody");

  // for each employee in response
  employees.forEach(async (emp) => {
    // get object keys
    let keys = Object.keys(emp);
    // create row
    let tr = document.createElement("tr");
    // loop through emp for thew length of the keys
    // DONT GET ID KEY so i - 1
    for (let i = 0; i < keys.length; i++) {
      // creat cell element for each data value
      let cell1 = document.createElement("td");
      const ul = document.createElement("ul");
      // if we got to shits
      if (i === 4) {
        // loop through all employee shifts
        emp[keys[4]].forEach((shift) => {
          // create list elem

          let li1 = document.createElement("li");
          // slice the date string
          // add the shift time to the same list elem
          li1.textContent = `${shift.Date.slice(0, 10)} - ${shift.Start} - ${
            shift.End
          }`;
          li1.className = "shiftList";
          // append list elem
          ul.insertAdjacentElement("afterbegin", li1);
          tr.appendChild(ul);
        });

        // show more employee shifts typeofbtn
        let showMoreBtn = document.createElement("a");
        showMoreBtn.innerText = "Show More...";
        showMoreBtn.className = "more";
        // append btn
        tr.appendChild(showMoreBtn);

        // add event to each show more btn
        showMoreBtn.addEventListener("click", (e) => {
          // find tr where this li is
          let parent = e.target.parentNode;
          // select all li items in that row
          let shiftLi = parent.querySelectorAll("li");
          // toggle to class show
          shiftLi.forEach((item) => {
            item.classList.toggle("show");
          });
        });
      }
      // loop through emp.KEYS in index i
      cell1.textContent = emp[keys[i]];
      tableElem.appendChild(tr);
      // after shifts stop appending
      if (i != 4) {
        tr.appendChild(cell1);
      }
    }

    // delete btn
    let btnDelete = document.createElement("btn");
    btnDelete.innerText = `Delete`;
    // take emp Id as value
    btnDelete.value = emp.Id;
    btnDelete.style = "text-decoration: underline; text-decoration-color: red";
    btnDelete.className = "tableBtnDelete";
    // add delkete btn event listenier
    btnDelete.addEventListener("click", async (e) => {
      let id = e.target.value;
      deleteEmp(id);
    });

    // edit btn
    let btnEdit = document.createElement("btn");
    btnEdit.innerText = `Edit`;
    // take emp Id as value
    btnEdit.value = emp.Id;
    btnEdit.className = "tableBtnEdit";

    btnEdit.addEventListener("click", async (e) => {
      let id = Number(e.target.value);
      getEmployeeDetails(id);
      location.href = "./editEmployee.html";
    });

    // addShift btn
    let btnAdd = document.createElement("btn");
    btnAdd.innerText = `Add`;
    // take emp Id as value
    btnAdd.value = emp.Id;
    btnAdd.className = "tableBtnAdd";

    btnAdd.addEventListener("click", async (e) => {
      let id = Number(e.target.value);
      getEmployeeDetails(id);
      location.href = "./addShiftToEmployee.html";
    });
    // create 2 buttons for each row
    let btnCell = document.createElement("td");

    // both bvtns in the same cell
    btnCell.appendChild(btnEdit);
    btnCell.appendChild(btnDelete);
    btnCell.appendChild(btnAdd);
    tr.insertAdjacentElement("beforeend", btnCell);
  });
};

// get employee fetails on click and store in session storage for next page
const getEmployeeDetails = async (id) => {
  sessionStorage.removeItem("TEMP_EMP");
  const url = `https://localhost:44333/api/Employees/${id}`;
  const resp = await fetch(url);
  const data = await resp.json();

  // store object in storage
  let tep_emp_obj = {
    ID: data.ID,
    NAME: `${data.First_Name} ${data.Last_Name}`,
    YEAR: data.Strat_Work_Year,
    DEP: data.Department_ID,
  };

  sessionStorage.setItem("TEMP_EMP", JSON.stringify(tep_emp_obj));
};

// delete employee
const deleteEmp = async (id) => {
  // get html elemmts
  // delete params
  const params = {
    method: "DELETE",
    "Content-Type": "application/json",
  };
  const url = `https://localhost:44333/api/EmployeeShift/${id}`;
  const resp = await fetch(url, params);
  const data = await resp.json();
  console.log("deleted");
  return data;
};
