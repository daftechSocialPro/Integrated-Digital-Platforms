using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Services.HRM
{
    public class HrmLetterService : IHrmLetterService
    {
        private readonly ApplicationDbContext _dbContext;
        public HrmLetterService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Task<ContractLetterDto> GetContractLetter(string historyId)
        {
            throw new NotImplementedException();
        }
    }
}
