using System;

namespace SyncfusionProof.Data.Models
{
  public class CustomerDetailsModel
  {
    public string CustomerId { get; set; }

    public string Name { get; set; }

    public virtual AddressModel AddressModel { get; set; }
  }
}
