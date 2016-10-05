/**
 * Created by DB on 16/7/15.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    PickerIOS,
    Modal,
    Platform,
    BackAndroid
} from 'react-native';

import PickerAndroid from './PickerAndroid';

let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;

export default class SelectPickerView extends Component {

    static PropTypes = {
        defaultValue: PropTypes.object,
        onChange: PropTypes.func,
        pickerArr: PropTypes.array,
        onPressConfirm: PropTypes.func,
        onPressCancel: PropTypes.func,
        style: PropTypes.object,
        onRequestClose: Platform.OS === 'android' ? PropTypes.func.isRequired : PropTypes.func,
        type: PropTypes.bool,
    };

    static defaultProps = {
        onChange: ()=> {
        },
        onPressConfirm: ()=> {
        }
    };

    constructor(props) {
        super(props);
        const {defaultValue} = this.props;
        this.state = {
            select: defaultValue,
            visible: false,
            index: null,
        }

    }


    onShow() {
        this.setState({
            visible: true
        })
    }

    onDismiss() {
        this.setState({
            visible: false
        })
    }

    onPressCancel() {
        this.onDismiss()
    }

    onPressConfirm() {
        this.onDismiss();
        if (this.state.index != null) {
            this.props.onPressConfirm(this.state.select, this.state.index)
        }
    }

    render() {

        const {pickerArr, onChange, type} = this.props;

        return (

            <Modal visible={this.state.visible}
                   transparent={true}
                   onRequestClose={() => {
                       this.onDismiss()
                   }}
            >
                <TouchableOpacity style={{flex: 1}}
                                  onPress={this.onDismiss.bind(this)}

                />
                <View style={{
                    height: 40,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#f4f4f4'
                }}>
                    <TouchableOpacity style={{marginLeft: 12}}
                                      onPress={this.onPressCancel.bind(this)}>
                        <Text>取消</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginRight: 12}}
                                      onPress={this.onPressConfirm.bind(this)}>
                        <Text style={{color: '#825897'}}>确认</Text>
                    </TouchableOpacity>
                </View>
                {
                    pickerArr.length > 0 &&
                    <Picker
                        style={{backgroundColor: '#fff'}}
                        selectedValue={this.state.select}
                        onValueChange={(itemValue, itemPosition) => {
                            this.setState({
                                select: itemValue,
                                index: itemPosition
                            });
                            onChange(itemValue, itemPosition)
                        }}>
                        {pickerArr.map((v, k)=> {
                            if (type) {
                                return (
                                    <Picker.Item label={v.PROVINCE_NAME} value={v.PROVINCE_ID} key={k}/>
                                )
                            } else {
                                return (
                                    <Picker.Item label={v.CITY_NAME} value={v.CITY_ID} key={k}/>
                                )
                            }

                        })}
                    </Picker>
                }

            </Modal>
        );
    }
}
