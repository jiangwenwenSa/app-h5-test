var crossDomain = {};

crossDomain.include = function(obj, target) {
  var ArrayProto = Array.prototype;
  var found = false;
  if (obj == null) {
    return found;
  }
  if (ArrayProto.indexOf && obj.indexOf === ArrayProto.indexOf) {
    return obj.indexOf(target) != -1;
  }
  each(obj, function (value) {
    if (found || (found = (value === target))) {
      return breaker;
    }
  });
  return found;
};

crossDomain.getPart = function(part) {
  var that = this,
      temp = false;
  var len = that.option.length;
  if(len) {
    for(var i = 0; i < len; i++) {
      if(part.indexOf(that.option[i]['part_url']) > -1) {
        return true;
      }
    }
  }
  return temp;
};

crossDomain.getPartHash = function(part) {
  var that = this;
  var len = that.option.length;
  var temp = false;
  if(len) {
    for(var i = 0; i < len; i++) {
      if(part.indexOf(that.option[i]['part_url']) > -1) {
        return that.option[i]['after_hash'];
      }
    }
  }
  return !!temp;
};

crossDomain.getCurrenId = function() {
  var distinct_id = this.store.getDistinctId() || '',
      first_id = this.store.getFirstId() || '';
  var urlId = first_id ? 'u' + distinct_id : 'a' + distinct_id;
  return encodeURIComponent(urlId);
};


crossDomain.rewireteUrl = function(url, target) {
  var reg = /([^?#]+)(\?[^#]*)?(#.*)?/;
  var arr = reg.exec(url),
      nurl = '';
  if(!arr) {
    return;
  }
  var host = arr[1] || '',
      search = arr[2] || '',
      hash = arr[3] || '';
      var idIndex;
  if(this.getPartHash(url)) {
    idIndex = hash.indexOf('_sa_sdk');
    var queryIndex = hash.indexOf('?');
    if(queryIndex > -1) {
      if(idIndex > -1) {
        nurl = host + search + '#' + hash.substring(1, idIndex) + '_sa_sdk=' + this.getCurrenId();
      } else {
        nurl = host + search + '#' + hash.substring(1) + '&_sa_sdk=' + this.getCurrenId();
      }
    } else {
      nurl = host + search + '#' + hash.substring(1) + '?_sa_sdk=' + this.getCurrenId();
    }
  } else {
    idIndex = search.indexOf('_sa_sdk');
    if(idIndex > -1) {
      nurl = host + '?' + search.substring(1, idIndex) + '_sa_sdk=' + this.getCurrenId() + hash;
    } else {
      nurl = host + '?' + search.substring(1) + '&_sa_sdk=' + that.getCurrenId() + hash;
    }
  }
  
  if(target) {
    target.href = nurl;
  }
  return nurl;
};

crossDomain.getUrlId = function() {
  var sa_id = location.href.match(/_sa_sdk=([au][^\?\#\&\=]+)/);
  if(this._.isArray(sa_id) && sa_id[1]){
    return decodeURIComponent(sa_id[1]);
  }else{
    return '';
  }
};

crossDomain.setRefferId = function() {
  var distinct_id = this.store.getDistinctId();
  var urlId = this.getUrlId();
  if(urlId === ''){
    return false;
  }
  var isAnonymousId = urlId.substring(0,1) === 'a';
  urlId = urlId.substring(1);

  if(urlId === distinct_id) {
    return false;
  }
  if(urlId && isAnonymousId && this.store.getFirstId()) {
    this.sd.identify(urlId, true);
    this.sd.saEvent.send({
      original_id: urlId,
      distinct_id: distinct_id,
      type: 'track_signup',
      event: '$SignUp',
      properties: {}
    }, null);
  }
  if(urlId && isAnonymousId && !this.store.getFirstId()) {
    this.sd.identify(urlId, true);
  }
  if(urlId && !isAnonymousId && !this.store.getFirstId()) {
    this.sd.login(urlId);
  }
};

crossDomain.addListen = function() {
  var that = this;
  that._.addEvent(document, 'mousedown', function(event){
    var target = event.target;
    var nodeName = target.tagName;
    if(nodeName.toLowerCase() === "a" && target.href) {
      var location = that._.URL(target.href);
      var protocol = location.protocol;
      if(protocol === 'http:' || protocol === 'https:') {
        if(that.getPart(target.href)) {
          that.rewireteUrl(target.href, target);
        }
      }
    }
  })
};

crossDomain.init = function(sd, option) {
  this.sd = sd;
  this._ = sd._;
  this.store = sd.store;
  this.para = sd.para;
  this.option = option.linker;
  if(this._.isObject(option) && this._.isArray(option.linker) && option.linker.length > 0) {
    this.setRefferId();
    this.addListen();
  } else {
    sd.log('请配置打通域名参数！');
    return;
  }
  resolveOption(this.option);
  function resolveOption(option) {
    var len = option.length,
        arr = [];
    for(var i = 0; i < len; i++) {
      if(/[A-Za-z0-9]+\./.test(option[i].part_url) && toString.call(option[i].after_hash) == '[object Boolean]') {
        arr.push(option[i]);
      } else {
        sd.log('linker 配置的第 ' + (i + 1) + ' 项格式不正确，请检查参数格式！');
      }
    }
    option = arr;
  }
};


window['sensorsDataAnalytic201505'].modules = { cross_domain: crossDomain }