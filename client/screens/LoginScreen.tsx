import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.mainImage}
        source={require('../assets/images/iku_image.png')}
      />
      <TextInput
        placeholder="아이디"
        style={styles.textInput}
        returnKeyType={'next'}
        autoComplete={'email'}
        blurOnSubmit={false}
      />
      <TextInput
        placeholder="비밀번호"
        style={styles.textInput}
        returnKeyType={'done'}
        autoComplete={'password'}
        secureTextEntry={true}
        blurOnSubmit={false}
      />
      <View style={styles.loginContainer}>
        <TouchableOpacity
          style={[styles.signButton, {backgroundColor: '#003865'}]}
          onPress={() => {}}>
          <Text style={styles.textInButton}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.signButton]} onPress={() => {}}>
          <Text style={styles.textInButton}>아이디찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.signButton, {backgroundColor: 'white'}]}
          onPress={() => {}}>
          <Text style={styles.textInButton}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  mainImage: {},
  textInput: {},
  loginContainer: {},
  buttonContainer: {},
  signButton: {},
  textInButton: {},
});
export default LoginScreen;
