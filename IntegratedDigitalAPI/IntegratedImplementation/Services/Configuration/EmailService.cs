using FluentEmail.Core;
using Implementation.Helper;
using IntegratedImplementation.Helper;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Model.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Protocols;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Services.Configuration
{
    public class EmailService:IEmailService
    {
        private readonly IFluentEmail _fluentEmail;
        public EmailService(IFluentEmail fluentEmail)
        {
            _fluentEmail = fluentEmail
                ?? throw new ArgumentNullException(nameof(fluentEmail));
        }
        public async Task<ResponseMessage> Send(EmailMetadata emailMetadata)
        {
            try
            {

                var reason = await _fluentEmail.To(emailMetadata.ToAddress)
              .Subject(emailMetadata.Subject)
              .Body(emailMetadata.Body)
              .SendAsync();
                if (reason.Successful)
                {
                    return new ResponseMessage
                    {                       
                        Message = $"The email sent to {emailMetadata.ToAddress} was successful.",
                        Success = true
                    };
                }
                else
                {
                   
                    return new ResponseMessage
                    {                     
                        Message = $"The email sent to {emailMetadata.ToAddress} was Unsuccessful. due to {reason.ErrorMessages}",
                        Success = false
                    };

                }
            }
            catch(Exception ex)
            {
                return new ResponseMessage
                {
                    
                    Message = ex.Message,
                    Success = false
                };
            }
          
        }
    }
}
