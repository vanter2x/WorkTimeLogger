﻿using Domain.Entities;
using MediatR;
using Persistence;

namespace Application.Users
{
    public static class UserDetails
    {
        public class Query : IRequest<User>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Users.FindAsync(request.Id);
            }
        }
    }
}
