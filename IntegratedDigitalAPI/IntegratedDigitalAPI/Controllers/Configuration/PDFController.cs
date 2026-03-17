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
            var normalizedPath = path.Replace("\\", Path.DirectorySeparatorChar.ToString())
                                     .Replace("/", Path.DirectorySeparatorChar.ToString());
            var fullpath = Path.Combine(Directory.GetCurrentDirectory(), normalizedPath);
            
            if (!System.IO.File.Exists(fullpath))
            {
                return NotFound("File not found at: " + fullpath);
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(fullpath);
            return File(bytes, "application/pdf");
        }
    }
}
