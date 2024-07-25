using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Inventory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Inventory
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        IVendorService _vendorService;

        public VendorController(IVendorService vendorService)
        {
            _vendorService= vendorService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(VendorListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetVendorList()
        {
           return Ok(await _vendorService.GetVendorList());
        }

       

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddVendor(AddVendorDto vendor)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _vendorService.AddVendor(vendor));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateVendor(UpdateVendorDto vendor)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _vendorService.UpdateVendor(vendor));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddVendorBank(AddVendorBankAccountDto addVendor)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _vendorService.AddVendorBank(addVendor));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateVendorBank(UpdateVendorBankAccountDto updateVendor)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _vendorService.UpdateVendorBank(updateVendor));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
