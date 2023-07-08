using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Final_Project.Models
{
    public class UserBL
    {
        ASP_Final_ProjectEntities db = new ASP_Final_ProjectEntities();

        // get all users
        public List<User> GetUsers()
        {
            return db.Users.ToList();
        }

        // get a user
        public User GetUser(int id)
        {
            var thisUser = db.Users.FirstOrDefault(x => x.ID == id);

            if (thisUser != null && !thisUser.isBlocked == true)
            {
                return thisUser;
            }
            else
            {
                throw new Exception("USER IS BLOCKED");
            }
        }

        // add user
        public string AddUser(User u)
        {
            db.Users.Add(u);
            db.SaveChanges();

            return u.Username + " Created!";
        }

        // update user
        public string UpdateUser(int id, bool isBlocked)
        {
            User user = db.Users.FirstOrDefault(x => x.ID == id);

            if (user != null)
            {
                user.isBlocked = isBlocked;

                return user.Username + " Updated!";
            }
            else
            {
                throw new Exception("User not found");
            }
        }

        // delete product
        public string DeleteUser(int id)
        {
            User c = db.Users.Where(x => x.ID == id).First();
            db.Users.Remove(c);
            db.SaveChanges();
            return c.Username + " Deleted!";
        }
    }
}