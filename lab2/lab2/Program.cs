var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if(!app.Environment.IsDevelopment())  {
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


/*
app.MapControllerRoute(
    name: "UserListsd",
    pattern: "{controller=User}/{action=List}"
    );
*/

/*
app.MapControllerRoute(
    name: "UserListfdsfa",
    pattern: "User/List",
    defaults: new {controller="User", action="List"}
    );
   */
    

/*
app.MapControllerRoute(
    name: "UserAdd",
    pattern: "{controller=User}/{action=Add}?{name}&{password}"
    );

app.MapControllerRoute(
    name: "UserList",
    pattern: "{controller=User}/{action=List}"
    );

app.MapControllerRoute(
    name: "UserDel",
    pattern: "{controller=User}/{action=Del}?{name}"
    );


app.MapControllerRoute(
    name: "UserDel",
    pattern: "Login/{name}",
    defaults: new {controller="User", action="Login"}
    );

app.MapControllerRoute(
    name: "UserDel",
    pattern: "Logout/{name}",
    defaults: new {controller="User", action="Logout"}
    );



app.MapControllerRoute(
    name: "FriendsAdd",
    pattern: "{controller=Friends}/{action=Add}?{name}&{password}"
    );

app.MapControllerRoute(
    name: "FriendsList",
    pattern: "{controller=Friends}/{action=List}"
    );

app.MapControllerRoute(
    name: "FriendsDel",
    pattern: "{controller=Friends}/{action=Del}"
    );
*/



app.Run();
