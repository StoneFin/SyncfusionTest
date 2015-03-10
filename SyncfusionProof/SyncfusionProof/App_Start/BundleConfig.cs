using System.Web;
using System.Web.Optimization;

namespace SyncfusionProof
{
  public class BundleConfig
  {
    // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862

    public static void RegisterBundles(BundleCollection bundles)
    {
      bundles.Add(new StyleBundle("~/content/css")
        .Include("~/Content/bootstrap.css")
        .Include("~/Content/bootstrap-theme.css")
        .Include("~/Content/site.css")
        .Include("~/Content/ej/web/ej.widgets.core.min.css")
        .Include("~/Content/ej/web/default-theme/ej.web.all.min.css")
        );

      //Use the development version of Modernizr to develop with and learn from. Then, when you're
      //ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
      bundles.Add(new ScriptBundle("~/bundles/layout")
        .Include("~/Scripts/modernizr-*")
        .Include("~/Scripts/jquery-{version}.js")
        .Include("~/Scripts/jquery.validate*")
        .Include("~/Scripts/jquery.easing.{version}.js")
        .Include("~/Scripts/jquery.globalize.min.js")
        .Include("~/Scripts/jsrender*")
        .Include("~/Scripts/ej/ej.web.all.min.js")
        .Include("~/Scripts/ej/ej.unobtrusive.min.js")
        .Include("~/Scripts/bootstrap*")
        .Include("~/Scripts/respond*")
        .Include("~/Scripts/Utility/Syncfusion*")
        );

      // Set EnableOptimizations to false for debugging. For more information,
      // visit http://go.microsoft.com/fwlink/?LinkId=301862
      //BundleTable.EnableOptimizations = true;
    }
  }
}
