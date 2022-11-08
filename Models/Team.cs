using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CFBSharp.Model;

namespace cfb_scores.Models
{
    public class Team
    {
        public int Id { get; }
        public string Name { get; }
    }

    public class QuizResponse {
        public QuizResponse(IEnumerable<Game> g, string t, int sy, int ey, int l = 0, bool daily = true) {
            games = g;
            team = t;
            startYear = sy;
            endYear = ey;
            length = l;
            isDaily = daily;
        }

        public IEnumerable<Game> games { get; }
        public string team { get; }
        public int startYear { get; }
        public int endYear { get; }
        public int length { get; }
        public bool isDaily { get; }
    }

    public static class Teams {
        public static Dictionary<int, string> teams = new Dictionary<int, string>() {
            {
            0,
            "Air Force"
            },
            {
            1,
            "Akron"
            },
            {
            2,
            "Alabama"
            },
            {
            3,
            "Appalachian State"
            },
            {
            4,
            "Arizona"
            },
            {
            5,
            "Arizona State"
            },
            {
            6,
            "Arkansas"
            },
            {
            7,
            "Arkansas State"
            },
            {
            8,
            "Army"
            },
            {
            9,
            "Auburn"
            },
            {
            10,
            "Ball State"
            },
            {
            11,
            "Baylor"
            },
            {
            12,
            "Boise State"
            },
            {
            13,
            "Boston College"
            },
            {
            14,
            "Bowling Green"
            },
            {
            15,
            "Buffalo"
            },
            {
            16,
            "BYU"
            },
            {
            17,
            "California"
            },
            {
            18,
            "Central Michigan"
            },
            {
            19,
            "Charlotte"
            },
            {
            20,
            "Cincinnati"
            },
            {
            21,
            "Clemson"
            },
            {
            22,
            "Coastal Carolina"
            },
            {
            23,
            "Colorado"
            },
            {
            24,
            "Colorado State"
            },
            {
            25,
            "Connecticut"
            },
            {
            26,
            "Duke"
            },
            {
            27,
            "East Carolina"
            },
            {
            28,
            "Eastern Michigan"
            },
            {
            29,
            "Florida"
            },
            {
            30,
            "Florida Atlantic"
            },
            {
            31,
            "Florida International"
            },
            {
            32,
            "Florida State"
            },
            {
            33,
            "Fresno State"
            },
            {
            34,
            "Georgia"
            },
            {
            35,
            "Georgia Southern"
            },
            {
            36,
            "Georgia State"
            },
            {
            37,
            "Georgia Tech"
            },
            {
            38,
            "Hawai'i"
            },
            {
            39,
            "Houston"
            },
            {
            40,
            "Illinois"
            },
            {
            41,
            "Indiana"
            },
            {
            42,
            "Iowa"
            },
            {
            43,
            "Iowa State"
            },
            {
            44,
            "James Madison"
            },
            {
            45,
            "Kansas"
            },
            {
            46,
            "Kansas State"
            },
            {
            47,
            "Kent State"
            },
            {
            48,
            "Kentucky"
            },
            {
            49,
            "Liberty"
            },
            {
            50,
            "Louisiana"
            },
            {
            51,
            "Louisiana Monroe"
            },
            {
            52,
            "Louisiana Tech"
            },
            {
            53,
            "Louisville"
            },
            {
            54,
            "LSU"
            },
            {
            55,
            "Marshall"
            },
            {
            56,
            "Maryland"
            },
            {
            57,
            "Memphis"
            },
            {
            58,
            "Miami"
            },
            {
            59,
            "Miami (OH)"
            },
            {
            60,
            "Michigan"
            },
            {
            61,
            "Michigan State"
            },
            {
            62,
            "Middle Tennessee"
            },
            {
            63,
            "Minnesota"
            },
            {
            64,
            "Mississippi State"
            },
            {
            65,
            "Missouri"
            },
            {
            66,
            "Navy"
            },
            {
            67,
            "NC State"
            },
            {
            68,
            "Nebraska"
            },
            {
            69,
            "Nevada"
            },
            {
            70,
            "New Mexico"
            },
            {
            71,
            "New Mexico State"
            },
            {
            72,
            "North Carolina"
            },
            {
            73,
            "Northern Illinois"
            },
            {
            74,
            "North Texas"
            },
            {
            75,
            "Northwestern"
            },
            {
            76,
            "Notre Dame"
            },
            {
            77,
            "Ohio"
            },
            {
            78,
            "Ohio State"
            },
            {
            79,
            "Oklahoma"
            },
            {
            80,
            "Oklahoma State"
            },
            {
            81,
            "Old Dominion"
            },
            {
            82,
            "Ole Miss"
            },
            {
            83,
            "Oregon"
            },
            {
            84,
            "Oregon State"
            },
            {
            85,
            "Penn State"
            },
            {
            86,
            "Pittsburgh"
            },
            {
            87,
            "Purdue"
            },
            {
            88,
            "Rice"
            },
            {
            89,
            "Rutgers"
            },
            {
            90,
            "San Diego State"
            },
            {
            91,
            "San José State"
            },
            {
            92,
            "SMU"
            },
            {
            93,
            "South Alabama"
            },
            {
            94,
            "South Carolina"
            },
            {
            95,
            "Southern Mississippi"
            },
            {
            96,
            "South Florida"
            },
            {
            97,
            "Stanford"
            },
            {
            98,
            "Syracuse"
            },
            {
            99,
            "TCU"
            },
            {
            100,
            "Temple"
            },
            {
            101,
            "Tennessee"
            },
            {
            102,
            "Texas"
            },
            {
            103,
            "Texas A&M"
            },
            {
            104,
            "Texas State"
            },
            {
            105,
            "Texas Tech"
            },
            {
            106,
            "Toledo"
            },
            {
            107,
            "Troy"
            },
            {
            108,
            "Tulane"
            },
            {
            109,
            "Tulsa"
            },
            {
            110,
            "UAB"
            },
            {
            111,
            "UCF"
            },
            {
            112,
            "UCLA"
            },
            {
            113,
            "UMass"
            },
            {
            114,
            "UNLV"
            },
            {
            115,
            "USC"
            },
            {
            116,
            "Utah"
            },
            {
            117,
            "Utah State"
            },
            {
            118,
            "UTEP"
            },
            {
            119,
            "UT San Antonio"
            },
            {
            120,
            "Vanderbilt"
            },
            {
            121,
            "Virginia"
            },
            {
            122,
            "Virginia Tech"
            },
            {
            123,
            "Wake Forest"
            },
            {
            124,
            "Washington"
            },
            {
            125,
            "Washington State"
            },
            {
            126,
            "Western Kentucky"
            },
            {
            127,
            "Western Michigan"
            },
            {
            128,
            "West Virginia"
            },
            {
            129,
            "Wisconsin"
            },
            {
            130,
            "Wyoming"
            }

        };
    };
}
