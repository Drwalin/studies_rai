namespace lab2.Models; 

public class UserRepository {
	private Dictionary<string, User> users = new ();

	public UserRepository() {
		Init();
	}

	private void Init() {
		AddUser("admin");
		AddUser("Ziemniak");
		AddUser("Mielony");
		AddUser("Zielony");
		AddUser("Pyra");

		AddFriend("admin", "Ziemniak");
		AddFriend("admin", "Mielony");
		AddFriend("Mielony", "Pyra");
		AddFriend("Mielony", "Ziemniak");
		AddFriend("Mielony", "Zielony");
		AddFriend("Zielony", "Pyra");
	}

	public bool AddUser(string name) {
		if(name.Length < 3) {
			return false;
		} else {
			User user = new(name);
			if(users.TryAdd(user.name, user)) {
				return true;
			}

			return false;
		}
	}

	public bool DeleteUser(string name) {
		User user;
		if(users.TryGetValue(name, out user)) {
			DeleteFriends(name);

			users.Remove(user.name);
		}

		return false;
	}

	public List<User> ListUsers() {
		return users.Values.ToList();
	}


	public bool AddFriend(string userName, string friendName) {
		User user, friend;
		if(users.TryGetValue(userName, out user)) {
			if(users.TryGetValue(friendName, out friend)) {
				if(friend != user) {
					if(user.friends.Contains(friend)) {
						return false;
					} else {
						user.friends.Add(friend);
						friend.friends.Add(user);
						return true;
					}
				}
			}
		}

		return false;
	}

	public bool DeleteFriend(string userName, string friendName) {
		User user, friend;
		if(users.TryGetValue(userName, out user)) {
			if(users.TryGetValue(friendName, out friend)) {
				if(friend != user) {
					if(user.friends.Contains(friend)) {
						user.friends.Remove(friend);
						friend.friends.Remove(user);
						return true;
					} else {
						return false;
					}
				}
			}
		}

		return false;
	}

	public bool DeleteFriends(string userName) {
		User user, friend;
		if(users.TryGetValue(userName, out user)) {
			foreach(var u in user.friends) {
				u.friends.Remove(user);
			}

			user.friends.Clear();
			return true;
		}

		return false;
	}

	public List<User> ListFriends(string userName) {
		User user;
		if(users.TryGetValue(userName, out user)) {
			return user.friends.ToList();
		}

		return null;
	}


	public User GetUser(string name) {
		User user;
		if(users.TryGetValue(name, out user)) {
			return user;
		}

		return null;
		
	}
}
