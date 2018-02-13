const http = require('./request.js');
const lbsKey = require('../config/lbsqqKey.js');

const placeName = function(result){

  wx.getLocation({
    type: '',
    altitude: true,
    success: function (res) {
      console.log(res);

      var latitude = res.latitude
      var longitude = res.longitude
      http({
        url: 'https://apis.map.qq.com/ws/geocoder/v1/',
        data:{
          location: latitude+ ','+ longitude,
          get_poi:0,
          key: lbsKey.key,
        },

        success:function(res){
          result && result(res.result.address,res);
        },

        fail:function(error){
          console.log(error);
        }

      });
    },
    fail: function (res) {
      console.log(res);

    },
    complete: function (res) { },
  })
}

module.exports = placeName;