namespace Ztm;

static internal class RandomKey {
	public static byte[] GenerateKey() {
		byte[] key = new byte[32];
		new Random().NextBytes(key);
		return key;
	}
}