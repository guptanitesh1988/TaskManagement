using Microsoft.EntityFrameworkCore;
using TaskManagementAPI.Model;

namespace TaskManagementAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Tasks> Tasks { get; set; }

        protected readonly IConfiguration Configuration;

        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        }
    }
}