// component/weatherComponent/weatherComponent.js

const { getWeather57d, getWeatherToday, getWeatherPM25, getWeatherLifeindex } = require('../../../utils/getWeather.js');
const serarchCity = require('../../../utils/searchCity.js');

const placeName = require('../../../utils/getLocationName.js');
const typeIcon = require('../../../utils/weatherType.js');

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
    },
    isAddCity:{
      type:Boolean,
      value:false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    weatherData: [],
    numbers: '',
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
    lifeIndexData: '',

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

        let other = res;
        other.shift();


        // this.setData({
        //   weatherData: res,
        //   numbers: res.length,
        // });

        getWeatherToday((today) => {
          other.unshift(today);
          let length = other.length;

          this.setData({
            weatherData: other,
            numbers: length,
          });


          wx.hideLoading();

          let item = this.data.weatherData[0];

          this.setSelectWeather(item);
        }, weaid);

       

      }, weaid);
    },

    setSelectWeather: function (item) {
    
    let  date = new Date();
    let hour = date.getHours();
    let path = '';


    if(hour<18){
      if (item.weather_icon){
        let ps = item.weather_icon.split('/');
        let imgIndex = ps.pop().split('.')[0];
        let direc = ps.pop();

        let lastP = ps.join('/') + `/d1/${imgIndex}.png`;
        path = lastP;
      }else{
        let obj = typeIcon(item.weatid);
        path = `../../../assets/weatherImages/${obj.dPath}`;
      }

    }else{

      if (item.weather_icon1){
        let ps = item.weather_icon.split('/');
        let imgIndex = ps.pop().split('.')[0];
        let direc = ps.pop();

        let lastP = ps.join('/') + `/d1/${imgIndex}.png`;
        path = lastP;
      }else{
        let obj = typeIcon(item.weatid);
        path = `../../../assets/weatherImages/${obj.nPath}`;
      }
    }

      this.setData({
        selectedData: item,
        typePath: path,
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

      getWeatherLifeindex((result) => {
        console.log(result);
      }, item.weaid);



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
    searchItemTap: function (e) {

      let index = e.currentTarget.dataset.index;
      let item = this.data.searchResult[index];
      this.triggerEvent('search', '');

      // 设置 navigationBar title
      wx.setNavigationBarTitle({
        title: item.citynm,
      });
      // 清空 搜索 框
      this.setData({
        searchWord: '',
      });

      // 重置 天气 list index
      this.setData({
        selected: 0,
      });
      this.getWeather(item.weaid);
      console.log(index, item);
    }

  },



})
