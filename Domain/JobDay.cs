namespace WorkTimeLogger.Domain.Entities
{
    public class JobDay
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }

        public virtual List<Job> Jobs { get; set; }
    }
}
