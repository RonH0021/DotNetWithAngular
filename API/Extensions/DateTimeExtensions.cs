namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        //The Class and method will be static since this is extension method,
        //also the DateOnly type which is the same as the property on which we are creating the extension method, in order to identify this as a extension method we use 'this'
        public static int CalculageAge(this DateOnly dob)
        {
            //Get only the current Date out of the DateTime 
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            //Find age
            var age = today.Year - dob.Year;

            //We are trying to indetify if the user has had their birthday this year
            //if user dob is 25/09/1993
            // Curent DateOnly is 09/09/2023
            // 2023 - 1993 = 30 || but user has not had birthday yet, so from DateOnly we reduce 30 years - it becomes 09/09/2023, hence dob becomes greater than today
            //hence we reduce age by 1
            if(dob > today.AddYears(-age))
            {
                age--;
            }
            return age;
        }
    }
}