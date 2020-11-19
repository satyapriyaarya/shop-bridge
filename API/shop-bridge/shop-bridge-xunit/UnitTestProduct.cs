using System;
using Xunit;
using shop_bridge.Controllers;
using shop_bridge.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace shop_bridge_xunit
{
    public class UnitTestProduct
    {
        public ProductsController controller;
        public static DbContextOptions<DatabaseContext> dbContextOptions { get; }
        public static string connectionString = "Server=tcp:shop-bridge-db-server.database.windows.net,1433;Initial Catalog=shop-bridge;Persist Security Info=False;User ID=satyapriyaarya;Password=shop-bridge1!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        static UnitTestProduct()
        {
            dbContextOptions = new DbContextOptionsBuilder<DatabaseContext>()
                .UseSqlServer(connectionString)
                .Options;
        }

        public UnitTestProduct()
        {
            var context = new DatabaseContext(dbContextOptions);
            controller = new ProductsController(context);
        }

        [Fact]
        public async void GetProductsTest()
        {
            //Arrange - in ctor

            //Act
            var prods = await controller.GetProducts();

            //Assert
            Assert.IsType<ActionResult<IEnumerable<Products>>>(prods);
        }

        [Fact]
        public async void GetOneProductTest()
        {
            //Arrange - in ctor

            //Act
            var pid = 21;
            var prods = await controller.GetProducts(pid);

            //Assert
            Assert.IsType<ActionResult<Products>>(prods);
        }

        [Fact]
        public async void AddProductTest()
        {
            //Arrange - in ctor

            //Act
            var name = "Test name";
            var description = "test description";
            var price = 99;
            var prod = new Products { name = name, description = description, price = price };
            var res = await controller.PostProducts(prod);

            //Assert
            Assert.IsType<ActionResult<Products>>(res);
            var opData = (Products)(res.Result as CreatedAtActionResult).Value;
            var nm = opData.name;
            var ds = opData.description;
            var pr = opData.price;

            Assert.Equal(nm, name);
            Assert.Equal(ds, description);
            Assert.Equal(pr, price);
        }
    }
}
