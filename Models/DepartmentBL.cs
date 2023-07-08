using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Final_Project.Models
{
    public class DepartmentBL
    {
        ASP_Final_ProjectEntities db = new ASP_Final_ProjectEntities();

        // get all departments with manager name
        public List<Department> GetDepartments()
        {
            var departments = db.Departments.ToList();

            foreach (var department in departments)
            {
                var manager = db.Employees.FirstOrDefault(emp => emp.ID == department.Manager);

                if (manager != null)
                {
                    department.ManagerName = $"{manager.First_Name} {manager.Last_Name}";
                }
                else
                {
                    department.ManagerName = " - No Manager Assigned";
                }

                bool hasOtherEmployees = db.Employees.Any(emp => emp.Department_ID == department.ID && emp.ID != department.Manager);
                department.hasOtherEmployees = hasOtherEmployees;
            }
            return departments;
        }

        // get a department
        public Department GetDepartment(int id)
        {
            var department = db.Departments.FirstOrDefault(d => d.ID == id);

            if (department != null)
            {
                var manager = db.Employees.FirstOrDefault(emp => emp.ID == department.Manager);

                if (manager != null)
                {
                    department.ManagerName = $"{manager.First_Name} {manager.Last_Name}";
                }
                else
                {
                    department.ManagerName = "No Manager Assigned";
                }
            }

            return department;
        }

        // add department
        public string AddDepartment(Department d)
        {
            db.Departments.Add(d);
            db.SaveChanges();

            return d.Name + " Created!";
        }

        // update department
        public string UpdateDepartment(int id, Department u)
        {
            Department ur = db.Departments.Where(x => x.ID == id).First();
            ur.Name = u.Name;
            ur.Manager = u.Manager;
            db.SaveChanges();

            return u.Name + " Updated!";
        }

        // delete department
        public string DeleteDepartment(int id)
        {
            Department c = db.Departments.FirstOrDefault(x => x.ID == id);

            // in any case of deleting a department with employees set employee dep to 0
            if (c != null) {
                foreach (var emp in db.Employees) 
                {
                    if (emp.Department_ID == id)
                    {
                        emp.Department_ID = 0;
                    }   
                }
                db.Departments.Remove(c);
                db.SaveChanges();
                return c.Name + " Deleted!";
            }
            return "No Department Found!";
        }
        
    }
}