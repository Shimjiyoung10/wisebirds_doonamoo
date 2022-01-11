$(document).ready(function(){
    const owl = $('.owl-carousel');
    owl.owlCarousel({
        items:7,
        loop:true,
        margin:10,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:true
    });

    owl.on('translated.owl.carousel', function(event) {
        const parent = event.currentTarget;
        const activeItems = $(parent).find('.owl-item.active');
        activeItems.each(function(idx, node){
            const image = $(node).find('img');
            const className = $(image).attr('class');
            if (idx === 2 || idx === 3 || idx === 4) {
                $(image).attr('src', `img/color/${className}_color.png`).css('opacity', '1')
            } else {
                $(image).attr('src', `img/black/${className}_black.png`)
                if (idx === 0 || idx === 6) {
                    $(image).css('opacity', '0.15')
                } else {
                    $(image).css('opacity', '0.4')
                }
            }
        })
    })


    // let timer = setInterval(function(){
    //     let actives = document.querySelectorAll('.owl-item.active');
    //     for (let i=0; i< actives.length; i++) {
    //         //active안에서 가운데만 색을 넣어줬다가 빼줌
    //         let className = actives[i].querySelector('img').getAttribute('class')
    //         if (i>1 && i<5) {
    //             $(`.${className}`)
    //             .attr("src",`img/color/${className}_color.png`)
    //             .css('opacity','1');
    //         } else if(i===1 || i===5) {
    //             $(`.${className}`)
    //             .attr("src",`img/black/${className}_black.png`)
    //             .css('opacity','0.4');
    //             //15% 흐리게
    //         } else if(i===0 || i===6){
    //             $(`.${className}`)
    //             .attr("src",`img/black/${className}_black.png`)
    //             .css('opacity','0.15');
    //         }
    //     }
    // },100);
    
});
