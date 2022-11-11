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
    public class DailyQuizController : ControllerBase
    {
        private readonly IConfiguration _config;
        public DailyQuizController(IConfiguration config)
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
        public JsonResult Get()
        {
            int date = 4 * (int) (DateTime.Today - new DateTime(1970,1,1)).TotalDays;
            Random random = new Random(date);

            string team = Teams.teams[random.Next(0, 131)];
            int startYear = random.Next(2000, 2021);
            int endYear = startYear;

            IEnumerable<Game> games = new List<Game>();
            var apiInstance = new GamesApi();
            try
            {
                IEnumerable<Game> regularSeason = apiInstance.GetGames(startYear, null, null, team).ToList();
                games = games.Concat(regularSeason);
                
                IEnumerable<Game> postSeason = apiInstance.GetGames(startYear, null, "postseason", team).ToList();
                games = games.Concat(postSeason);
                
                var res = new QuizResponse(games, team, startYear, endYear);
                var resJson = JsonSerializer.Serialize<QuizResponse>(res);
                return new JsonResult(resJson);
            }
            catch (Exception e)
            {
                Console.Write("Error: " + e.Message);
                var res = new QuizResponse(games, team, startYear, endYear);
                var resJson = JsonSerializer.Serialize<QuizResponse>(res);
                return new JsonResult(resJson);
            }
        }
    }
}
