//非同期エミュレーション
export const sleep = (sec) => {
    return new Promise(resolve => {
        setTimeout(resolve, sec);
    })
}

//recommends
export const recommends = [
    { id: 1, title: 'おすすめ情報１', body: '', image: 'https://cdn.pixabay.com/photo/2015/07/27/19/44/spaghetti-863304_960_720.jpg', url: '' },
    { id: 2, title: 'おすすめ情報２', body: '', image: 'https://cdn.pixabay.com/photo/2016/06/10/01/05/hotel-room-1447201_960_720.jpg', url: '' },
]

//histories
export const histories = [
    { id: 1, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 12' },
    { id: 2, from: 'user1', to: 'user2', value: 100, operation: 'SUB', place: 'Osaka', datetime: '2018-12-01 13:15 21' },
    { id: 3, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Osaka', datetime: '2018-12-01 13:15 23' },
    { id: 4, from: 'user1', to: 'user2', value: 100, operation: 'SUB', place: 'Tokyo', datetime: '2018-12-01 13:15 21' },
    { id: 5, from: 'user1', to: 'user2', value: 100, operation: 'SUB', place: 'Tokyo', datetime: '2018-12-01 13:15 21' },
    { id: 6, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Kyoto', datetime: '2018-12-01 13:15 23' },
    { id: 7, from: 'user1', to: 'user2', value: 100, operation: 'SUB', place: 'Tokyo', datetime: '2018-12-01 13:15 23' },
    { id: 8, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Osaka', datetime: '2018-12-01 13:15 21' },
    { id: 9, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 21' },
    { id: 10, from: 'user1', to: 'user2', value: 100, operation: 'SUB', place: 'Tokyo', datetime: '2018-12-01 13:15 23' },
    { id: 11, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 21' },
    { id: 12, from: 'user1', to: 'user2', value: 100, operation: 'SUB', place: 'Osaka', datetime: '2018-12-01 13:15 21' },
    { id: 13, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Osaka', datetime: '2018-12-01 13:15 23' },
    { id: 14, from: 'user1', to: 'user2', value: 100, operation: 'SUB', place: 'Tokyo', datetime: '2018-12-01 13:15 21' },
    { id: 15, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 21' },
    { id: 16, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Kyoto', datetime: '2018-12-01 13:15 23' },
    { id: 17, from: 'user1', to: 'user2', value: 100, operation: 'SUB', place: 'Tokyo', datetime: '2018-12-01 13:15 23' },
    { id: 18, from: 'user1', to: 'user2', value: 100, operation: 'SUB', place: 'Osaka', datetime: '2018-12-01 13:15 21' },
    { id: 19, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 21' },
    { id: 20, from: 'user1', to: 'user2', value: 100, operation: 'ADD', place: 'Tokyo', datetime: '2018-12-01 13:15 23' },
];