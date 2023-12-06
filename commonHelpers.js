import{i as l,S as y,a as b}from"./assets/vendor-f67ecabd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();l.settings({timeout:2e3,position:"topRight",transitionIn:"fadeInRight",transitionOut:"fadeOutLeft",maxWidth:350});var f=new y(".photo-card a",{});const o={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")};let u;const h=40;let c=1,d;o.searchForm.addEventListener("submit",L);o.btnLoadMore.addEventListener("click",v);async function L(a){if(a.preventDefault(),d=o.searchForm[0].value.trim().toLowerCase(),o.btnLoadMore.classList.add("hidden"),d){c=1,o.searchForm.reset();try{const r=await g(d,c,h);if(!r.hits.length){l.error({message:"Sorry, there are no images matching your search query. Please try again."}),o.gallery.innerHTML="<div></div>";return}l.success({message:`Hooray! We found ${r.totalHits} images.`}),o.gallery.innerHTML=m(r.hits),f.refresh()}catch{}}else l.warning({message:"Fill in the search field!"}),o.gallery.innerHTML="<div></div>"}async function v(){c+=1;try{const a=await g(d,c,h);o.gallery.insertAdjacentHTML("beforeend",m(a.hits)),f.refresh(),u=o.gallery.firstElementChild.getBoundingClientRect(),scrollBy({top:u.height*3,behavior:"smooth"}),c>=a.totalHits/h&&o.btnLoadMore.classList.add("hidden")}catch{}}function m(a){return a.map(({webformatURL:r,largeImageURL:s,tags:i,likes:e,views:t,comments:n,downloads:p})=>`
    <div class="photo-card">
        <a class="gallery-link" href="${s}">
            <div class="thumb">
                <img src="${r}" alt="${i}" loading="lazy" width="360" />
            </div>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b> ${e}
                    </p>
                    <p class="info-item">
                        <b>Views</b> ${t}
                    </p>
                    <p class="info-item">
                        <b>Comments</b> ${n}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b> ${p}
                    </p>
            </div>
        </a>
    </div>
    `).join("")}async function g(a,r=1,s){const i={params:{key:"40906325-3c4aeac244a0485d830cf7c70",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:r}},{data:e}=await b.get("https://pixabay.com/api/",i);return r<=e.totalHits/s?o.btnLoadMore.classList.remove("hidden"):e.totalHits&&l.error({message:"We're sorry, but you've reached the end of search results."}),e}
//# sourceMappingURL=commonHelpers.js.map
