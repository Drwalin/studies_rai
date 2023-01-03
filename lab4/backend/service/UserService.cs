namespace Ztm;

public class UserService {
	private readonly UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}


	public UserEntity? FindById(int id) {
		return userRepository.FindById(id);
	}

	public UserEntity? FindByUsername(string username) {
		return userRepository.FindByUsername(username);
	}

	public void Create(UserEntity user) {
		userRepository.Create(user);
	}

	public List<UserEntity> FindAll() {
		return userRepository.FindAll();
	}

	public void Update(UserEntity user) {
		userRepository.Update(user);
	}

	public void Delete(UserEntity user) {
		userRepository.Delete(user);
	}
}