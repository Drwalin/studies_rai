using Newtonsoft.Json;

namespace Ztm;

public class StopService {
	private HttpClient httpClient;

	private const string STOP_ARRIVALS_ENDPOINT =
		"http://ckan2.multimediagdansk.pl/delays?stopId=";

	private const string STOPS_ENDPOINT =
		"https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json";

	private DateOnly lastStopsListUpdate;
	private ZtmStopsList? stopsListCache;
	private readonly Dictionary<int, ZtmStop> stopsByIdCache = new();

	public StopService() {
		HttpClientHandler handler = new();
		handler.ServerCertificateCustomValidationCallback =
			(sender, cert, chain, sslPolicyErrors) => {
				return true;
			};
		httpClient = new HttpClient(handler);
	}

	private async Task<T?> HttpRequest<T>(string endpoint) {
		HttpResponseMessage msg = await httpClient.GetAsync(endpoint);
		msg.EnsureSuccessStatusCode();
		string body = await msg.Content.ReadAsStringAsync();
		return JsonConvert.DeserializeObject<T>(body);
	}

	public async Task<ZtmArrivalsList?> FindArrivalsByStopId(int id) {
		return await HttpRequest<ZtmArrivalsList>(STOP_ARRIVALS_ENDPOINT + id);
	}

	public async Task<ZtmStopsList> FindAllStops() {
		if(lastStopsListUpdate < DateOnly.FromDateTime(DateTime.Today)
		   || stopsListCache == null) {
			var dateStops =
				await HttpRequest<Dictionary<DateOnly, ZtmStopsList>>(
					STOPS_ENDPOINT);
			DateOnly date = dateStops.Keys.Max();
			stopsListCache = dateStops[date];
			lastStopsListUpdate = date;
			stopsByIdCache.Clear();
			foreach(var s in stopsListCache.stops) {
				if(s.stopId != null) {
					stopsByIdCache.Add((int)s.stopId, s);
				}
			}
		}

		return stopsListCache;
	}

	public async Task<Dictionary<int, ZtmStop>> FindAllStopsDictionary() {
		await FindAllStops();
		return stopsByIdCache;
	}

	public async Task<ZtmStop> FindStopById(int id) {
		var dict = await FindAllStopsDictionary();
		return dict.GetValueOrDefault(id, null);
	}

	public async Task<List<ZtmStop>> FindStopsByIds(List<int> ids) {
		var dict = await FindAllStopsDictionary();
		List<ZtmStop> stops = new();
		foreach(var id in ids) {
			if(dict.ContainsKey(id)) {
				stops.Add(dict[id]);
			}
		}

		return stops;
	}
}