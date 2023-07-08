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
    public class DepartmentController : ApiController
    {
        DepartmentBL dBL = new DepartmentBL();
        // GET: api/Department
        public IEnumerable<Department> Get()
        {
            return dBL.GetDepartments();
        }

        // GET: api/Department/5
        public Department Get(int id)
        {
            return dBL.GetDepartment(id);
        }

        // POST: api/Department
        public string Post(Department c)
        {
            return dBL.AddDepartment(c);
        }

        // PUT: api/Department/5
        public string Put(int id, Department c)
        {
            return dBL.UpdateDepartment(id, c);
        }

        // DELETE: api/Department/5
        public string Delete(int id)
        {
            return dBL.DeleteDepartment(id);
        }
    }
}
