import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, 
        Image, KeyboardAvoidingView, ImageBackground} from "react-native";
import Fire from '../helpers/Fire';
import logoChat from '../../../images/chatseklogo.png';
import imageBg from '../../../images/bgImage.png';

export default class RegisterScreen extends React.Component {
    static navigationOptions ={
        header: null,
    }
    
    state = {
        user: {
            name: "",
            email: "",
            password: "",
        },
        errorMessage: null
    };

    handleRegister = () => {
        Fire.shared.createUser(this.state.user);
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={imageBg} style={styles.backgroundContainer}>
                    <View style={{marginTop: 54, alignItems: "center"}}>
                        <View style={styles.avatarContainer}>
                            <Image style={styles.avatar} source={logoChat}/>
                        </View>
                        <Text style={styles.greeting}>{`\nRegister to get started`}</Text>
                    </View>

                    <KeyboardAvoidingView>
                        <View style={styles.form}>
                            <View>
                                <Text style={styles.inputTitle}>Full Name</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    onChangeText={name => this.setState({ user: { ...this.state.user, name } })}
                                    value={this.state.user.name}
                                ></TextInput>
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.inputTitle}>Email Address</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
                                    value={this.state.user.email}
                                ></TextInput>
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.inputTitle}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
                                    value={this.state.user.password}
                                ></TextInput>
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                    <TouchableOpacity style={styles.button} onPress={this.handleRegister}>
                        <Text style={{ color: "#FFF", fontWeight: "500" }}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: "center", marginTop: 20 }}
                    onPress={() => this.props.navigation.navigate("Login")}>
                        <Text style={{ color: "#414959", fontSize: 13 }}>
                            Have an account? <Text style={{ fontWeight: "500", color: "#5f9ea0" }}>  Login</Text>
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundContainer:{
        width: null,
        height: null,
    },
    greeting: {
        marginTop: 35,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    avatarContainer:{
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity : 0.4,
    },
    avatar:{
        width: 160,
        height: 136,
        marginLeft:20
    },
    form: {
        marginBottom: 35,
        marginHorizontal: 30
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
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 40,
        backgroundColor: "#1B4F72",
        borderRadius: 4,
        height: 42,
        alignItems: "center",
        justifyContent: "center"
    }
});