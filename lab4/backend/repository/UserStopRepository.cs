namespace Ztm;

public class UserStopRepository {
	private readonly ZtmDbContext dbContext;

	public UserStopRepository(ZtmDbContext dbContext) {
		this.dbContext = dbContext;
	}

	public void Create(UserStopEntity stop) {
		dbContext.userStops.Add(stop);
		dbContext.SaveChanges();
	}
	
	public UserStopEntity? FindById(int id) {
		return dbContext.userStops.FirstOrDefault(s => s.id == id);
	}

	public List<UserStopEntity> FindAllByUser(UserEntity user) {
		return dbContext.userStops.Where(s => s.user.id == user.id).ToList();
	}

	public void Remove(UserStopEntity stop) {
		dbContext.userStops.Remove(stop);
		dbContext.SaveChanges();
	}
}
