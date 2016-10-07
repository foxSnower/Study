/**
 * Created by 楚寒 on 2016/10/3.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Platform
} from 'react-native';

import ErrorView from '../../components/FetchErrorView'
import LoaderView from '../../components/LoaderView'
import {connect} from 'react-redux'
import {BTNColor, ly_Toast} from '../../utils/CommonUtil'
import NavBar from '../../components/DefaultNavBar';
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import TestDriveListView from './TestDriveListView';
import {updateDrive, getCarTypes} from '../../actions/driveAction'

class TestDriveHomeView extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(updateDrive({loaded: 0}))
        dispatch(getCarTypes());

    }
    render() {

        const {drive} = this.props;

        return (

            <View style={styles.container}>
                <NavBar onBack={()=> this.props.navigator.pop()}
                        title={'试驾车型'}
                />

                {
                    this.renderContainer(drive.loaded)

                }

            </View>

        );
    }

    // 0加载状态 1加载完成 2加载出错
    renderContainer = (state) => {

        switch (state) {
            case 0:
                return ( <LoaderView/> );

            case 1:
                const {drive} = this.props;
                return (
                    <ScrollableTabView tabBarActiveTextColor={BTNColor}
                                       tabBarInactiveTextColor={'#b4b4b4'}
                                       tabBarUnderlineColor={BTNColor}
                                       tabBarUnderlineStyle={{backgroundColor: BTNColor}}
                                       renderTabBar={() => <ScrollableTabBar />}
                    >
                        <TestDriveListView tabLabel="日产" {...this.props} sourceData={drive.richanDic}/>
                        <TestDriveListView tabLabel="启辰" {...this.props} sourceData={drive.qichenDic}/>
                    </ScrollableTabView>
                );

            case 2:
                return (
                    <ErrorView onPress={()=> {

                    }}/>
                );

            default:
                return;
        }
    }

}

export default connect((state)=> {
    const {drive} = state;
    return {
        drive
    }
})(TestDriveHomeView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
      //  flexDirection: 'row'
    },
});