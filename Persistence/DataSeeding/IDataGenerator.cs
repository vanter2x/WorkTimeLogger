using Domain.Entities;

namespace Persistence.DataSeeding
{
    public interface IDataGenerator
    {
        IEnumerable<Client> GetClients();
        IEnumerable<Role> GetRoles();
        IEnumerable<User> GetUsers();
        IEnumerable<WorkPlace> GetWorkPlaces();
    }
}