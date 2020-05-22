// 合同管理
import api from "@/utils/http"

// 全部合同
export const getData = (data) => {
    return api({
        url: "/ERP/selectContractBywhere",
        method: "post",
        data
    })
}
// 加载合同基础信息
export const getBasis = (params) => {
    return api({
        url: "/ERP/selBasic",
        method: "get",
        params
    })
}
// 加载合同运费预计
export const getfreight = (params) => {
    return api({
        url: "/ERP/selbudget",
        method: "get",
        params
    })
}
// 加载客户信息
export const getcustomer = (params) => {
    return api({
        url: "/ERP/selClientbyemployeeId",
        method: "get",
        params
    })
}
// 获取当前账户是否存在业务员
export const getsalesman = (params) => {
    return api({
        url: "/ERP/selrelation",
        method: "get",
        params
    })
}
// 客户信息加载 (联系人、联系电话、结算方式)
export const getcustomerinfo = (params) => {
    return api({
        url: "/ERP/selClient",
        method: "get",
        params
    })
}
// 判断客户活跃度
export const getcustomeractive = (params) => {
    return api({
        url: "/ERP/judgeClient",
        method: "get",
        params
    })
}
// 添加布料信息(非特价)  调其他人的接口
export const getclothinfo = (data) => {
    return api({
        url: "http://120.78.186.60:8084/FabricService/api/getDatalikeBbh",
        method: "post",
        data
    })
}
// 特价布查询
export const getspecialcloth = (params) => {
    return api({
        url: "/ERP/selbargain",
        method: "get",
        params
    })
}
// 合同新增(主合同)
export const getAddContract = (data) => {
    return api({
        url: "/ERP/addContract",
        method: "post",
        // headers: { "content-type": "application/json" },
        data
    })
}
// 新增子合同
export const getAddContractCloth = (data) => {
    return api({
        url: "/ERP/addContractCloth",
        method: "post",
        headers: { "content-type": "application/json" },
        data
    })
}
// 合同操作新增审批功能
export const getSubmitApproval = (data) => {
    return api({
        url: "/ERP/addApproveTotal",
        method: "post",
        data
    })
}
// 单击查询子合同详情
export const getcloth = (params) => {
    return api({
        url: "/ERP/getCloth",
        method: "get",
        params
    })
}
// 特价布占位
export const getSpecialClothOccupies = (data) => {
    return api({
        url: "/ERP/editZhanWei",
        method: "post",
        data
    })
}
// 合同操作完结
export const getFinishContent = (data) => {
    return api({
        url: "/ERP/EditSymbol",
        method: "post",
        data
    })
}
// 删除子合同    contractNo&clothId
export const delZContract = (data) => {
    return api({
        url: "/ERP/delCloth",
        method: "post",
        data
    })
}
// 判断子合同是否能修改   contractNo&clothId
export const modifyYesOrNo = (data) => {
    return api({
        url: "/ERP/JudgeCloth",
        method: "post",
        data
    })
}
// 修改子合同 提交保存
export const childModifyContract = (data) => {
    return api({
        url: "/ERP/EditCloth",
        method: "post",
        data
    })
}
// 判断母合同是否可以修改
export const MModifyYesOrNo = (data) => {
    return api({
        url: "/ERP/judgeEdit",
        method: "post",
        data
    })
}
// 单击查询母合同详情
export const getContractDetail = (params) => {
    return api({
        url: "/ERP/getContractByPasyStyle",
        method: "get",
        params
    })
}
// 母合同编辑提交 
export const parentModifyContract = (data) => {
    return api({
        url: "/ERP/EditContract",
        method: "post",
        data
    })
}
// 判断是否已审批、已完结 点击新增进行提示
export const addYesOrNo = (data) => {
    return api({
        url: "/ERP/JudgeAdd",
        method: "post",
        data
    })
}
// 查看合同 pdf
export const getPdf = (data)=>{
    return api({
        url: "/ERP/LookPDF",
        method: "post",
        data
    })
}
// 模糊搜索
export const getContractSearchList = (data)=>{
    return api({
        url: "/ERP/selectContractBywhere",
        method: "post",
        data
    })
}
// 主合同删除 
export const postdelContract = (data)=>{
    return api({
        url: "/ERP/delContract",
        method: "post",
        data
    })
}

