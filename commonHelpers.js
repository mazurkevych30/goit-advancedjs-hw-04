import{i as c,S as u,a as f}from"./assets/vendor-f67ecabd.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();c.settings({timeout:3e3,position:"topRight",transitionIn:"fadeInRight",transitionOut:"fadeOutLeft"});var m=new u(".photo-card a",{});const n={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery")};n.searchForm.addEventListener("submit",d);function d(i){if(i.preventDefault(),n.searchForm[0].value){const o=n.searchForm[0].value.trim().toLowerCase();n.searchForm.reset(),h(o).then(r=>{if(!r.hits.length){c.error({message:"Sorry, there are no images matching your search query. Please try again."});return}console.log(r),n.gallery.innerHTML=p(r.hits),m.refresh()}).catch(r=>console.log(r))}}function p(i){return i.map(({webformatURL:o,largeImageURL:r,tags:a,likes:e,views:t,comments:s,downloads:l})=>`
    <div class="photo-card">
        <a class="gallery-link" href="${r}">
            <div class="thumb">
                <img src="${o}" alt="${a}" width="360" loading="lazy" />
            </div>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b> ${e}
                    </p>
                    <p class="info-item">
                        <b>Views</b> ${t}
                    </p>
                    <p class="info-item">
                        <b>Comments</b> ${s}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b> ${l}
                    </p>
            </div>
        </a>
    </div>
    `).join("")}async function h(i){const o={params:{key:"40906325-3c4aeac244a0485d830cf7c70",q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40}};return(await f.get("https://pixabay.com/api/",o)).data}
//# sourceMappingURL=commonHelpers.js.map
