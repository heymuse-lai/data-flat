// 配置axios基地址
// axios.defaults.baseURL:'https://hmajax.itheima.net'
axios.defaults.baseURL = 'https://hmajax.itheima.net'

// 公共的提示框
const showToast = (msg) =>{
    // 透過 JavaScript 初始化 toast 提示框
    // const toastElList = document.querySelectorAll('.toast')
    // const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, option))

    const myToast = document.querySelector('.my-toast')
    const toastObj = new bootstrap.Toast(myToast)
    toastObj.show()
    document.querySelector('.toast-body').innerHTML=msg
    
}
