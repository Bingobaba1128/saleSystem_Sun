// 生产通知
import api from "@/utils/http"

// 查看生产通知单列表
export const getProductList = (params) => {
    return api({
        url: "/ERP/selectSaleList",
        method: "get",
        params
    })
}
// 生产通知 提交
export const postProductNotify = (data) => {
    return api({
        url: "/ERP/addSaleList",
        method: "post",
        data
    })
}
// 获取合同下拉列表
export const postContractSelect = (data) => {
    return api({
        url: "/ERP/selectDistinctNo",
        method: "post",
        data
    })
}
// 根据合同下拉列表选中，获取对应合同信息
export const getContractMessage = (data) => {
    return api({
        url: "/ERP/selectByContractNo",
        method: "post",
        data
    })
}
// 根据布编下拉列表选中，获取对应布编信息
export const getClothMessage1 = (data) => {
    return api({
        url: "/ERP/selectByClothId",
        method: "post",
        data
    })
}
export const getClothMessage2 = (data) => {
    return api({
        url: "http://120.78.186.60:8084/FabricService/api/getDatalikeBbh",
        method: "post",
        data
    })
}
// 申请通知单编辑提交 
export const postModifyProduct = (data) => {
    return api({
        url: "/ERP/editSaleList",
        method: "post",
        data
    })
}
// 申请通知单删除
export const postDeleteProduct = (data) => {
    return api({
        url: "/ERP/delSaleList",
        method: "post",
        data
    })
}



// 生产接口 获取数据 
export const getshengchengRuKuDan = (params) => {
    return api({
        url: "/ERP/shengchengRuKuDan",
        method: "get",
        params
    })
}

