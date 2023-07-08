using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Final_Project.Models
{
    public class EmployeesWithDepartmentInfoBL
    {
        ASP_Final_ProjectEntities db = new ASP_Final_ProjectEntities();
        public List<EmployeesWithDepartmentInfo> getAllEmployeesWithDepartmentInfo()
        {
            // new class object
            var empFull = new List<EmployeesWithDepartmentInfo>();

            // get all employees
            foreach (var employee in db.Employees)
            {
                var emp = new EmployeesWithDepartmentInfo();
                // add data to object
                emp.First_Name = employee.First_Name;
                emp.Last_Name = employee.Last_Name;
                emp.Strat_Work_Year = employee.Strat_Work_Year;
                emp.Department_ID = employee.Department_ID;

                // get the department
                var empDep = db.Departments.Where(dep => dep.ID == emp.Department_ID);
                
                // get the dep data
                foreach (var dep in empDep)
                {
                    emp.Department_ID = dep.ID;
                    emp.Department_Name = dep.Name;
                    var managerName = db.Employees.FirstOrDefault(man => man.ID == dep.Manager);
                    if (dep.Manager == 0)
                    {
                        emp.Department_Manager = "No Manager Assigned";
                    }
                    else
                    {
                        emp.Department_Manager = $"{managerName.First_Name} {managerName.Last_Name}";
                    }
                }
                // save object
                empFull.Add(emp);
                db.SaveChanges();

            }
            return empFull;

        }
        public EmployeesWithDepartmentInfo GetEmployeeWithDepartmentInfo(int id)
        {

            // new class obj
            var emp = new EmployeesWithDepartmentInfo();
            // get employee details
            var empDetails = db.Employees.FirstOrDefault(e => e.ID == id);
            emp.ID = empDetails.ID;
            emp.First_Name = empDetails.First_Name;
            emp.Last_Name = empDetails.Last_Name;
            emp.Strat_Work_Year = empDetails.Strat_Work_Year;
            emp.Department_ID = empDetails.Department_ID;


            // get the department
            var empDep = db.Departments.Where(dep => dep.ID == emp.Department_ID);
            

            // get the dep data
            foreach (var dep in empDep)
            {
                emp.Department_Name = dep.Name;
                var managerName = db.Employees.FirstOrDefault(man => man.ID == dep.Manager);
                if(dep.Manager == 0)
                {
                    emp.Department_Manager = "No Manager Assigned";
                }
                else
                {
                    emp.Department_Manager = $"{managerName.First_Name} {managerName.Last_Name}";
                }
                
            }

            return emp;

        }
    }
}

