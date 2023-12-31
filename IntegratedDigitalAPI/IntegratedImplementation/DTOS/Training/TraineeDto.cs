﻿using IntegratedInfrustructure.Model.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Training
{
    public record TraineeGetDto
    {

        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string EducationalField { get; set; } 
        public string EducationalLevel { get; set; }
        public string Gender { get; set; }

       
    }

    public record TraineePostDto
    {
        public Guid TraningId { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public Guid EducationalFieldId { get; set; }
        public Guid EducationalLevelId { get; set; }
        public string Gender { get; set; }

        

    }
}
