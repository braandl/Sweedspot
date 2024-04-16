import { Component } from "react";
import { connect } from "react-redux";
import { setLegalStateTo } from "./store/legal";
import { LegalState } from "./defs/legalstate";

/**
 * Conversion factor from degrees to microdegrees.
 */
const MINIMUM_DISTANCE = 100 * 2.0

/**
 * The equatorial radius as defined by the <a href="http://en.wikipedia.org/wiki/World_Geodetic_System">WGS84
 * ellipsoid</a>. WGS84 is the reference coordinate system used by the Global Positioning System.
 */
export const EQUATORIAL_RADIUS = 6378137.0

/**
 * Maximum possible latitude coordinate.
 */
const LATITUDE_MAX = 90

/**
 * Minimum possible latitude coordinate.
 */
const LATITUDE_MIN = -LATITUDE_MAX

/**
 * Maximum possible longitude coordinate.
 */
const LONGITUDE_MAX = 180;

/**
 * Minimum possible longitude coordinate.
 */
const LONGITUDE_MIN = -LONGITUDE_MAX

class Overpass extends Component {

    render() {
        this.queryOverpass()
        return null
    }

    latitudeDistance(meters) {
        return (meters * 360) / (2 * Math.PI * EQUATORIAL_RADIUS)
    }

    /**
     * Converts Metrics from Deg2Rad
     */
    static toRadians(deg) {
        return deg * Math.PI / 180
    }

    /**
     * Csonverts Metrics from Rad2Deg
     */
    static toDegrees(rad) {
        return rad * 180 / Math.PI
    }

    /**
     * Calculates the amount of degrees of longitude for a given distance in meters.
     *
     * @param meters   distance in meters
     * @param latitude the latitude at which the calculation should be performed
     * @return longitude degrees
     */
    longitudeDistance(meters, latitude) {
        return (meters * 360) / (2 * Math.PI * EQUATORIAL_RADIUS * Math.cos(Overpass.toRadians(latitude)))
    }

    async post(url, data) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "text/plain;charset=UTF-8",
            },
            redirect: "error",
            referrerPolicy: "no-referrer",
            body: data,
        });
        return response.json()
    }

    extendMeters(bbox, meters) {
        if (meters == 0) {
            return bbox
        } else if (meters < 0) {
            return bbox
        }

        let verticalExpansion = this.latitudeDistance(meters);
        let horizontalExpansion = this.longitudeDistance(meters, Math.max(Math.abs(bbox[0]), Math.abs(bbox[2])));

        let minLat = Math.max(LATITUDE_MIN, bbox[0] - verticalExpansion);
        let minLon = Math.max(LONGITUDE_MIN, bbox[1] - horizontalExpansion);
        let maxLat = Math.min(LATITUDE_MAX, bbox[2] + verticalExpansion);
        let maxLon = Math.min(LONGITUDE_MAX, bbox[3] + horizontalExpansion);

        return [minLat, minLon, maxLat, maxLon];
    }

    _buildBBox(distance = 100) {
        return this.extendMeters([
            this.props.location.coords.latitude,
            this.props.location.coords.longitude,

            this.props.location.coords.latitude,
            this.props.location.coords.longitude
        ], (MINIMUM_DISTANCE + distance))

    }

    async queryOverpass() {
        const boundingBox = this._buildBBox(Math.min(10, this.props.location?.coords?.accuracy ?? 10));

        /* overpass query from Bubatzkarte.de => */
        const query = `[out:json][timeout:25];
// gather results
(
nwr["amenity"="school"](${boundingBox});
nwr["amenity"="playground"](${boundingBox});
nwr["amenity"="kindergarten"](${boundingBox});
nwr["building"="kindergarten"](${boundingBox});
nwr["community_centre"="youth_centre"](${boundingBox});
nwr["amenity"="childcare"](${boundingBox});
nwr["name"="'*Jugendherberge'"](${boundingBox});
nwr["social_facility:for"="child"](${boundingBox});
nwr["social_facility:for"="juvenile"](${boundingBox});
nwr["healthcare:speciality"="child_psychiatry"](${boundingBox});
nwr["wn/leisure"="pitch"](${boundingBox});
nwr["wn/leisure"="sports_hall"](${boundingBox});
nwr["wn/leisure"="sports_centre"](${boundingBox});
nwr["wn/leisure"="horse_riding"](${boundingBox});
nwr["wn/leisure"="swimming_pool"](${boundingBox});
nwr["wn/leisure"="track"](${boundingBox});
nwr["wn/leisure"="stadium"](${boundingBox});
nwr["wn/leisure"="water_park"](${boundingBox});
nwr["wn/leisure"="golf_course"](${boundingBox});
nwr["wn/leisure"="indoor_play"](${boundingBox});
);
// print results
out geom;`

        try {

            const result = await this.post("https://overpass-api.de/api/interpreter", "data=" + query)

            if (result.elements.length > 0) {
                this.props.setLegalStateTo(LegalState.illegal);
            } else {
                this.props.setLegalStateTo(LegalState.legal);
            }
        } catch (ignored) {
            /* console.warn(e); */
        }
    }
}

const mapDispatchToProps = {
    setLegalStateTo: setLegalStateTo,
}

function mapStateToProps(state) {
    return {
        location: state.location.location
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overpass)
