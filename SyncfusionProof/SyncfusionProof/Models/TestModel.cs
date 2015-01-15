using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SyncfusionProof.Models
{
  public class TestModel
  {
    public int OrderId { get; set; }
    public string CustomerId { get; set; }
    public int EmployeeId { get; set; }
    public decimal Freight { get; set; }
    public string ShipCity { get; set; }
    public string ShipName { get; set; }
    public string ShipState { get; set; }
    public DateTime OrderDate { get; set; }
    public string FavoriteBunny { get; set; }
    public FreightDetails FreightDetails { get; set; }
  }
}
