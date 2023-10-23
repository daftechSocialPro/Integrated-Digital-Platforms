namespace IntegratedImplementation.DTOS.Configuration
{
    public record UnitOfMeasurmentGetDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string LocalName { get; set; }
        public string Type { get; set; }
        
    }

    public record UnitOfMeasurmentPostDto
    {


        public string Name { get; set; }
        public string LocalName { get; set; }
        public string Type { get; set; }

        public string CreatedById { get; set; } = null;
    }
}
