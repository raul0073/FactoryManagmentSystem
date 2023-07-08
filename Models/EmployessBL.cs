using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Final_Project.Models
{
    public class EmployessBL
    {
        ASP_Final_ProjectEntities db = new ASP_Final_ProjectEntities();

        // get all employees
        public List<Employee> GetEmployees()
        {
            return db.Employees.ToList();
        }

        // get a emploayee
        public Employee GetEmployee(int id)
        {
            return db.Employees.Where(x => x.ID == id).FirstOrDefault();
        }

        // add user
        public string AddEmployee(Employee u)
        {
            db.Employees.Add(u);
            db.SaveChanges();

            return u.First_Name + " Created!";
        }

        // update employee
        public string UpdateEmployess(int id, Employee u)
        {
            Employee ur = db.Employees.Where(x => x.ID == id).First();
            ur.First_Name = u.First_Name;
            ur.Last_Name = u.Last_Name;
            ur.Department_ID = u.Department_ID;
            ur.Strat_Work_Year = u.Strat_Work_Year;
            db.SaveChanges();

            return u.First_Name + " Updated!";
        }

        // delete employee
        public string DeleteEmployee(int id)
        {
            Employee d = db.Employees.Where(x => x.ID == id).First();
            db.Employees.Remove(d);
            db.SaveChanges();
            return d.First_Name + " Deleted!";
        }
    }
}