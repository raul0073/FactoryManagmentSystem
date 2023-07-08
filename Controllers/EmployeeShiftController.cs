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
    public class EmployeeShiftController : ApiController
    {
        EmployeeShiftBL empShiBL = new EmployeeShiftBL();

        // GET: api/Employees
        public IEnumerable<EmployeeShift> Get()
        {
            return empShiBL.GetEmployeeShifts();
        }

        // GET: api/Employee/5
        public EmployeeShift Get(int id)
        {
            return empShiBL.GetEmployeeShift(id);
        }

        // POST: api/Employee
        public string Post(EmployeeShift c)
        {
            return empShiBL.AddEmployeeShift(c);
        }

        // PUT: api/Employee/5
        public string Put(int id, EmployeeShift c)
        {
            return empShiBL.UpdateEmployeeShift(id, c);
        }

        // DELETE: api/Employee/5
        public string Delete(int id)
        {
            return empShiBL.DeleteEmployeeShift(id);
        }
    }
}
