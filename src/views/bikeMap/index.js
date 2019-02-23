import React, { Component, Fragment } from 'react';
import { Card } from 'antd'
import BaseForm from './../../components/baseForm'
import axios from './../../axios'


class BikeMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total_count: 0
        }
        this.map = ''
        this.bikeMapFormList = [
            {
                type: '城市'
            }, {
                type: '时间查询'
            }, {
                type: 'SELECT',
                label: '订单状态',
                field: 'order_status',
                placeholder: '全部',
                initialValue: '0',
                list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '行程结束' }],
                width: 100
            }
        ]
    }

    componentDidMount() {
        this.requestList()
    }

    requestList = () => { // 查询列表数据
        axios.get({
            url: '/map/bike_list',
            data: {
                params: this.params
            }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    total_count: res.result.total_count,
                });
                this.renderMap(res.result);
            }
        });
    };

    handleFilter = (Params) => { // 查询表单
        this.params = Params
        this.requestList();
    }

    renderMap = (res) => {  //渲染地图数据

        let list = res.route_list;// 拿到route_list数据
        this.map = new window.BMap.Map('container');   //(初始化地图)
        let gps1 = list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0], gps1[1]);// 起始坐标(0:经度,1:纬度)
        let gps2 = list[list.length - 1].split(',');
        let endPoint = new window.BMap.Point(gps2[0], gps2[1]);// 终点坐标

        this.map.centerAndZoom(endPoint, 11); // 保证地图居中 

        // //起点 -- 图标Icon/覆盖物Marker/添加addOverlay
        // let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), { // 设置图片样式
        //     imageSize: new window.BMap.Size(36, 42),
        //     anchor: new window.BMap.Size(18, 42) // 偏移
        // });

        // let bikeMarkerStart = new window.BMap.Marker(startPoint, { icon: startPointIcon });
        // this.map.addOverlay(bikeMarkerStart);


        // // 终点
        // let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
        //     imageSize: new window.BMap.Size(36, 42),
        //     anchor: new window.BMap.Size(18, 42)
        // });
        // let bikeMarkerEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon });
        // this.map.addOverlay(bikeMarkerEnd);


        // bikeMarkerEnd.addEventListener("click", function (e) {
        //     alert("当前位置：" + e.point.lng + ", " + e.point.lat);
        // });


        // 调用添加地图控件方法
        this.addMapControl()
        // 调用路线图绘制方法
        this.drawBikeRoute(res.route_list)
        // 调用服务区绘制方法
        this.drawServiceArea(res.service_list)
        // 调用车辆图标绘制方法
        this.drawBikeIcon(res.bike_list)

    }

    addMapControl = () => { //添加地图控件
        let map = this.map
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }))
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }))
        map.enableScrollWheelZoom(true);   //开启鼠标滚轮缩放
    }

    drawBikeRoute = (route_list) => { //绘制路线图
        if (route_list.length > 0) {
            // 绘制起点坐标icon
            let first = route_list[0]
            let p = first.split(',')
            let startPoint = new window.BMap.Point(p[0], p[1])
            console.log(startPoint);

            let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42) //偏移
            })
            let startMarker = new window.BMap.Marker(startPoint, { icon: startPointIcon })
            this.map.addOverlay(startMarker)

            // 绘制终点坐标icon
            let last = route_list[route_list.length - 1]
            let q = last.split(',')
            let endPoint = new window.BMap.Point(q[0], q[1])
            console.log(endPoint);
            let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            })
            let endMarker = new window.BMap.Marker(endPoint, { icon: endPointIcon })
            this.map.addOverlay(endMarker)

            endMarker.addEventListener("click", function (e) {
                alert("当前位置：" + e.point.lng + ", " + e.point.lat);
            });

            //绘制行驶路线
            let trackPoint = []
            for (let i = 0; i < route_list.length; i++) {
                let point = route_list[i].split(',')
                console.log(point);
                trackPoint.push(new window.BMap.Point(point[0], point[1]))
            }
            let polyline = new window.BMap.Polyline(trackPoint, {
                strokeColor: '#000000',
                strokeWeight: 4,
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
        let polygon = new window.BMap.Polygon(trackPoint, { //包围服务区的折线
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1,
            fillColor: ''
        })
        this.map.addOverlay(polygon)
    }

    drawBikeIcon = (bike_List) => {// 添加地图中的自行车图标
        console.log(bike_List);
        
        let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        bike_List.forEach((item) => {
            let p = item.split(',');
            let point = new window.BMap.Point(p[0], p[1]);
            let bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        });
    }


    render() {
        return (
            <Fragment>
                <Card>
                    <BaseForm formList={this.bikeMapFormList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <div>共 {this.state.total_count} 辆车</div>
                    <div id="container" style={{ height: 500 }}></div>
                </Card>
            </Fragment>
        );
    }
}

export default BikeMap;