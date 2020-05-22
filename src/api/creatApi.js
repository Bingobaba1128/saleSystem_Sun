import api from "@/utils/http"

// 加载登录信息 
export const getAccountInfo = (params) => {
    return api({
        url: "/ERP/showUser",
        method: "get",
        params
    })
}


//登录
export const postTotallogin = (data) => {
    return api({
        url: "/ERP/Totallogin",
        method: "post",
        data
    })
}

//无二次跳转，通过session数据，get请求直接登录
export const autologin = (data) => {
    return api({
        baseURL : 'http://192.168.5.103:8080',
        url: "/ERP/login",
        method: "get",
        data
    })
}
