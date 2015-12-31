using SyncfusionProof.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyncfusionProof.Data
{
  public static class DataHelper
  {
    public static List<TestModel> GetTestModels(string customerId)
    {
      return GetHomeModel().TestModels.Where(x => x.CustomerId.Equals(customerId)).ToList();
    }

    public static HomeModel GetHomeModel()
    {
      var manufacturers = new List<object>();

      manufacturers.Add(new { text = "Honda", value = 1 });
      manufacturers.Add(new { text = "Husqvarna", value = 2 });
      manufacturers.Add(new { text = "Kawasaki", value = 3 });
      manufacturers.Add(new { text = "Yamaha", value = 4 });

      TestModel testModel1 = new TestModel()
      {
        OrderId = 1,
        CustomerDetailsModel = GetCustomerDetails("5423115657865424ASFE"),
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
        CustomerDetailsModel = GetCustomerDetails("5423115657865424ABCD"),
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
        CustomerDetailsModel = GetCustomerDetails("ABCD5423115657865424"),
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
        CustomerDetailsModel = GetCustomerDetails("ABCD5423115657865424"),
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

    private static CustomerDetailsModel GetCustomerDetails(string customerId)
    {
      return new CustomerDetailsModel
      {
        Address1 = "123 Test St",
        Address2 = "PO Box 123",
        City = "Chattanooga",
        CustomerId = customerId,
        Name = "John " + customerId,
        State = "TN",
        ZipCode = "12345",
      };
    }
  }
}
