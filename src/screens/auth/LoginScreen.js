import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,
         Alert, Image,KeyboardAvoidingView} from 'react-native';
import * as firebase from 'firebase';
import logoChat from '../../../images/logochatsek.png';

export default class LoginScreen extends React.Component{
    static navigationOptions ={
        header: null,
    }

    state = {
        email: "",
        password: "",
        errorMessage: null,
    };

    handleLogin = async () => {
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => this.setState( Alert.alert('Warning!',error.message)));
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