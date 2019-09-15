import io from 'socket.io-client'

const socket = io()

/**
 * socket 请求
 * @param {*} event 事件名
 * @param {*} data 请求数据
 */
const fetch = (event, data) => {
    return new Promise((resolve, reject) => {
        socket.emit(event, data, (res) =>{
            if(typeof res === 'string') {
                resolve([res, null]);
            }
            else {
                resolve([null, res])
            }
        })
    })
}

/**
 * socket 每次连接都需要判断 token 登陆
 */
socket.on('connect', async () => {
    let token = localStorage.getItem('token')
    if(token) {
        let [err, data] = await fetch('loginByToken', {token})
        if(err) return
        window.localStorage.setItem('token', data.token)
        // TODO

    }else {
      loginFailback()
    }
})

const loginFailback = () => {
    // TODO 游客身份
}

socket.on('message', (data) => {
    // TODO
  console.log('message: ' + data)
})

export {socket, fetch}
