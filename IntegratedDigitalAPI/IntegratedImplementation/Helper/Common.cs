using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace IntegratedImplementation.Helper
{
    public static class Common
    {
        public static int pageSize = 10;
        public static int pageNumber = 0;
        public static int maxUploadSizeinDb = 10485760;
        public static string maxUploadSizeinDbError = "The document size cannot be more than 10| Mega Byte";
        public static CultureInfo Dculture = new CultureInfo("am-ET");
        public static string GetYearMonthDay(DateTime From, DateTime To)
        {
            var dateDif = To.Subtract(From).TotalDays;
            if (Convert.ToInt32(dateDif) > 0)
            {

                var from = new DateTime(From.Year, From.Month, From.Day);
                var to = new DateTime(To.Year, To.Month, To.Day);

                var totalmonths = (to.Year - from.Year) * 12 + to.Month - from.Month;
                totalmonths += to.Day < from.Day ? -1 : 0;

                var years = totalmonths / 12;
                var months = totalmonths % 12;
                var days = from.Subtract(to.AddMonths(totalmonths)).Days;
                return years + " ዓመት " + months + " ወር";
            }
            else
            {
                return "0 ዓመት";
            }
           
        }
        public static string GetConcatenatedYearMonthDay(DateTime From, DateTime To)
        {
            var dateDif = To.Subtract(From).TotalDays;
            if (Convert.ToInt32(dateDif) > 0)
            {

                var from = new DateTime(From.Year, From.Month, From.Day);
                var to = new DateTime(To.Year, To.Month, To.Day);

                var totalmonths = (to.Year - from.Year) * 12 + to.Month - from.Month;
                totalmonths += to.Day < from.Day ? -1 : 0;

                var years = totalmonths / 12;
                var months = totalmonths % 12;
                var days = from.Subtract(to.AddMonths(totalmonths)).Days;
                return years + "-" + months ;
            }
            else
            {
                return 0+"-"+0;
            }
           
        }
        public static string GetYearAndMonth(int years, int months, int days)
        {
            if (days >30)
            {
                months +=( (months * 30) + days)%30;
            }
            if (months>12)
            {
                years += (months % 12);
            }
            
            return years + " ዓመት " + months + " ወር";
        }
        public static string GetConcatinatedValue(string year, string month, string days)
        {
            return year + " ዓመት " + month + " ወር " + days + " ቀን";
        }
        public static string ConvertArrayToString(object[] values)
        {
            var result = new StringBuilder(values[0].ToString(), values.Length);

            for (int i = 1; i < values.Length; i++)
            {
                result.AppendFormat(", {0}", values[i]);
            }
            return result.ToString();
        }
        public static string getDaystoWordsamharic(float totalday)
        {
            //int totalday = (int)days;
            int months = 0;
            int year = 0;
            string words = "";

            if (totalday < 30)
            {
                words = words + totalday + " ቀናት ";
            }
            else if ((totalday >= 30) && (totalday <= 365))
            {
                months = (int)(totalday / 30);
                words = words + months + " ወር ";
                float monthremainder = totalday % 30;
                if (monthremainder < 30)
                {
                    words = words + (int)monthremainder + " ቀናት ";
                }
            }
            else if (totalday >= 356)
            {
                year = (int)(totalday / 365);
                words = words + year + " ዓመት ";
                float yearremainder = totalday % 365;
                if ((yearremainder >= 30) && (yearremainder <= 365))
                {
                    months = (int)(yearremainder / 30);
                    words = words + months + " ወር ";
                    float monthremainder = yearremainder % 30;
                    if (monthremainder < 30)
                    {
                        words = words + (int)monthremainder + " ቀናት ";
                    }
                }
            }

            return words;
        } 
        public static string getDaystoWords(float totalday)
        {
            //int totalday = (int)days;
            int months = 0;
            int year = 0;
            string words = "";

            if (totalday < 30)
            {
                words = words + totalday + " days ";
            }
            else if ((totalday >= 30) && (totalday <= 365))
            {
                months = (int)(totalday / 30);
                words = words + months + " month ";
                float monthremainder = totalday % 30;
                if (monthremainder < 30)
                {
                    words = words + (int)monthremainder + " days ";
                }
            }
            else if (totalday >= 356)
            {
                year = (int)(totalday / 365);
                words = words + year + " year ";
                float yearremainder = totalday % 365;
                if ((yearremainder >= 30) && (yearremainder <= 365))
                {
                    months = (int)(yearremainder / 30);
                    words = words + months + " month ";
                    float monthremainder = yearremainder % 30;
                    if (monthremainder < 30)
                    {
                        words = words + (int)monthremainder + " days ";
                    }
                }
            }

            return words;
        }
      
        public static string ToWordAmharic(this int number)
        {
            if (number == 0)
                return "ዜሮ";

            if (number < 0)
                return "-" + Math.Abs(number).toAmharicWords();

            string words = "";

            if ((number / 1000000) > 0)
            {
                words += (number / 1000000).toAmharicWords().TrimEnd() + " ሚሊዮን" +
                    " ";
                number %= 1000000;
            }

            if ((number / 1000) > 0)
            {
                words += (number / 1000).toAmharicWords().TrimEnd() + " ሺ" +
                    " ";
                number %= 1000;
            }

            if ((number / 100) > 0)
            {
                words += (number / 100).toAmharicWords().TrimEnd() + " መቶ ";
                number %= 100;
            }

            if (number > 0)
            {
               /// if (words != "")
                   /// words += "እና ";

                var unitsMap = new[] { "ዜሮ ", "አንድ", "ሁለት", "ሶስት", "አራት", "አምስት", "ስድስት", "ሰባት", "ስምንት", "ዘጠኝ", "አስር", "አስራ አንድ", "አስራ ሁለት", "አስራ ሶስት",
                    "አስራ አራት", "አስራ አምስት", "አስራ ስድስት", "አስራ ሰባት", "አስራ ስምንት", "አስራ ዘጠኝ" };
                var tensMap = new[] { "ዜሮ", "አስር", "ሃያ", "ሰላሳ", "አርባ", "ሃምሳ", "ስድሳ", "ሰባ", "ሰማንያ", "ዘጠና" };

                if (number < 20)
                    words += unitsMap[number];
                else
                {
                    words += tensMap[number / 10];
                    if ((number % 10) > 0)
                        words += "-" + unitsMap[number % 10];
                }
            }

            return words;
        }


       
    }

 

 
  
    public static class NumberExtensions
    {
        public static string toWords(this double ammount)
        {
            string[] newNumber = ammount.ToString().Split('.');

            int number = Convert.ToInt32(newNumber[0]);
            int fraction = newNumber.Length > 1 ? Convert.ToInt32(newNumber[1]) : 0;


            if (ammount == 0)
                return "Zero";

            if (ammount < 0)
                return "minus " + Math.Abs(ammount).toWords();

            string words = "";

            if ((number / 1000000) > 0)
            {
                words += (number / 1000000).toWordsInt().TrimEnd() + " Million ";
                number %= 1000000;
            }

            if ((number / 1000) > 0)
            {
                words += (number / 1000).toWordsInt().TrimEnd() + " Thousand ";
                number %= 1000;
            }

            if ((number / 100) > 0)
            {
                words += (number / 100).toWordsInt().TrimEnd() + " Hundred ";
                number %= 100;
            }

            if (number > 0)
            {
                if (words != "")
                    words += "and ";

                var unitsMap =new[] { "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen" };
                var tensMap = new[] { "Zero", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety" };

                if (number < 20)
                    words += unitsMap[number];
                else
                {
                    words += tensMap[number / 10];
                    if ((number % 10) > 0)
                        words += "-" + unitsMap[number % 10];
                }
            }

            if(fraction >0)
            {
                words = words + $" {fraction.ToString()} cents";
            }

            return words;
        }
        public static string toAmharicWords(this int number)
        {
            if (number == 0)
                return "ዜሮ";

            if (number < 0)
                return "-" + Math.Abs(number).toAmharicWords();

            string words = "";

            if ((number / 1000000) > 0)
            {
                words += (number / 1000000).toAmharicWords().TrimEnd() + " ሚሊዮን ";
                number %= 1000000;
            }

            if ((number / 1000) > 0)
            {
                words += (number / 1000).toAmharicWords().TrimEnd() + " ሺህ";
                number %= 1000;
            }

            if ((number / 100) > 0)
            {
                words += (number / 100).toAmharicWords().TrimEnd() + " መቶ";
                number %= 100;
            }

            if (number > 0)
            {
              

                //var unitsMap = new[] { "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen" };
                //var tensMap = new[] { "Zero", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety" };
                var unitsMap = new[] { "ዜሮ ", "አንድ", "ሁለት", "ሶስት", "አራት", "አምስት", "ስድስት", "ሰባት", "ስምንት", "ዘጠኝ", "አስር", "አስራ አንድ", "አስራ ሁለት", "አስራ ሶስት",
                    "አስራ አራት", "አስራ አምስት", "አስራ ስድስት", "አስራ ሰባት", "አስራ ስምንት", "አስራ ዘጠኝ" };
                var tensMap = new[] { "ዜሮ", "አስር", "ሃያ", "ሰላሳ", "አርባ", "ሃምሳ", "ስድሳ", "ሰባ", "ሰማንያ", "ዘጠና" };
                if (number < 20)
                    words += unitsMap[number];
                else
                {
                    words += tensMap[number / 10];
                    if ((number % 10) > 0)
                        words +=  unitsMap[number % 10];
                }
            }

            return words;
        }


        public static string toWordsInt(this int number)
        {

            string words = "";
            if ((number / 1000000) > 0)
            {
                words += (number / 1000000).toWordsInt().TrimEnd() + " Million ";
                number %= 1000000;
            }

            if ((number / 1000) > 0)
            {
                words += (number / 1000).toWordsInt().TrimEnd() + " Thousand ";
                number %= 1000;
            }

            if ((number / 100) > 0)
            {
                words += (number / 100).toWordsInt().TrimEnd() + " Hundred ";
                number %= 100;
            }
            if (number > 0)
            {
                if (words != "")
                    words += "and ";

                var unitsMap = new[] { "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen" };
                var tensMap = new[] { "Zero", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety" };

                if (number < 20)
                    words += unitsMap[number];
                else
                {
                    words += tensMap[number / 10];
                    if ((number % 10) > 0)
                        words += "-" + unitsMap[number % 10];
                }
            }

            return words;
        }


    }
   
}
