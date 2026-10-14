(function(){
  const photos = [
    ['FXM50005.JPG','Ветви на фоне облаков'],
    ['FXM50039.JPG','Розовые фламинго в саду'],
    ['FXM50048 (2).JPG','Ночная прогулка по заснеженной аллее'],
    ['FXM50050.JPG','Камни и отражения в воде'],
    ['FXM50051 (2).JPG','Человек среди заснеженных деревьев'],
    ['FXM50052.JPG','Силуэт за фонарным столбом'],
    ['FXM50053.JPG','Камень в прозрачной воде'],
    ['FXM50055.JPG','Здание на фоне розового неба'],
    ['FXM50060.JPG','Театр в вечернем свете'],
    ['FXM50071.JPG','Архитектура на закате'],
    ['FXM50078.JPG','Заснеженные ели ночью'],
    ['FXM50079.JPG','Люди у городской остановки'],
    ['FXM50087.JPG','Свет и тень на снегу'],
    ['FXM50094.JPG','Поезд на эстакаде'],
    ['FXM50099.JPG','Граффити под эстакадой'],
    ['FXM50110.JPG','Чёрно-белый городской пейзаж'],
    ['FXM50111.JPG','Шаг по тротуару'],
    ['FXM50114.JPG','Рабочие у дорожного знака'],
    ['FXM50116.JPG','Фонари в зимнем парке'],
    ['FXM50129.JPG','Ночной силуэт здания'],
    ['inst-@stepnaya_lavka_3243_11.jpg','Граффити и тени на стене'],
    ['inst-@stepnaya_lavka_3243_12.jpg','Река под мостом'],
    ['inst-@stepnaya_lavka_3243_18.jpg','Лестница и надписи на стене'],
    ['inst-@stepnaya_lavka_3243_21.jpg','Высотные здания'],
    ['inst-@stepnaya_lavka_3243_37.jpg','Геометрия моста и свет'],
    ['R1-04257-0008.JPG','Свет в лестничном пролёте'],
    ['R1-04257-0019.JPG','Столик на ночной улице'],
    ['R1-04257-0031.JPG','Букет цветов у стены'],
    ['inst-@stepnaya_lavka_3984_5.jpg','Белые облака на синем небе'],
    ['inst-@stepnaya_lavka_3984_9.jpg','Арбузные корки на каменном берегу'],
    ['inst-@stepnaya_lavka_3984_10.jpg','Волны у каменного берега'],
    ['inst-@stepnaya_lavka_3984_12.jpg','Рыбалка на закате'],
    ['inst-@stepnaya_lavka_3984_16.jpg','Двое у ограждения ночью'],
    ['inst-@stepnaya_lavka_3984_34.jpg','Урна с наклейкой в свете вспышки'],
    ['inst-@stepnaya_lavka_3984_36.jpg','Горы под вечерним небом']
  ];
  const gallery = document.getElementById('hobbyGallery');
  document.querySelector('.projects').after(gallery);
  const grid = document.getElementById('photoGrid');
  const viewer = document.getElementById('photoViewer');
  const large = document.getElementById('photoLarge');
  const caption = document.getElementById('photoCaption');
  let current = 0;
  let previousOverflow = '';
  function source(photo){ return 'assets/hobby/' + encodeURIComponent(photo[0]); }
  function show(index){
    current = (index + photos.length) % photos.length;
    large.src = source(photos[current]);
    large.alt = photos[current][1];
    caption.textContent = String(current + 1).padStart(2,'0') + ' / ' + photos.length;
  }
  photos.forEach((photo,index)=>{
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'photo-tile';
    const img = document.createElement('img');
    img.src = source(photo);
    img.alt = photo[1];
    img.loading = 'lazy';
    img.decoding = 'async';
    button.append(img);
    button.addEventListener('click',()=>{
      show(index);
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      viewer.showModal();
    });
    grid.append(button);
  });
  document.getElementById('photoPrev').addEventListener('click',()=>show(current-1));
  document.getElementById('photoNext').addEventListener('click',()=>show(current+1));
  document.getElementById('photoClose').addEventListener('click',()=>viewer.close());
  viewer.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;});
  viewer.addEventListener('click',event=>{
    const rect = viewer.getBoundingClientRect();
    if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
  });
  viewer.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();show(current-1);}
    if(event.key==='ArrowRight'){event.preventDefault();show(current+1);}
  });
})();
