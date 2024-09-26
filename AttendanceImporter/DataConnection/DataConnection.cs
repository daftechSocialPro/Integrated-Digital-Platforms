
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;


namespace ConnData

{
    public class DataConnection
    {
        static String fileName = Environment.CurrentDirectory + @"\file.txt";
        public static async Task<ResponseData> GetRequest(string requestPath)
        {

            var lines = File.ReadAllLines(fileName);
            var stringdataApi = lines[0];
            ResponseData responseData = new ResponseData();
            using (var APIclient = new HttpClient())
            {
                try
                {
                    APIclient.BaseAddress = new Uri(stringdataApi);
                    APIclient.DefaultRequestHeaders.Accept.Clear();
                    APIclient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage responseMessage = new HttpResponseMessage();
                    //responseMessage.Headers("Authorization", "Bearer " + mytoken);
                    responseMessage = await  APIclient.GetAsync(requestPath);
                    if (responseMessage.IsSuccessStatusCode)
                    {
                        string TestReport = await responseMessage.Content.ReadAsStringAsync();
                        if (!String.IsNullOrEmpty(TestReport))
                        {
                            responseData = JsonConvert.DeserializeObject<ResponseData>(TestReport);
                        }
                        else
                        {
                            responseData = new ResponseData
                            {
                                Data = null,
                                Message = "Data Not Found",
                                Success = false,
                            };
                        }
                    }
                }
                catch (Exception ex)
                {

                    throw;
                }

            }
            return responseData;

        }

        public static async Task<ResponseData> PostRequest(string requestPath, object DataDto)
        {
            var lines = File.ReadAllLines(fileName);
            var stringdataApi = lines[0];
            ResponseData responseData = new ResponseData();
            using (var APIclient = new HttpClient())
            {
                APIclient.BaseAddress = new Uri(stringdataApi);
                APIclient.DefaultRequestHeaders.Accept.Clear();
                APIclient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                // APIclient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokens.access_token);
                HttpResponseMessage responseMessage = new HttpResponseMessage();
                //responseMessage.Headers("Authorization", "Bearer " + mytoken);

                var json = JsonConvert.SerializeObject(DataDto);
                responseMessage = await APIclient.PostAsync(requestPath, new StringContent(json, Encoding.UTF8, "application/json"));
                //  responseMessage = await APIclient.PostAsync(requestPath, content);
                if (responseMessage.IsSuccessStatusCode)
                {
                    string TestReport = await  responseMessage.Content.ReadAsStringAsync();
                    if (!String.IsNullOrEmpty(TestReport))
                    {
                        responseData = JsonConvert.DeserializeObject<ResponseData>(TestReport);
                    }
                    else
                    {
                        responseData = new ResponseData
                        {
                            Data = null,
                            Message = "Data Not Found",
                            Success = false,
                        };
                    }

                }
                else
                {
                    responseData = new ResponseData
                    {
                        Data = null,
                        Message = "Data Not Found",
                        Success = false,
                    };
                }

            }
            return responseData;

        }

        public static string Encrypt(string input)
        {
            string key = "sblw-3hn8-sqoy20";
            byte[] inputArray = UTF8Encoding.UTF8.GetBytes(input);
            TripleDESCryptoServiceProvider tripleDES = new TripleDESCryptoServiceProvider();
            tripleDES.Key = UTF8Encoding.UTF8.GetBytes(key);
            tripleDES.Mode = CipherMode.ECB;
            tripleDES.Padding = PaddingMode.PKCS7;
            ICryptoTransform cTransform = tripleDES.CreateEncryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(inputArray, 0, inputArray.Length);
            tripleDES.Clear();
            return Convert.ToBase64String(resultArray, 0, resultArray.Length);
        }
        public static string Decrypt(string input)
        {
            string key = "sblw-3hn8-sqoy20";
            byte[] inputArray = Convert.FromBase64String(input);
            TripleDESCryptoServiceProvider tripleDES = new TripleDESCryptoServiceProvider();
            tripleDES.Key = UTF8Encoding.UTF8.GetBytes(key);
            tripleDES.Mode = CipherMode.ECB;
            tripleDES.Padding = PaddingMode.PKCS7;
            ICryptoTransform cTransform = tripleDES.CreateDecryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(inputArray, 0, inputArray.Length);
            tripleDES.Clear();
            return UTF8Encoding.UTF8.GetString(resultArray);
        }

    }
}
