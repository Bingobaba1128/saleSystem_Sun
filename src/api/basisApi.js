// 基础设置
import api from "@/utils/http";

// 卡位设置
// 初始化加载卡位信息  、卡位编辑接口
export const getkwInfo = (params) => {
    return api({
        url: "/ERP/selectconfigStorage",
        method: "get",
        params
    })
}
// 分类
export const getselBasic= (params) => {
    return api({
        url: "/ERP/selBasic",
        method: "get",
        params
    })
}
// 卡位新增配置
export const postaddconfigStorage= (data) => {
    return api({
        url: "/ERP/addconfigStorage",
        method: "post",
        data
    })
}
// 卡位编辑后提交
export const posteditconfigStorage= (data) => {
    return api({
        url: "/ERP/editconfigStorage",
        method: "post",
        data
    })
}
// 卡位删除配置
export const postdeleteconfigStorage= (data) => {
    return api({
        url: "/ERP/deleteconfigStorage",
        method: "post",
        data
    })
}



// 基础信息设置
// 基础信息配置(查询)
export const getSearchInfo= (params) => {
    return api({
        url: "/ERP/selBasic",
        method: "get",
        params
    })
}
// 基础信息配置（新增）
export const postaddBasic= (data) => {
    return api({
        url: "/ERP/addBasic",
        method: "post",
        data
    })
}
// 基础信息配置（编辑）
export const posteditBasic= (data) => {
    return api({
        url: "/ERP/editBasic",
        method: "post",
        data
    })
}
// 基础信息配置（删除）
export const postdelBasic= (data) => {
    return api({
        url: "/ERP/delBasic",
        method: "post",
        data
    })
}


