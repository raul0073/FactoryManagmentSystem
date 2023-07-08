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
    [EnableCors(origins: "*", headers: "", methods: "*")]
    public class EmployeeWithShiftInfoController : ApiController
    {
        EmployeeWithShiftInfoBL empShiftBL = new EmployeeWithShiftInfoBL();
        // GET: api/EmployeeWithShiftInfo
        public IEnumerable<EmployeeWithShiftInfo> Get()
        {
            return empShiftBL.GetAllEmployeesShiftInfo();
        }
        // GET: api/EmployeeWithShiftInfo/5
        public IEnumerable<EmployeeWithShiftInfo> Get(int id)
        {
            return empShiftBL.GetAllEmployeesShiftInfo();
        }

        // POST: api/EmployeeWithShiftInfo
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/EmployeeWithShiftInfo/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/EmployeeWithShiftInfo/5
        public void Delete(int id)
        {
        }
    }
}
