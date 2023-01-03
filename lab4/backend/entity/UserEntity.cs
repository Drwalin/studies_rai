namespace Ztm;

public class UserEntity {
	public int id { get; set; }
	public string username { get; set; }
	public string password { get; set; }
	public virtual ICollection<UserStopEntity>? favouriteStops { get; set; }
}
