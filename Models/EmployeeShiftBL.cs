using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Final_Project.Models
{
    public class EmployeeShiftBL
    {
        ASP_Final_ProjectEntities db = new ASP_Final_ProjectEntities();

        // get all employees shift
        public List<EmployeeShift> GetEmployeeShifts()
        {
            return db.EmployeeShifts.ToList();
        }

        // get a emploayee shift
        public EmployeeShift GetEmployeeShift(int id)
        {
            return db.EmployeeShifts.Where(x => x.ID == id).FirstOrDefault();
        }

        // add employee to shift 
        public string AddEmployeeShift(EmployeeShift u)
        {
            // check if the employee is already assigned to the shift
            var emp = db.EmployeeShifts
                .Where(e => e.Employee_ID == u.Employee_ID && e.Shift_ID == u.Shift_ID)
                .FirstOrDefault();
            
            if (emp != null)
            {
                return "Employee already assigned to this shift!";
            }
            else
            {
                db.EmployeeShifts.Add(u);
                db.SaveChanges();
            }

            return "Employee added to shift!";
        }

        // update employee
        public string UpdateEmployeeShift(int id, EmployeeShift u)
        {
            EmployeeShift ur = db.EmployeeShifts.Where(x => x.ID == id).First();
            ur.Employee_ID = u.Employee_ID;
            ur.Shift_ID = u.Shift_ID;
            db.SaveChanges();

            return " Updated!";
        }

        // delete employee
        public string DeleteEmployeeShift(int id)
        {
            var empList = db.Employees.ToList();

            EmployeeShift d = db.EmployeeShifts.Where(x => x.ID == id).First();
            // delete the employee as well
            var emp = db.Employees.Where(e => e.ID == id).FirstOrDefault();
            // assign 0 as manager to the dep manager if employee is a manager
            var dep = db.Departments.FirstOrDefault(de => de.Manager == id);
            // if there is
            if (dep != null)
            {
                dep.Manager = 0;
                dep.ManagerName = "Not Assigned";
                db.SaveChanges();
            }
            
            db.EmployeeShifts.Remove(d);
            db.Employees.Remove(emp);
            db.SaveChanges();
            return " Deleted!";
        }
    }
}