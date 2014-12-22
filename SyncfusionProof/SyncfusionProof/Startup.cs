using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SyncfusionProof.Startup))]
namespace SyncfusionProof
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
