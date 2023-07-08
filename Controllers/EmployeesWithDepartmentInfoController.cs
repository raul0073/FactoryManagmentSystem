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
    public class EmployeesWithDepartmentInfoController : ApiController
    {
        EmployeesWithDepartmentInfoBL empDepBL = new EmployeesWithDepartmentInfoBL();
        // GET: api/EmployeesWithDepartmentInfo
        public IEnumerable<EmployeesWithDepartmentInfo> Get()
        {
            return empDepBL.getAllEmployeesWithDepartmentInfo();
        }

        //GET: api/EmployeesWithDepartmentInfo/5
        public EmployeesWithDepartmentInfo Get(int id)
        {
            return empDepBL.GetEmployeeWithDepartmentInfo(id);
        }

        //// POST: api/EmployeesWithDepartmentInfo
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT: api/EmployeesWithDepartmentInfo/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE: api/EmployeesWithDepartmentInfo/5
        //public void Delete(int id)
        //{
        //}
    }
}
