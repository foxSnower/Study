/**
 * Created by DB on 16/7/18.
 */

export function requestGET(url, params = {}, successBlock, failBlack) {

    //把传进来的参数加工成GET模式
    let newURL = url;
    let keys = Object.keys(params);
    keys.map((value, index)=> {
        if (index == 0) {
            newURL = url + '?'
        }
        newURL = `${newURL}${value}=${params[value]}`;

        if (index != keys.length - 1) {
            newURL = newURL + '&'
        }
    });

    let map = {method: 'GET'};

    console.log(newURL);

    fetch(newURL, map)
        .then((response) => response.text())
        .then(
            (responseData) => {
                let responseJson = eval("(" + responseData + ")");
                successBlock(responseJson);
            }
        )
        .catch(
            (error) => {
                failBlack(error);
            }
        )
}

export function requestPOST(url, params = {}, successBlock, failBlack) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: JSON.stringify(params)
    })
        .then((response) => response.json())
        .then((data) => {
                successBlock(data)
            }
        )
        .catch((error) => {
                failBlack(error)
            }
        );
}

export function upLoadImage(url, params, response, loginBlock, successBlock, failBlack) {
    let formData = new FormData();
    formData.append('file', {uri: response, type: 'image/jpeg', name: 'userImage.jpg'});
    formData.append('fileName', 'file');
    formData.append('photoDir', 'userImage');
    formData.append('height', params.height);
    formData.append('width', params.width);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    })
        .then((response) => response.text())
        .then((responseData) => {
                let responseJson = eval("(" + responseData + ")");
                if (responseJson.errcode == 9 && responseJson.errmsg == '未登录') {
                    loginBlock();
                } else {
                    successBlock(responseJson.data);
                }
            }
        )
        .catch((error) => {
                failBlack(error);
            }
        )
}

export function gets(url, successCallback, failCallback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status === 200) {
            successCallback(JSON.parse(request.responseText))

        } else {
            failCallback()
        }
    };

    request.open('GET', url);
    request.send();
}