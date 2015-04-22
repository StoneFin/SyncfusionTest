using SyncfusionProof.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SyncfusionProof.Controllers
{
  public class HomeController : Controller
  {
    public ActionResult Index()
    {
      TestModel testModel1 = new TestModel()
      {
        OrderId = 1,
        CustomerId = "5423115657865424ASFE",
        EmployeeId = 111,
        Freight = (decimal)32.50,
        FreightDetails = new FreightDetails
        {
          Freight2 = (decimal)43.61
        },
        ShipCity = "Chicago",
        ShipName = "USS Enterprise",
        OrderDate = DateTime.Now,
        ShipState = "Illinois",
        FavoriteBunny = "Reader Rabbit"
      };
      
      var testModels = new List<TestModel>();
      
      testModels.Add(testModel1);

      TestModel testModel2 = new TestModel()
      {
        OrderId = 2,
        CustomerId = "5423115657865424ABCD",
        EmployeeId = 111,
        Freight = (decimal)54.72,
        FreightDetails = new FreightDetails
        {
          Freight2 = (decimal)65.83
        },
        ShipCity = "Los Angeles",
        ShipName = "USS Minnow",
        OrderDate = DateTime.Now.AddDays(-1),
        ShipState = "California",
        FavoriteBunny = "Peter Cottontail"
      };

      testModels.Add(testModel2);

      TestModel testModel3 = new TestModel()
      {
        OrderId = 3,
        CustomerId = "ABCD5423115657865424",
        EmployeeId = 222,
        Freight = (decimal)55.55,
        FreightDetails = new FreightDetails
        {
          Freight2 = (decimal)66.66
        },
        ShipCity = "Ft Lauderdale",
        ShipName = "USS Ronald Reagan",
        OrderDate = DateTime.Now.AddDays(-1),
        ShipState = "Nebraska",
        FavoriteBunny = "Nivens McTwisp"
      };

      testModels.Add(testModel3);

      TestModel testModel4 = new TestModel()
      {
        OrderId = 4,
        CustomerId = "ABCD5423115657865424",
        EmployeeId = 222,
        Freight = (decimal)55.55,
        FreightDetails = new FreightDetails
        {
          Freight2 = (decimal)66.66
        },
        ShipCity = "Ft Lauderdale",
        ShipName = "USS Ronald Reagan",
        OrderDate = DateTime.Now.AddDays(-1),
        ShipState = "Nebraska",
        FavoriteBunny = "Nivens McTwisp"
      };

      testModels.Add(testModel4);

      return View("Index", testModels);
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
  }
}