using Nancy;

// Import Error Logging
using Nancy.Configuration;

// Import Sessions
using Nancy.Session.Persistable;
using Nancy.Bootstrapper;
using Nancy.TinyIoc;
using Nancy.Session.InMemory;

namespace QuotingDojo
{
    public class Bootstrapper : DefaultNancyBootstrapper
    {
        public override void Configure(INancyEnvironment environment)
        {
            // Enable Error logging
            environment.Tracing(enabled: false, displayErrorTraces: true);
        }

        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {
            // Enable Sessions
            PersistableSessions.Enable(pipelines, new InMemorySessionConfiguration());
        }
    }
}