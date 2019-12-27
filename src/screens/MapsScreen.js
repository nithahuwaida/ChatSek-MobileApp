import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, { Marker , Callout} from 'react-native-maps';

export default class MapsScreen extends React.Component{

    // constructor(props){
    //     super(props);
    //     this.state ={
    //         latitude:0,
    //         longitude:0,
    //         error : null
    //     };
    // }

    // componentDidMount(){
    //     navigator.geolocation.getCurrentPosition(position => {
    //         this.setState({
    //             latitude: position.coords.latitude,
    //             longitude: position.coords.longitude,
    //             error : null
    //         });            
    //       },
    //       error => this.setState({ error : error.message}),
    //       {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000}
    //     );
    // }

    render(){
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={{
                    latitude: -7.797068,
                    longitude: 110.370529,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                    showsMyLocationButton
                    showsUserLocation
                >
                    <Marker coordinate={{
                        latitude: -7.797068,
                        longitude: 110.370529,
                    }}>
                        <Callout>
                            <Text>Hai</Text>
                        </Callout>
                    </Marker>
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})