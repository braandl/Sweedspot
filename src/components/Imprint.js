import { Component } from "react";
import { Pressable, StyleSheet, Text, ScrollView, View } from "react-native";
import Markdown from 'react-native-markdown-display';

import * as Application from 'expo-application';
export default class Imprint extends Component {

    constructor(props) {
        super(props);
        this.markdown =
            `
# ${Application.applicationName}

This App will query Overpass-API in order to check if your
location is within one of the zones, where you are not
allowed to consume any cannabis in germany.

## How does it work?

The App queries you location from your local operating system,
and the open streetmap overpass api.
Then your location will be checked with the overpass results.
For your own safety, the inaccuracy of the GNSS Data will
be added to the required radius of 100 Meters.

## Is it relyable?

Kind of, but I don't guarantee you anything.

## What are your Query Parameters?

I borrowed the list of nominatim selectors from
bubatzkarte.de,
and converted them to be used on overpass.

They read as follows:
 _leisure=playground amenity=school amenity=kindergarten
 building=kindergarten community_centre=youth_centre
 amenity=childcare 'name=*Jugendherberge'
 social_facility:for=child
 social_facility:for=juvenile
 healthcare:speciality=child_psychiatry
 wn/leisure=pitch wn/leisure=sports_hall
 nw/leisure=sports_centre nw/leisure=horse_riding
 nw/leisure=swimming_pool nw/leisure=track
 nw/leisure=stadium nw/leisure=water_park
 nw/leisure=golf_course nw/leisure=indoor_play_

# Imprint

${Application.applicationName}
c/o Block Services
Stuttgarter Str. 106
70736 Fellbach


_${Application.applicationName}:${Application.nativeApplicationVersion}
`;

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.backContainer}>
                    <Pressable style={styles.close} onPress={() => this.props.onClose()}>
                        <Text style={styles.back}>Back</Text>
                    </Pressable>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <Markdown style={{
                        body: { color: '#f0f0f0', backgroundColor: '#000000' },
                        heading1: { color: '#f0f0f0', backgroundColor: '#000000' },
                        code_block: { color: '#f0f0f0', backgroundColor: '#000000' },
                        code_inline: { color: '#f0f0f0', backgroundColor: '#000000' }
                    }}>{this.markdown}</Markdown>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        flexShrink: 0,
        alignItems: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: '#000000'
    },
    scrollContainer: {
        flex: 1,
        flexShrink: 1,
        backgroundColor: '#000000',
    },
    backContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    back: {
        padding: 10,
        color: '#f0f0f0',
    },
    close: {
        borderWidth: 1,
        borderColor: '#f0f0f0',
        alignItems: 'center',
        color: "#f0f0f0"
    }
});