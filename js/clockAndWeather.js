export const createClockAndWeather = () => {
  const app = document.getElementById('app');
  const clockAndWeatherHeader = document.createElement('section');
  const clockTitle = document.createElement('h4');
  const weatherTitle = document.createElement('h4');

  clockAndWeatherHeader.id = 'weather';
  clockTitle.id = 'clock-title';
  weatherTitle.id = 'weather-city';

  clockAndWeatherHeader.style.marginBottom ='3px';
  clockAndWeatherHeader.style.display = 'flex';
  clockAndWeatherHeader.style.flexDirection = 'column';
  clockAndWeatherHeader.style.alignItems = 'flex-end';
  clockTitle.style.color ='var(--baseColor)';
  clockTitle.style.fontStyle ='normal';
  weatherTitle.style.color ='var(--baseColor)';
  weatherTitle.style.fontStyle ='normal';

  clockAndWeatherHeader.appendChild(clockTitle);
  clockAndWeatherHeader.appendChild(weatherTitle);
  app.appendChild(clockAndWeatherHeader);

  //시계
  function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    clockTitle.innerText = `현재 시간: ${hours}:${minutes}`;
  }

  getClock();
  setInterval(getClock, 1000);

  const WHEATHER_API_KEY = '7ac5dfc70abe627b5afa653a690ff111';

  function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WHEATHER_API_KEY}&units=metric`;
    weatherTitle.innerText = url;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const name = data.name;
        // const mainWeather = data.weather[0].main;
        const temp = Math.round(data.main.temp);

        weatherTitle.innerText = `${name}, ${temp}°C`;
        // weatherTitle.innerText = `${name}, ${mainWeather}, ${temp}°C`;
        // console.log(name, mainWeather, temp);
      });

    //   fetch(url).then(Response => Response.json())
    //             .then(data => {
    //               weatherTitle.innerText = `${data.name}, ${data.weather.mian},${data.main.temp}`;

    //             console.log(data.name, data.weather.main, data.main.temp);
    // });
  }

  function onGeoError() {
    alert('위치를 찾을수 없습니다.');
  }

  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
};
