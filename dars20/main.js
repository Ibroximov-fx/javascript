import {Users} from "./main-modules.js";
let wrapper = document.getElementById("Users");
function createCard(item) {
    let card = document.createElement("div");
    card.classList.add("additional-card"); // Add class for identification
    card.innerHTML = `
        <div class="user-card bg-[#FFFFFF] w-full max-w-[280px] rounded-xl px-[2px] py-[2px] relative flex flex-col">
            <div class="relative">
                <img class="rounded-t-xl w-full h-[200px] object-cover" src="${item.img}" alt="${item.text}">
                <span class="absolute top-3 left-3 cursor-pointer like">
                    <svg width="20" height="18" class="text-white" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path  fill-rule="evenodd" clip-rule="evenodd" d="M4.62436 2.4241C2.96537 3.18243 1.75 4.98614 1.75 7.13701C1.75 9.33441 2.64922 11.0281 3.93829 12.4797C5.00072 13.676 6.28684 14.6675 7.54113 15.6345C7.83904 15.8642 8.13515 16.0925 8.42605 16.3218C8.95208 16.7365 9.42132 17.1004 9.87361 17.3647C10.3261 17.6292 10.6904 17.7499 11 17.7499C11.3096 17.7499 11.6739 17.6292 12.1264 17.3647C12.5787 17.1004 13.0479 16.7365 13.574 16.3218C13.8649 16.0925 14.161 15.8642 14.4589 15.6345C15.7132 14.6675 16.9993 13.676 18.0617 12.4797C19.3508 11.0281 20.25 9.33441 20.25 7.13701C20.25 4.98614 19.0346 3.18243 17.3756 2.4241C15.7639 1.68739 13.5983 1.88249 11.5404 4.02065C11.399 4.16754 11.2039 4.25054 11 4.25054C10.7961 4.25054 10.601 4.16754 10.4596 4.02065C8.40166 1.88249 6.23607 1.68739 4.62436 2.4241ZM11 2.45873C8.68795 0.390153 6.09896 0.100781 4.00076 1.05987C1.78471 2.07283 0.25 4.42494 0.25 7.13701C0.25 9.80254 1.3605 11.836 2.81672 13.4757C3.98287 14.7888 5.41022 15.8879 6.67083 16.8585C6.95659 17.0785 7.23378 17.292 7.49742 17.4998C8.00965 17.9036 8.55954 18.3342 9.11682 18.6598C9.67386 18.9853 10.3096 19.2499 11 19.2499C11.6904 19.2499 12.3261 18.9853 12.8832 18.6598C13.4405 18.3342 13.9903 17.9036 14.5026 17.4998C14.7662 17.292 15.0434 17.0785 15.3292 16.8585C16.5898 15.8879 18.0171 14.7888 19.1833 13.4757C20.6395 11.836 21.75 9.80254 21.75 7.13701C21.75 4.42494 20.2153 2.07283 17.9992 1.05987C15.901 0.100781 13.3121 0.390153 11 2.45873Z" fill="#ffff"/>
                    </svg>
                </span>
                <span class="absolute top-3 left-3 hidden cursor-pointer dislike">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 6.13734C0 11.0003 4.01943 13.5917 6.96173 15.9111C8 16.7296 9 17.5002 10 17.5002C11 17.5002 12 16.7296 13.0383 15.9111C15.9806 13.5917 20 11.0003 20 6.13734C20 1.27441 14.4998 -2.17429 10 2.50088C5.50016 -2.17429 0 1.27441 0 6.13734Z" fill="#E93C47"/>
                    </svg>
                </span>
            </div>
            <div class="px-[20px] py-[20px]  flex-grow flex flex-col">
                <div class=" bg-[#EAEDF0] inline-block py-1 px-2 rounded-md text-sm w-fit">${item.button}</div>
                <p class="text-[18px] text-[#16191D] font-semibold mt-[16px] line-clamp-2 min-h-[3.5rem] cursor-pointer ">${item.text}</p>
                <p class="mt-[8px] text-[14px] text-[#8E9297] font-normal">${item.data}</p>
                <p class="mt-[8px] text-[#8E9297] text-[16px] font-semibold">${item.number}</p>
                <p class="font-bold text-[24px] text-[#16191D] mt-[16px] mt-auto">${item.price}</p>
            </div>
        </div>
    `;

    const like = card.querySelector('.like');
    const dislike = card.querySelector('.dislike');

    like.addEventListener('click', () => {
        like.style.display = 'none';
        dislike.style.display = 'block';
    });

    dislike.addEventListener('click', () => {
        dislike.style.display = 'none';
        like.style.display = 'block';
    });

    return card;
}
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
Users.forEach((item) => {
    let card = createCard(item);

    let likeIcon = card.querySelector('.like');
    let dislikeIcon = card.querySelector('.dislike');

    let isFav = favorites.some(fav => fav.text === item.text);
    if (isFav) {
        likeIcon.style.display = 'none';
        dislikeIcon.style.display = 'block';
    } else {
        likeIcon.style.display = 'block';
        dislikeIcon.style.display = 'none';
    }

    wrapper.appendChild(card);
});
let input = document.querySelector("#searchInput");
let final = document.querySelector('#searchResults');
input.addEventListener('input', (event) => {
    final.innerHTML = ""
   let datafetch = Users.filter((item) => {
        return item.text.toLowerCase().includes(event.target.value.toLowerCase())
    })

    final.classList.remove('hidden');

   if(input.value.length === 0) {
     final.classList.add('hidden');
   }

   datafetch.forEach((item) => {
       let div = document.createElement('div');
       div.innerHTML = `<div class="p-4">${item.text}</div>`;
       final.appendChild(div);
   })
})
