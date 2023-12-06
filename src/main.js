
import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

iziToast.settings({
  timeout: 2000,
  position: 'topRight',
  transitionIn: "fadeInRight",
    transitionOut: "fadeOutLeft",
    maxWidth: 350,
});

var lightbox = new SimpleLightbox(".photo-card a", {
});

const elements = {
    searchForm: document.querySelector(".search-form"),
    gallery: document.querySelector(".gallery"),
    btnLoadMore: document.querySelector(".load-more"),
}

let cardHeight;
const perPage = 40;
let page = 1;
let tag;

elements.searchForm.addEventListener("submit", handlerSearchPhoto);
elements.btnLoadMore.addEventListener("click", handlerLoadMore);

async function handlerSearchPhoto(evt) {
    evt.preventDefault();
    tag = elements.searchForm[0].value.trim().toLowerCase();
    elements.btnLoadMore.classList.add("hidden");
    if (tag) {
        page = 1;

        elements.searchForm.reset();

        try {
            const data = await servicePhoto(tag, page, perPage)
            if (!data.hits.length) {
                    iziToast.error({
                        message: "Sorry, there are no images matching your search query. Please try again.",
                    });
                    elements.gallery.innerHTML = "<div></div>";
                    return;
                }

                iziToast.success({
                    message: `Hooray! We found ${data.totalHits} images.`,
                    });
                elements.gallery.innerHTML = createMarkupGallary(data.hits);
                lightbox.refresh();
        } catch {
            (err) => console.log(err)
        }
    }
    else {
         iziToast.warning({
                        message: "Fill in the search field!",
         });
        elements.gallery.innerHTML = "<div></div>";
    }
}

async function handlerLoadMore() {
    page += 1;

    try {
        const data = await servicePhoto(tag, page, perPage);
        elements.gallery.insertAdjacentHTML("beforeend", createMarkupGallary(data.hits));
            lightbox.refresh();
                cardHeight = elements.gallery.firstElementChild.getBoundingClientRect();
                scrollBy({
                    top: cardHeight.height * 3,
                    behavior: "smooth",
                });
            
            if (page >= data.totalHits / perPage) {
                elements.btnLoadMore.classList.add("hidden");
                // iziToast.error({
                //         message: "We're sorry, but you've reached the end of search results.",
                //     });
        }
    } catch {
        (err)=>console.log(err)
    }
}


function createMarkupGallary(arr) {
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
    <div class="photo-card">
        <a class="gallery-link" href="${largeImageURL}">
            <div class="thumb">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" width="360" />
            </div>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b> ${likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b> ${views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b> ${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b> ${downloads}
                    </p>
            </div>
        </a>
    </div>
    `).join("");
}

async function servicePhoto(q, page = 1, per_page) {
    const options = {
        params: {
            key:"40906325-3c4aeac244a0485d830cf7c70",
            q,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: 40,
            page,
        }
    }
    
    const { data } = await axios.get("https://pixabay.com/api/", options);
    
    if (page <= data.totalHits / per_page) {
        elements.btnLoadMore.classList.remove("hidden");
    } else if(data.totalHits) {
        iziToast.error({
                        message: "We're sorry, but you've reached the end of search results.",
                    });
    }

    return data;
}

