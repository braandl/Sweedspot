import { Component } from "react";
import { Pressable, StyleSheet, Text, ScrollView, View } from "react-native";
import Markdown from 'react-native-markdown-display';
import * as Application from 'expo-application';

export default class Imprint extends Component {

    constructor(props) {
        super(props);
        console.log(Application)
        this.markdown =
            `
# ${Application.applicationName}

This App will query Overpass-API in order to check if your
location is within one of the zones, where you are not
allowed to consume any cannabis in germany.

## How does it work?

The ppp queries you location from your local operating system,
and the open streetmap overpass api.
Then your location will be checked with the overpass results.
For your own safety, the inaccuracy of the GNSS data will
be added to the required radius of 100 Meters.
The app will now tell you, if you are within the range of 100m to
any of the listed amenities.

## Is it relyable?

Kind of, but I don't guarantee you anything.
The resolution relies on the quality of the osm dataset
and your GNSS accuracy.

## What are your query parameters?

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

## Assets

Background videos are taken from
https://pixabay.com/videos/ink-paint-water-acrylic-smoke-21536
and
https://pixabay.com/videos/ai-generated-man-rain-homeless-171181

## Licenses



## Imprint

${Application.applicationName}
c/o Block Services
Stuttgarter Str. 106
70736 Fellbach

### Current Version

_${Application.applicationName}:${Application.nativeApplicationVersion}_
`;

        this.license =
            `

## Open Source Licenses
| Name                          | License type | Link                                                             | Author                                                         |
| :---------------------------- | :----------- | :--------------------------------------------------------------- | :------------------------------------------------------------- |
| @expo/metro-runtime           | MIT          | git+https://github.com/expo/expo.git                             | 650 Industries, Inc.                                           |
| @reduxjs/toolkit              | MIT          | git+https://github.com/reduxjs/redux-toolkit.git                 | Mark Erikson <mark@isquaredsoftware.com>                       |
| expo                          | MIT          | git+https://github.com/expo/expo.git                             | Expo                                                           |
| expo-application              | MIT          | git+https://github.com/expo/expo.git                             | 650 Industries, Inc.                                           |
| expo-asset                    | MIT          | git+https://github.com/expo/expo.git                             | 650 Industries, Inc.                                           |
| expo-av                       | MIT          | git+https://github.com/expo/expo.git                             | 650 Industries, Inc.                                           |
| expo-location                 | MIT          | git+https://github.com/expo/expo.git                             | 650 Industries, Inc.                                           |
| expo-module-scripts           | MIT          | git+https://github.com/expo/expo.git                             | Expo                                                           |
| expo-status-bar               | MIT          | git+https://github.com/expo/expo.git                             | 650 Industries, Inc.                                           |
| react                         | MIT          | git+https://github.com/facebook/react.git                        | Facebook                                                            |
| react-app-polyfill            | MIT          | git+https://github.com/facebook/create-react-app.git             | Facebook                                                             |
| react-dev-utils               | MIT          | git+https://github.com/facebook/create-react-app.git             | Facebook                                                             |
| react-dom                     | MIT          | git+https://github.com/facebook/react.git                        | Facebook                                                             |
| react-native                  | MIT          | git+https://github.com/facebook/react-native.git                 | Facebook                                                             |
| react-native-markdown-display | MIT          | git+https://github.com/iamacup/react-native-markdown-display.git | Mient-jan Stelling and Tom Pickard + others from the community |
| react-native-web              | MIT          | git://github.com/necolas/react-native-web.git                    | Nicolas Gallagher                                              |
| react-redux                   | MIT          | git+https://github.com/reduxjs/react-redux.git                   | Dan Abramov <dan.abramov@me.com> (https://github.com/gaearon)  |
| react-refresh                 | MIT          | git+https://github.com/facebook/react.git                        | Facebook                                                            |
| @babel/core                   | MIT          | https://github.com/babel/babel.git                               | The Babel Team (https://babel.dev/team)                        |

`

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
                    <Markdown style={{
                        body: { color: '#f0f0f0', backgroundColor: '#000000' },
                        heading1: { color: '#f0f0f0', backgroundColor: '#000000' },
                        code_block: { color: '#f0f0f0', backgroundColor: '#000000' },
                        code_inline: { color: '#f0f0f0', backgroundColor: '#000000' }
                    }}>
                        {this.license}
                    </Markdown>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: '#000000'
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#000000',
    },
    backContainer: {
        alignItems: 'flex-end',
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