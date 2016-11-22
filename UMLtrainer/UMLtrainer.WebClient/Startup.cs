using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using SimpleInjector;
using SimpleInjector.Integration.AspNetCore;
using SimpleInjector.Integration.AspNetCore.Mvc;

using System;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Authorization;

using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.DependencyInjection.Extensions;


namespace UMLtrainer.WebClient
{
    public class Startup
    {
        private readonly Container _container;

        public Startup()
        {
            _container = new Container();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc()
                .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());

            services.AddSingleton<IControllerActivator>(new SimpleInjectorControllerActivator(_container));
            services.AddSingleton<IViewComponentActivator>(new SimpleInjectorViewComponentActivator(_container));
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerfactory, IApplicationLifetime lifetime)
        {
            loggerfactory.AddConsole();
            loggerfactory.AddDebug();

            //if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            //app.UseIdentity();

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                CookieSecure = CookieSecurePolicy.SameAsRequest,
                SlidingExpiration = true,
                ExpireTimeSpan = TimeSpan.FromMinutes(10),
                AuthenticationScheme = "OneViewScheme"
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            //// NBusFactory.Instance.Start();
            //// lifetime.ApplicationStopping.Register(() => NBusFactory.Instance.Stop());

            app.UseSimpleInjectorAspNetRequestScoping(_container);
            _container.Options.DefaultScopedLifestyle = new AspNetRequestLifestyle();
            _container.RegisterMvcControllers(app);
            _container.RegisterMvcViewComponents(app);

            _container.Register(() => app.ApplicationServices.GetRequiredService<IHttpContextAccessor>());
            _container.Register(() => app.ApplicationServices.GetRequiredService<IHostingEnvironment>());
        }
    }
}
