import React, {Component, PropTypes} from 'react';

import {ValidatethreeUi} from './view/validatethree.js'
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect'
import {push} from 'react-router-redux';
import Immutable from 'immutable'
import {validateuploadthree, validateimgkey} from 'app/redux/reducers/validate.js'
import {Toast} from 'antd-mobile';
import {getApiIp8007, qiniudomain} from 'app/util/utils.js'

@asyncConnect([
  {
    promise: ({
      store: {
        dispatch,
        getState
      },
      params
    }) => {

      // return dispatch(validateimguploador())

    }
  }
])

@connect(state => {
  return {
    validateone: state.getIn(['validate', 'validateone']),
    validatetwo: state.getIn(['validate', 'validatetwo']),
    validatestate: state.getIn(['validate', 'validatestate'])
  }
}, {
  pushState: push,
  validateuploadthree: validateuploadthree,
  validateimgkey: validateimgkey
})

export default class ValidateThree extends Component {
  constructor(props) {
    // code
    super(props);
    this.state = {
      imgUrls: [],
      indentyfiles: [],
      zhiyefiles: [],
      zigefiles: [],
      indentyid: {
        indentyimgkey: ''
      },
      zhiyeid: {
        zhiyeimgkey: ''
      },
      zigeid: {
        zigeimgkey: ''
      }

    };
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  indentyhandleChange(indentyfiles, type, index) {
    console.log('dsadad')
    console.log(indentyfiles, type, index)
    if (type == 'add') {

      this.props.validateimgkey('indenty').then(() => {
        var currentstate = this.context.store.getState();
        var avatarimgkey = currentstate.getIn(['validate', 'indentyimgkey']).toJS();
        if (avatarimgkey.success == 0) {
          Toast.info('请重新选择图片', 1);
        } else {
          this.state.uploader.addFile([indentyfiles[0].file], ['indentyimg']);
          this.setState({
            indentyid: {
              indentyimgkey: (this.state.uploader.files[this.state.uploader.files.length - 1]).id,
              file_name: indentyfiles[0].file.name,
              file_size: indentyfiles[0].file.size,
              content_type: indentyfiles[0].file.type,
              created_at: indentyfiles[0].file.lastModifiedDate.getFullYear() + '/' + indentyfiles[0].file.lastModifiedDate.getMonth() + '/' + indentyfiles[0].file.lastModifiedDate.getDate()

            },
            indentyfiles: indentyfiles
          })
        }

      }, () => {})

      console.log(this.state.indentyid)
    } else {
      console.log('remove')
      this.state.uploader.removeFile(this.state.uploader.getFile(this.state.indentyid.indentyimgkey));
      console.log("LLLLLLL");
      this.setState({
        ...this.state,
        indentyid: {
          indentyimgkey: ''
        },
        indentyfiles: indentyfiles
      })
    }
  }
  zhiyehandleChange(zhiyefiles, type, index) {

    if (type == 'add') {
      this.props.validateimgkey('zhiye').then(() => {
        var currentstate = this.context.store.getState();
        var zhiyeimgkey = currentstate.getIn(['validate', 'zhiyeimgkey']).toJS();
        if (zhiyeimgkey.success == 0) {
          Toast.info('请重新选择图片', 1);
        } else {
          this.state.uploader.addFile([zhiyefiles[0].file], ['zhiyeimg']);
          this.setState({
            zhiyeid: {
              zhiyeimgkey: (this.state.uploader.files[this.state.uploader.files.length - 1]).id,
              file_name: zhiyefiles[0].file.name,
              file_size: zhiyefiles[0].file.size,
              content_type: zhiyefiles[0].file.type,
              created_at: zhiyefiles[0].file.lastModifiedDate.getFullYear() + '/' + zhiyefiles[0].file.lastModifiedDate.getMonth() + '/' + zhiyefiles[0].file.lastModifiedDate.getDate()

            },
            zhiyefiles: zhiyefiles
          })
        }

      }, () => {})

      console.log(this.state.zhiyeid)
    } else {
      this.state.uploader.removeFile(this.state.uploader.getFile(this.state.zhiyeid.zhiyeimgkey));
      this.setState({
        ...this.state,
        zhiyeid: {
          zhiyeimgkey: ''
        },
        zhiyefiles: zhiyefiles

      })
    }

  }
  zigehandleChange(zigefiles, type, index) {
    if (type == 'add') {
      this.props.validateimgkey('zige').then(() => {
        var currentstate = this.context.store.getState();
        var zigeimgkey = currentstate.getIn(['validate', 'zigeimgkey']).toJS();
        if (zigeimgkey.success == 0) {
          Toast.info('请重新选择图片', 1);
        } else {
          this.state.uploader.addFile([zigefiles[0].file], ['zigeimg']);
          this.setState({
            zigeid: {
              zigeimgkey: (this.state.uploader.files[this.state.uploader.files.length - 1]).id,
              file_name: zigefiles[0].file.name,
              file_size: zigefiles[0].file.size,
              content_type: zigefiles[0].file.type,
              created_at: zigefiles[0].file.lastModifiedDate.getFullYear() + '/' + zigefiles[0].file.lastModifiedDate.getMonth() + '/' + zigefiles[0].file.lastModifiedDate.getDate()
            },
            zigefiles: zigefiles
          })
        }

      }, () => {})

      console.log(this.state.zigeid)
    } else {
      this.state.uploader.removeFile(this.state.uploader.getFile(this.state.zigeid.zhiyeimgkey));
      this.setState({
        ...this.state,
        zigeid: {
          zige: ''
        },
        zigefiles: zigefiles
      })
    }

  }
  show(fs, currentNum, type) {
    console.log(fs, currentNum, type);
    var imgs = [];
    if (type == 'indenty') {
      imgs = [this.state.indentyfiles[0].url]
    } else if (type == 'zhiye') {
      imgs = [this.state.zhiyefiles[0].url]
    } else if (type == 'zige') {
      imgs = [this.state.zigefiles[0].url]
    }
    this.setState({imgUrls: imgs, showViewer: true, currentNum: currentNum})
  }
  nexthandleclick() {
    console.log('dsds')
    console.log(this.state.indentyfiles)
    console.log(this.state.indentyid)
    console.log(this.state.zhiyeid)
    console.log(this.state.zigeid)
    if (this.state.indentyid.indentyimgkey.length == 0) {
      Toast.info('请选择身份证照', 1);
      return;
    } else if (this.state.zhiyeid.zhiyeimgkey.length == 0) {
      Toast.info('请选择执业证照', 1);
      return;
    } else if (this.state.zigeid.zigeimgkey.length == 0) {
      Toast.info('请选择资格证照', 1);
      return;
    } else {
      this.state.uploader.start();
    }
    // this.props.validateimguploador({files:this.state.indentyfiles[0].url}).then(() =>{
    //     this.props.pushState('/doctorcenter/validatesuccess')
    // })

  }
  closeimgview() {
    console.log('pppp')
    this.setState({showViewer: false})
  }

  componentDidMount() {
    // this.props.validateimguploador();
    var that = this;
    console.log('dsadsathat');

    var uploader = Qiniu.uploader({
      runtimes: 'html5,flash,html4', // 上传模式,依次退化
      browse_button: 'indentypicker12', // 上传选择的点选按钮，**必需**
      // 在初始化时，uptoken, uptoken_url, uptoken_func 三个参数中必须有一个被设置
      // 切如果提供了多个，其优先级为 uptoken > uptoken_url > uptoken_func
      // 其中 uptoken 是直接提供上传凭证，uptoken_url 是提供了获取上传凭证的地址，如果需要定制获取 uptoken 的过程则可以设置 uptoken_func
      // uptoken : '<Your upload token>', // uptoken 是上传凭证，由其他程序生成
      uptoken_url:  'http://' + getApiIp8007() + '/qiniu_token/rest', // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
      // uptoken_func: function(file){    // 在需要获取 uptoken 时，该方法会被调用
      //    // do something
      //    return uptoken;
      // },
      get_new_uptoken: false, // 设置上传文件的时候是否每次都重新获取新的 uptoken
      // downtoken_url: '/downtoken',
      // Ajax请求downToken的Url，私有空间时使用,JS-SDK 将向该地址POST文件的key和domain,服务端返回的JSON必须包含`url`字段，`url`值为该文件的下载地址
      // unique_names: true,              // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
      //save_key: true,                  // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
      domain: qiniudomain + '/', // bucket 域名，下载资源时用到，**必需**
      // container: 'container',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
      max_file_size: '100mb', // 最大文件体积限制
      multi_selection: true, //是否允许多张图片上传
      // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
      flash_swf_url: 'path/of/plupload/Moxie.swf', //引入 flash,相对路径
      max_retries: 3, // 上传失败最大重试次数
      //  dragdrop: true,                     // 开启可拖曳上传
      // drop_element: 'container',          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
      chunk_size: '4mb', // 分块上传时，每块的体积
      auto_start: false, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
      //x_vars : {
      //    自定义变量，参考http://developer.qiniu.com/docs/v6/api/overview/up/response/vars.html
      //    'time' : function(up,file) {
      //        var time = (new Date()).getTime();
      // do something with 'time'
      //        return time;
      //    },
      //    'size' : function(up,file) {
      //        var size = file.size;
      // do something with 'size'
      //        return size;
      //    }
      //},
      init: {
        'FilesAdded': function(uploader, files) {
          console.log('FilesAdded')
          console.log(files)

        },
        'BeforeUpload': function(up, file) {
          // 每个文件上传前,处理相关的事情
          console.log(111)

        },
        'UploadProgress': function(up, file) {
          console.log(222)
          // 每个文件上传时,处理相关的事情
        },
        'FileUploaded': function(up, file, info) {
          console.log('3333')
          // 每个文件上传成功后,处理相关的事情
          // 其中 info 是文件上传成功后，服务端返回的json，形式如
          // {
          //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
          //    "key": "gogopher.jpg"
          //  }
          // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

          // var res = JSON.parse(info);



        },
        'Error': function(up, err, errTip) {
          //上传出错时,处理相关的事情
          console.log('err' + errTip)
        },
        'UploadComplete': function(uploader, files) {
          //队列文件处理完毕后,处理相关的事情
          console.log('UploadComplete')
          console.log(files)
          if (files.length == 3) {
            var status = 0;
            var vds = that.props.validatestate
              ? that.props.validatestate.toJS()
              : null;
            if (vds && vds.data == null) {
              status = 0;
            } else {
              status = 1;
            }

            var currentstate = that.context.store.getState();
            var indentyimgkey = currentstate.getIn(['validate', 'indentyimgkey']).toJS();
            var zhiyeimgkey = currentstate.getIn(['validate', 'zhiyeimgkey']).toJS();
            var zigeimgkey = currentstate.getIn(['validate', 'zigeimgkey']).toJS();

            that.props.validateuploadthree(status, that.state.indentyid, that.state.zhiyeid, that.state.zigeid, indentyimgkey.data, zhiyeimgkey.data, zigeimgkey.data, 1).then(() => {

              var currentstate = that.context.store.getState();
              var uploadthreeres = currentstate.getIn(['validate', 'uploadthreeres']).toJS();
              if (uploadthreeres.success == '0') {
                that.props.pushState('/doctorcenter/validatefail')
              } else {

                that.props.pushState('/doctorcenter/validatesuccess')
              }
            }, () => {
              that.props.pushState('/doctorcenter/validatefail')
            })
          } else {
            Toast.info('图片上传错误,请重试', 1);
          }
        },
        'Key': function(up, file) {
          // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
          // 该配置必须要在 unique_names: false , save_key: false 时才生效
          // console.log('key'+demoFiles[0]);
          console.log('file[i].id')
          console.log(that.state.zhiyeid, that.state.indentyid, that.state.zigeid)
          console.log(file)
          if (file.id == that.state.indentyid.indentyimgkey) {
            console.log(file.id)
            console.log(that.state.indentyid)
            var currentstate = that.context.store.getState();
            var indentyimgkey = currentstate.getIn(['validate', 'indentyimgkey']).toJS();
            // do something with key here
            console.log(indentyimgkey.data)
            var pathone = indentyimgkey.data.substr(0, 3);
            var pathtwo = indentyimgkey.data.substr(3, 3);
            var paththree = indentyimgkey.data.substr(6, 3);
            console.log(pathone, pathtwo, paththree)
            console.log('uploads/public/' + pathone + '/' + pathtwo + '/' + paththree + '/' + indentyimgkey.data);
            return 'uploads/public/' + pathone + '/' + pathtwo + '/' + paththree + '/' + indentyimgkey.data;
          } else if (file.id == that.state.zhiyeid.zhiyeimgkey) {
            var currentstate = that.context.store.getState();
            var zhiyeimgkey = currentstate.getIn(['validate', 'zhiyeimgkey']).toJS();
            // do something with key here
            console.log(zhiyeimgkey.data)
            var pathone = zhiyeimgkey.data.substr(0, 3);
            var pathtwo = zhiyeimgkey.data.substr(3, 3);
            var paththree = zhiyeimgkey.data.substr(6, 3);
            console.log(pathone, pathtwo, paththree)
            console.log('/uploads/public/' + pathone + '/' + pathtwo + '/' + paththree + '/' + zhiyeimgkey.data);
            return 'uploads/public/' + pathone + '/' + pathtwo + '/' + paththree + '/' + zhiyeimgkey.data;
          } else {
            var currentstate = that.context.store.getState();
            var zigemgkey = currentstate.getIn(['validate', 'zigeimgkey']).toJS();
            // do something with key here
            console.log(zigemgkey.data)
            var pathone = zigemgkey.data.substr(0, 3);
            var pathtwo = zigemgkey.data.substr(3, 3);
            var paththree = zigemgkey.data.substr(6, 3);
            console.log(pathone, pathtwo, paththree)
            console.log('/uploads/public/' + pathone + '/' + pathtwo + '/' + paththree + '/' + zigemgkey.data);
            return 'uploads/public/' + pathone + '/' + pathtwo + '/' + paththree + '/' + zigemgkey.data;
          }

          // do something with key here

          //  var key = demoFiles
          //  // do something with key here
          //  return key
        }
      }
    })

    console.log('llls')
    this.setState({uploader: uploader});

    //  uploader.FilesAdded()

  }

  render() {
    console.log('hhhh')
    return ValidatethreeUi({
      showViewer: (this.state.showViewer),
      currentNum: (this.state.currentNum),
      show: (:: this.show),
      closeimgview: (:: this.closeimgview),
      indentyfiles: (this.state.indentyfiles),
      zhiyefiles: (this.state.zhiyefiles),
      zigefiles: (this.state.zigefiles),
      imgUrls: (this.state.imgUrls),
      indentyhandleChange: (:: this.indentyhandleChange),
      zhiyehandleChange: (:: this.zhiyehandleChange),
      zigehandleChange: (:: this.zigehandleChange),
      nexthandleclick: (:: this.nexthandleclick)
    });
  }

}