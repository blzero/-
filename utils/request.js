/**
 * {Object} ,eg{url:'',type:'GET',success:function(res){},fail:function(error){}}
 */
const http = function(obj){

  wx.request({
    url: obj.url,
    data: obj.data?obj.data:'',
    header: {},
    method: obj.type?obj.type:'GET',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      obj.success && obj.success(res.data);
    },
    fail: function(res) {
      obj.fail && obj.fail(res) || wx.showModal({
        title: '提示',
        content: JSON.stringify(res),
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    },
    complete: function(res) {
      wx.hideLoading();
      
      console.log('complete');
    },
  })
}

module.exports = http;