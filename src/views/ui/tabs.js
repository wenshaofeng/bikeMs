import React, { Component } from 'react'
import { Card, Tabs, message, Icon } from 'antd'
const TabPane = Tabs.TabPane

class Tab extends Component {
  newTabIndex = 0
  handleCallback = (key) => {
    message.info(`您选中了第${key}个页签！`)
  }


  componentWillMount() {

    const panes = [
      {
        title: 'Tab 1',
        content: '欢迎学习React',
        key: '1'
      },
      {
        title: 'Tab 2',
        content: '欢迎学习Antd',
        key: '2'
      },
      {
        title: 'Tab 3',
        content: 'React是MV*框架之一',
        key: '3'
      },
    ]
    this.setState({
      activeKey: panes[0].key,
      panes
    })
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `新标签${this.newTabIndex++}`;
    panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  render() {
    return (
      <div>
        <Card
          title='Tab页签'
          className='card-wrap'
        >
          <Tabs defaultActiveKey='1' onChange={this.handleCallback}>
            <TabPane tab='Tab 1' key='1'>欢迎学习React</TabPane>
            <TabPane tab='Tab 2' key='2' disabled>欢迎学习Antd</TabPane>
            <TabPane tab='Tab 3' key='3'>React是MV*框架之一</TabPane>
            <TabPane tab='Tab 4' key='4'><div>nice 啊 大大大萨德</div></TabPane>
          </Tabs>
        </Card>

        <Card
          title='Tab带图标的页签'
          className='card-wrap'
        >
          <Tabs defaultActiveKey='1' onChange={this.handleCallback}>
            <TabPane tab={<span><Icon type='plus' />Tab 1</span>} key='1'>欢迎学习React</TabPane>
            <TabPane tab={<span><Icon type='edit' />Tab 2</span>} key='2'>欢迎学习Antd</TabPane>
            <TabPane tab={<span><Icon type='delete' />Tab 3</span>} key='3'>React是MV*框架之一</TabPane>
          </Tabs>
        </Card>

        <Card
          title='Tab可编辑的页签'
          className='card-wrap'
        >
          <Tabs
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {
              this.state.panes.map((pan) => (
                <TabPane
                  tab={<span><Icon type='plus' />{pan.title}</span>}
                  key={pan.key}
                >
                  {pan.content}
                </TabPane>
              ))
            }
          </Tabs>
        </Card>
      </div>
    )
  }
}

export default Tab
