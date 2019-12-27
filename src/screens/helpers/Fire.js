import FirebaseKeys from "./config";
import { Alert } from 'react-native';
import * as firebase from "firebase";

class Fire {
    constructor() {
        firebase.initializeApp(FirebaseKeys);
    }

    createUser = async user => {
        try {
            // console.log('useruser',user)
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(async result => {
                let userPro = firebase.auth().currentUser;
                // console.log('userProPro',userPro)
                userPro.updateProfile({
                   displayName:user.name,
                });
                // console.log('uid uid',result.user.uid)
                // console.log('display',UserPro.displayName)
                await firebase.database().ref('users/' + result.user.uid).set({
                    name: user.name,
                    email: user.email,
                    image: null,
                })
            }).catch (error => {
                Alert.alert('Warning!',error.message);
            })
        } 
        catch (error) {
            Alert.alert('Warning!',error.message);
            // console.log(error.message)
        }
    };

    signOut = () => {
        firebase.auth().signOut();
    };
}

Fire.shared = new Fire();
export default Fire;