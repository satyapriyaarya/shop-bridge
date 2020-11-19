using System;
using Microsoft.AspNetCore.Http;

namespace shop_bridge.Models
{
    public class FileModel
    {
        public IFormFile FormFile { get; set; }
        public string FileName { get; set; }
    }
}
