const citys = require('./citys.js');


var searchCity = function (name, location = false) {

  if (!name) {
    return [];
  }
  // "cityno": "beijing", "citynm": "北京","weaid": "1", "area_1": "北京", "area_2": "城区",  "area_3": ""

  var result = [];
  for (let k in citys) {
    let obj = citys[k];



    if (location) {
      let citynm = name.includes(obj.citynm);
      let area_1 = name.includes(obj.area_1);
      let area_2 = name.includes(obj.area_2);
      let area_3 = name.includes(obj.area_3);

      if (citynm && area_1) {
        result = [];
        result.push(obj);
      }
    } else {
      let cityno = obj.cityno.includes(name);
      let area_1 = obj.area_1.includes(name);
      let area_2 = obj.area_2.includes(name);
      let area_3 = obj.area_3.includes(name);

      if (area_3 || area_2 || area_1) {
        result.push(obj);
        continue;
      }


      if (cityno) {
        result.push(obj);
      }
    }

  }

  return result;

}


module.exports = searchCity;