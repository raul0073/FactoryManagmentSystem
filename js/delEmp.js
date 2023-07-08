const deleteEmp = async (id) => {
    // get html elemmts

    // delete params
    const params = {
    method: 'DELETE',
    "Content-Type": 'application/json'
    }
    const url = `https://localhost:44333/api/EmployeeShift/${id}`
    const resp = await fetch(url, params);
    const data = await resp.json();
    console.log("deleted")
    return data
 
};