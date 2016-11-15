using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;

namespace DojoSurvey
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder App)
        {
            App.UseStaticFiles();
            App.UseMvc( routes =>
            {
                routes.MapRoute(
                    name: "Default",
                    template: "",
                    defaults: new {controller = "Index", action = "Index"}
                );
            });
        }
    }
}