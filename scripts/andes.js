var Andes = {
    netService: 'http://andes.cootekservice.com',
    handler: window.AndesJSHandler,
    showToast: function(text) {
        if (this.handler) {
            this.handler.showToast(text);
        } else {
            alert(text);
        }
    },
    getToken: function () {
        if (this.handler) {
            return this.handler.getToken();
        } else {
            return '';
        }
    },
    getLoginPhone: function() {
        if (this.handler) {
            return this.handler.getLoginPhone();
        } else {
            return '';
        }
    },
    share: function(title, content, url, smsUrl, copyUrl, imageUrl, callback) {
        if (this.handler) {
            this.handler.share(title, content, url, smsUrl, copyUrl, imageUrl, callback); }
    },
    enableHeadbarShare: function(callback) {
        if (this.handler) {
            this.handler.enableHeadbarShare(callback);
        }
    },
    enableHeadbarUpload: function(callback) {
        if (this.handler) {
            this.handler.enableHeadbarUpload(callback);
        }
    },
    getApiLevel: function() {
        var level = 0;
        try { if(this.handler) {
                level = this.handler.getApiLevel();
            }
        } catch (e) {
            console.log('in lower api level');
            level = 64;
        }
        return level;
    },
    showShare: function(title, content, url, smsUrl, copyUrl, imageUrl, source, callback) {
        if (this.handler) {
            if (this.getApiLevel() > 64) {
                this.handler.showShare(title, content, url, smsUrl, copyUrl, imageUrl, source, callback);
            } else {
                this.handler.share(title, content, url, smsUrl, copyUrl, imageUrl, callback);
            }
        }
    },
    showShareToFriend: function(title, content, url, smsUrl, copyUrl, imageUrl, source, callback) {
        if (this.handler) {
            if (this.getApiLevel() > 64) {
                this.handler.showShareToFriend(title, content, url, smsUrl, copyUrl, imageUrl, source, callback);
            } else {
                this.handler.share(title, content, url, smsUrl, copyUrl, imageUrl, callback);
            }
        }
    },
    usageRecord: function(path, key, value) {
        if (this.handler) {
            if (this.getApiLevel() > 64) {
                if ('string' == typeof(value)) {
                    this.handler.usageRecord(path, key, value);
                } else if ('object' == typeof(value)) {
                    this.handler.usageRecordDict(path, key, JSON.stringify(value));
                }
            }
        }
    },
    startMoveListener: function(callback) {
        if (this.handler) {
            if (this.getApiLevel() >= 69) {
                this.handler.startMoveListener(callback);
                return true;
            }
            return false;
        }
        return false;
    },
    stopMoveListener: function() {
        if (this.handler) {
            if (this.getApiLevel() >= 69) {
                this.handler.stopMoveListener();
                return true;
            }
            return false;
        }
        return false;
    },
    pickerFriend: function(callback) {
        if (this.handler) {
            if (this.getApiLevel() >= 69) {
                this.handler.pickerFriend(callback);
                return true;
            }
            return false;
        }
        return false;
    },
    startRecord: function(toPhone, callback) {
        if (this.handler) {
            if (this.getApiLevel() >= 69) {
                this.handler.startRecord(toPhone, callback);
                return true;
            }
            return false;
        }
        return false;
    },
    stopRecord: function(callback) {
        if (this.handler) {
            if (this.getApiLevel() >= 69) {
                this.handler.stopRecord(callback);
                return true;
            }
            return false;
        }
        return false;
    },
    startPlayRecord: function(file, callback) {
        if (this.handler) {
            if (this.getApiLevel() >= 69) {
                this.handler.playRecord(file, callback);
                return true;
            }
            return false;
        }
        return false;
    },
    stopPlayRecord: function() {
        if (this.handler) {
            if (this.getApiLevel() >= 69) {
                this.handler.stopPlayRecord();
                return true;
            }
            return false;
        }
        return false;
    },
    startPlayUrl: function(url, loop, isCrossPages, callback) {
        if (this.handler) {
            if (this.getApiLevel() >= 69) {
                this.handler.playWebMusic(url, loop, isCrossPages, callback);
                return true;
            }
            return false;
        }
        return false;
    },
    stopPlayUrl: function(url) {
        if (this.handler) {
            if (this.getApiLevel() >= 69) {
                this.handler.stopPlayWebMusic(url);
                return true;
            }
            return false;
        }
        return false;
    },
    uploadVoiceFile: function(fileName, phoneName, callback) {
        if (this.handler) {
            if (this.getApiLevel() >= 69) {
                this.handler.uploadVoiceFile(fileName, phoneName, callback);
                return true;
            }
            return false;
        }
        return false;
    },
    joinGroup: function(groupId) {
        if (this.handler) {
            this.handler.joinGroup(groupId);
        }
    },
    showConfirm: function(title, yesCallback, noCallback) {
        console.log('in show confirm');
        if (this.handler) {
            this.handler.showConfirm(title, yesCallback, noCallback);
        }
    },
    getFriendCount: function() {
        if (this.handler && this.handler.getAndesFriendCount){
            return this.handler.getAndesFriendCount();
        }
        return 3;
    },

    showShareWithResult: function(title, content, useShortUrl, contentImageUrl, url, imageUrl, source, callback) {
        if (this.handler && this.handler.showShareOnlyToSocialPlatform) {
            this.handler.showShareOnlyToSocialPlatform(title, content, url, '', '', imageUrl, source, callback );
        }
    }

};
