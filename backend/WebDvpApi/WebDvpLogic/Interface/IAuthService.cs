using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebDvpLogic.Interface
{
    public interface IAuthService
    {
        Task<string> LoginAsync(string username, string password);
        Task<string> RegisterAsync(string username, string password);
    }
}
