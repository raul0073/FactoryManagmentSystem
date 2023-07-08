using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Final_Project.Models
{
    public class EmployeeWithShiftInfoBL
    {
        ASP_Final_ProjectEntities db = new ASP_Final_ProjectEntities();
        public List<EmployeeWithShiftInfo> GetAllEmployeesShiftInfo()
        {
            // create new instance
            var employeeShiftInfos = new List<EmployeeWithShiftInfo>();
            
            // loop through employees
            foreach (var employee in db.Employees)
            {
                // create brand new shifts object for EmpoloyeeWithShitfsInfo

                var shifts = db.EmployeeShifts

                    .Where(es => es.Employee_ID == employee.ID)

                    // join shifts with EmployeeShifts
                    .Join(
                        db.Shifts,
                        es => es.Shift_ID,
                        s => s.ID,
                        // new instance
                        (es, s) => new EmpShift
                        {
                            Id = s.ID,
                            Date = s.Date,
                            Start = s.Strat_Time,
                            End = s.End_Time
                        })
                    .ToList();

                // add employee info to the base instance
                var employeeShiftInfo = new EmployeeWithShiftInfo()
                {
                    Id = employee.ID,
                    FullName = employee.First_Name + " " + employee.Last_Name,
                    StartYear = employee.Strat_Work_Year,
                    Department = "",
                    Shifts = shifts
                };

                var department = db.Departments.FirstOrDefault(d => d.ID == employee.Department_ID);

                if (department == null)
                {
                    employeeShiftInfo.Department = "Not Assigned";
                }
                else
                {
                    employeeShiftInfo.Department = department.Name;
                }

                // combine the two
                employeeShiftInfos.Add(employeeShiftInfo);
            }

            return employeeShiftInfos;
        }     
            
    }
}