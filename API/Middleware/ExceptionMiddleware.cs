using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        //This is needed so our flow and data can pass over to the next middleware in the pipeline
        private readonly RequestDelegate _next;

        //This is needed to log the stacktrace from exception in the terminal
        private readonly ILogger<ExceptionMiddleware> _logger;

        //This is needed to identify which env is the application running on
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next,
            ILogger<ExceptionMiddleware> logger,
            IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        //This method HAS to be named InvokeAsync, because if we are telling our applicaiton that this is 
        //a middleware then the application expects by convention the middle ware to have InvokeAsync method, this method tells the middleware what to do next
        //The httpContext allows us to access the HTTP data flowing through this middleware
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // the RequestDelegate (_next) is present in all middleware components, since this exception middleware is at the start of the middleware pipeline, at the beginning of this middle ware it will just pass along the httpcontext to the next in line middleware

                await _next(context);
            }
            //This catch block will catch any exceptions thrown by any of the middleware components which will come after this exception middleware 
            catch (Exception ex)
            {
                //This is calling ILogger, this will log any exception messages in the terminal
                _logger.LogError(ex,ex.Message);

                //This is the response which we will send back to the client, it is of type - application/json, in a normal API controller this is default and we dont need to specify, but since this is a normal class we do need to specify type
                context.Response.ContentType = "application/json";

                //Generates 500 error code
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment() 
                    //If it is dev env, then create new object of API exception and pass to it the following params. stackTract is optional(?) since we dont know if we will get stack trace
                    ? new ApiException(context.Response.StatusCode,ex.Message,ex.StackTrace?.ToString())

                    //If it is prod env, then we dont send stack trace
                    : new ApiException(context.Response.StatusCode,ex.Message, "Internal Server Error");
                
                //This is something which is handled by default in api controller but we have to manually specify here
                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response,options);
                await context.Response.WriteAsync(json);
            }
        }
    }
}