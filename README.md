## OpenPointClinetのベータ

スマホでポイントや電子マネーシステムを運営するための基本アプリテンプレート。
誰でも維持れるようにReactNative（Expo）で書いてます。

本当はサーバと連携しますが、とりあえずクライアントだけ。

## 主な機能

* サインアップ・サインイン・サインアウト
* 情報配信（API, Push, Websocket)
* QR/Code128表示
* QR/Code128読取
* ポイント加算/減算
* ポイント利用履歴
* ユーザー情報表示（更新）

![openpointclient](https://user-images.githubusercontent.com/3616214/50267776-b5d29780-046b-11e9-9c89-c7a567c06d71.png)

## 利用方法

```
git clone url hoge
cd hoge
yarn install
yarn start
```