﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Model
{
    public class Product
    {
        public Guid Id { get; set; }
        public Guid StoreId { get; set; }
        public string? Name { get; set; }
        public decimal? Price { get; set; }
        public Guid CategoryId { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public Guid CreatedByUserId { get; set; }
        public Guid UpdatedByUserId { get; set; }
    }
}