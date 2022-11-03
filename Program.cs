using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Azure.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace cfb_scores
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) {
            var host = Host
                .CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
            
            host.ConfigureAppConfiguration((_, config) => AddKeyVault(config));

            return host;
        }
            

        public static void AddKeyVault(IConfigurationBuilder config)
        {
            var configuration = config.Build();
            var keyVaultEndpoint = configuration["KeyVault:VaultUri"];
            config
                .AddAzureKeyVault(new Uri(keyVaultEndpoint),
                new DefaultAzureCredential());
        }
    }
}
