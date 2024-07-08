import { Component } from "react"
import { connect } from "react-redux";
import { LegalState } from "../classes/defs/legalstate";
import { StyleSheet, View, Text, Image, Platform, Linking, Pressable } from 'react-native';
import { ResizeMode, Video } from "expo-av";

import { setLocation } from "../classes/store/location";
import Imprint from "./Imprint";

class Legal extends Component {

    state = { showImprint: false }

    _styleFromLegalState() {
        switch (this.props.legalState) {
            case LegalState.legal: return styles.legal;
            case LegalState.illegal: return styles.illegal;
            default: return styles.unkown;
        }
    }

    _yesVid() {
        return (<Video
            style={styles.video}
            videoStyle={styles.video}
            source={require("../../assets/videos/smoke.mp4")}
            positionMillis={500}
            useNativeControls={false}
            resizeMode={Platform.OS === "web" ? ResizeMode.COVER :  ResizeMode.CONTAIN}
            isLooping={true}
            isMuted={true}
            shouldPlay={true}
        />)
    }

    _noVid() {
        return (
            <Video
                style={styles.video}
                videoStyle={styles.video}
                source={require("../../assets/videos/nosmoke.mp4")}
                positionMillis={500}
                useNativeControls={false}
                resizeMode={ResizeMode.CONTAIN}
                isLooping={true}
                isMuted={true}
                shouldPlay={true}
            />)
    }

    _legalString() {
        switch (this.props.legalState) {
            case LegalState.illegal: return (<Text style={[styles.center, styles.brightText]}>Not here, my friend</Text>)
            case LegalState.legal: return (<Text style={[styles.center, styles.brightText]}>420</Text>)
            default: return (<Text style={[styles.center, styles.brightText]}>Please give me a short moment to look you up.</Text>)
        }
    }

    _getAppBanners() {
        return (
            <View>
                <Pressable onPress={() => { Linking.openURL("https://play.google.com/store/apps/details?id=bra.an.dl.sweedspot") }} >
                    <Image style={styles.appstore} source={require('../../assets/gplay-badge.png')} />
                </Pressable>
                <Pressable onPress={() => { /*Linking.openURL("https://apple.de")*/ alert('coming soon') }} >
                    <Image style={styles.appstore} source={require('../../assets/app-store-badge.png')} />
                </Pressable>
            </View>
        )
    }

    _getTesterInfo() {
        return (
            <View>
                <Text style={styles.tester}>The App is currently in beta testing. Want to become a tester? Join the group, it's simple and free!</Text>
                <Pressable onPress={() => { Linking.openURL("https://groups.google.com/g/sweedspot") }} >
                    <Image style={styles.appstore} source={require('../../assets/googlegroups.jpg')} />
                </Pressable>
            </View>
        )
    }

    render() {
        return this.state.showImprint ? <Imprint onClose={() => this.setState({ showImprint: false })} style={styles.container} /> : (
            <View style={[styles.container, this._styleFromLegalState()]}>

                {this.props.legalState === LegalState.legal ? this._yesVid() : this.props.legalState === LegalState.illegal ? this._noVid() : null}

                {
                    (Platform.OS === "web") ?
                        (
                            <View style={styles.appbox}>
                                {this._getAppBanners()}
                                {this._getTesterInfo()}
                            </View>
                        )
                        :
                        (
                            <View style={styles.infobox}>
                                {this._legalString()}
                            </View>
                        )
                }


                {
                    (Platform.OS === "web") ?
                        (
                            <View style={styles.locationbox}>
                                <Text onPress={() => this.setState({ showImprint: true })} style={[styles.brightText, { textDecoration: "underline" }]}>Open Info</Text>
                            </View>
                        )
                        :
                        (
                            <View style={styles.locationbox}>
                                <Text onPress={() => this.setState({ showImprint: true })} style={styles.brightText}>Your current location</Text>
                                <Text onPress={() => this.setState({ showImprint: true })} style={styles.brightText}>{this.props.location.coords.latitude},{this.props.location.coords.longitude}</Text>
                                <Text onPress={() => this.setState({ showImprint: true })} style={[styles.brightText, { textDecoration: "underline" }]}>Open Info</Text>
                            </View>
                        )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: '#000000'
    },
    hemp: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
    },
    video: {
        flex: 1,
        zIndex: -1,
        position: 'absolute',
        width: "100%",
        height: "100%",
        backgroundColor: '#000000'
    },
    center: {
        fontWeight: 'bold',
        zIndex: 1,
        alignSelf: 'center'
    },
    unkown: {
        backgroundColor: '#000000'
    },
    brightText: {
        color: "#f0f0f0",
        textAlign: "center"
    },
    button: {
        top: -67,
        padding: 10,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    infobox: {
        top: "20%",
        zIndex: 2,
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: 'flex-end',
    },
    appbox: {
        flex: 1,
        zIndex: 2,
        top: 220,
        width: "100%",
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
    },
    locationbox: {
        flex: 1,
        zIndex: 2,
        top: 80,
        justifyContent: 'center',
    },
    appstore: {
        width: 103,
        height: 34,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        margin: 10
    },
    tester: {
        flex: 1,
        fontWeight: 600,
        fontSize: 20,
        marginTop: 50,
        marginBottom: 20,
        textAlign: 'center',
        color: 'white'
    }
});


function mapStateToProps(state) {
    return {
        legalState: state.legal.legalState,
        location: state.location.location
    }
}

const mapDispatchToProps = {
    setLocation: setLocation,
}

export default connect(mapStateToProps, mapDispatchToProps)(Legal)