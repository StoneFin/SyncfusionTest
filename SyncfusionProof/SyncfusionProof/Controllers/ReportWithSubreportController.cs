using Syncfusion.EJ.ReportViewer;
using Syncfusion.Reports.EJ;
using SyncfusionProof.Data;
using SyncfusionProof.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace SyncfusionProof.Controllers
{
  public class ReportWithSubreportController : ApiController, IReportController
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
      if (reportOption.SubReportModel != null)
      {
        //NOTE: Subreport DataSouces must have unique names, even if you're using multiple subreports, 
        //since the SubReportModel is just one thing, and not a collection of SubReportModels when there 
        //are multiple subreports in a single report.

        //get the data for the subreport
        reportOption.SubReportModel.DataSources.Clear();

        ////Not ideal, here, we're running a db query for every subreport involved. Slow!
        
        //var customerId = reportOption.SubReportModel.Parameters.Single(x => x.Name.Equals("CustomerId")).Values.First();
        //var customerDetailsModel = new List<CustomerDetailsModel> { DataHelper.GetTestModels(customerId).First().CustomerDetailsModel };
        
        //reportOption.SubReportModel.DataSources.Add(new ReportDataSource
        //{
        //  Name = "CustomerDetailsModel",
        //  Value = customerDetailsModel
        //});

        //This is better. We can load all the subreport data up front and extract it from the DataSources and hook it to a SubReport.

        //get the TestModel
        var testModel = ((reportOption.ReportModel.DataSources.Single(x => x.Name.Equals("TestModel")).Value as Object[]).First() as Dictionary<string, object>);

        //extract the CustomerDetailsModel out of the TestModel as an object array
        var customerDetailsModel = new Object[] { testModel["CustomerDetailsModel"] };

        //intantiate the ReportDataSource for the subreport
        var customerDetailsDataSource = new ReportDataSource("CustomerDetailsModel", customerDetailsModel);

        //add the DataSource to the SubReportModel
        reportOption.SubReportModel.DataSources.Add(customerDetailsDataSource);
      }
    }

    public object PostReportAction(Dictionary<string, object> jsonResult)
    {
      return ReportHelper.ProcessReport(jsonResult, this);
    }
  }
}
