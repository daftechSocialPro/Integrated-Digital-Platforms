using System;

namespace IntegratedImplementation.DTOS.Common
{
    public class DependencyCheckDto
    {
        public bool HasDependencies { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}
