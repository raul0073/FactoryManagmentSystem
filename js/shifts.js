
// function will get shifts info and create a table with data
const getShiftsInfo = async () => {
    // get table element
    const table = document.querySelector('tbody');
    // fetch data
    const url = "https://localhost:44333/api/Shifts/";
    const resp = await fetch(url);
    const data = await resp.json();

    // for each shift
    data.forEach(shift => {
        // create table row
        let tr = document.createElement("tr");
        // create cell
        let dateCell = document.createElement("td");
        // present normal date
        let formattedDate = new Date(shift.Date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        // date cell
        dateCell.innerText = formattedDate;
        dateCell.id = shift.ID;
        tr.appendChild(dateCell);

        // start time cell
        let startCell = document.createElement("td");
        startCell.textContent = `${shift.Strat_Time}:00`;
        tr.appendChild(startCell);
        // end time cell
        let endCell = document.createElement("td");
        endCell.textContent = `${shift.End_Time}:00`;

        tr.appendChild(endCell);

        // employees cell
        let employeesCell = document.createElement("td");

        // if shift has multi employees 
        if (shift.Shift_Employees.length > 0) {
            let employeesText = '';
            for (let i = 0; i < shift.Shift_Employees.length; i++) {
                // make name as span for size, set value as id
                employeesText += `<span class="employee" id="${shift.Shift_Employees_ID[i]}">${shift.Shift_Employees[i]}</span>`;
                // add sperator
                if (i !== shift.Shift_Employees.length - 1) {
                    employeesText += ', ';
                }
            }
            employeesCell.innerHTML = employeesText;
            // add click event to each employee
            employeesCell.addEventListener("click", (e)=> { 
                let id = e.target.id
                redirectToEditEmployee(id)
            });
            // if has none
        } else {
            employeesCell.innerText = "No employees assigned";
            employeesCell.style = "color: #24242483;"
        }

        tr.appendChild(employeesCell);
        table.appendChild(tr);
    });
};


// function will redirect to edit employee page
const redirectToEditEmployee = async (id) => {
    // fetch data
    const url = `https://localhost:44333/api/EmployeesWithDepartmentInfo/${id}`
    const resp = await fetch(url)
    const data = await resp.json();

    // store object in storage
    let tep_emp_obj ={
        "ID" : data.ID,
        "NAME": `${data.First_Name} ${data.Last_Name}`,
        "YEAR": data.Strat_Work_Year,
        "DEP" : data.Department_ID
    };

    // encrypt obj

    // set to session stroage to read data in edit page
    sessionStorage.setItem("TEMP_EMP", JSON.stringify(tep_emp_obj))
    location.href = `./editEmployee.html`;
}      

// go to add shift page
const goAddShift = () => {
    location.href = "./addShift.html"
}