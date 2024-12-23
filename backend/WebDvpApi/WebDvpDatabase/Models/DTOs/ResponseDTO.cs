using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebDvpDatabase.Models.DTOs
{
    public class ResponseDTO<T>
    {
        public int Status { get; set; }
        public T? Data { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}
