namespace Ztm;

public class UserStopService {
	private readonly UserStopRepository userStopRepository;

	public UserStopService(UserStopRepository userStopRepository) {
		this.userStopRepository = userStopRepository;
	}
	
	public void AddUserStop(UserStopEntity stop) {
		userStopRepository.Create(stop);
	}

	public List<UserStopEntity> FindAllUserStops(UserEntity user) {
		return userStopRepository.FindAllByUser(user);
	}

	public UserStopEntity? FindByStopIdAndUser(int stopId, UserEntity user) {
		return userStopRepository.FindAllByUser(user)
			.Where(us => us.stopId == stopId).First();
	}

	public void RemoveUserStop(UserStopEntity stop) {
		userStopRepository.Remove(stop);
	}
}
