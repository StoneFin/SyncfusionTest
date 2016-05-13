﻿using System.Web.Optimization;

namespace SyncfusionProof
{
  public class BundleConfig
  {
    // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862

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

      //we must include Syncfusion css in a separate bundle for optimizations to work properly

      ////original
      //bundles.Add(new StyleBundle("~/content/ejwidgetsall")
      //  .Include("~/Content/ej/web/default-theme/ej.widgets.all.min.css", new CssRewriteUrlTransform())
      //  );

      //original w/new path
      bundles.Add(new StyleBundle("~/content/ejwidgetsall")
        .Include("~/Content/ejthemes/web/default-theme/ej.widgets.all.min.css", new CssRewriteUrlTransform())
        );

      ////custom generated css
      //http://csg.syncfusion.com/combine
      //bundles.Add(new StyleBundle("~/content/ejwidgetsall")
      //  .Include("~/Content/SyncfusionCustom/default-theme/ej.web.all.css", new CssRewriteUrlTransform())
      //  );

      //Use the development version of Modernizr to develop with and learn from. Then, when you're
      //ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
      bundles.Add(new ScriptBundle("~/bundles/layout")
        .Include("~/Scripts/modernizr-*")
        .Include("~/Scripts/jquery-{version}.js")
        .Include("~/Scripts/jquery.validate*")
        .Include("~/Scripts/jquery.easing.{version}.js")
        .Include("~/Scripts/jquery.globalize.min.js")
        .Include("~/Scripts/jsrender.min.js")

        ////original
        //.Include("~/Scripts/ej/ej.web.all.min.js")
        //.Include("~/Scripts/ej/ej.unobtrusive.min.js")

        //original w/new path
        .Include("~/Scripts/web/ej.web.all.min.js")
        .Include("~/Scripts/common/ej.unobtrusive.min.js")

        ////custom generated js
        ////http://csg.syncfusion.com/combine
        //.Include("~/Scripts/SyncfusionCustom/ej.gridupload.all.js")
        ////ej.touch.min.js is a temp fix for row selection problem
        ////http://www.syncfusion.com/support/directtrac/incidents/153193
        //.Include("~/Scripts/ej/ej.touch.min.js")
        //.Include("~/Scripts/ej/ej.unobtrusive.min.js")

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
