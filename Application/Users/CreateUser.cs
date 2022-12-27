﻿using Domain.Entities;
using MediatR;
using Persistence;

namespace Application.Users
{
    public static class CreateUser
    {
        public class Command : IRequest
        {
            public User User { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Users.Add(request.User);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
