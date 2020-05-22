// 发货管理
import api from "@/utils/http"

// 发货申请页面-----------------------------------------
// 获取完成审批的合同列表 
export const getCompleteApprovalContract = (data) => {
    return api({
        url: "/ERP/selectApplyContract",
        method: "post",
        data
    })
}
// 发货申请查看库存
export const shippingRequestToViewInventory = (params) => {
    return api({
        url: "/ERP/chakanStorage",
        method: "get",
        params
    })
}
// 加载关于合同的基础信息
export const getContractBasicInfo = (data) => {
    return api({
        url: "/ERP/selectByContractNo",
        method: "post",
        data
    })
}
// 获取合同信息
export const getcloth = (params) => {
    return api({
        url: "/ERP/getCloth",
        method: "get",
        params
    })
}
// 在合同信息返回后，根据 contractNo  clothId 获取缸号
export const getLoadGnagHao = (data) => {
    return api({
        url: "/ERP/LoadGnagHao",
        method: "post",
        data
    })
}
// 发货申请单（主）新增
export const postAddShippingRequest = (data) => {
    return api({
        url: "/ERP/addappleP",
        method: "post",
        data
    })
}
// 发货申请单（副）新增
export const addShippingRequestVice = (data) => {
    return api({
        url: "/ERP/addapplyPs",
        method: "post",
        data
    })
}
// 加载发货申请单
export const getShippingRequestDetail = (params) => {
    return api({
        url: "/ERP/selFk",
        method: "get",
        params
    })
}
// 删除申请单
export const deleteShippingRequest = (data) => {
    return api({
        url: "/ERP/delappleP",
        method: "post",
        data
    })
}
// 编辑申请单
export const editorShippingRequest = (params) => {
    return api({
        url: "/ERP/selappleP",
        method: "get",
        params
    })
}
// 编辑前进行验证
export const editorBeforeVerify = (data) => {
    return api({
        url: "/ERP/beforeApply",
        method: "post",
        data
    })
}
// 验证通过后，发货申请单（主）编辑
export const postEditorAfterVerify = (data) => {
    return api({
        url: "/ERP/editApplyP",
        method: "post",
        data
    })
}
// 验证通过后, 发货申请单（副）编辑
export const postEditorAfterVerifyS = (data) => {
    return api({
        url: "/ERP/editApplyPs",
        method: "post",
        data
    })
}








// 发货细码单页面---------------------------------
// 获取主表数据
export const getDeliveryDetailOrder = (data) => {
    return api({
        url: "/ERP/searchStorageOut",
        method: "post",
        headers: { "content-type": "application/json" },
        data
    })
}
// 根据申请单获取发货信息
export const postOrderDetail= (data) => {
    return api({
        url: "/ERP/searchStorageOut_d",
        method: "post",
        data
    })
}
// 新增申请单详情（首页下边表格数据）
export const getStorageDetail= (data) => {
    return api({
        url: "/ERP/BeforeStorageOut",
        method: "post",
        data
    })
}
// 按照缸号查找信息
export const getGangHaoMsg= (params) => {
    return api({
        url: "/ERP/selstorageInn",
        method: "get",
        params
    })
}
// 发货细码单（主）新增
export const postAddDeliveryDetailOrderMain= (data) => {
    return api({
        url: "/ERP/addstorageOut",
        method: "post",
        data
    })
}
// 发货细码单（副）新增
export const postAddDeliveryDetailOrderVice= (data) => {
    return api({
        url: "/ERP/addStorageOut_d",
        method: "post",
        data
    })
}
// 删除发货细码单
export const deleteShippingDetailOrder= (data) => {
    return api({
        url: "/ERP/delStorageOut",
        method: "post",
        data
    })
}
// 编辑发货细码单 (获取中间数据)
export const getselstorageOut= (params) => {
    return api({
        url: "/ERP/selstorageOut",
        method: "get",
        params
    })
}
// 编辑发货细码单 (获取下边表格数据)
export const getselstorageOutD= (params) => {
    return api({
        url: "/ERP/selstorageOutD",
        method: "get",
        params
    })
}
// 提交编辑发货细码单 (主表提交)
export const posteditstorageOutD= (data) => {
    return api({
        url: "/ERP/editstorageOutD",
        method: "post",
        data
    })
}
// 提交编辑发货细码单 (子表提交)
export const posteditstorageOutd= (data) => {
    return api({
        url: "/ERP/editstorageOutd",
        method: "post",
        data
    })
}

// gangHao -String
// bxmd - String
// 选择缸号添加前进行判断该缸号是否可以添加
export const postgangHaoJudge= (data) => {
    return api({
        url: "/ERP/gangHaoJudge",
        method: "post",
        data
    })
}




