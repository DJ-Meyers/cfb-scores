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
    public class TeamQuizForm
    {
        public string name { get; set; }

        public string startYear { get; set; }

        public string endYear { get; set; }
    }

    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class TeamQuizController : ControllerBase
    {
        private readonly IConfiguration _config;
        public TeamQuizController(IConfiguration config)
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
        public JsonResult Get([FromForm] TeamQuizForm inputData) {
            // Parse params
            int startYear = int.Parse(inputData.startYear);
            int endYear = int.Parse(inputData.endYear);
            string team = inputData.name;

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
                var res = new QuizResponse(games, team, startYear, endYear, 10, false);
                var resJson = JsonSerializer.Serialize<QuizResponse>(res);
                return new JsonResult(resJson);
            }
            catch (Exception e)
            {
                Console.Write("Error: " + e.Message);
                var res = new QuizResponse(games, team, startYear, endYear, 10, false);
                var resJson = JsonSerializer.Serialize<QuizResponse>(res);
                return new JsonResult(resJson);
            }
        }
    }
}
