"use strict";


movies.splice(50);



// ============================= NORMALIZE ALL MOVIES =========================//

let allMovies = movies.map((item) => {
    return {
        id: item.imdbId,
        year: item.year,
        category: item.categories,
        rating: item.imdbRating,
        lang: item.language,
        link: `https://youtube.com/embed/${item.youtubeId}`,
        title: item.title,
        summary: item.summary,
        maxImg: item.bigThumbanil,
        minImg: item.smallThumbnail,
        time: `${Math.trunc(item.runtime/60)}h ${item.runtime%60}m`
    };
});

// console.log(allMovies);


// ============================= NORMALIZE ALL MOVIES END =========================//
renderUi(allMovies)

function renderUi (arr){
    $('.wrapper').innerHTML = "";

    arr.forEach(item => {
    const card = createElement('div', 'card', `
       <div class="bg-image hover-overlay ripple"data-mdb-ripple-color="light">
        <img src=" ${item.minImg}"
                   class="img-fluid w-100 " />
                   <div class="d-flex align-item-center mb-1" >
                   <p class="fw-bold ms-2"> ${item.title}</p>
                 </div>
                 <ul>
                 <li ><strong> Language: </strong> ${item.lang} </li>
                 <li><strong> Category: </strong>${item.category}</li>
                 <li><strong> Year: </strong>${item.year}</li>
                 <li><strong> Rating: </strong>${item.rating}</li>
                 <li><strong> Time: </strong>${item.time}</li>
                </ul>
                 <div class="d-flex justife-content-between flex-colum flex-xl-row">
                   <a class="btn btn-primary m-2 p-2 " href="${item.link}" target="_blank">Watch trailer</a>
                   <a class="btn btn-info m-2 p-2 " href="https://www.netflix.com" target="_blank">Bookmark</a>
                 </div>
                 </div>
    `);

    $(".wrapper").append(card);
});
}


// form-control

function catigory (){
    let sortCoty = [];
    allMovies.forEach((item)=>{
        if (!sortCoty.includes(item.category)) {
            sortCoty.push(item.category)
        }
    });

    if(sortCoty){
        sortCoty.forEach(item =>{
            const option = createElement('option', '',item);
            option.textContent = item;
            $('.form-select').append(option)
        })
    }
}
catigory();

$('.form-select').addEventListener("change" , function(evt){
    let dd = $('.form-select').value;
    let filteredArr = allMovies.filter((item)=>{
        if (dd == item.category) {
            return item;
        }
    });
    renderUi(filteredArr)
});




let btnRead  = document.querySelector(".btn-read");
let bookmarkCard = document.querySelector(".card")
console.log(bookmarkCard);

var bookmarks = [];

// function categors()  {
// 	movies.forEach(function (item) {
// 		if (!sortopshin.includes(item.categories)) {
// 			sortopshin.push(item.categories);
// 		}
// 	})

// 	sortopshin.forEach((item) => {
// 		const option = document.createElement("option");
// 		option.textContent = item;
// 		category.append(option);
// 	})
// };
// categors();

function searchglobal(arr) {
    searchs.addEventListener("keyup", function (e) {
        let titles = e.target.value;
        let filterarr = arr.filter((item) => {
            return item.title.includes(titles);
        });
        if (filterarr.length){
            render(filterarr)
        } else {
            $(".wrapper").innerHTML = ` <div class="w-100 h-5 p-5 search_error">
            <div class="d-flex">
              <img src="./img/error.png" alt="" width="35" height="35">
              <h2 class="text-white">Xatolik!</h2>
            </div>
            <p class="text-white">
              Kechirasiz sizning so'rovingizga binoan hech qanday ma'lumot topilmadi
      </p>
        </div>`
        }
    })

};



function dynamicCategory(data) {
    const categores = [];
    if (data) {
        data.forEach((item) => {
            item.categories.forEach(el => {
                if (!categores.includes(el)) {
                    categores.push(el);
                }
            })
        })
    }
    


    if (categores.length) {

        categores.forEach((item) => {
            const option = createElement("option", "item", item);
            $("#categorys").append(option);

        })
    }
}

dynamicCategory(movies);





const findFilms = (filmtitle,rating,category) =>{
    return movies.filter((item) => {
        return item.title.includes(filmtitle) && item.imdbRating >= rating && item.categories.includes(category)
    })
}


function search() {
    let byTitle = $("#name").value;
    let byRatng = $("#reting").value;
    let byCategory = $("#categorys").value;


    console.log(byTitle, byRatng,byCategory);


    const result = findFilms(byTitle, byRatng,byCategory);

    if(result && result.length) {
        render(result);
    } else {
        $(".wrapper").innerHTML = ` <div class="w-100 h-5 p-5 search_error">
        <div class="d-flex">
          <img src="./img/error.png" alt="" width="35" height="35">
          <h2 class="text-white">Xatolik!</h2>
        </div>
        <p class="text-white">
          Kechirasiz sizning so'rovingizga binoan hech qanday ma'lumot topilmadi
  </p>
    </div>`

    }
}

$("#serchform").addEventListener("submit", () => {
    search();
});



let addwrap = document.querySelector(".addwrap")
const elBtnWrapper = document.querySelector(".card");

//  let bookMarkArray = [];
wrapper.addEventListener("click", (evt) => {

    if(evt.target.matches(".addbtn")) {

        let id = evt.target.id;
        let bookCard = movies.find(item => item.imdbId === id);
//   bookMarkArray.push(bookCard);
    }

}) 

const bookmarkWrapper = document.querySelector('.bookmark-wrapper'); 

	
function renderMovies(elm) {
console.log(elm);

    
bookmarkWrapper.innerHTML = `
<div class="d-flex align-items-center">
<img src="${elm}" alt="" width="50" height="50">
<h6>${elm.title}</h6>

</div>
<button  class="btn btn-danger wrap_btn mt-4">delete</button>

`

    } 



    wrapper.addEventListener("click", (evt) => {
        if (evt.target.matches(".bookmarkBtn")) {
            let foundMovie = movies.find(
              (movie) => movie.imdbId === evt.target.dataset.id
            );
            console.log(foundMovie);
        
            bookmarks.push(foundMovie);
        
            // bookmarkWrapper.innerHTML = null;
        
            bookmarks.forEach((element) => {
                renderMovies(element);
            });
          }
    })
    





