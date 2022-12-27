using Application.Users;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return await Mediator.Send(new UserList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetById(Guid id)
        {
            return await Mediator.Send(new UserDetails.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            return Ok(await Mediator.Send(new CreateUser.Command { User = user }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(Guid id, User user)
        {
            user.Id = id;

            return Ok(await Mediator.Send(new EditUser.Command { User = user }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            return Ok(await Mediator.Send(new DeleteUser.Command { Id = id }));
        }
    }
}
