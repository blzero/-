var typeData =[{ "weatid": "1", "weather": "晴", "weather_icon": "0" }, { "weatid": "2", "weather": "多云", "weather_icon": "1" }, { "weatid": "3", "weather": "阴", "weather_icon": "2" }, { "weatid": "4", "weather": "阵雨", "weather_icon": "3" }, { "weatid": "5", "weather": "雷阵雨", "weather_icon": "4" }, { "weatid": "6", "weather": "雷阵雨有冰雹", "weather_icon": "5" }, { "weatid": "7", "weather": "雨夹雪", "weather_icon": "6" }, { "weatid": "8", "weather": "小雨", "weather_icon": "7" }, { "weatid": "9", "weather": "中雨", "weather_icon": "8" }, { "weatid": "10", "weather": "大雨", "weather_icon": "9" }, { "weatid": "11", "weather": "暴雨", "weather_icon": "10" }, { "weatid": "12", "weather": "大暴雨", "weather_icon": "11" }, { "weatid": "13", "weather": "特大暴雨", "weather_icon": "12" }, { "weatid": "14", "weather": "阵雪", "weather_icon": "13" }, { "weatid": "15", "weather": "小雪", "weather_icon": "14" }, { "weatid": "16", "weather": "中雪", "weather_icon": "15" }, { "weatid": "17", "weather": "大雪", "weather_icon": "16" }, { "weatid": "18", "weather": "暴雪", "weather_icon": "17" }, { "weatid": "19", "weather": "雾", "weather_icon": "18" }, { "weatid": "20", "weather": "冻雨", "weather_icon": "19" }, { "weatid": "21", "weather": "沙尘暴", "weather_icon": "20" }, { "weatid": "22", "weather": "小雨-中雨", "weather_icon": "21" }, { "weatid": "23", "weather": "中雨-大雨", "weather_icon": "22" }, { "weatid": "24", "weather": "大雨-暴雨", "weather_icon": "23" }, { "weatid": "25", "weather": "暴雨-大暴雨", "weather_icon": "24" }, { "weatid": "26", "weather": "大暴雨-特大暴雨", "weather_icon": "25" }, { "weatid": "27", "weather": "小雪-中雪", "weather_icon": "26" }, { "weatid": "28", "weather": "中雪-大雪", "weather_icon": "27" }, { "weatid": "29", "weather": "大雪-暴雪", "weather_icon": "28" }, { "weatid": "30", "weather": "浮尘", "weather_icon": "29" }, { "weatid": "31", "weather": "扬沙", "weather_icon": "30" }, { "weatid": "32", "weather": "强沙尘暴", "weather_icon": "31" }, { "weatid": "33", "weather": "霾", "weather_icon": "53" }] 


var dIcon = [''];


var typeIcon = function (weatid){

  let iconIndex = -1;
  for(let i=0; i< typeData.length;i++){
    if(typeData[i].weatid == weatid){
      iconIndex = typeData[i].weather_icon;
      break;
    }
  }

let t = {
  imgIndex:iconIndex,
  dPath:`weather/d1/${iconIndex}.png`,//白天 
  nPath:`weather/n1/${iconIndex}.png`,//夜间
}

return t;
}





module.exports = typeIcon;