import React, { Component } from 'react'
import { Card } from 'antd'
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
                    this.renderMap(res.result)
                }
            })

    }

    renderMap = (result) => {
        this.map = new window.BMap.Map('orderDetailMap')
        // this.map.centerAndZoom('北京', 11)
        // 调用添加地图控件方法
        this.addMapControl()
        // 调用路线图绘制方法
        this.drawBikeRoute(result.position_list)
        //     // 调用服务区绘制方法
        this.drawServiceArea(result.area)
    }

    addMapControl = () => { //添加地图控件
        let map = this.map
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }))
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }))
        map.enableScrollWheelZoom(true);   //开启鼠标滚轮缩放
    }

    drawBikeRoute = (position_list) => { //绘制用户的行驶路线图
        let map = this.map
        let startPoint = ''
        let endPoint = ''
        if (position_list.length > 0) {
            // 绘制起点坐标icon
            let first = position_list[0]
            let startPoint = new window.BMap.Point(first.lon, first.lat)
            console.log(startPoint);
            
            let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(36, 42)
            })
            let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon })
            this.map.addOverlay(startMarker)

            // 绘制终点坐标icon
            let last = position_list[position_list.length - 1]
            let endPoint = new window.BMap.Point(last.lon, last.lat)
            console.log(endPoint);
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(36, 42)
            })
            let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon })
            this.map.addOverlay(endMarker)

            //绘制行驶路线
            let trackPoint = []
            for (let i = 0; i < position_list.length; i++) {
                let point = position_list[i]
                console.log(point);             
                trackPoint.push(new window.BMap.Point(point.lon, point.lat))
            }
            let polyline = new window.BMap.Polyline(trackPoint, {
                strokeColor: '#0075c7',
                strokeWeight: 3,
                strokeOpacity: 1
            })
            this.map.addOverlay(polyline)
            this.map.centerAndZoom(endPoint, 11)

        }
    }

    drawServiceArea = (area) => { //绘制服务区
        let trackPoint = []
        for (let i = 0; i < area.length; i++) {
            let point = area[i]
            trackPoint.push(new window.BMap.Point(point.lon, point.lat))
        }
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605'
        })
        this.map.addOverlay(polygon)
    }

    render() {
        const apiInfo = this.state.orderInfo || {}
        const urlInfo = this.props.match.params

        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className='order-map'>地图</div>
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