namespace lab2.Models {
	
	public class User {
		public readonly string name;
		public readonly DateTime created;

		public User(string name) {
			created = DateTime.Now;
			this.name = name;
		}

		public HashSet<User> friends = new();
	}
}
