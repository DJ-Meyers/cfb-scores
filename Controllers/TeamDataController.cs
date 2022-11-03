using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Web;
using CFBSharp.Api;
using CFBSharp.Client;
using CFBSharp.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using cfb_scores.Models;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

namespace cfb_scores.Controllers
{
    public class TeamDataForm
    {
        public string name { get; set; }

        public string startYear { get; set; }

        public string endYear { get; set; }
    }

    [ApiController]
    [Route("[controller]")]
    public class TeamDataController : ControllerBase
    {
        private readonly IConfiguration _config;
        public TeamDataController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        public async Task<ActionResult<ICollection<Game>>>
        Get([FromForm] TeamDataForm inputData)
        {
            // Parse params
            int startYear = int.Parse(inputData.startYear);
            int endYear = int.Parse(inputData.endYear);
            string team = inputData.name;

            Configuration.Default.ApiKey.TryAdd("Authorization", _config["cfb-data-api-key"]);
            Configuration
                .Default
                .ApiKeyPrefix
                .TryAdd("Authorization", "Bearer");

            IEnumerable<Game> games = new List<Game>();
            var apiInstance = new GamesApi();
            try
            {
                for (int year = startYear; year <= endYear; year++)
                {
                    IEnumerable<Game> yearGames =
                        apiInstance.GetGames(year, null, null, team).ToList();
                    games = games.Concat(yearGames);
                }
                return Ok(games);
            }
            catch (Exception e)
            {
                Console.Write("Error: " + e.Message);
                return Ok(games);
            }
        }
    }
}
