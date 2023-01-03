namespace Ztm;

public class UserRepository {
	private readonly ZtmDbContext dbContext;

	public UserRepository(ZtmDbContext dbContext) {
		this.dbContext = dbContext;
	}

	public void Create(UserEntity user) {
		dbContext.users.Add(user);
		dbContext.SaveChanges();
	}

	public UserEntity? FindById(int id) {
		return dbContext.users.FirstOrDefault(s => s.id == id);
	}

	public UserEntity? FindByUsername(string username) {
		return dbContext.users.FirstOrDefault(s => s.username.Equals(username));
	}

	public List<UserEntity> FindAll() {
		return dbContext.users.ToList();
	}

	public void Update(UserEntity user) {
		dbContext.users.Update(user);
		dbContext.SaveChanges();
	}

	public void Delete(UserEntity user) {
		dbContext.userStops.RemoveRange(user.favouriteStops);
		dbContext.users.Remove(user);
		dbContext.SaveChanges();
	}
}