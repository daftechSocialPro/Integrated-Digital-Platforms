﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Implementation.DTOS.Authentication
{
    public class LoginDto
    {
        [Required]
        public string UserName { get; set; } = null!;

    
        public string? Password { get; set; } = null!;
    }
}
