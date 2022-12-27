using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobDay> JobDays { get; set; }
        public DbSet<WorkPlace> WorkPlaces { get; set; }
        public DbSet<Role> Roles { get; set; }
    }
}
