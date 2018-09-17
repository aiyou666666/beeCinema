
import  axios from './axios'

const apis = {
    //项目库详情
    prejectDetail (params) {
        return axios.get('/projectApplication/projectDetail',{
            params: params
        })
    },
    prejectState (params) {
        return axios.get('/projectApplication/checkProjectStatus',{
            params: params
        })
    },
    doProjectOrder (params) {
        return axios.get('/projectApplication/doProjectOrder',{
            params: params
        })
    },
    saveIntentionMessage (params) {
        return axios.get('/store/saveIntentionMessage',{
            params: params
        })
    }
}

export default apis
