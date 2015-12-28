using SyncfusionProof.Data;
using SyncfusionProof.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace SyncfusionProof.Controllers
{
  public class HomeController : Controller
  {
    public ActionResult Index()
    {
      var model = DataHelper.GetHomeModel();

      return View("Index", model);
    }

    public ActionResult About()
    {
      ViewBag.Message = "Your application description page.";

      return View();
    }

    public ActionResult Contact()
    {
      ViewBag.Message = "Your contact page.";

      return View();
    }

    public ActionResult GridCache1()
    {
      var model = DataHelper.GetHomeModel();

      return View("GridCache1", model);
    }

    public ActionResult GridCache2()
    {
      var model = DataHelper.GetHomeModel();

      return View("GridCache2", model);
    }

    public ActionResult GridEmpty()
    {
      var model = new HomeModel();

      model.Manufacturers = new List<object>();
      model.TestModels = new List<TestModel>();

      return View(model);
    }

    public ActionResult ReportModelBoundNoParameters(string customerId)
    {
      var homeModel = DataHelper.GetHomeModel();
      var testModels = homeModel.TestModels.Where(x => x.CustomerId.Equals(customerId)).ToList();

      return View("./DisplayTemplates/ReportModelBoundNoParametersViewer", testModels);

      //var homeModel = DataHelper.GetHomeModel();
      //var testModel = homeModel.TestModels.Where(x => x.CustomerId.Equals(customerId)).Single();

      //return View("./DisplayTemplates/ReportModelBoundNoParametersViewer", testModel);
    }

    public ActionResult ReportModelBoundWithParameters()
    {
      return View("./DisplayTemplates/ReportModelBoundWithParametersViewer");
    }

    public ActionResult ReportNestedModels(string customerId)
    {
      var homeModel = DataHelper.GetHomeModel();
      var testModels = homeModel.TestModels.Where(x => x.CustomerId.Equals(customerId)).ToList();

      return View("./DisplayTemplates/ReportNestedModelsViewer", testModels);
    }
  }
}