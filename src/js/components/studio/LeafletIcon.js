import L from "leaflet";

const GMapsIcon = L.Icon.extend({
  options: {}
});


/**
 * Get a Leaflet icon.
 * @param {string} hex - RRGGBB of the icon.
 */
export function getLIcon(hex) {
  return new GMapsIcon({
    iconUrl:
      `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${hex}`
  })
}