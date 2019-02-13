import React, { Component } from 'react'
import { Card} from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'

import './../../style/common.less'
import './detail.less'


class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let params = this.props.match.params
        console.log(params);
        if (params.orderId) {
            this.getDetailInfo(params.orderId)
        }
    }

    getDetailInfo = (orderId) => {
        axios
            .get({
                url: '/order/detail',
                data: {
                    params: {
                        orderId: orderId
                    }
                }
            })
            .then((res) => {
                if (res.code === 0) {
                    this.setState({
                        orderInfo: res.result
                    })
                }
            })

    }

    render() {
        const apiInfo = this.state.orderInfo || {}
        const urlInfo = this.props.match.params

        return (
            <div>
                <Card>
                    <div id="orderDetailMap">地图</div>

                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{apiInfo.mode === 1 ? '服务区' : '停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{urlInfo.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{apiInfo.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{urlInfo.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{apiInfo.mobile}</div>
                            </li>
                        </ul>
                    </div>

                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{apiInfo.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{apiInfo.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{apiInfo.distance / 1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}

export default OrderDetail;