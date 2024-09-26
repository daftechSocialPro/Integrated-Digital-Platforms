using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IntegratedDigitalAPI.Controllers.Common
{
    [Route("api/[controller]")]
    [ApiController]
    public class pdfController : ControllerBase
    {
        
        [HttpGet]
        public async Task<IActionResult> GetPdf(string path)
        {
          
            var fullpath = Path.Combine(Directory.GetCurrentDirectory(), path);
            
            var bytes = System.IO.File.ReadAllBytes(fullpath);
            return File(bytes, "application/pdf");
          
        }
    }
}
