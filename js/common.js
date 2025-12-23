// 配置axios基地址
// axios.defaults.baseURL:'https://hmajax.itheima.net'
axios.defaults.baseURL = 'https://hmajax.itheima.net'

// 公共的提示框
const showToast = (msg) => {
    // 透過 JavaScript 初始化 toast 提示框
    // const toastElList = document.querySelectorAll('.toast')
    // const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, option))

    const myToast = document.querySelector('.my-toast')
    const toastObj = new bootstrap.Toast(myToast)
    toastObj.show()
    document.querySelector('.toast-body').innerHTML = msg

}
// 判斷是否有token
const checkToken = () => {
    const { token } = JSON.parse(localStorage.getItem('userMsg'))
    // console.log(token)
    if (!token) {
        showToast('請先登錄')
        setTimeout(() => {
            location.href = './login.html'
        }, 1500)
    }

}


// 用戶名回顯及退出功能
const renderUname = () => {
    // document.querySelector('.username').innerHTML = localStorage.getItem()
    const { username } = JSON.parse(localStorage.getItem('userMsg'))
    // console.log(username)
    if (username){
    document.querySelector('.username').innerHTML = username

    }

}

// 退出功能 清空本地存儲 提示用戶 跳轉
const logout = () => {
    document.querySelector('#logout').addEventListener('click', () => {
        localStorage.removeItem('userMsg')
        showToast('成功退出')
        setTimeout(() => {
            location.href = './login.html'
        }, 1500)
    })
}

// 獲取數據 渲染頁面

// 封裝數據函式
const getData = async () =>{
const data = localStorage.getItem('userMsg') ? JSON.parse(localStorage.getItem('userMsg')):{}
const {token} = data
// console.log(token);
// 請求頭參數
const res = await axios({
    url:'/dashboard',
    method: 'GET',
    headers: {
        Authorization:token
    }
    
})
    // console.log(res.data.data.overview)
    renderOverview(res.data.data.overview)
}
getData()

// 渲染頁面 overview
const renderOverview = (overview)=>{
    // 數據的鍵和頁面的類名一致
    Object.keys(overview).forEach(item =>{
        document.querySelector(`.${item}`).innerHTML = overview[item]
    })
}