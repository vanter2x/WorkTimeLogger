namespace Domain.Entities
{
    public class WorkPlace
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Street { get; set; }

        public virtual List<Client> Clients { get; set; }
    }
}
