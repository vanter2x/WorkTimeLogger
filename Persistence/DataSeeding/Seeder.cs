using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.DataSeeding
{
    public sealed class Seeder
    {
        private readonly DataContext _context;
        private readonly IDataGenerator _dataGenerator;

        public Seeder(DataContext context, IDataGenerator dataGenerator)
        {
            _context = context;
            _dataGenerator = dataGenerator;
        }

        public void SeedData()
        {
            if (!_context.Database.CanConnect())
            {
                throw new Exception();
            }
            
            var pendingMigrations = _context.Database.GetPendingMigrations();

            if (pendingMigrations != null && pendingMigrations.Any())
            {
                _context.Database.Migrate();
            }
            
            if (!_context.Roles.Any())
            {
                var roles = _dataGenerator.GetRoles();
                _context.Roles.AddRange(roles);
                _context.SaveChanges();
            }

            if (!_context.Users.Any())
            {
                var users = _dataGenerator.GetUsers();
                _context.Users.AddRange(users);
                _context.SaveChanges();
            }

            if (!_context.Clients.Any())
            {
                var clients = _dataGenerator.GetClients();
                _context.Clients.AddRange(clients);
                _context.SaveChanges();
            }

            if (!_context.WorkPlaces.Any())
            {
                var workPlaces = _dataGenerator.GetWorkPlaces();
                _context.WorkPlaces.AddRange(workPlaces);
                _context.SaveChanges();
            }
        }
    }
}
