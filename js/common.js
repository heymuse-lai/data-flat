// 1.配置axios基地址
// axios.defaults.baseURL:'https://hmajax.itheima.net'
axios.defaults.baseURL = 'https://hmajax.itheima.net'

// 2.公共的提示框
const showToast = (msg) => {
    // 透過 JavaScript 初始化 toast 提示框
    // const toastElList = document.querySelectorAll('.toast')
    // const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, option))

    const myToast = document.querySelector('.my-toast')
    const toastObj = new bootstrap.Toast(myToast)
    toastObj.show()
    document.querySelector('.toast-body').innerHTML = msg

}
const data = localStorage.getItem('userMsg') ? JSON.parse(localStorage.getItem('userMsg')) : {}

// 3.判斷是否有token
const checkToken = () => {
    const { token } = data
    console.log(token)
    if (!token) {
        showToast('請先登錄')
        setTimeout(() => {
            location.href = './login.html'
        }, 1500)
    }

}


// 4.用戶名回顯及退出功能
const renderUname = () => {
    // document.querySelector('.username').innerHTML = localStorage.getItem()
    const { username } = data
    // console.log(username)
    if (username) {
        document.querySelector('.username').innerHTML = username

    }

}

// 5.退出功能 清空本地存儲 提示用戶 跳轉
const logout = () => {
    document.querySelector('#logout').addEventListener('click', () => {
        localStorage.removeItem('userMsg')
        showToast('成功退出')
        setTimeout(() => {
            location.href = './login.html'
        }, 1500)
    })
}




// 6.請求攔截器
// 添加请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    // console.log(config);
    // 只有有了token 才添加到請求頭中
    const { token } = data
    console.log(token)

    if (token) {
        config.headers['Authorization'] = token

    }

    // console.log('我被經過了');

    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 7。添加响应拦截器
axios.interceptors.response.use(response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    
    return response.data
}, error => {
        console.dir(error);

            if (error.response.status === 401) {
            showToast('登錄過期，請重新登錄')
            localStorage.removeItem('userMsg')
            setTimeout(() => {
                location.href = './login.html'
            }, 1500)

        }

    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
});
