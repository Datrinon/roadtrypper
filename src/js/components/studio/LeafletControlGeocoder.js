import React, { useEffect } from 'react';
import L from "leaflet";
import { useMap } from "react-leaflet";

import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder";

function LeafletControlGeocoder() {
  const map = useMap();

  //  Create the Icon
  const LeafIcon = L.Icon.extend({
    options: {}
  });

  const greenIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
  });

  useEffect(() => {
    let geocoder = L.Control.Geocoder.photon();
    if (typeof URLSearchParams !== "undefined" && location.search) {
      // parse /?geocoder=nominatim from URL
      let params = new URLSearchParams(location.search);
      let geocoderString = params.get("geocoder");
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn("Unsupported geocoder", geocoderString);
      }
    }

    L.Control.geocoder({
      query: "",
      placeholder: "Search here...",
      defaultMarkGeocode: false,
      geocoder
    }).on("markgeocode", function (e) {
      let latlng = e.geocode.center;
      // For this, look at Leaflet docs to see how to use marker.
      L.marker(latlng, {icon: greenIcon })
        .addTo(map)
        .bindPopup(e.geocode.name)
        .openPopup();
      map.fitBounds(e.geocode.bbox);
    })
      .addTo(map);
  }, []);

  return null;
}
export default LeafletControlGeocoder;
