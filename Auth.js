import { AsyncStorage } from 'react-native';

//SecureStoreの方がいいけど、とりあえず。

//key
const KEY = 'ACCESS_TOKEN';

//サインイン時の処理
//アクセストークンを渡して保存してもらう仕様
export const onSignIn = (access_token) => AsyncStorage.setItem(KEY, access_token);

//サインアウト時の処理
export const onSignOut = () => { AsyncStorage.removeItem(KEY) };

//サインインしてるか確認処理（＋Token取得）
export const isSignedIn = async () => {
    try {
        //token取得
        const access_token = await AsyncStorage.getItem(KEY);
        console.log(access_token);
        //状態により分岐
        if (access_token !== null) {
            return { signedIn: true, access_token: access_token }
        } else {
            return { signedIn: false, access_token: '' }
        }
    } catch (error) {
        console.log(error);
    }
}