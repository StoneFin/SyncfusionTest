using System.Web.Optimization;

namespace SyncfusionProof
{
  public class BundleConfig
  {
    public static void RegisterBundles(BundleCollection bundles)
    {
      //manually enable minification
      //running in debug sets this to false and release sets it to true
      //you don't have to manually set this unless you're troubleshooting something
      //or if you want to publish minified code in debug mode for dev deployments
      //BundleTable.EnableOptimizations = true;

      bundles.Add(new StyleBundle("~/content/css")
        .Include("~/Content/bootstrap.css")
        .Include("~/Content/bootstrap-theme.css")
        .Include("~/Content/site.css")
        );

      ////original implementation, includes full Syncfusion library
      //bundles.Add(new StyleBundle("~/content/ejwidgetsall")
      //   .Include("~/Content/ej/web/default-theme/ej.web.all.min.css", new CssRewriteUrlTransform())
      //   );

      //custom generated css, includes just the pieces we use
      //http://csg.syncfusion.com/combine
      //theme: default-theme
      //minified
      //version: 15.1.0.33
      //select ejGrid, ejUploadBox
      //name: ej.gridupload.all
      bundles.Add(new StyleBundle("~/content/ejwidgetsall")
        .Include("~/Content/SyncfusionCustom/default-theme/ej.web.all.min.css", new CssRewriteUrlTransform())
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

        ////original, includes full Syncfusion library
        //.Include("~/Scripts/ej/web/ej.web.all.min.js")
        //.Include("~/Scripts/ej/common/ej.unobtrusive.min.js")

        //custom generated js, includes just the pieces we use
        //http://csg.syncfusion.com/combine
        //theme: default-theme
        //minified
        //version: 15.1.0.33
        //select ejGrid, ejUploadBox
        //name: ej.gridupload.all
        .Include("~/Scripts/SyncfusionCustom/ej.gridupload.all.min.js")
        .Include("~/Scripts/ej/common/ej.unobtrusive.min.js")

        .Include("~/Scripts/bootstrap*")
        .Include("~/Scripts/amplify*")
        .Include("~/Scripts/respond*")
        .Include("~/Scripts/underscore*")
        .Include("~/Scripts/Utility/Syncfusion*")
        );

      bundles.Add(new ScriptBundle("~/bundles/report/withparameters")
        .Include("~/Scripts/Utility/ReportViewer*")
        );
    }
  }
}
