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
    public class ShiftsController : ApiController
    {
        ShiftBL shiBL = new ShiftBL();
        // GET: api/Shifts
        public IEnumerable<Shift> Get()
        {
            return shiBL.GetShifts();
        }

        // GET: api/Shifts/5
        public Shift Get(int id)
        {
            return shiBL.GetShift(id);
        }

        // POST: api/Shifts
        public string Post(Shift s)
        {
            return shiBL.AddShift(s);
        }

    }
}
