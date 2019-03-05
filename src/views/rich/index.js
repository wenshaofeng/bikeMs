import React, { Component, Fragment } from 'react';
import { Card, Button, Modal } from 'antd'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.less'


class RichText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            showRichText: false
        }
    }

    onEditorStateChange = (editorState) => { // 实时更新当前编辑器的内容
        this.setState({
            editorState,
        });
    };

    onContentStateChange = (contentState) => { // 实时更新当前文本的内容
        this.setState({
            contentState
        })
    }


    handleClearContent = () => { //清空富文本内容
        this.setState({
            editorState: EditorState.createEmpty()
        })
    }

    handleGetText = () => { // 获取当前文本内容
        this.setState({
            showRichText: true
        })
    }

   
    render() {
        const { editorState } = this.state;
        return (
            <Fragment>
                <Card>
                    <Button type='primary' onClick={this.handleClearContent} style={{ marginRight: 15 }}>清空内容</Button>
                    <Button type='primary' onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title='富文本编辑器' style={{ marginTop: 20 }}>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        onContentStateChange={this.onContentStateChange}
                    />
                    <textarea
                        disabled
                        className='textArea'
                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    />
                </Card>
                <Modal title='富文本' visible={this.state.showRichText}
                    onCancel={() => {
                        this.setState({
                            showRichText: false
                        })
                    }}
                    footer={null}
                >
                    {
                        draftToHtml(this.state.contentState)
                    }
                </Modal>
            </Fragment>
        );
    }
}

export default RichText;