//if('a'window.AndesIOS){
   // var AndesIOS=new Object();
    //AndesIOS.AuthToken="1753f636-692b-4066-8a4d-82051d3ecff5";
//}
var Andes = {
    netService: 'http://183.136.223.45:30015',
    authToken: 'no_value',
    handler: window.WebViewJavascriptBridge,
    callHandler: function(method, key, data) {
        var self = this;
        if (self.handler) {
            alert('call method:' + method);
            if (self[key] != 'no_value' && self[key] != null) {
                return self[key];
            }
            self.handler.callHandler(method, data, function responseCallback(response) {
                self[key] = response;
            });

            if (self[key] === null) {
                return null;
            }
        } else {
            return '';
        }
    },
    showToast: function(text) {
        if (this.handler) {
            this.handler.callHandler('showToast', text, null);
        } else {
            alert(text);
        }
    },
    showConfirm: function(title, positiveCB, negativeCB) {
        if (this.handler) {
            this.handler.registerHandler(positiveCB, function(data, responsecallback) {
                eval(positiveCB + '()');
            });
            this.handler.registerHandler(negativeCB, function(data, responsecallback) {
                eval(negativeCB + '()');
            });
            var params = {
                "message": "",
                "title": title,
                "positive_only":"false",
                "positive_text":"是",
                "positive_cb": positiveCB,
                "negative_text":"否",
                "negative_cb": negativeCB 
            }
            this.handler.callHandler('showDialog', params, function(res) {
                console.log(res);
            });
        }
    },
    getToken: function() {
        if (typeof window.AndesIOS=='object'&&window.AndesIOS.hasOwnProperty('AuthToken')) {
			return window.AndesIOS.AuthToken;
        }
        return this.callHandler('getToken','authToken');
    },
    getLoginPhone: function() {
        if (window.AndesIOS.LoginNumber) {
            return window.AndesIOS.LoginNumber;
        }
        return this.callHandler('getLoginPhone');
    },
    getApiLevel: function() {
        if (window.AndesIOS.ApiLevel) {
            return window.AndesIOS.ApiLevel;
        }
        return this.callHandler('getApiLevel');
    },
    showShare: function(title, content, url, smsUrl, copyUrl, imageUrl, source, callback) {
        if (this.handler) {
            var params = {
                'title': title,
                'content': content,
                'url': url,
                'smsUrl': smsUrl,
                'copyUrl': copyUrl,
                'imageUrl': imageUrl,
                'source': source,
                'callback': callback
            };
            this.handler.callHandler('showShare', params, function resCb(data) {
            });
        }
    },
    enableHeadbarShare: function(callback) {
    },
    enableHeadbarUpload: function(callback) {
    },
	pickerFriend: function(callback) {
        if(this.handler){
		    this.handler.callHandler('pickerFriend', null, function resCb(data) {
		    	console.log(data);
		    	callback(data);
	    	});
        }
        else{
            TranSlider.pickerFriendIOS({"phone":123,"name":"zlx"});
        }
	},
    startRecord: function(toPhone, callback) {
        if (this.handler) {
            this.handler.callHandler('startRecord',toPhone, function resCb(data){
                console.log(data);
                callback(data);
            });
        }
    },
    stopRecord: function(callback) {
        if (this.handler) {
            this.handler.callHandler('stopRecord',null, function resCb(data){
                console.log(data);
                callback();
            });
        }
    },
    startPlayRecord: function(file, callback) {
        if (this.handler) {
            this.handler.callHandler('startPlayRecord',file, function resCb(data){
                console.log(data);
                callback(data);
            });
        }
    },
    stopPlayRecord: function() {
        if (this.handler) {
            this.handler.callHandler('stopPlayRecord',null, function resCb(data){
                console.log(data);
                callback(data);
            });
        }
    },
    uploadVoiceFile: function(fileName, phoneName, callback) {
        if(this.handler) {
            var params = {
                "fileName": fileName,
                "phoneName": phoneName
            }
            this.handler.callHandler('uploadVoiceFile', params, callback);
        }
    },
    startPlayUrl: function(url, loop, isCrossPages, callback) {
        if(this.handler){
            var params = {
                'url': url,
                'loog': loop,
                'isCrossPages': isCrossPages
            }
            this.handler.callHandler('startPlayUrl', params, function resCb(data) {
                console.log(data);
                callback(data);
            });
        }
    },
	stopPlayUrl: function(url) {
        if (this.handler) {
            this.handler.callHandler('stopPlayUrl', url, function resCb(data) {
                console.log(data);
                callback(data);
            });
		}
    },
    usageRecord: function(path, key, value) {
    },
    joinGroup: function(groupId) {
        this.handler.callHandler('joinGroup', {'groupid':groupId}, function resCb(data) {
            console.log(data);
        });
    },
    getFriendCount: function(callback) {
        if (this.handler) {
            return this.handler.callHandler('getFriendsCount', null, function(data) {
                callback(data);
            });
        } else {
            return 2;
        }
    },
    showShareWithResult: function(title, content, useShortUrl, contentImageUrl, url,imageUrl, source, callback) {
        if (this.handler) {
            var params = {
                'title': title,
                'useShortUrl': 1,
                'contentImageUrl': contentImageUrl,
                'url': url,
                'imageUrl': imageUrl,
                'source': source,
                'approachs': ['wechat','timeline','weibo', 'qq', 'qzone']
            };
            this.handler.callHandler('showShare', params, function (data) {
                callback(data);
            });
        }
    },
    showShareOnlyWechat: function(title, content, useShortUrl, contentImageUrl, url, imageUrl, shareFrom, callback) {
        if (this.handler) {
            var params = {
                'title': title,
                'content': content,
                'useShortUrl': useShortUrl,
                'contentImageUrl': contentImageUrl,
                'url': url,
                'imageUrl': imageUrl,
                'sharefrom':shareFrom,
                'approachs': ['wechat','timeline']
            };
            this.handler.callHandler('showShare', params, function (data) {
                callback(data);
            });
        }
    }
};
