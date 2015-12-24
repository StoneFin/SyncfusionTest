using SyncfusionProof.Data.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace SyncfusionProof.Controllers
{
  public class HomeController : Controller
  {
    public ActionResult Index()
    {
      var model = GetModel();

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
      var model = GetModel();

      return View("GridCache1", model);
    }

    public ActionResult GridCache2()
    {
      var model = GetModel();

      return View("GridCache2", model);
    }

    public ActionResult GridEmpty()
    {
      var model = new HomeModel();

      model.Manufacturers = new List<object>();
      model.TestModels = new List<TestModel>();

      return View(model);
    }

    private HomeModel GetModel()
    {
      var manufacturers = new List<object>();

      manufacturers.Add(new { text = "Honda", value = 1 });
      manufacturers.Add(new { text = "Husqvarna", value = 2 });
      manufacturers.Add(new { text = "Kawasaki", value = 3 });
      manufacturers.Add(new { text = "Yamaha", value = 4 });

      TestModel testModel1 = new TestModel()
      {
        OrderId = 1,
        CustomerId = "5423115657865424ASFE",
        EmployeeId = 111,
        IsTrue = true,
        IsTrueModel = new IsTrueModel { IsTrue = true },
        Freight = (decimal)32.50,
        FreightDetails = new FreightDetails
        {
          Freight2 = (decimal)43.61
        },
        ShipCity = "Chicago",
        ShipName = "USS Enterprise",
        OrderDate = DateTime.Now,
        ShipState = "Illinois",
        ManufacturerId = 1,
        Manufacturer = "Honda"
      };

      var testModels = new List<TestModel>();

      testModels.Add(testModel1);

      TestModel testModel2 = new TestModel()
      {
        OrderId = 2,
        CustomerId = "5423115657865424ABCD",
        EmployeeId = 111,
        IsTrue = false,
        IsTrueModel = new IsTrueModel { IsTrue = false },
        Freight = (decimal)54.72,
        FreightDetails = new FreightDetails
        {
          Freight2 = (decimal)65.83
        },
        ShipCity = "Los Angeles",
        ShipName = "USS Minnow",
        OrderDate = DateTime.Now.AddDays(-1),
        ShipState = "California",
        ManufacturerId = 2,
        Manufacturer = "Husqvarna"
      };

      testModels.Add(testModel2);

      TestModel testModel3 = new TestModel()
      {
        OrderId = 3,
        CustomerId = "ABCD5423115657865424",
        EmployeeId = 222,
        IsTrue = true,
        IsTrueModel = new IsTrueModel { IsTrue = true },
        Freight = (decimal)55.55,
        FreightDetails = new FreightDetails
        {
          Freight2 = (decimal)66.66
        },
        ShipCity = "Ft Lauderdale",
        ShipName = "USS Ronald Reagan",
        OrderDate = DateTime.Now.AddDays(-1),
        ShipState = "Nebraska",
        ManufacturerId = 3,
        Manufacturer = "Kawasaki"
      };

      testModels.Add(testModel3);

      TestModel testModel4 = new TestModel()
      {
        OrderId = 4,
        CustomerId = "ABCD5423115657865424",
        EmployeeId = 222,
        IsTrue = false,
        IsTrueModel = new IsTrueModel { IsTrue = false },
        Freight = (decimal)55.55,
        FreightDetails = new FreightDetails
        {
          Freight2 = (decimal)66.66
        },
        ShipCity = "Ft Lauderdale",
        ShipName = "USS Ronald Reagan",
        OrderDate = DateTime.Now.AddDays(-1),
        ShipState = "Nebraska",
        ManufacturerId = 4,
        Manufacturer = "Yamaha"
      };

      testModels.Add(testModel4);

      var homeModel = new HomeModel
      {
        TestModels = testModels,
        Manufacturers = manufacturers
      };

      return homeModel;
    }
  }
}