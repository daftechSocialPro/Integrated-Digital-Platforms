using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Training
{
    public  record TrainerPostDto
    {
        public Guid TrainingId { get; set; }       
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string CreatedById { get; set; }

    }

    public record TrainerGetDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsEmailSent { get; set; }
    }

    public record TrainerEmailDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }

        public string TrainingId { get; set; }  
    }

 
}
