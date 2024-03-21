window.onload = function() {
  function getDayOfDate(d){
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(d);
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  }
  function forcastInfo(info){
    days = {};
    for (let i = 0; i < info.forecastday.length; i++){
      dayInfo = {};
      dayInfo['day'] = getDayOfDate(info.forecastday[i].date);
      dayInfo['date'] = info.forecastday[i].date;
      dayInfo['sunrise'] = info.forecastday[i].astro.sunrise ;
      dayInfo['sunset'] = info.forecastday[i].astro.sunset ;
      dayInfo['maxTempC'] = info .forecastday[i].day.maxtemp_c ;
      dayInfo['minTempC'] = info .forecastday[i].day.mintemp_c ;
      dayInfo['maxTempF'] = info .forecastday[i].day.maxtemp_f ;
      dayInfo['minTempF'] = info .forecastday[i].day.mintemp_f ;
      dayInfo['maxwind'] = info.forecastday[i].day.maxwind_kph ;
      dayInfo['condition'] = info.forecastday[i].day.condition.icon ;
      days[i] = dayInfo ;
    }
    return days ;
  }

  function afficheInfo(response){
    return {
      name : response.location.name,
      country : response.location.country,
      time : response.location.localtime,
      current : {
        tempC : response.current.temp_c,
        tempF : response.current.temp_f,
        wind : response.current.wind_kph,
        condition : {
          text : response.current.condition.text,
          icon : response.current.condition.icon,
        },
        uv : response.current.uv ,
        cloud : response.current.cloud,
        feelsLikeF : response.current.feelslike_f,
        feelsLikeC : response.current.feelslike_c,
        humidity : response.current.humidity,
        visibility : response.current.vis_km,
        pressure : response.current.pressure_mb,
        raine : response.current.precip_mm
      },
      forecast : forcastInfo(response.forecast)
    }
  }
  function displayList(data){
    const container = document.querySelector('.forecast');
    const days = data.forecast;
    for (day in days){
      console.log(days[day]);
      const div = document.createElement('div');
      const div0 = document.createElement('div');
      //const div1 = document.createElement('div');
      //const div2 = document.createElement('div');
      const div3 = document.createElement('div');
      const div4 = document.createElement('div');
      const hr = document.createElement('hr');
      const img = document.createElement('img');
      div.classList.add('day');
      div0.classList.add('value');
      div0.textContent = days[day]['day'] ;
      //div1.textContent = "Sun rise : " + days[day]['sunrise'];
      //div2.textContent = "Sun set : " + days[day]['sunset'];
      div3.textContent = "Max " + days[day]['maxTempC'] + 'º Min ' + days[day]['minTempC'] + 'º';
      div3.innerHTML = " <span class='value'>Max </span>" + days[day]['maxTempC'] + "º <span class='value'>Min </span>" + days[day]['minTempC'] + 'º';
      div4.innerHTML = "<span class='value'>Vent</span> " + days[day]['maxwind'] + 'Km/h';
      img.src = `https:${days[day]['condition']}`;
      div0.appendChild(img);
      div.appendChild(div0);
      //div.appendChild(div1);
      //div.appendChild(div2);
      div.appendChild(div3);
      div.appendChild(div4);
      container.appendChild(div);
      container.appendChild(hr);
    }
  }
  function displayInfo(info){
    const data = afficheInfo(info);

    const box1 = document.querySelector('.box1');
    const local = document.createElement('div');
    const time = document.createElement('div');
    time.classList.add('detail-title');
    local.innerHTML = "<span class='id'>" + data.name + '</span>, ' + data.country ;
    time.textContent = data.time ;
    box1.appendChild(local);
    box1.appendChild(time);
    
    const box2 = document.querySelector('.box2');
    const temp = document.createElement('div');
    const img = document.createElement('img');
    const icone = document.createElement('div');
    const condition = document.createElement('div');
    icone.classList.add('weatherConditionIcone');
    condition.classList.add('detail-title');
    temp.textContent = data.current.tempC + 'Cº ' ;
    condition.textContent = data.current.condition.text + ' it feels like ' + data.current.feelsLikeC + 'Cº\n';
    const conditionIcon = data.current.condition.icon; 
    const iconUrl = `https:${conditionIcon}`;
    img.src = iconUrl ;
    icone.appendChild(img);
    icone.appendChild(temp);
    box2.appendChild(icone);
    box2.appendChild(condition);

    const box3 = document.querySelector('.box3');
    const box3_1 = document.createElement('div');
    const box3_2 = document.createElement('div');
    const box3_3 = document.createElement('div');
    const box3_4 = document.createElement('div');
    const box3_5 = document.createElement('div');
    const box3_6 = document.createElement('div');
    const box3_7 = document.createElement('div');

    const box3_2_1 = document.createElement('div');
    const box3_2_2 = document.createElement('div');
    const box3_2_3 = document.createElement('div');
    const box3_2_4 = document.createElement('div');
    const box3_2_5 = document.createElement('div');
    const box3_2_6 = document.createElement('div');
    const box3_2_7 = document.createElement('div');

    const hum = document.createElement('div');
    const wind = document.createElement('div');
    const vis = document.createElement('div');
    const pres = document.createElement('div');
    const rain = document.createElement('div');
    const uv = document.createElement('div');
    const cloud = document.createElement('div');

    box3_1.textContent = "Humidity";
    box3_2.textContent = "Wind";
    box3_3.textContent = "Visibility";
    box3_4.textContent = "Pressure";
    box3_5.textContent = "Rain";
    box3_6.textContent = "UV index";
    box3_7.textContent = "Cloudiness";

    hum.textContent = data.current.humidity + '%';
    wind.textContent = data.current.wind + 'Km/h' ;
    vis.textContent = data.current.visibility + 'Km/h';
    pres.textContent = data.current.pressure + 'Mb';
    rain.textContent = data.current.raine + 'Mm';
    uv.textContent = data.current.uv;
    cloud.textContent = data.current.cloud +'%';

    hum.classList.add('value');
    wind.classList.add('value');
    vis.classList.add('value');
    pres.classList.add('value');
    rain.classList.add('value');
    uv.classList.add('value');
    cloud.classList.add('value');

    box3_1.classList.add('detail-title');
    box3_2.classList.add('detail-title');
    box3_3.classList.add('detail-title');
    box3_4.classList.add('detail-title');
    box3_5.classList.add('detail-title');
    box3_6.classList.add('detail-title');
    box3_7.classList.add('detail-title');
    
    box3_2_1.appendChild(box3_1);
    box3_2_2.appendChild(box3_2);
    box3_2_3.appendChild(box3_3);
    box3_2_4.appendChild(box3_4);
    box3_2_5.appendChild(box3_5);
    box3_2_6.appendChild(box3_6);
    box3_2_7.appendChild(box3_7);
    box3_2_1.appendChild(hum);
    box3_2_2.appendChild(wind);
    box3_2_3.appendChild(vis);
    box3_2_4.appendChild(pres);
    box3_2_5.appendChild(rain);
    box3_2_6.appendChild(uv);
    box3_2_7.appendChild(cloud);

    box3.appendChild(box3_2_1);
    box3.appendChild(box3_2_2);
    box3.appendChild(box3_2_3);
    box3.appendChild(box3_2_4);
    box3.appendChild(box3_2_5);
    box3.appendChild(box3_2_6);
    box3.appendChild(box3_2_7); 


    const div = document.querySelector('.boo');
    div.appendChild(box1);
    div.appendChild(box2);
    displayList(data);
  }
  function getErrorMessage(errorCode) {
    const errorMap = {
      1002 : "API key not provided" ,
      1003 : "Parameter 'q' not provided" ,
      1005 : "API request url is invalid",
      1006 : "No location found matching parameter 'q'" ,
      2006 : "API key provided is invalid",
      2007 : "API key has exceeded calls per month quota" ,
      2008 : "API key has been disabled" ,
      2009 : "API key does not have access to the resource. Please check pricing page for what is allowed in your API subscription plan" ,
      9000 : "Json body passed in bulk request is invalid. Please make sure it is valid json with utf-8 encoding" ,
      9001 : "Json body contains too many locations for bulk request. Please keep it below 50 in a single request" ,
      9999 : "Internal application error"
    }
    return errorMap[errorCode] || "Unknown error"
  }
  function handelInfo(data) {
    if (data.error) {
      const errorMessage = getErrorMessage(data.error.code);
      throw new Error(errorMessage);
    }
    displayInfo(data);
  }
  async function fetchWeather(city, days) {
    const api_key = "31fe1c7511004983a1b42905241703";
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=${days}&aqi=no&alerts=no`;
    const loadingComponent = document.querySelector('.loadingComponent');
    loadingComponent.classList.remove('hidden');
    try {
      const response = await fetch(url, { mode: 'cors' });
      const data = await response.json();
      handelInfo(data);
    } catch (error) {
      if (error instanceof TypeError) {
        console.error('Network error:', error.message);
        displayErrorMessage('Network error: Please check your internet connection');
      } else {
          console.error('API error:', error.message);
          displayErrorMessage('API error: ' + error.message);
      }
    } finally {
      loadingComponent.classList.add('hidden');
    };
  }
  function renderMainPage(){
    const boxs = document.querySelectorAll('.box');
    boxs.forEach((box)=>{
      box.innerHTML = '';
    });
  }
  const main = document.getElementById('main');
  main.classList.add('hidden');
  const btn = document.getElementById('btn');
  // main function
  btn.addEventListener('click', ()=>{
    const city = document.getElementById('city').value;
    const days = document.getElementById('numDays').value;
    const main = document.getElementById('main');
    main.classList.remove('hidden');
    if (
      document.querySelector('.box1').innerHTML.trim() === '' ){
      fetchWeather(city, days);
    }else if (
      (document.querySelector('.box1').innerHTML.trim() !== '' ) 
    ){
      renderMainPage()
      fetchWeather(city, days);
    }
    //fetchWeather("sayda", 4);

  });
};