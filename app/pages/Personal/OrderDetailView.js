import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native'

import {connect} from 'react-redux'
// util
// action
import {fetchOrderDetail} from '../../actions/personalAction'
// common component
import Button from '../../components/Button'
import NavBar from '../../components/DefaultNavBar'
import Loader from '../../components/LoaderView'

class OrderView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        const {dispatch, personal, orderId} = this.props

        // 
        fetchOrderDetail(orderId, (action)=> {
            dispatch(action)
        })
    }

    render() {
        const {title, personal} = this.props
        if(!this.state.loaded) {
            return (
                <View style = {styles.container}>
                    <NavBar
                        title = {title}
                        onBack = {()=> {
                            this.props.navigator.pop()
                        }}
                    />
                    <Loader />
                </View>
            )
        }

        return (
            <View style = {styles.container}>
                <NavBar
                    title = {title}
                    onBack = {()=> {
                        this.props.navigator.pop()
                    }}
                />
                <Image
                    style = {styles.img}
                    source = {personal.orderDetail.img}
                />
                <Text>tet</Text>
            </View>

        )
    }
}

export default connect((state)=> {
    const {personal} = state
    return {
        personal
    }
})(OrderView)


let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    img: {
        width: 80,
        height: 60
    }
})