"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dsbridge = _interopRequireDefault(require("./dsbridge"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var module_names = new Set([]);
var patch = {};

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function isObject(val) {
  if (val === null) {
    return false;
  }

  return typeof val === 'function' || _typeof(val) === 'object';
}

function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]";
}

function isHybrid() {
  return window && window._dswk === true;
}

var xengine = {
  patch: patch,
  platform: platform(),
  hybrid: true,
  isHybrid: isHybrid,
  bridge: _dsbridge["default"],
  use: use,
  api: api,
  broadcastOn: broadcastOn,
  broadcastOff: broadcastOff,
  assert: xassert
};

function xassert(targetID, expression) {
  if (expression) {
    document.getElementById(targetID).style.backgroundColor = 'green';
  } else {
    document.getElementById(targetID).style.backgroundColor = 'red';
  }
}

function api(jsimoduleId, funcname, args, cb) {
  if (args.hasOwnProperty('__event__')) {
    only_idx++;
    var eventcb = args['__event__'];
    if (!isFunction(eventcb)) throw '__event__ 必须为函数';
    args['__event__'] = ns + "." + funcname + '.__event__' + only_idx;
    xengine.bridge.register(args['__event__'], function (res) {
      return eventcb(res);
    });
  }

  return _dsbridge["default"].call(jsimoduleId + "." + funcname, args, cb);
}

function broadcastOff() {
  xengine.bridge.unregister("com.zkty.module.engine.broadcast");
}

function broadcastOn(eventcb) {
  //use("com.zkty.module.engine","broadcast")
  xengine.bridge.register("com.zkty.module.engine.broadcast", function (res) {
    return eventcb(res);
  });
}

var only_idx = 0;

function use(ns, funcs) {
  if (module_names.has(ns)) {
    throw ns + ',注册无效,模块已存在,xengine.use("' + ns + '") 只允许调用一次;';
  }

  module_names.add(ns);
  console.log(ns + ',js 注册成功');

  var _call = function _call(funcname, args) {
    if (args.hasOwnProperty('__event__')) {
      only_idx++;
      var eventcb = args['__event__'];
      if (!isFunction(eventcb)) throw '__event__ 必须为函数';
      args['__event__'] = ns + "." + funcname + '.__event__' + only_idx;
      xengine.bridge.register(args['__event__'], function (res) {
        return eventcb(res);
      });
    }

    if (funcname.startsWith('sync')) {
      return xengine.bridge.call(ns + "." + funcname, args);
    } else {
      var p = new Promise(function (resolve, reject) {
        var warning_msg = "x-engine 0.1.0 将不再支持 promise,改用参数里的　__ret__做为异步返回值,以支持多次返回.或者直接调用函数同步返回";
        console.warn(warning_msg);
        xengine.bridge.call(ns + "." + funcname, args, function (res) {
          // only resolve once
          resolve(res);

          if (args['__ret__']) {
            return args['__ret__'](res);
          }
        });
      });
      return p;
    }
  };

  return funcs.reduce(function (acc, cur, i) {
    if (isObject(cur)) {
      acc[cur.name] = function (args) {
        return _call(cur.name, _objectSpread(_objectSpread({}, cur.default_args), args));
      };
    } else if (isString(cur)) {
      acc[cur] = function (args) {
        return _call(cur, args);
      };
    } else {
      throw "仅支持 string 与 {name:xxx, default_args:{...}}";
    }

    return acc;
  }, {});
}

Object.defineProperty(xengine, "bridge", {
  get: function get() {
    return _dsbridge["default"];
  },
  set: function set() {
    throw 'dsbridge不能被修改';
  }
});

function platform() {
  var ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet = /(?:iPad|PlayBook)/.test(ua) || isAndroid && !/(?:Mobile)/.test(ua) || isFireFox && /(?:Tablet)/.test(ua),
      isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  };
}

; // 监听输入框的软键盘弹起和收起事件

function listenKeybord($input) {
  if (judgeDeviceType.isIOS) {
    // IOS 键盘弹起：IOS 和 Android 输入框获取焦点键盘弹起
    $input.addEventListener("focus", function () {
      console.log("IOS 键盘弹起啦！"); // IOS 键盘弹起后操作
    }, false); // IOS 键盘收起：IOS 点击输入框以外区域或点击收起按钮，输入框都会失去焦点，键盘会收起，

    $input.addEventListener("blur", function () {
      console.log("IOS 键盘收起啦！"); // IOS 键盘收起后操作
    });
  } // Andriod 键盘收起：Andriod 键盘弹起或收起页面高度会发生变化，以此为依据获知键盘收起


  if (judgeDeviceType.isAndroid) {
    var originHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.addEventListener("resize", function () {
      var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;

      if (originHeight < resizeHeight) {
        console.log("Android 键盘收起啦！"); // Android 键盘收起后操作
      } else {
        console.log("Android 键盘弹起啦！"); // Android 键盘弹起后操作
      }

      originHeight = resizeHeight;
    }, false);
  }
}

var $inputs = document.querySelectorAll(".input");

for (var i = 0; i < $inputs.length; i++) {
  listenKeybord($inputs[i]);
}

patch.disableDoubleTapScroll = function (ms) {
  ms = ms || 500;
  console.log("禁用双击滑动,两次点击冷却时间为" + ms + " ms"); //禁止双击时, webview 自动上移
  //不是个好方案, 会导致快速点击按钮失效

  var agent = navigator.userAgent.toLowerCase();
  var iLastTouch = null;

  if (agent.indexOf("iphone") >= 0 || agent.indexOf("ipad") >= 0) {
    document.body.addEventListener("touchend", function (event) {
      var a = new Date().getTime();
      iLastTouch = iLastTouch || a + 1;
      var c = a - iLastTouch;

      if (c < ms && c > 0) {
        event.preventDefault();
        return false;
      }

      iLastTouch = a;
    }, false);
  }
};

var _default = xengine;
exports["default"] = _default;