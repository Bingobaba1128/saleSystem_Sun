import api from "@/utils/http"

// 大货入库
// 加载入库细码单
export const getStorageDetailCode = (params) => {
    return api({
        url: "/ERP/selectruKuXMD",
        method: "get",
        params
    })
}
// 加载仓库皮条、卡位
export const getWarehouseScreens = (params) => {
    return api({
        url: "/ERP/selectkeyong",
        method: "get",
        params
    })
}
// 大货入库 
export const postLargeCargoWarehouse = (data) => {
    return api({
        url: "/ERP/addstorageInn",
        method: "post",
        data
    })
}
// 入库单编辑 
export const postInHouse = (data) => {
    return api({
        url: "/ERP/editstorageInn",
        method: "post",
        data
    })
}


// 出库确认 
// 出库快递单查询加载(上)  刷新当前发货细码单
export const postLoadChukuQueRen = (data) => {
    return api({
        url: "/ERP/loadChukuQueRen",
        method: "post",
        data
    })
}
// 快递单号单击下 
export const postChukuStorageOut = (data) => {
    return api({
        url: "/ERP/chukuStorageOut",
        method: "post",
        data
    })
}
// 子表出库  
export const postchuku = (data) => {
    return api({
        url: "/ERP/chuku",
        method: "post",
        data
    })
}
//主表确认
export const posteditstorageOutState = (data) => {
    return api({
        url: "/ERP/editstorageOutState",
        method: "post",
        data
    })
}


// 出入库日报
export const postSelStorageShow = (data) => {
    return api({
        url: "/ERP/selStorageShow",
        method: "post",
        data
    })
}


// 库位实时查询
export const getshishishow = (params) => {
    return api({
        url: "/ERP/shishishow",
        method: "get",
        params
    })
}






