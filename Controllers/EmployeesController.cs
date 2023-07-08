using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ASP.NET_Final_Project.Models;
using System.Web.Http.Cors;

namespace ASP.NET_Final_Project.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmployeesController : ApiController
    {
        EmployessBL empBL = new EmployessBL();

        // GET: api/Employees
        public IEnumerable<Employee> Get()
        {
            return empBL.GetEmployees();
        }

        // GET: api/Employee/5
        public Employee Get(int id)
        {
            return empBL.GetEmployee(id);
        }

        // POST: api/Employee
        public string Post(Employee c)
        {
            return empBL.AddEmployee(c);
        }

        // PUT: api/Employee/5
        public string Put(int id, Employee c)
        {
            return empBL.UpdateEmployess(id, c);
        }

        // DELETE: api/Employee/5
        public string Delete(int id)
        {
            return empBL.DeleteEmployee(id);
        }
    }
}
