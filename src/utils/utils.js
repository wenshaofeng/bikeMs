import React from 'react'
import { Select } from 'antd'

const Option = Select.Option

export default {
    pagination(data, callback) {
        let page = {
            onChange: (current) => {
                callback(current)
            },
            //根据官网的api属性设置
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total,
            showTotal: () => {
                return `共${data.result.total}条`
            },
            showQuickJumper: true
        }
        return page
    },

    getOptionList(data) {
        if (!data) {
            return []
        }

        let options = [] // <Option value='0' key='all_key' >全部</Option> ]
        data.map((item) => (
            options.push(<Option value={item.id} key={item.id} >{item.name}</Option>)
        ))
        return options
    },

    /**
    * ETable 行点击通用函数
    * @param {*选中行的索引} selectedRowKeys
    * @param {*选中行对象} selectedItem
    */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    }

}