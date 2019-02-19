import JsonP from 'jsonp'
import axios from 'axios'
import Utils from '../utils/utils.js'
import { Modal } from 'antd';

export default class Axios {

    static requestList(_this, url, params, isMock) {  //请求表格列表信息
        let data = {
            params,
            isMock
        }
        this.get({
            url,
            data
        }).then((data) => {
            if (data) {
                let list = data.result.item_list.map((item, index) => {
                    item.key = index
                    return item
                })
                _this.setState({
                    list,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current
                        _this.requestList()
                    })
                })
            }
        })
    }

    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(
                options.url,
                {
                    param: 'callback'
                },
                function (err, response) {
                    // to-do
                    if (response.status === 'success') {
                        resolve(response)
                    } else {
                        reject(response.message)
                    }
                }
            )
        })
    }

    static get(options) {
        let loading
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading')
            loading.style.display = 'block'
        }
        console.log(options);

        let baseApi = ''
        if (options.isMock) { //Mock 环境
            baseApi = 'https://www.easy-mock.com/mock/5c4e75d6afd3a07bd7b6ec70/mockapi'
        } else {    // 真实环境
            baseApi = 'https://www.easy-mock.com/mock/5c4e75d6afd3a07bd7b6ec70/mockapi'
        }
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                // timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then(response => {
                //隐藏loading效果
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading')
                    loading.style.display = 'none'
                }

                if (response.status === 200) {
                    let res = response.data
                    if (res.code === 0) {

                        resolve(res)
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.msg
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        })
    }


}
