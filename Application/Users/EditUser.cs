﻿using AutoMapper;
using Domain.Entities;
using MediatR;
using Persistence;

namespace Application.Users
{
    public class EditUser
    {
        public class Command : IRequest
        {
            public User User { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FindAsync(request.User.Id);

                _mapper.Map(request.User, user);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
