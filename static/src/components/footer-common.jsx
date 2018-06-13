import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
const { Footer } = Layout

class FooterCommon extends React.Component {
    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>
                Hello World ©2018 Created by xxxxx
            </Footer>
        )
    }
}


export default FooterCommon