// component/weatherComponent/weatherComponent.js

const { getWeather57d, getWeatherPM25, getWeatherLifeindex } = require('../../../utils/getWeather.js');
const serarchCity = require('../../../utils/searchCity.js');

const placeName = require('../../../utils/getLocationName.js');
const typeIcon = require('../../../utils/weatherType.js');



var temp = [{ "weaid": "40", "days": "2018-02-13", "week": "星期二", "cityno": "pudongxinqu", "citynm": "浦东新区", "cityid": "101020600", "temperature": "11℃/0℃", "humidity": "0%/0%", "weather": "晴转多云", "weather_icon": "http://api.k780.com/upload/weather/d/0.gif", "weather_icon1": "http://api.k780.com/upload/weather/n/1.gif", "wind": "西南风", "winp": "3-4级", "temp_high": "11", "temp_low": "0", "humi_high": "0", "humi_low": "0", "weatid": "1", "weatid1": "2", "windid": "16", "winpid": "14" }, { "weaid": "40", "days": "2018-02-14", "week": "星期三", "cityno": "pudongxinqu", "citynm": "浦东新区", "cityid": "101020600", "temperature": "18℃/8℃", "humidity": "0%/0%", "weather": "多云转阴", "weather_icon": "http://api.k780.com/upload/weather/d/1.gif", "weather_icon1": "http://api.k780.com/upload/weather/n/2.gif", "wind": "西南风转东北风", "winp": "3-4级转4-5级", "temp_high": "18", "temp_low": "8", "humi_high": "0", "humi_low": "0", "weatid": "2", "weatid1": "3", "windid": "79", "winpid": "37" }, { "weaid": "40", "days": "2018-02-15", "week": "星期四", "cityno": "pudongxinqu", "citynm": "浦东新区", "cityid": "101020600", "temperature": "10℃/5℃", "humidity": "0%/0%", "weather": "小雨", "weather_icon": "http://api.k780.com/upload/weather/d/7.gif", "weather_icon1": "http://api.k780.com/upload/weather/n/7.gif", "wind": "东北风", "winp": "4-5级转3-4级", "temp_high": "10", "temp_low": "5", "humi_high": "0", "humi_low": "0", "weatid": "8", "weatid1": "8", "windid": "13", "winpid": "54" }, { "weaid": "40", "days": "2018-02-16", "week": "星期五", "cityno": "pudongxinqu", "citynm": "浦东新区", "cityid": "101020600", "temperature": "9℃/6℃", "humidity": "0%/0%", "weather": "多云转晴", "weather_icon": "http://api.k780.com/upload/weather/d/1.gif", "weather_icon1": "http://api.k780.com/upload/weather/n/0.gif", "wind": "北风转东风", "winp": "<3级", "temp_high": "9", "temp_low": "6", "humi_high": "0", "humi_low": "0", "weatid": "2", "weatid1": "1", "windid": "83", "winpid": "395" }, { "weaid": "40", "days": "2018-02-17", "week": "星期六", "cityno": "pudongxinqu", "citynm": "浦东新区", "cityid": "101020600", "temperature": "12℃/7℃", "humidity": "0%/0%", "weather": "多云转小雨", "weather_icon": "http://api.k780.com/upload/weather/d/1.gif", "weather_icon1": "http://api.k780.com/upload/weather/n/7.gif", "wind": "东南风", "winp": "3-4级转<3级", "temp_high": "12", "temp_low": "7", "humi_high": "0", "humi_low": "0", "weatid": "2", "weatid1": "8", "windid": "12", "winpid": "402" }, { "weaid": "40", "days": "2018-02-18", "week": "星期日", "cityno": "pudongxinqu", "citynm": "浦东新区", "cityid": "101020600", "temperature": "9℃/4℃", "humidity": "0%/0%", "weather": "小雨", "weather_icon": "http://api.k780.com/upload/weather/d/7.gif", "weather_icon1": "http://api.k780.com/upload/weather/n/7.gif", "wind": "北风转西北风", "winp": "<3级", "temp_high": "9", "temp_low": "4", "humi_high": "0", "humi_low": "0", "weatid": "8", "weatid1": "8", "windid": "64", "winpid": "395" }, { "weaid": "40", "days": "2018-02-19", "week": "星期一", "cityno": "pudongxinqu", "citynm": "浦东新区", "cityid": "101020600", "temperature": "7℃/5℃", "humidity": "0%/0%", "weather": "阴转小雨", "weather_icon": "http://api.k780.com/upload/weather/d/2.gif", "weather_icon1": "http://api.k780.com/upload/weather/n/7.gif", "wind": "东北风转无持续风向", "winp": "<3级", "temp_high": "7", "temp_low": "5", "humi_high": "0", "humi_low": "0", "weatid": "3", "weatid1": "8", "windid": "136", "winpid": "395" }];
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    innerText: {
      type: String,
      value: 'default value',
    },
    searchResult: {
      type: Array,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    weatherData: temp,
    numbers: temp.length,
    todayDate: '',
    location: '',
    selected: 0,
    animationData: {},

    listLeft: 0,
    // 天气类型 图片路径
    typePath: '',
    //选中日期 data
    selectedData: '',

    // pm 2.5 
    pm25Data: '',
    // cache weaid
    cacheWeaid: -1,
    // 生活 指数
    lifeIndexData:'',

  },
  ready: function () {

    this.getToday();

    this.getLocation();

  },


  /**
   * 组件的方法列表
   */
  methods: {

    //显示隐藏 天气列表
    showHide: function () {
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      });

      let left = this.data.listLeft == 0 ? -200 : 0;
      animation.left(left).step()
      this.setData({
        animationData: animation.export(),
        listLeft: left,
      })
    },


    // 天气列表 item tap 
    currentItemTap: function (e) {
      var index = e.currentTarget.dataset.index;
      this.setData({
        selected: index,
      });

      let item = this.data.weatherData[index];

      this.setSelectWeather(item);


    },

    // 获取天气
    getWeather: function (weaid) {
      wx.showLoading({
        title: '啦啦啦',
      });

      getWeather57d((res) => {
        this.setData({
          weatherData: res,
          numbers: res.length,
        });

        wx.hideLoading();

        let item = this.data.weatherData[0];

        this.setSelectWeather(item);

      }, weaid);
    },

    setSelectWeather: function (item) {
      let obj = typeIcon(item.weatid);

      this.setData({
        selectedData: item,
        typePath: `../../../assets/weatherImages/${obj.nPath}`,
      });

      if (this.data.cacheWeaid == item.weaid) {
        return;
      }

      this.setData({
        cacheWeaid: item.weaid,
      });

      getWeatherPM25((result) => {
        console.log(result);
      }, item.weaid);

      getWeatherLifeindex((result)=>{
        console.log(result);
      },item.weaid);



    },
    // 获取位置
    getLocation: function () {
      wx.showNavigationBarLoading();

      placeName((name) => {
        this.setData({
          location: name,
        });

        wx.hideNavigationBarLoading();

        wx.setNavigationBarTitle({
          title: this.data.location,
        });

        var ci = serarchCity(this.data.location, true);
        var weaid = ci[0] && ci[0].weaid;
        this.getWeather(weaid);
      })
    },

    // 设置今天日期
    getToday: function () {
      var t = new Date();
      var month = t.getMonth() + 1;
      var date = t.getDate();
      var day = t.getDay();

      switch (day) {
        case 1: day = '一'; break;
        case 2: day = '二'; break;
        case 3: day = '三'; break;
        case 4: day = '四'; break;
        case 5: day = '五'; break;
        case 6: day = '六'; break;
        case 7: day = '日'; break;
        default: ;
      }


      this.setData({
        todayDate: {
          month: month,
          date: date,
          week: day,
        }
      });

    },

    // 搜索 event 
    searchCity: function (e) {

      this.setData({
        searchWord: e.detail.value,
      });

      this.triggerEvent('search', e.detail);
    },
    // 搜索结果点击
    searchItemTap:function(e){

      let index = e.currentTarget.dataset.index;
      let item = this.data.searchResult[index];
      this.triggerEvent('search', '');

      // 设置 navigationBar title
      wx.setNavigationBarTitle({
        title: item.citynm,
      });
      // 清空 搜索 框
      this.setData({
        searchWord:'',
      });

      // 重置 天气 list index
      this.setData({
        selected: 0,
      });
      this.getWeather(item.weaid);
      console.log(index,item);
    }

  },



})
