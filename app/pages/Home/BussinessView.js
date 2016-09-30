import React,{Component} from 'react';
import{
    Text,
    View,
    StyleSheet,
    Image
}from 'react-native';
import NavBar from '../../components/DefaultNavBar';
import CustomButton from './CustomButton';
import DLRView from '../Business/DLRView'

const customerButtonItems = [
    [
        {
            text:"保养预约",
            targetComponent:"MaintainBookView",
            image:require("../../image/icon_bus_protect.png"),
            secText:"为车主解决汽车保养难题"
        },
        {
            text:"维修预约",
            targetComponent:"RepairBookView",
            image:require("../../image/icon_bus_maintain.png"),
            secText:"为您提供贴心维修服务"
        }
    ],
    [
        {
            text:"4S店查询",
            targetComponent:DLRView,
            image:require("../../image/icon_bus_dri.png"),
            secText:"可查询省市或附近专营店"
        },
        {
            text:"代办预约",
            targetComponent:"CommissionView",
            image:require("../../image/icon_bus_do.png"),
            secText:"可代办车险年票等"
        }
    ],
    [
        {
            text:"试驾预约",
            targetComponent:"TestDriveView",
            image:require("../../image/icon_bus_drive.png"),
            secText:"在线预约试驾各类车型"
        },
        {
            text:"紧急救援",
            targetComponent:"Rescue",
            image:require("../../image/icon_bus_help.png"),
            secText:"为您提供及时的救援"
        }
    ],

];
export default class BussinessView extends Component{
    mtbook = ()=>{
        alert('保养预约')
    };
    rpbook = ()=>{
        alert('维修预约')
    };
    render(){
        return(
            <View style={{flex:1}}>
                <NavBar title="爱车" hideLefButton={true} />
                {
                    customerButtonItems.map((row,index)=>{
                        return (
                            <View style={{flex:1,flexDirection:"row"}} key={index}>
                                    {
                                        row.map((item,index2)=>{
                                            return (
                                                <CustomButton style={{flex:1,marginBottom:10}}
                                                              image={item.image}
                                                              imageStyle={{marginTop:10}}
                                                              key={index2}
                                                              textStyle={{marginTop:10,marginBottom:5,fontSize:12}}
                                                              text={item.text}
                                                              onPress={()=>{
                                                                this.props.navigator.push({
                                                                    component: DLRView,
                                                                })
                                                              }}
                                                              secText={item.secText}
                                                              secTextStyle={{marginBottom:5,fontSize:12}}
                                                />
                                            )
                                        })
                                    }
                                </View>
                        )
                    })
                }
            </View>
        )
    }
}
