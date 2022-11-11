using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
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
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class BoxScoresController : ControllerBase
    {
        private readonly IConfiguration _config;
        public BoxScoresController(IConfiguration config)
        {
            _config = config;
            try {
                Configuration.Default.ApiKey.TryAdd("Authorization", _config["cfb-data-api-key"]);
                Configuration
                    .Default
                    .ApiKeyPrefix
                    .TryAdd("Authorization", "Bearer");
            } catch(Exception e) {
                // Do nothing
            }
        }

        [HttpPost]
        public JsonResult Get([FromBody] IEnumerable<SerializableGame> games) {

            var apiInstance = new GamesApi();
            IEnumerable<TeamGame> stats = new List<TeamGame>();
            try {
                foreach (SerializableGame game in games) {
                    int year = game.Season ?? 0;
                    int gameId = game.Id ?? 0;
                    if (year != 0 && gameId != 0) {
                        var gameStats = apiInstance.GetTeamGameStats(year, null, null, null, null, gameId, null);
                        stats = stats.Concat(gameStats);
                    }
                }
                
                var resJson = JsonSerializer.Serialize<IEnumerable<TeamGame>>(stats);
                return new JsonResult(resJson);
            } catch (Exception e) {
                Console.Write("Error: " + e.Message);
                return new JsonResult("");
            }
        }
    }
}
