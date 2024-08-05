// footer
export const createFooter = () => {
  const app = document.getElementById('app');
  const footer = document.createElement('footer');
  const footerDiv = document.createElement('div');
  const footerTitle = document.createElement('h2');
  const footerText = document.createElement('p');
  const teamParentDiv = document.createElement('div');

  footer.id = 'footer';

  footerDiv.classList = 'bind';
  teamParentDiv.classList.add('team-parent');
  // footer.style.backgroundColor = 'var(--baseColor)';
  // footer.style.backgroundPosition = 'center';
  // footer.style.width = '100%';
  // footer.style.height = '120px';
  footerTitle.innerText = '팔풍당당';
  // footerTitle.style.color = 'var(--bgColor)';
  footerText.innerHTML = ` : 강력한 <span>팔풍</span>이 불어도 함께라면 모든 도전이 즐거운 팀입니다.`;
  // footerText.style.color = 'var(--bgColor)';
  // footerText.style.marginLeft = '10px';
  // footerText.style.marginTop = '6px';
  // teamParentDiv.style.marginLeft = '30px';
  // teamParentDiv.style.display = 'flex';
  // teamParentDiv.style.gap = '0px';

  function createTeamDiv(name, url) {
    const teamDiv = document.createElement('button');
    // teamDiv.style.border = '1px solid var(--bgColor)';
    // teamDiv.style.borderRadius = '5px';
    // teamDiv.style.marginTop = '8px';
    // teamDiv.style.width = '100px';
    // teamDiv.style.height = '40px';
    // teamDiv.style.marginLeft = '18px';
    teamDiv.innerText = name;
    // teamDiv.style.color = 'var(--bgColor)';
    // teamDiv.style.display = 'flex';
    // teamDiv.style.justifyContent = 'center';
    // teamDiv.style.alignItems = 'center';

    teamDiv.addEventListener('click', () => {
      window.location.href = url;
    });

    teamDiv.addEventListener('mouseenter', () => {
      teamDiv.innerText = 'GitHub';
    });

    teamDiv.addEventListener('mouseleave', () => {
      teamDiv.innerText = name;
    });

    return teamDiv;
  }

  footerDiv.append(footerTitle, footerText);

  // const teamNames = ['유나', '민지', '규리', '기철'];

  const teamMembers = [
    { name: '유나', url: 'https://github.com/yuna-c' },
    { name: '민지', url: 'https://github.com/jungminji0215' },
    { name: '규리', url: 'https://github.com/kyulipark/sparta.git' },
    { name: '기철', url: 'https://github.com/LGC1010' }
  ];

  teamMembers.forEach((member) => {
    const teamDiv = createTeamDiv(member.name, member.url);
    teamParentDiv.appendChild(teamDiv);
  });

  footer.appendChild(footerDiv);
  footerDiv.appendChild(teamParentDiv);
  app.insertAdjacentElement('beforeend', footer);
};
