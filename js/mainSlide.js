import { getPopularData} from './fetchData.js';

export const creatSlideBox = async() => {
    const app = document.getElementById('app');
    const banner = document.createElement('section');
    const text = document.createElement('p');
    const slideWrap = document.createElement('div');
    const slideBox = document.createElement('div');
    const slideList = document.createElement('ul');
    
    text.innerHTML = `영화 리뷰 페이지<br>리뷰, 줄거리, 평점까지 한번에 다<br>여기서 확인하세요`
    
    const data = await getPopularData(1);
    const slideData = data.results.slice(1, 10);
    
    console.log(slideData[0]);
    console.log('mainbanner');
    
    banner.classList = 'banner';
    slideWrap.classList = 'slide_wrap';
    slideBox.classList = 'slide_box';
    slideList.classList = 'slide_list';
    
    app.appendChild(banner).appendChild(text);
    banner.appendChild(slideWrap).appendChild(slideBox).appendChild(slideList);
    slideList.innerHTML += creatSlide(data);

    const slideItem = creatSlide(data);
    
    const slider = slideWrap.querySelectorAll(".slide_item");
    slide(slider)
}

const creatSlide = (data) => {
    const dataResult = data.results.slice(0,10);
    let slidItem = dataResult.map((item)=>{
        return `
        <li class="slide_item">
            <img src="https://image.tmdb.org/t/p/w500${item.backdrop_path}" alt="${item.title}">
        <li>
        `
    });
    return slidItem;
}

const slide = (a) =>{
    let currentIndex = 0;               // 현재 보이는 이미지
    let sliderCount = a.length;    // 이미지 갯수
    let sliderInterval = 3000;          // 이미지 변경 간격 시간
    
    setInterval(() => {
        let nextIndex = (currentIndex + 1) % sliderCount;
        a[currentIndex].style.opacity = "0";
        a[nextIndex].style.opacity = "1";
        currentIndex = nextIndex;
    }, sliderInterval);
}
