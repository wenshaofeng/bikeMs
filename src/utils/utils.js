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
    }

}