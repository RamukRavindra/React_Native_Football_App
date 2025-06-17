import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Login = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [hidePwd, setHidePwd] = useState(true);

	const handleSignUp = () => {
		const emailRegex = /\S+@\S+\.\S+/;
		if (!email.trim()) {
			ToastAndroid.show('Please enter your email', ToastAndroid.SHORT);
			return;
		}
		if (!emailRegex.test(email)) {
			ToastAndroid.show("Please enter a valid email", ToastAndroid.SHORT);
			return;
		}
		if (!password.trim()) {
			ToastAndroid.show('Please enter your password', ToastAndroid.SHORT);
			return;
		}

		props.navigation.navigate("Dashboard");
	}
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<StatusBar barStyle={"light-content"} />
			<Image
				style={{ width: "100%", height: hp('70%'), position: 'absolute', tintColor: '#009999' }}
				source={require("../assets/background.png")}
			/>
			<View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', position: 'absolute' }}>
				<Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={{ height: hp(25), width: hp(10), tintColor: '#e6ffff' }} source={require("../assets/light.png")} />
				<Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={{ height: hp(18), width: hp(7), tintColor: '#e6ffff' }} source={require("../assets/light.png")} />
			</View>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{ flex: 1 }}>
					<Animated.View entering={FadeInDown.duration(1000).springify()} style={{ flex: 0.6, alignItems: 'center', justifyContent: 'flex-end' }}>
						<Animated.Text entering={FadeInUp.duration(1000).springify()} style={{ color: 'black', fontWeight: 'bold', fontSize: hp(3.5), marginBottom: hp(-5) }}>Login</Animated.Text>
					</Animated.View>
					<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'padding'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 10} style={{ flex: 1, marginHorizontal: wp(4), justifyContent: "center" }}>
						<Animated.View entering={FadeInDown.duration(1000).springify()} style={{ backgroundColor: "#f0f0f5", padding: hp(0.7), borderRadius: hp(1.5), width: '100%' }}>
							<TextInput
								placeholder='Email'
								placeholderTextColor={"gray"}
								style={{ width: wp('90%'), marginHorizontal: wp(3), padding: hp(1.2) }}
								onChangeText={(text) => setEmail(text)}
								value={email}
							/>
						</Animated.View>
						<Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={{ backgroundColor: "#f0f0f5", padding: hp(0.7), marginVertical: hp(2), borderRadius: hp(1.5), width: '100%', marginBottom: hp(0.5), flexDirection: "row", justifyContent: 'space-between' }}>
							<TextInput
								placeholder='Password'
								placeholderTextColor={"gray"}
								style={{ width: wp('70%'), marginHorizontal: wp(3), padding: hp(1.2) }}
								secureTextEntry={hidePwd}
								onChangeText={(text) => setPassword(text)}
								value={password}
							/>
							<TouchableOpacity onPress={() => setHidePwd(!hidePwd)} style={{ alignSelf: 'center', marginRight: wp(3) }}>
								<Image
									source={hidePwd ? require('../assets/ic_eye_hide.png') : require('../assets/ic_eye.png')}
									style={{ alignSelf: 'center', alignItems: 'center', width: hp(3), height: hp(3), tintColor: 'black' }}
								/>
							</TouchableOpacity>
						</Animated.View>
						<Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={{ width: '100%' }}>
							<TouchableOpacity onPress={handleSignUp} style={{ width: '100%', backgroundColor: '#009999', padding: hp(1.2), borderRadius: hp(1.5), marginVertical: hp(1.5) }}>
								<Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: hp(2) }}>Login</Text>
							</TouchableOpacity>
						</Animated.View>
						<Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp(2) }}>
							<Text>Don't have an account? </Text>
							<Text style={{ color: 'lightblue' }}>SignUp</Text>
						</Animated.View>
					</KeyboardAvoidingView>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	)
}

export default Login