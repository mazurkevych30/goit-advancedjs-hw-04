import{i as c,S as y,a as b}from"./assets/vendor-f67ecabd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();c.settings({timeout:2e3,position:"topRight",transitionIn:"fadeInRight",transitionOut:"fadeOutLeft",maxWidth:350});var f=new y(".photo-card a",{});const s={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")};let d;const h=40;let a=1,u;s.searchForm.addEventListener("submit",L);s.btnLoadMore.addEventListener("click",v);function L(r){r.preventDefault(),s.searchForm[0].value?(u=s.searchForm[0].value.trim().toLowerCase(),a=1,s.searchForm.reset(),console.log(a),g(u,a,h).then(t=>{if(!t.hits.length){c.error({message:"Sorry, there are no images matching your search query. Please try again."});return}console.log(t),c.success({message:`Hooray! We found ${t.totalHits} images.`}),s.gallery.innerHTML=m(t.hits),f.refresh(),d=s.gallery.firstElementChild.getBoundingClientRect(),scrollBy({top:d.height*2,behavior:"smooth"})}).catch(t=>console.log(t))):c.warning({message:"Fill in the search field!"})}function v(){a+=1,g(u,a,h).then(r=>{s.gallery.insertAdjacentHTML("beforeend",m(r.hits)),f.refresh(),scrollBy({top:d.height*2,behavior:"smooth"}),a>=r.totalHits/h&&(s.btnLoadMore.classList.add("hidden"),c.error({message:"We're sorry, but you've reached the end of search results."}))}).catch(r=>console.log(r))}function m(r){return r.map(({webformatURL:t,largeImageURL:n,tags:i,likes:e,views:o,comments:l,downloads:p})=>`
    <div class="photo-card">
        <a class="gallery-link" href="${n}">
            <div class="thumb">
                <img src="${t}" alt="${i}" loading="lazy" width="360" />
            </div>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b> ${e}
                    </p>
                    <p class="info-item">
                        <b>Views</b> ${o}
                    </p>
                    <p class="info-item">
                        <b>Comments</b> ${l}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b> ${p}
                    </p>
            </div>
        </a>
    </div>
    `).join("")}async function g(r,t=1,n){const i={params:{key:"40906325-3c4aeac244a0485d830cf7c70",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:t}},{data:e}=await b.get("https://pixabay.com/api/",i);return t<=e.totalHits/n&&s.btnLoadMore.classList.remove("hidden"),e}
//# sourceMappingURL=commonHelpers.js.map
