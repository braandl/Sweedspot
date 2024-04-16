import Overpass, { EQUATORIAL_RADIUS } from './Overpass';

export function distance(coords1, coords2) {
  return Math.acos(Math.sin(Overpass.toRadians(coords1.latitude))
    * Math.sin(Overpass.toRadians(coords2.latitude))
    + Math.cos(Overpass.toRadians(coords1.latitude))
    * Math.cos(Overpass.toRadians(coords2.latitude))
    * Math.cos(Overpass.toRadians(coords2.longitude - coords2.longitude)))
    * EQUATORIAL_RADIUS;
}
