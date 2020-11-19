using System;
using System.IO;

namespace shop_bridge.Models
{
    public class Products
    {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public decimal price { get; set; }
        public string image { get; set; } = "noimg.png";
    }
}
