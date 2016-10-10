import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';

import {
    connect
} from 'react-redux';
import JPush from 'jpush-react-native';
// util
import {
    BGColor,
    BTNColor,
    Screen,
    pixelRation,
    validateMobile,
    ly_Toast,
    Debug
} from '../../utils/CommonUtil';
import UserDefaults from '../../utils/GlobalStorage';
// action
import {
    updateLogin,
    loginSubim,
    fetchCarInfo
} from '../../actions/loginAction';
// common component
import NavBar from '../../components/DefaultNavBar';
import LabelInput from '../../components/LabelInput';
import Button from '../../components/Button';
// page component
import TabBarView from '../../containers/TabBarView';
import AgreementView from './AgreementView';
import ForgetView from './ForgetView';
import RegistView from './RegistView';
import CarBindView from '../Personal/CarBindView'
import PersonalView from '../Personal/PersonalView'


class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: "",
            password: "",
            loginBtnText: '登 录',
            'loginBtnDisabled': false
        };

        this.loginClick = this.loginClick.bind(this);
    }

    componentDidMount() {
        //获取缓存中的手机号码
        const {
            dispatch
        } = this.props;
        const {
            reg_mobile
        } = this.props.login;
        //
        // dispatch(updateLogin({
        //     reg_mobile: reg_mobile
        // }))
    }

    loginClick(){
        const {
            dispatch,
            navigator
        } = this.props;
        const {
            mobile,
            password
        } = this.state;
        if (mobile == undefined || mobile == "") {
            ly_Toast("请输入手机号", 2000)
            return;
        }
        if (!validateMobile(mobile)) {
            ly_Toast("手机格式不正确", 2000);
            return;
        }
        if (password == undefined || password == '') {
            ly_Toast("请输入密码", 2000)
            return;
        }

        // 点击登录按钮
        // 用户点击登录按钮，验证用户账号与密码，根据返回的结果做继续处理
        this.setState({
            'loginBtnText': "登录中...",
            'loginBtnDisabled': true
        });
        //console.log('reg_mobile is', reg_mobile, 'password is: ', password);
        loginSubim(mobile, password, action=> {
            // 点击登录按钮，将结果返回来
            console.log('点击登录按钮后的 action 是：', action);
            if(action.type) {
                const userInfo = action.value;
                // 登录成功的情况，登录成功后，去获取车辆信息
                // action.value.mobile = mobile;
                // action.value.password = password;
                dispatch(action)
                if(userInfo.USER_TYPE === "2") {
                    console.log("已经有车的情况，用户类型为2");
                    fetchCarInfo(userInfo.LOGIN_USER_ID, action=> {
                        // 
                        console.log("调用 fetchCarInfo 接口返回的 action 是", action);
                        if(action.type) {
                            // 成功获取到车辆信息
                            dispatch(action);
                        }else {
                            Debug ? alert(action) : ly_Toast("获取车辆信息失败", 2000);
                        }
                    })
                }
                // 拿到车辆信息后，再弹出提示框
                ly_Toast("登录成功", 1000, 20, () => {
                    //如果是没有绑定车辆的用户  给一个引导
                    if (userInfo.USER_TYPE === "1" || userInfo.USER_TYPE === "3") {
                        Alert.alert("温馨提示", "尊敬的客户您好，为了让您正常使用本系统，建议绑定车辆，绑定后可享受以下服务: \n" +
                            "1、享受在线预约服务; \n" +
                            "2、享受会员折扣及积分; \n" +
                            "3、享受消息提醒服务; \n", 
                            [{
                                text: "立即绑定",
                                onPress: () => {
                                    this.props.navigator.push({
                                        component: CarBindView
                                    })
                                }
                            }, {
                                text: "暂不绑定",
                                onPress: () => {
                                    this.props.navigator.replace({
                                        component: TabBarView
                                    })
                                }
                            }]
                        )
                    } else {
                        this.props.navigator.replace({
                            component: TabBarView
                        })
                    }
                })
                //设置极光推送的tag标签
                JPush.setTags([userInfoData.DATA[0]["LOGIN_USER_ID"]], () => {
                    ly_Toast("设置tag成功")
                }, () => {
                    // ly_Toast("设置tag失败")
                })
            }else {
                if(Debug) {
                    // 如果是调试环境
                    alert(action);
                }else {
                    // 登录失败
                    ly_Toast("登录失败", 2000);
                    this.setState({
                        'loginBtnDisabled': false,
                        'loginBtnText': '登录'
                    });
                }
            }
        });
    }

    render() {
        const {
            dispatch,
            login
        } = this.props;
        return (
            <View style={styles.page}>
                <NavBar 
                    title="登录"
                    rightText="注册"
                    hideRightButton={false}
                    onRightClick={()=> {
                        this.props.navigator.push({
                            component: RegistView
                        })
                    }}
                    onBack={()=> {
                        this.props.navigator.pop();
                    }}
                />


                <View style={{justifyContent: 'space-between', flex: 1}}>
                    <View>
                        <View style={styles.container}>
                            <LabelInput ref="phone"
                                        label="手机号"
                                        textStyle={{flex:1}}
                                        inputStyle={{flex:3}}
                                        placeholder="请输入用户名"
                                        max={11}
                                        hasRightIcon={true}
                                        keyboardType="numeric"
                                        onChangeText={(text) => {
                                            //dispatch(updateLogin({reg_mobile: text}))
                                            this.setState({
                                                mobile: text
                                            })
                                        }}

                            />

                            <LabelInput label="密码"
                                        placeholder="请输入密码"
                                        textStyle={{flex:1}}
                                        inputStyle={{flex:3}}
                                        type={true}
                                        hasRightIcon={true}
                                        onChangeText={(text) => {
                                            //dispatch(updateLogin({password: text}))
                                            this.setState({
                                                password: text
                                            })
                                        }}
                            />
                        </View>

                        <TouchableOpacity style={styles.find}
                                          onPress={()=>{
                                              this.props.navigator.push({
                                                  component:ForgetView
                                              })
                                          }}>
                            <Text style={{marginTop: 10, marginRight: 10, marginBottom: 30}}>找回密码</Text>
                        </TouchableOpacity>

                        <Button text={this.state.loginBtnText}
                                style={{
                                    width: Screen.width - 40,
                                    backgroundColor: BTNColor,
                                    alignSelf: "center",
                                    borderRadius: 8
                                }}
                                onPress={this.loginClick}
                                disabled={this.state.loginBtnDisabled}
                        />
                    </View>
                    <Button text="东风日产车主APP使用协议"
                            textStyle={{color: "#666", fontWeight: "300"}}
                            style={{marginBottom: 5, backgroundColor: BGColor}}
                            onPress={()=> {
                                this.props.navigator.push({
                                    component: AgreementView
                                })
                            }}/>
                </View>

            </View>
        )
    }
}

export default connect((state) => {
    const {
        login
    } = state;
    return {
        login
    }
})(LoginView);

const styles = StyleSheet.create({
    find: {
        alignSelf: "flex-end"
    },
    regist: {
        alignSelf: "flex-start"
    },
    page: {
        backgroundColor: BGColor,
        flex: 1
    },
    container: {
        backgroundColor: "#fff",
        flex: 1,
        marginTop: 30,
    },
    textStyle: {}
})