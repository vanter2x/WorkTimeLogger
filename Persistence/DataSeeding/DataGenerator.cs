using Bogus;
using Domain.Entities;

namespace Persistence.DataSeeding
{
    public sealed class DataGenerator : IDataGenerator
    {
        private readonly string _local = "pl";

        public IEnumerable<User> GetUsers()
        {
            var usersGenerator = new Faker<User>(_local)
                .RuleFor(a => a.FirstName, f => f.Name.FirstName())
                .RuleFor(a => a.LastName, f => f.Name.LastName())
                .RuleFor(a => a.Email, f => f.Internet.Email())
                .RuleFor(a => a.Phone, f => f.Phone.PhoneNumber());

            Random rnd = new Random();

            var users = usersGenerator.Generate(20);
            users.ForEach(u =>
            {
                u.RoleId = rnd.Next(1, 4);
                u.Id = new Guid();
            });

            return users;
        }

        public IEnumerable<Client> GetClients()
        {
            var clientGenerator = new Faker<Client>(_local)
                .RuleFor(a => a.FirstName, f => f.Name.FirstName())
                .RuleFor(a => a.LastName, f => f.Name.LastName())
                .RuleFor(a => a.Email, f => f.Internet.Email())
                .RuleFor(a => a.Phone, f => f.Phone.PhoneNumber());


            var clients = clientGenerator.Generate(20);

            return clients;
        }

        public IEnumerable<WorkPlace> GetWorkPlaces()
        {
            var workPlaceGenerator = new Faker<WorkPlace>(_local)
                .RuleFor(a => a.Name, f => f.Company.CompanyName())
                .RuleFor(a => a.City, f => f.Address.City())
                .RuleFor(a => a.Street, f => f.Address.StreetAddress());

            var workPlaces = workPlaceGenerator.Generate(20);

            return workPlaces;
        }

        public IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
            {
                new Role()
                {
                    Name = "User"
                },
                new Role()
                {
                    Name = "Manager"
                },
                new Role()
                {
                    Name = "Admin"
                }
            };
            return roles;
        }
    }
}