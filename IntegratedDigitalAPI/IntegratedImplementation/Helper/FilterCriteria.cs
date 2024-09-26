using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Helper
{

    public class FilterDetail
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public List<FilterCriteria> Criteria { get; set; } = null!;
    }

    public class FilterCriteria
    {
        public string ColumnName { get; set; } = null!;
        public string FilterValue { get; set; } = null!;
    }
}
