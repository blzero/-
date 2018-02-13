// 获取 request
const http = require('./request.js');
const apiKey = require('../config/nowapiKey.js');

const  weaid = 36;//上海

const  temp = {
  appkey: apiKey.AppKey,
  sign: apiKey.Sign,
  format: 'json',
}

var getWeather = {

//1. 5-7天 天气预报
  getWeather57d: function (result, place = weaid) {
    http({
      url: 'https://sapi.k780.com/',
      data: Object.assign({
        app: 'weather.future',
        weaid: place,
      },temp),
      success: (res) => {

        result && result(res.result);
      }
    });

  },
//2. 天气类型 (晴)
  getWeatherType: function (result){

    http({
      url: 'https://sapi.k780.com/',
      data: Object.assign({
        app: 'weather.wtype',
      },temp),
      success: (res) => {

        result && result(res.result);
      }
    });
  },
  //3. 5-7天 生活指数
  getWeatherLifeindex: function (result, place = weaid){
    http({
      url: 'https://sapi.k780.com/',
      data: Object.assign({
        app: 'weather.lifeindex',
        weaid: place,
      },temp),
      success: (res) => {

        result && result(res.result);
      }
    });
  },
  //4.  PM2.5
  getWeatherPM25: function (result, place = weaid){
    http({
      url: 'https://sapi.k780.com/',
      data: Object.assign({
        app: 'weather.pm25',
        weaid: place,
      }, temp),
      success: (res) => {

        result && result(res.result);
      }
    });
  }

}

module.exports = getWeather;