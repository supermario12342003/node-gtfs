var gtfs = require('../../../');

module.exports = function routes(app){
  
  //AgencyList
  app.get('/api/agencies', function(req, res){
    gtfs.agencies(function(e, data){
      res.json(e || data || {error: 'No agencies in database'});
    });
  });
   
  app.get('/api/agenciesNearby/:lat/:lon/:radiusInMiles', function(req, res){
    var lat = req.params.lat
      , lon = req.params.lon
      , radius = req.params.radiusInMiles;
    gtfs.getAgenciesByDistance(lat, lon, radius, function(e, data){
      res.json(e || data || {error: 'No agencies within radius of ' + radius + ' miles'});
    });
  });

  app.get('/api/agenciesNearby/:lat/:lon', function(req, res){
    var lat = req.params.lat
      , lon = req.params.lon;
    gtfs.getAgenciesByDistance(lat, lon, function(e, data){
      res.json(e || data || {error: 'No agencies within default radius'});
    });
  });

  //Routelist
  app.get('/api/routes/:agency', function(req, res){
    var agency_key = req.params.agency;
    gtfs.getRoutesByAgency(agency_key, function(e, data){
      res.json(e || data || {error: 'No routes for agency_key ' + agency_key});
    });
  });
  
  app.get('/api/routesNearby/:lat/:lon/:radiusInMiles', function(req, res){
    var lat = req.params.lat
      , lon = req.params.lon
      , radius = req.params.radiusInMiles;
    gtfs.getRoutesByDistance(lat, lon, radius, function(e, data){
      res.json(e || data || {error: 'No routes within radius of ' + radius + ' miles'});
    });
  });
  app.get('/api/routesNearby/:lat/:lon', function(req, res){
    var lat = req.params.lat
      , lon = req.params.lon;
    gtfs.getRoutesByDistance(lat, lon, function(e, data){
      res.json(e || data || {error: 'No routes within default radius'});
    });
  });
  
  
  //Stoplist
  app.get('/api/stops/:agency/:route_id/:direction_id', gtfs.getStopsByRoute);
  app.get('/api/stops/:agency/:route_id', gtfs.getStopsByRoute);
  
  app.get('/api/stopsNearby/:lat/:lon/:radiusInMiles', function(req, res){
    var lat = req.params.lat
      , lon = req.params.lon
      , radius = req.params.radiusInMiles;
    gtfs.getStopsByDistance(lat, lon, radius, function(e, data){
      res.json(e || data || {error: 'No stops within radius of ' + radius + ' miles'});
    });
  });
  app.get('/api/stopsNearby/:lat/:lon', function(req, res){
    var lat = req.params.lat
      , lon = req.params.lon;
    gtfs.getStopsByDistance(lat, lon, function(e, data){
      res.json(e || data || {error: 'No stops within default radius'});
    });
  });
  
  //Times
  app.get('/api/times/:agency/:route_id/:stop_id/:direction_id', gtfs.getTimesByStop);
  app.get('/api/times/:agency/:route_id/:stop_id', gtfs.getTimesByStop);
    
  //Nothing specified
  app.all('*', function notFound(req, res) {
    
    res.contentType('application/json');
    res.send({
      error: 'No API call specified'
    });
  });

}
