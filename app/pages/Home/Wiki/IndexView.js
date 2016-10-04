'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    WebView
} from 'react-native';
// third part module
import {connect} from 'react-redux';
import RNFS from 'react-native-fs';
// action
import {fetchImg} from '../../../actions/wikiAction'
// utils
import {Screen, pixel1} from '../../../utils/CommonUtil';
import UserDefaults from '../../../utils/GlobalStorage';
import imageObj from '../../../utils/imageUtil';
// common component
import NavBar from '../../../components/DefaultNavBar';
import Item from '../../../components/Item';
// page component
import Answer from './AnswerView';
import Manual from './ManualView';
import LearnReplacement from './LearnReplacementView';

let jobId = -1;
let url = 'http://obqi5r9i0.bkt.clouddn.com/JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC3%E7%89%88%EF%BC%89%E4%B8%AD%E6%96%87%20%E9%AB%98%E6%B8%85%20%E5%AE%8C%E6%95%B4.pdf'

class Cyclopedia extends Component {
    constructor(props) {
        super(props);
        let {dispatch} = props;
        // 获取数据
        UserDefaults.objectForKey("userInfo", (data)=> {
            if (data) {
                //alert(data["LOGIN_USER_ID"])
                // 如果用户id存在，就改变用车百科页面图片
                dispatch(fetchImg('启辰D50'))
            }
        });
        //
        this.state = {
          output: 'Doc folder: ' + RNFS.DocumentDirectoryPath
        }

        this.downloadFile = this.downloadFile.bind(this)

    }

    downloadFile (background, url) {
      RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then((result) => {
        console.log('GOT RESULT', result);
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
      if(RNFS.exists(`${RNFS.DocumentDirectoryPath}/lyManual.pdf`)) {
        // 如果已经存在，就直接返回
        console.log('文件已存在')
        return;
      }
      if (jobId !== -1) {
        this.setState({ output: 'A download is already in progress' });
      }

      var progress = data => {
        var percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
        var text = `Progress ${percentage}%`;
        this.setState({ output: text });
      };

      var begin = res => {
        this.setState({ output: 'Download has begun' });
      };

      var progressDivider = 1;


      // Random file name needed to force refresh...
      const downloadDest = `${RNFS.DocumentDirectoryPath}/lyManual.pdf`;
      const ret = RNFS.downloadFile({
        fromUrl: url,
        toFile: downloadDest,
        begin,
        progress,
        background,
        progressDivider
      });

      jobId = ret.jobId;

      ret.promise.then(res => {
        this.setState({ output: JSON.stringify(res)+downloadDest });
        // 写文件
        jobId = -1;
      }).catch(err => {
        //this.showError(err)
        //alert(JSON.stringify(err))
        jobId = -1;
      });
    //   let path = RNFS.DocumentDirectoryPath + '/test.txt'
    //   RNFS.writeFile(path, 'hello wrold', 'utf8')
    //     .then(success=> {
    //       alert(path)
    //     })
    //     .catch(err=> {
    //       alert('error')
    //     })
    }

    render() {
        let {dispatch, wiki} = this.props;
        //alert(JSON.stringify(this.state.imagePath))
        console.log(this.state.imagePath)

        return (
            <View style={styles.container}>
                <NavBar
                    title="用车百科"
                    style={styles.navbar}
                    onBack={()=> {
                        this.props.navigator.pop()
                    }}
                />
                <Image
                    style={styles.banner}
                    source={wiki.img}
                >
                    <Text
                        style={styles.bannerDescription}
                    >{wiki.title}</Text>
                </Image>
                <View
                    style={styles.content}
                >
                    <Item
                        title={'用车答疑'}
                        description={'快速解决用车过程中遇到的疑问'}
                        image={require('../../../image/icon_car.png')}
                        onPress={()=> {
                            this.props.navigator.push({
                                component: Answer,
                                params: {
                                  title: '用车答疑'
                                }
                            })
                        }}
                    />
                    <Item
                        title={'随车手册'}
                        description={'详细查看随车指南'}
                        image={require('../../../image/icon_wiki_text.png')}
                        onPress={()=> {
                          //alert('hello')
                          //this.manualClick().bind(this, false, downloadUrl)
                          this.downloadFile(true, url)
                        }}
                    />
                    <Item
                        title={'认识纯正备件'}
                        description={'学会了这些，再也不用担心被忽悠了'}
                        image={require('../../../image/icon_wiki_bank.png')}
                        onPress={()=> {
                            this.props.navigator.push({
                                component: LearnReplacement,
                                params: {
                                  title: '认识纯正备件'
                                }
                            })
                        }}
                    />
                </View>
                <WebView
                  ref={'webview'}
                  automaticallyAdjustContentInsets={false}
                  style={styles.webView}
                  source={{uri: 'file:///data/data/com.ly.customer/files/lyManual.pdf'}}
                  //source={{uri: 'http://www.baidu.com'}}

                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  decelerationRate="normal"
                  startInLoadingState={true}
                  scalesPageToFit={true}
                />

                <Text>{this.state.output}</Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#ccc'
    },
    navbar: {},
    banner: {
        width: Screen.width,
        height: 180,
        justifyContent: 'flex-end'
    },
    bannerDescription: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        color: '#fff',
        fontSize: 16,
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 10
    },
    content: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default connect((state) => {
    //console.log(state);
    const {wiki} = state;
    return {
        wiki
    }
})(Cyclopedia);
