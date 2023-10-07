using Implementation.Helper;
using IntegratedImplementation.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface IEmailService
    {
        Task<ResponseMessage> Send(EmailMetadata emailMetadata);
    }
}
