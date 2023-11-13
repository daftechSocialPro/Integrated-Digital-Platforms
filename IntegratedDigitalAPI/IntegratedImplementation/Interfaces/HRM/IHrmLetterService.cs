using IntegratedImplementation.Services.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IHrmLetterService
    {
        Task<ContractLetterDto> GetContractLetter(string historyId);
    }
}
