using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SyncfusionProof.Data.Models
{
  public class TestModel
  {
    //data annotation is required in order to prevent editable Id properties in grids
    //the same doesn't seem to hold true for non Id properties
    [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
    public int OrderId { get; set; }

    public string CustomerId { get; set; }

    public CustomerDetailsModel CustomerDetailsModel { get; set; }

    public int EmployeeId { get; set; }
    
    public decimal? Freight { get; set; }
    
    public string ShipCity { get; set; }
    
    public string ShipName { get; set; }
    
    public string ShipState { get; set; }
    
    public DateTime OrderDate { get; set; }
    
    public FreightDetails FreightDetails { get; set; }
    
    public int ManufacturerId { get; set; }
    
    public string Manufacturer { get; set; }
    
    public bool IsTrue { get; set; }
    
    public IsTrueModel IsTrueModel { get; set; }
    
    public decimal? ValueSum { get; set; }
  }
}
