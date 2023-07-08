// popup
let modal = document.querySelector(".modal");
let modalHeader = document.querySelectorAll(".modal > h3")


const getDepartments = async () => {
    let tableElem = document.querySelector('tbody');
    const url = "https://localhost:44333/api/Department/";
    const resp = await fetch(url);
    const departments = await resp.json();
  
    const managerDetailsObj = {};
  
    departments.forEach(async dep => {
        // create row 
        let tr = document.createElement("tr");
        // two cells for values
            let cell = document.createElement("td");
            cell.textContent = dep.Name;
            let cell2 = document.createElement("td");
            // call getUser for manager name
            cell2.textContent = dep.ManagerName;
            // append to html
            tableElem.appendChild(tr);
            tr.appendChild(cell);
            tr.appendChild(cell2);
            // create 3 buttons for each row
            // delete btn
            let btnDelete = document.createElement("span");
            btnDelete.innerHTML = `&#128465`;
            btnDelete.value = `${dep.ID}`;
            //css
            btnDelete.className = "tableBtnDelete"
            btnDelete.style = "text-decoration: underline; text-decoration-color: red";

            btnDelete.addEventListener("click", (e)=>{
                let id = Number(e.target.value)
                deleteDep(id)
            })

            // edit btn
            let btnEdit = document.createElement("span");
            btnEdit.innerHTML = `&#128394`;
            btnEdit.value = `${dep.ID}`;
            //css
            btnEdit.className = "tableBtnEdit"
            tr.insertAdjacentElement("beforeend", btnEdit)

            // add event to edit btn
            btnEdit.addEventListener("click", (e) => {
                let id= Number(e.target.value);
               getDepartment(id)
            })

            // append to html
            tr.insertAdjacentElement("beforeend", btnEdit);
            // if no employees append
            !dep.hasOtherEmployees? tr.insertAdjacentElement("beforeend",btnDelete) : false;

            tableElem.insertAdjacentElement("beforeend",tr);

            // mangers names object
            let manNames = {
                depName: dep.Name,
                managerID: dep.Manager,
                managerName: dep.ManagerName,
              };
            
              // encrypt the manager details
              let manEncryptedObj = manNames;
            
              // encrypted manager object to the object with department ID
              managerDetailsObj[dep.ID] = manEncryptedObj;
            });
          
            // Store the managerDetailsObj in sessionStorage as a JSON string
            sessionStorage.setItem("DEP_MANAGERS_NAMES", JSON.stringify(managerDetailsObj));
          };


// get the department and save in local storage
const getDepartment = async (id) => {
    // fetch url
    url = `https://localhost:44333/api/Department/${id}`;

    // fetch data
    const resp = await fetch(url)
    // res to json
    const departmentData = await resp.json();
    
    // save in session storage
    let dep_Obj = {
        "DEP_ID": departmentData.ID,
        "DEP_NAME" : departmentData.Name,
        "DEP_MANAGER" : departmentData.ManagerName,
        "DEP_MANAGER_ID" : departmentData.Manager
    }
    sessionStorage.setItem("DEP_TO_EDIT", JSON.stringify(dep_Obj));
    location.href = "./departmentEdit.html";
}


// add department lick to page
const addDepartmentLink = () => {
    location.href = "./departmentAdd.html";
}
    

// function will delete a department
const deleteDep = async (id) => {

    const url = `https://localhost:44333/api/Department/${id}`;
    const params = {
        method: 'DELETE',
        "Content-Type": 'application/json'
    }

    const res = await fetch(url, params)
    const departments = await res.json();
    modalHeader[0].innerText = `Department Deleted successfully`
    modal.classList.toggle('animate');
    return departments
}




