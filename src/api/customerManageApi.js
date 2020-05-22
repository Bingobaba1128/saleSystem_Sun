// 客户管理
import api from "@/utils/http"

// 客商档案
// 加载客商关系    客商检索 (merchants)
export const getselClient = (params) => {
    return api({
        url: "/ERP/selClient",
        method: "get",
        params
    })
}
// 点击查询客商相关人员
export const getselectEmployeeId = (params) => {
    return api({
        url: "/ERP/selectEmployeeId",
        method: "get",
        params
    })
}
// 基础信息录入
export const getselectClientInformation = (params) => {
    return api({
        url: "/ERP/selectClientInformation",
        method: "get",
        params
    })
}
// 加载国家列表 parentId=-1     通过国家加载城市 parentId=110000
export const getselPronvice = (params) => {
    return api({
        url: "/ERP/selPronvice",
        method: "get",
        params
    })
}
// 加载客商评级信息
export const getselectClientGrade = (params) => {
    return api({
        url: "/ERP/selectClientGrade",
        method: "get",
        params
    })
}
// 客商关系新增
export const postupdateByCondition = (data) => {
    return api({
        url: "/ERP/updateByCondition",
        method: "post",
        data
    })
}
// 客商安全等级新增
export const postupdateClientGrade = (data) => {
    return api({
        url: "/ERP/updateClientGrade",
        method: "post",
        data
    })
}
// 个人信息录入提交 
export const postupdateEmployee = (data) => {
    return api({
        url: "/ERP/updateEmployee",
        method: "post",
        data
    })
}




// 品牌档案
// 品牌档案加载
export const getselBrand = (params) => {
    return api({
        url: "/ERP/selBrand",
        method: "get",
        params
    })
}
// 品牌档案删除
export const postdelBrand = (data) => {
    return api({
        url: "/ERP/delBrand",
        method: "post",
        data
    })
}
// 品牌档案新增
export const postaddBrand = (data) => {
    return api({
        url: "/ERP/addBrand",
        method: "post",
        data
    })
}
// 品牌档案编辑
export const posteditBrand = (data) => {
    return api({
        url: "/ERP/editBrand",
        method: "post",
        data
    })
}





