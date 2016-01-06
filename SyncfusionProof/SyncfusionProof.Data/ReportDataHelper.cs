using Syncfusion.EJ.ReportViewer;
using Syncfusion.Reports.EJ;
using System.Collections.Generic;
using System.Linq;

namespace SyncfusionProof.Data
{
  public static class ReportDataHelper
  {
    /// <summary>
    /// gets a new report data source by fetching the data from reportOption by datasetName
    /// </summary>
    /// <param name="reportOption">Syncfusion.EJ.ReportViewer.ReportViewerOptions</param>
    /// <param name="datasetName">name of the DataSet in the report that contains the data</param>
    /// <param name="dataSourceName">desired name of new ReportDataSource</param>
    /// <returns></returns>
    public static ReportDataSource GetReportDataSource(ReportViewerOptions reportOption, string datasetName, string dataSourceName)
    {
      //get the data
      var data = GetReportData(reportOption, datasetName);

      //set it up as new ReportDataSource with the given name
      var dataSource = new ReportDataSource(dataSourceName, data);

      //return it
      return dataSource;
    }

    #region Private Methods
    /// <summary>
    /// gets report data out of the report's data sources by dataset name
    /// </summary>
    /// <param name="reportOption"></param>
    /// <param name="datasetName"></param>
    /// <returns></returns>
    private static object[] GetReportData(ReportViewerOptions reportOption, string datasetName)
    {
      //get the data from the main report as an object array
      var data = reportOption.ReportModel.DataSources.FirstOrDefault(x => x.Name.Equals(datasetName)).Value as object[];

      //run through the object array and build a new list of dictionary items
      var objectArray = new List<object>();

      foreach (var d in data)
      {
        objectArray.Add(d as Dictionary<string, object>);
      }

      //return the array
      return objectArray.ToArray();
    }
    #endregion
  }
}
