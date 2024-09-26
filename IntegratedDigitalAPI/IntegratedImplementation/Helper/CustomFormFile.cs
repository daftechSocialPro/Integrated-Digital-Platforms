using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Helper
{
    public class CustomFormFile : IFormFile
    {
        private readonly byte[] _fileBytes;
        private readonly string _fileName;
        private readonly string _contentType;

        public CustomFormFile(byte[] fileBytes, string fileName, string contentType)
        {
            _fileBytes = fileBytes;
            _fileName = fileName;
            _contentType = contentType;
        }

        public string ContentType => _contentType;
        public string ContentDisposition => $"form-data; name=\"{_fileName}\"; filename=\"{_fileName}\"";
        public IHeaderDictionary Headers => new HeaderDictionary();
        public long Length => _fileBytes.Length;
        public string Name => _fileName;
        public string FileName => _fileName;

        public Stream OpenReadStream()
        {
            return new MemoryStream(_fileBytes);
        }

        public void CopyTo(Stream target)
        {
            using (var sourceStream = new MemoryStream(_fileBytes))
            {
                sourceStream.CopyTo(target);
            }
        }

        public Task CopyToAsync(Stream target, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
