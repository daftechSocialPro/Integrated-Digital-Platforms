using BitMiracle.LibTiff.Classic;
using DinkToPdf;
using DinkToPdf.Contracts;
using IntegratedImplementation.Interfaces.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Helper
{
    public class PdfGenerator
    {
        private readonly ICompanyProfileService _companyProfile;

        public PdfGenerator(ICompanyProfileService companyProfile)
        {
            _companyProfile = companyProfile;
        }
        public async Task<byte[]> GeneratePdf(string bodyHtml,string Orientation,string Title)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = (DinkToPdf.Orientation)Enum.Parse(typeof(DinkToPdf.Orientation), Orientation),
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 100, Bottom = 80 }, // Space for header/footer
                DocumentTitle = Title,
            };

            var compProfile = await _companyProfile.GetCompanyProfile();
            if (compProfile == null)
            {
                return null;
            }

            string logoBase64 = Convert.ToBase64String(File.ReadAllBytes(compProfile.Logo));

            string headerHtml = $@"
        <div style='text-align: center; border-bottom: 1px solid #eee; padding-bottom: 10px;'>
            <img src='data:image/png;base64,{logoBase64}' style='height: 50px;'/>
            <h2 style='margin-top: 5px;'>Sales Report</h2>
            <div style='font-size: 9pt;'>Generated on: {DateTime.Now.ToString("yyyy-MM-dd")}</div>
        </div>";

            string footerHtml = @"
        <div style='text-align: center; font-size: 8pt; color: #666; border-top: 1px solid #eee; padding-top: 5px;'>
            Page <span class='pageNumber'></span> of <span class='totalPages'></span> | 
            © 2023 Your Company
        </div>";

            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = bodyHtml,
                WebSettings = { DefaultEncoding = "utf-8" },
                HeaderSettings = {
            FontSize = 12,
            FontName = "Times New Roman",
            
           
            Spacing = 5
        },
                FooterSettings = {
            FontSize = 9,
           
            Spacing = 5
        }
            };

            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };

            return null;
        }

    }
}
