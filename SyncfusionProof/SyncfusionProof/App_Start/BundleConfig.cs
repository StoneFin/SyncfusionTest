using System.Web;
using System.Web.Optimization;

namespace SyncfusionProof
{
  public class BundleConfig
  {
    // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862

    public static void RegisterBundles(BundleCollection bundles)
    {
      BundleTable.EnableOptimizations = true;

      //http://www.syncfusion.com/support/directtrac/incidents/147708
      //bundles.Add(new StyleBundle("~/content/css")
      //  .Include("~/Content/bootstrap.css")
      //  .Include("~/Content/bootstrap-theme.css")
      //  .Include("~/Content/site.css")
      //  .Include("~/Content/ej/web/ej.widgets.core.min.css")
      //  .Include("~/Content/ej/web/default-theme/ej.web.all.min.css")
      //  );
      
      bundles.Add(new StyleBundle("~/content/css")
        .Include("~/Content/bootstrap.css")
        .Include("~/Content/bootstrap-theme.css")
        .Include("~/Content/site.css")
        .Include("~/Content/ej/web/ej.widgets.core.min.css")
        .Include("~/Content/ej/web/default-theme/ej.theme.min.css")
        );
      
      //we must include ej.widgets.all.min.css in a separate bundle for optimizations to work properly
      bundles.Add(new StyleBundle("~/content/ej")
        .Include("~/Content/ej/web/default-theme/ej.widgets.all.min.css", new CssRewriteUrlTransform())
        );

      //Use the development version of Modernizr to develop with and learn from. Then, when you're
      //ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
      bundles.Add(new ScriptBundle("~/bundles/layout")
        .Include("~/Scripts/modernizr-*")
        .Include("~/Scripts/jquery-{version}.js")
        .Include("~/Scripts/jquery.validate*")
        .Include("~/Scripts/jquery.easing.{version}.js")
        .Include("~/Scripts/jquery.globalize.min.js")
        .Include("~/Scripts/jsrender.min.js")
        .Include("~/Scripts/ej/ej.web.all.min.js")
        .Include("~/Scripts/ej/ej.unobtrusive.min.js")
        .Include("~/Scripts/bootstrap*")
        .Include("~/Scripts/amplify*")
        .Include("~/Scripts/respond*")
        .Include("~/Scripts/underscore*")
        .Include("~/Scripts/Utility/Syncfusion*")
        );

      
    }
  }
}
