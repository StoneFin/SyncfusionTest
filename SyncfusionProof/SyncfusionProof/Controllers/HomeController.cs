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
      TestModel stuff = new TestModel()
      {
        OrderId = 2031532465,
        CustomerId = "5423115657865424ASFE",
        EmployeeId = int.MaxValue,
        Freight = "$32.50",
        ShipCity = "Chicago",
        ShipName = "USS Enterprise",
        OrderDate = DateTime.Now,
        ShipState = "Illinois",
        FavoriteBunny = "Reader Rabbit"
      };
      var StuffList = new List<TestModel>();
      StuffList.Add(stuff);
      stuff.OrderId = 124;
      StuffList.Add(stuff);

      return View("Index", StuffList);
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