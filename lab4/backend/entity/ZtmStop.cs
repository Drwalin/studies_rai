namespace Ztm;

public class ZtmStop
{
    public int? stopId { get; set; }
    public string? StopCode { get; set; }
    public string? StopName { get; set; }
    public string? StopShortName { get; set; }
    public string? StopDesc { get; set; }
    public string? SubName { get; set; }
    public int? ZoneId { get; set; }
    public string? ZoneName { get; set; }
    public int? Virtual { get; set; }
    public int? Nonpassenger { get; set; }
    public int? Depot { get; set; }
    public int? TicketZoneBorder { get; set; }
    public int? OnDemand { get; set; }
    public string? ActivationDate { get; set; }
    public double? StopLat { get; set; }
    public double? StopLon { get; set; }
    public string? StopUrl { get; set; }
    public string? LocationType { get; set; }
    public string? ParentStation { get; set; }
    public string? StopTimezone { get; set; }
    public string? WheelchairBoarding { get; set; }
}