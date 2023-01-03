namespace Ztm;

public class ZtmStop
{
    public int? stopId { get; set; }
    public string? stopCode { get; set; }
    public string? stopName { get; set; }
    public string? stopShortName { get; set; }
    public string? stopDesc { get; set; }
    public string? subName { get; set; }
    public int? ZoneId { get; set; }
    public string? zoneName { get; set; }
    public int? Virtual { get; set; }
    public int? Nonpassenger { get; set; }
    public int? Depot { get; set; }
    public int? TicketZoneBorder { get; set; }
    public int? OnDemand { get; set; }
    public string? activationDate { get; set; }
    public double? stopLat { get; set; }
    public double? stopLon { get; set; }
    public string? stopUrl { get; set; }
    public string? locationType { get; set; }
    public string? parentStation { get; set; }
    public string? stopTimezone { get; set; }
    public string? wheelchairBoarding { get; set; }
}