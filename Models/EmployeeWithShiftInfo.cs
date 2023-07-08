using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace ASP.NET_Final_Project.Models
{
    public class EmployeeWithShiftInfo
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public int StartYear { get; set; }
        public string Department { get; set; }
        public List<EmpShift> Shifts { get; set; }
    }

    public class EmpShift
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Start { get; set; }
        public int End { get; set; }
    }
}