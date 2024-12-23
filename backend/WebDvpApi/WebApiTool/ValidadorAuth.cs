namespace WebApiTool
{
    public class ValidadorAuth
    {
        public bool ValidarClave(string password)
        {
            if (password.Length <= 6)
            {
                return false;
            }
            return true;
        }
    }
}
