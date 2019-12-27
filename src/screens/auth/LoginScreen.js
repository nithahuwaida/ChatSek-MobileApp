import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,
         Image,KeyboardAvoidingView, PermissionsAndroid,
        ToastAndroid, Platform} from 'react-native';
import * as firebase from 'firebase';
import logoChat from '../../../images/logochatsek.png';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';

export default class LoginScreen extends React.Component{
    static navigationOptions ={
        header: null,
    }
    constructor(props){
        super(props);
        this.isMounted = false;
        this.state = {
            email: "",
            password: "",
            errorMessage: null,
        };
    }

    componentDidMount = async () =>{
        this.isMounted = true;
        await this.getLocation();
    }

    componentWillUnmount(){
        this.isMounted = false;
        Geolocation.clearWatch();
        Geolocation.stopObserving();
    }

    //Get location permissions
    hasLocationPermission = async () => {
        if(
            Platform.OS === 'ios' || (Platform.OS === 'android' && Platform.version < 23)
        ){ return true }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )
        
        if(hasPermission){ return true }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )

        if(status===PermissionsAndroid.RESULTS.GRANTED){return true}
        if(status===PermissionsAndroid.RESULTS.DENIED){
            ToastAndroid.show(
                'Location Permission Denied By User', ToastAndroid.LONG
            )
        }else if(status===PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN){
            ToastAndroid.show(
                'Location Permissions Revoked By User', ToastAndroid.LONG
            )
        }
        return false;
    }

    //Set Location
    getLocation = async () =>{
        const hasLocationPermission = await this.hasLocationPermission();
        if(!hasLocationPermission){
            return;
        }

        this.setState({loading:true},()=>{
            Geolocation.getCurrentPosition(
                position => {
                    this.setState({
                        latitude : position.coords.latitude,
                        longitude : position.coords.longitude,
                        loading : false
                    })
                },
                error => {
                    this.setState({errorMessage: error});
                },{
                    enableHighAccuracy : true,
                    timeout : 8000,
                    maximumAge : 8000,
                    distanceFilter : 50,
                    forceRequestLocation: true,
                }
            )
        })
    }

    handleLogin = async () => {
        const { email, password } = this.state;
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async response => {
            firebase.database().ref('/users/'+ response.user.uid).update({
                status: 'Online',
                latitude : this.state.latitude || null,
                longitude : this.state.longitude || null,
            })

            ToastAndroid.show('Login success', ToastAndroid.LONG);
            await AsyncStorage.setItem('userid', response.user.uid);
            await AsyncStorage.setItem('user', JSON.stringify(response.user));

            this.props.navigation.navigate('App')
        }).catch(error => {
            console.warn(error);
            this.setState({
                errorMessage: error.message,
                email: '',
                password: '',
            });
            ToastAndroid.show(this.state.errorMessage, ToastAndroid.LONG);
        });      
    };


    render(){
        return(
            <View style={styles.container}>
                <View style={{marginTop: 54, alignItems: "center"}}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={logoChat}/>
                    </View>
                    <Text style={styles.greeting}>
                        {`W E L C O M E\n`}
                    </Text>
                </View>
                <KeyboardAvoidingView>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Email Address</Text>
                            <TextInput 
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            />
                        </View>

                        <View style={{marginTop: 12}}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput 
                            secureTextEntry
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{color:"#FFF", fontWeight: "500"}}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={{alignSelf: "center", marginTop:32}}
                onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={{color : "#414959", fontSize: 13}}>
                    Don't have an account ChatSek? <Text style={{fontWeight:"500", color: "#5f9ea0" }}>  Register</Text>
                    </Text>
                </TouchableOpacity>
            </View>            
        );
    }
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
    },
    avatarContainer:{
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity : 0.4
    },
    avatar:{
        width: 160,
        height: 136,
        marginLeft:20
    },
    greeting:{
        marginTop: 22,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    form:{
        marginBottom:40,
        marginHorizontal:30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D",
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#5f9ea0",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
});