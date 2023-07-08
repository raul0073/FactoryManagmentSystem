using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using ASP.NET_Final_Project.Models;

namespace ASP.NET_Final_Project.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        UserBL uBL = new UserBL();
        // get all cars
        // GET: api/cars
        public IEnumerable<User> Get()
        {
            return uBL.GetUsers();
        }

        // get a car by id
        // GET: api/Cars/1
        public User Get(int id)
        {
            return uBL.GetUser(id);
        }

        // POST: api/Car
        public string Post(User c)
        {
            return uBL.AddUser(c);
        }

        // update car
        public string Put(int id, bool isBlocked)
        {
            return uBL.UpdateUser(id, isBlocked);
        }
        // DELETE: api/car/5
        public string Delete(int id)
        {
            return uBL.DeleteUser(id);
        }
    }
}
