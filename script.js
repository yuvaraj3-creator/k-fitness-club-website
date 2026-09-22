const menu=document.querySelector('.menu'),mobile=document.querySelector('.mobile');
menu?.addEventListener('click',()=>mobile.classList.toggle('open'));
mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')));

const reviewData=[
 {name:"Google reviewer",text:"Good equipment good place to workout good trainer. My trainer name Vinod anna.",stars:5},
 {name:"Google reviewer",text:"Best environment for workouts. Friendly trainers 😌",stars:5},
 {name:"Google reviewer",text:"The atmosphere is friendly, not intimidating, and the crowd is respectful.",stars:5}
];

const reviews=document.createElement('section');
reviews.className='section reviews-section';
reviews.id='reviews';
reviews.innerHTML=`
 <div class="top"><div><small>04 / REVIEWS</small></div><h2>REAL<br><em>FEEDBACK.</em></h2></div>
 <div class="review-head"><div><strong>4.9</strong><span>★ ★ ★ ★ ★</span><small>PUBLIC GOOGLE LISTING RATING</small></div><a class="outline" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=K%20Fitness%20Club%20Unisex%2C%2037%20Manali%20High%20Rd%2C%20Chennai">VIEW GOOGLE REVIEWS ↗</a></div>
 <div class="review-grid" id="reviewGrid"></div>
 <div class="review-add"><div><small>YOUR EXPERIENCE</small><h3>LEAVE A REVIEW</h3><p>Add a review for this website demo. Reviews you submit here are saved in this browser only until a backend/database is connected.</p></div>
 <form id="reviewForm"><input id="reviewName" required maxlength="40" placeholder="Your name"><select id="reviewStars"><option value="5">★★★★★</option><option value="4">★★★★☆</option><option value="3">★★★☆☆</option><option value="2">★★☆☆☆</option><option value="1">★☆☆☆☆</option></select><textarea id="reviewText" required maxlength="280" placeholder="Write your experience..."></textarea><button class="primary" type="submit">ADD REVIEW</button></form></div>`;
document.querySelector('#gallery')?.after(reviews);

const renderReviews=()=>{
 const saved=JSON.parse(localStorage.getItem('kfitness_reviews')||'[]');
 document.querySelector('#reviewGrid').innerHTML=[...saved,...reviewData].map(r=>`<article class="review-card"><div class="review-stars">${'★'.repeat(r.stars)}<span>${'★'.repeat(5-r.stars)}</span></div><p>“${r.text}”</p><b>${r.name}</b><small>GOOGLE / WEBSITE REVIEW</small></article>`).join('');
};
renderReviews();
document.querySelector('#reviewForm')?.addEventListener('submit',e=>{
 e.preventDefault();
 const saved=JSON.parse(localStorage.getItem('kfitness_reviews')||'[]');
 saved.unshift({name:document.querySelector('#reviewName').value.trim(),text:document.querySelector('#reviewText').value.trim(),stars:Number(document.querySelector('#reviewStars').value)});
 localStorage.setItem('kfitness_reviews',JSON.stringify(saved.slice(0,12)));
 e.target.reset();renderReviews();
});

const photoInput=document.querySelector('#photoInput');
const showPhoto=(src)=>{let box=document.querySelector('.lightbox');if(!box){box=document.createElement('div');box.className='lightbox';box.innerHTML='<button aria-label="Close">×</button><img alt="Gallery preview">';document.body.appendChild(box);box.addEventListener('click',e=>{if(e.target===box||e.target.tagName==='BUTTON')box.classList.remove('open')})}box.querySelector('img').src=src;box.classList.add('open')};
document.querySelectorAll('.gallery-grid .photo img').forEach(img=>img.addEventListener('click',()=>showPhoto(img.src)));
const uploadedGallery=document.querySelector('#uploadedGallery');
const renderUploaded=()=>{if(!uploadedGallery)return;const photos=JSON.parse(localStorage.getItem('kfitness_photos')||'[]');uploadedGallery.innerHTML=photos.map(src=>'<img src="'+src+'" alt="K Fitness uploaded photo">').join('');uploadedGallery.querySelectorAll('img').forEach(img=>img.addEventListener('click',()=>showPhoto(img.src)))};
renderUploaded();
if(photoInput){
 photoInput.addEventListener('change',e=>{
   [...e.target.files].slice(0,8).forEach(file=>{
     const reader=new FileReader();
     reader.onload=()=>{const photos=JSON.parse(localStorage.getItem('kfitness_photos')||'[]');photos.push(reader.result);localStorage.setItem('kfitness_photos',JSON.stringify(photos.slice(-12)));renderUploaded()};
     reader.readAsDataURL(file);
   });
 });
}
