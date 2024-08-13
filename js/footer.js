// footer
export const createFooter = () => {
  const footer = document.createElement('footer');
  const footerTitle = document.createElement('h2');
  const footerText = document.createElement('p');
  const teamParentDiv = document.createElement('div');

  //footer legt-right
  const footerDivRight = document.createElement('div');
  const footerDivLeft = document.createElement('div');
  const footerClock = document.createElement('h2');
  const footerWeather = document.createElement('h4');
  const weatherIcon = document.createElement('div');
  footer.id = 'footer';
  //
  teamParentDiv.classList = 'team-parent-div';

  footerDivRight.classList = 'div-right';
  footerDivLeft.classList = 'div-left';
  footerClock.classList = 'footer-clock';
  footerWeather.classList = 'footer-weather';
  footerTitle.id = 'footer-title';
  footerText.id = 'footer-text';

  //팀소개
  footerTitle.innerText = '팔풍당당';
  footerText.innerText = '강력한 팔풍이 불어도 함께라면 모든 도전이 즐거운 팀입니다.';

  //
  function createTeamDiv(name, url) {
    const teamPeople = document.createElement('button');
    teamPeople.id = 'team-people';
    teamPeople.innerText = name;
    teamPeople.addEventListener('click', () => {
      window.location.href = url;
    });

    teamPeople.addEventListener('mouseenter', () => {
      teamPeople.innerText = 'GitHub';
    });

    teamPeople.addEventListener('mouseleave', () => {
      teamPeople.innerText = name;
    });
    return teamPeople;
  }
  const teamMembers = [
    { name: '유나', url: 'https://github.com/yuna-c' },
    { name: '민지', url: 'https://github.com/jungminji0215' },
    { name: '규리', url: 'https://github.com/kyulipark/sparta.git' },
    { name: '기철', url: 'https://github.com/LGC1010' }
  ];

  teamMembers.forEach((member) => {
    const teamPeople = createTeamDiv(member.name, member.url);
    teamParentDiv.appendChild(teamPeople);
  });

  app.appendChild(teamParentDiv);

  //시간
  function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    footerClock.innerText = `${hours}:${minutes}:${seconds}`;
  }
  getClock();
  setInterval(getClock, 1000);

  // 날씨
  const WHEATHER_API_KEY = '7ac5dfc70abe627b5afa653a690ff111';

  function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WHEATHER_API_KEY}&lang=kr&units=metric`;
    footerWeather.innerText = url;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const name = data.name;
        const temp = Math.round(data.main.temp);
        const wIcon = data.weather[0].icon;
        const weatherIcon = `https://openweathermap.org/img/wn/10d@2x.png`;
        footerWeather.innerText = `${name}, ${temp}°C`;
      });
  }
  function onGeoError() {
    alert('위치를 찾을수 없습니다.');
  }
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

  //결과
  footerDivRight.appendChild(footerClock);
  footerDivRight.appendChild(footerWeather);
  footerDivRight.appendChild(weatherIcon);
  footerDivLeft.appendChild(footerTitle);
  footerDivLeft.appendChild(footerText);
  //추가
  footerDivLeft.appendChild(teamParentDiv);

  footer.appendChild(footerDivLeft);
  footer.appendChild(footerDivRight);
  app.insertAdjacentElement('beforeend', footer);
};
