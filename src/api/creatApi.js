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

