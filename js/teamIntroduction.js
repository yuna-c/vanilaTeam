export const createTeamIntroduction = () => {
    const app = document.getElementById('app');
    const teamPeople = document.createElement('section');
    const teamParentDiv = document.createElement('div');
  
    teamParentDiv.style.display = 'flex';
    teamParentDiv.style.backgroundColor ='var(--baseColor)';
  
    function createTeamDiv(name, url) {
      const teamPeople = document.createElement('button');
      teamPeople.style.border = '1px solid var(--bgColor)';
      teamPeople.style.borderRadius = '5px';
      teamPeople.style.width = '100px';
      teamPeople.style.height = '40px';
      // 버튼 마진 다르게
      if (name === '유나') {
        teamPeople.style.marginLeft = '50px';
      } else {
        teamPeople.style.marginLeft = '10px';
      }
  
      teamPeople.style.marginBottom = '25px';
      teamPeople.innerText = name;
      teamPeople.style.color = 'var(--bgColor)';
      teamPeople.style.display = 'flex';
      teamPeople.style.justifyContent = 'center';
      teamPeople.style.alignItems = 'center';
      teamPeople.style.backgroundColor ='var(--baseColor)';
  
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
  
    teamMembers.forEach(member => {
      const teamPeople = createTeamDiv(member.name, member.url);
      teamParentDiv.appendChild(teamPeople);
    });
  
    app.appendChild(teamParentDiv);
  }