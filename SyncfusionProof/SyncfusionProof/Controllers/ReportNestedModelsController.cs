﻿//this is not officially supported in syncfusion reports
//http://www.syncfusion.com/support/directtrac/incidents/149009

using Syncfusion.EJ.ReportViewer;
using System.Collections.Generic;
using System.Web.Http;

namespace SyncfusionProof.Controllers
{
  public class ReportNestedModelsController : ApiController, IReportController
  {
    public object GetResource(string key, string resourcetype, bool isPrint)
    {
      return ReportHelper.GetResource(key, resourcetype, isPrint);
    }

    public void OnInitReportOptions(ReportViewerOptions reportOption)
    {
    }

    public void OnReportLoaded(ReportViewerOptions reportOption)
    {
    }

    public object PostReportAction(Dictionary<string, object> jsonResult)
    {
      return ReportHelper.ProcessReport(jsonResult, this);
    }
  }
}
