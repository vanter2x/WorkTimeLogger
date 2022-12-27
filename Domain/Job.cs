namespace WorkTimeLogger.Domain.Entities
{
    public class Job
    {
        public int Id { get; set; }
        public DateTime WorkStart { get; set; }
        public DateTime WorkEnd { get; set; }
        public string Description { get; set; }
        public int WorkPlaceId { get; set; }

        public virtual WorkPlace WorkPlace { get; set; }
    }
}
