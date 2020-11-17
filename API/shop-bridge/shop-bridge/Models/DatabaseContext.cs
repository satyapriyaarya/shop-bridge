using System;
using Microsoft.EntityFrameworkCore;

namespace shop_bridge.Models
{
    public class DatabaseContext:DbContext
    {
        public DatabaseContext()
        {

        }
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        public DbSet<Products> Products { get; set; }
    }
}
