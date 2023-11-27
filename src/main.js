
import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

iziToast.settings({
  timeout: 3000,
  position: 'topRight',
  transitionIn: "fadeInRight",
  transitionOut: "fadeOutLeft",
});

var lightbox = new SimpleLightbox(".photo-card a", {
});

const elements = {
    searchForm: document.querySelector(".search-form"),
    gallery: document.querySelector(".gallery"),
}

elements.searchForm.addEventListener("submit", handlerSearchPhoto);

function handlerSearchPhoto(evt) {
    evt.preventDefault();
   
    if (elements.searchForm[0].value) {
        const tag = elements.searchForm[0].value.trim().toLowerCase();
        elements.searchForm.reset();
        servicePhoto(tag)
            .then((data) => { 
                if (!data.hits.length) {
                    iziToast.error({
                        message: "Sorry, there are no images matching your search query. Please try again.",
                    });
                    return;
                }
                console.log(data);
                elements.gallery.innerHTML = createMarkupGallary(data.hits);
                lightbox.refresh();
             })
            .catch((err) => console.log(err));
    }
}


function createMarkupGallary(arr) {
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
    <div class="photo-card">
        <a class="gallery-link" href="${largeImageURL}">
            <div class="thumb">
                <img src="${webformatURL}" alt="${tags}" width="360" loading="lazy" />
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

async function servicePhoto(q) {

    const options = {
        params: {
            key:"40906325-3c4aeac244a0485d830cf7c70",
            q,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: 40,
        }
    }
    
    const response = await axios.get("https://pixabay.com/api/", options);

    return response.data;
}