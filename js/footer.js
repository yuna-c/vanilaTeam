// footer
export const createFooter = () => {
  // const app = document.getElementById('app');
  const footer = document.createElement('footer');
  const footerTitle = document.createElement('h2');
  const footerText = document.createElement('p'); 
  const teamParentDiv = document.createElement('div');

  //footer legt-right 
  const footerDivRight = document.createElement('div');
  const footerDivLeft = document.createElement('div');
  const footerClock = document.createElement('h2');
  const footerWeather = document.createElement('h4'); 
  footerDivRight.classList = 'div-right';
  footerDivLeft.classList = 'div-left';
  footerClock.classList = 'footer-clock';
  footerWeather.classList = 'footer-weather';

  footer.style.backgroundColor = 'var(--baseColor)';
  footer.style.display = 'flex';
  footer.style.justifyContent = 'space-between';
  footer.style.alignItems = 'center';

  //푸터 좌측 우측
  footerDivLeft.style.height ='80px';
  footerDivLeft.style.width ='814px';
  footerDivLeft.style.display ='flex';
  footerDivLeft.style.flexDirection = 'column';
  // footerDivLeft.style.alignItems ='right';
  footerDivLeft.style.marginLeft = '40px';
  footerDivLeft.style.marginTop = '20px';
  footerDivLeft.style.backgroundColor = 'var(--baseColor)';

  footerDivRight.style.height ='80px';
  footerDivRight.style.width ='814px';
  footerDivRight.style.display ='flex';
  footerDivRight.style.alignItems = 'flex-end'; 
  footerDivRight.style.flexDirection = 'column';
  footerDivRight.style.marginTop = '20px';
  footerDivRight.style.marginRight = '40px';
  footerDivRight.style.backgroundColor = 'var(--baseColor)';

  //팀소개
  footerTitle.innerText = '팔풍당당';
  footerTitle.style.color = 'var(--bgColor)';
  footerTitle.style.marginLeft = '10px';
  footerText.innerText = '강력한 팔풍이 불어도 함께라면 모든 도전이 즐거운 팀입니다.';
  footerText.style.color = 'var(--bgColor)';
  footerText.style.marginLeft = '10px';
  footerText.style.marginTop = '3px';
  teamParentDiv.style.marginLeft = '30px';
  teamParentDiv.style.display = 'flex';
  teamParentDiv.style.gap = '0px';
  //날씨와 시간
  footerClock.style.color = 'var(--bgColor)';
  footerWeather.style.color = 'var(--bgColor)';


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

  // 날씨(1)
  // const WHEATHER_API_KEY = '7ac5dfc70abe627b5afa653a690ff111';
  // function onGeoOk(position) {
  //   const lat = position.coords.latitude;
  //   const lon = position.coords.longitude;
  //   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WHEATHER_API_KEY}&units=metric`;
  //   footerWeather.innerText = url;

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const name = data.name;
  //       const temp = Math.round(data.main.temp);

  //       footerWeather.innerText = `${name}, ${temp}°C`;
  //     });
  // }
  // function onGeoError() {
  //   alert('위치를 찾을수 없습니다.');
  // }
  // navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);


 // 날씨(2)
const WHEATHER_API_KEY = '7ac5dfc70abe627b5afa653a690ff111';

  function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WHEATHER_API_KEY}&units=metric&lang=kr`;
    footerWeather.innerText = url;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {

        const name = data.name;
        const temp = Math.round(data.main.temp);
        const wIcon = data.weather[0].icon;
        const weatherIconUrl = `https://openweathermap.org/img/wn/10d@2x.png`;
        footerWeather.innerHTML = `<img src="${weatherIconUrl}" alt="Weather Icon"> ${name}, ${temp}°C`;
      });
  }
  function onGeoError() {
    alert('위치를 찾을수 없습니다.');
  }
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

//결과
  footerDivRight.appendChild(footerClock);
  footerDivRight.appendChild(footerWeather);
  footerDivLeft.appendChild(footerTitle);
  footerDivLeft.appendChild(footerText);
  footer.appendChild(footerDivLeft);
  footer.appendChild(footerDivRight);
  app.insertAdjacentElement('beforeend', footer);
};








// footer
// export const createFooter = () => {
//   const app = document.getElementById('app');
//   const footer = document.createElement('footer');
//   const footerDiv = document.createElement('div');
//   const footerTitle = document.createElement('h2');
//   const footerText = document.createElement('p'); 
//   const teamParentDiv = document.createElement('div');

//   footer.id = 'footer';
//   teamParentDiv.id = 'team-parent-div'

//   footer.style.backgroundColor = 'var(--baseColor)';
//   footer.style.backgroundPosition = 'center';
//   footer.style.width = '100%';
//   footer.style.height = '200px';
//   footerDiv.classList = 'bind';
  
//   footerTitle.innerText = '팔풍당당';
//   footerTitle.style.color = 'var(--bgColor)';
//   footerText.innerText = '강력한 팔풍이 불어도 함께라면 모든 도전이 즐거운 팀입니다.';
//   footerText.style.color = 'var(--bgColor)';
//   footerText.style.marginLeft = '10px';
//   footerText.style.marginTop = '6px';
//   teamParentDiv.style.marginLeft = '30px';
//   teamParentDiv.style.display = 'flex';
//   teamParentDiv.style.gap = '0px';


//   function createTeamDiv(name, url) {
//     const teamDiv = document.createElement('button');
//     teamDiv.style.border = '1px solid var(--bgColor)';
//     teamDiv.style.borderRadius = '5px';
//     teamDiv.style.marginTop = '8px';
//     teamDiv.style.width = '100px';
//     teamDiv.style.height = '40px';
//     teamDiv.style.marginLeft = '18px';
//     teamDiv.innerText = name;
//     teamDiv.style.color = 'var(--bgColor)';
//     teamDiv.style.display = 'flex';
//     teamDiv.style.justifyContent = 'center';
//     teamDiv.style.alignItems = 'center';

//     teamDiv.addEventListener('click', () => {
//       window.location.href = url;
//   });

//   teamDiv.addEventListener('mouseenter', () => {
//     teamDiv.innerText = 'GitHub';
//   });

//   teamDiv.addEventListener('mouseleave', () => {
//     teamDiv.innerText = name;
//   });

//       return teamDiv;
// }


//   footerDiv.appendChild(footerTitle);
//   footerDiv.appendChild(footerText);
//   const teamMembers = [
//     { name: '유나', url: 'https://github.com/yuna-c' },
//     { name: '민지', url: 'https://github.com/jungminji0215' },
//     { name: '규리', url: 'https://github.com/kyulipark/sparta.git' },
//     { name: '기철', url: 'https://github.com/LGC1010' }
//   ];

//   teamMembers.forEach(member => {
//     const teamDiv = createTeamDiv(member.name, member.url);
//     teamParentDiv.appendChild(teamDiv);
//   });
  
//   footer.appendChild(footerDiv);
//   footer.appendChild(teamParentDiv);
//   app.insertAdjacentElement('beforeend', footer);
// };