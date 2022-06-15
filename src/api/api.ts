// 导入axios实例
import httpRequest from '../request/index'

// 获取用户信息
export function apiGetUserInfo() {
    return httpRequest({
        url: 'http://124.71.73.195:7766/mt',
        method: 'post',
        data: {
            "formStr": "",
            "phone": "",
            "empName": ""
        },
    })
}
