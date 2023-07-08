using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Final_Project.Models
{
    public class EmployeesWithDepartmentInfo 
    {
        public int ID { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public int Strat_Work_Year { get; set; }
        public int Department_ID { get; set; }
        public string Department_Name { get; set; }

        public string Department_Manager { get; set; }

    }
}