using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Final_Project.Models
{
    public class ShiftBL
    {
        ASP_Final_ProjectEntities db = new ASP_Final_ProjectEntities();

        // get all shittfs
        public List<Shift> GetShifts()
        {
            var shifts = new List<Shift>();

            foreach (var val in db.Shifts)
            {
             var shiftDetails = new Shift();

             shiftDetails.ID = val.ID;
             shiftDetails.Date = val.Date;
             shiftDetails.Strat_Time = val.Strat_Time;
             shiftDetails.End_Time = val.End_Time;

             shiftDetails.Shift_Employees = new List<string>();
             shiftDetails.Shift_Employees_ID = new List<int>();

             var employees = db.EmployeeShifts.Where(emp => emp.Shift_ID == val.ID);

             foreach (var item in employees)
             {
               var employee = db.Employees.FirstOrDefault(emp => emp.ID == item.Employee_ID);

                if (employee != null)
                 {
                   shiftDetails.Shift_Employees.Add($"{employee.First_Name} {employee.Last_Name}");
                   shiftDetails.Shift_Employees_ID.Add(employee.ID);
                 }
             }

                shifts.Add(shiftDetails);
            }

            db.SaveChanges();
            return shifts;
        }

        // get a shift
        public Shift GetShift(int id)
        {
            return db.Shifts.Where(x => x.ID == id).First();
        }

        // add shift
        public string AddShift(Shift s)
        {
            db.Shifts.Add(s);
            db.SaveChanges();

            return "Shift Created!";
        }


    }
}