import { connect } from "react-redux"
import { setLocation } from "../classes/store/location"

import * as Location from 'expo-location';
import { useEffect } from "react";
import { Platform } from "react-native";

import * as Application from 'expo-application';


const LOCATION_TASK_NAME = "legalme-background-watcher"

function LocationProvider(props) {

    const startMe = async (props) => {

        const updateLocation = (location) => {
            props.setLocation(location)
        }

        Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            enableHighAccuracy: true,
            distanceInterval: 10,
            timeInterval: 30000,
            foregroundService: {
                notificationTitle: Application.applicationName,
                notificationBody: 'Checking your location, so you can be safe all the time.',
                notificationColor: '#FF00FF',
            },
        })
        await Location.watchPositionAsync({
            enableHighAccuracy: true,
            distanceInterval: 10,
            timeInterval: 30000
        },
            newLocation => {
                updateLocation(newLocation)
            },
        );
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            if (Platform.OS !== "web") {
                startMe(props);
            }

            let location = await Location.getCurrentPositionAsync({});
            props.setLocation(location);
        })();
    }, []);

}

const mapDispatchToProps = {
    setLocation: setLocation,
}

export default connect(null, mapDispatchToProps)(LocationProvider)
