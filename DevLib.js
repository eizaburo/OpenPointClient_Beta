//非同期エミュレーション
export const sleep = (sec) => {
    return new Promise(resolve => {
        setTimeout(resolve, sec);
    })
}