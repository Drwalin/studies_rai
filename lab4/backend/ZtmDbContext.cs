using Microsoft.EntityFrameworkCore;

namespace Ztm;

public class ZtmDbContext : DbContext {
	public DbSet<UserEntity>? users { get; set; }
	public DbSet<UserStopEntity>? userStops { get; set; }

	public ZtmDbContext() : base() {
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder) {
		modelBuilder.Entity<UserEntity>()
			.HasMany(u => u.favouriteStops)
			.WithOne(s => s.user);
	}

	protected override void OnConfiguring(
		DbContextOptionsBuilder optionsBuilder) {
		optionsBuilder.UseSqlite("DataSource=Database.db");
	}
}
