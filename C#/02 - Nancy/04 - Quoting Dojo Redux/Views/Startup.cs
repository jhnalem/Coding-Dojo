using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Logging;
using Nancy.Owin;

namespace QuotingDojo
{
    public class Startup
    {
        public void Configure(IApplicationBuilder app, ILoggerFactory LoggerFactory)
        {
            app.UseOwin(x => x.UseNancy());

            // Enable Console Logging
            // LoggerFactory.AddConsole();
        }
    }
}