using Application.Clients;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ClientController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Client>>> GetClients()
        {
            return await Mediator.Send(new ClientsList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetById(int id)
        {
            return await Mediator.Send(new ClientDetails.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateClient(Client Client)
        {
            return Ok(await Mediator.Send(new CreateClient.Command { Client = Client }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditClient(int id, Client Client)
        {
            Client.Id = id;

            return Ok(await Mediator.Send(new EditClient.Command { Client = Client }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            return Ok(await Mediator.Send(new DeleteClient.Command { Id = id }));
        }
    }
}
