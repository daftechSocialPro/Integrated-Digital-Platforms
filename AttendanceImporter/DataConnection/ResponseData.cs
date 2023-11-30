using System;
using System.Collections.Generic;


namespace ConnData
{
    public class ResponseData
    {
        public object Data { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; } = null!;

    }
}
