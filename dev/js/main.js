$.getJSON('../products.json', function (data) {
    let html = "";

    data.forEach(item => {
        let imgCod = item.primaryImageUrl.slice(item.primaryImageUrl.length - 4);
        item.primaryImageUrl = item.primaryImageUrl.slice(0,item.primaryImageUrl.length - 4) + '_220x220_1' + imgCod;
        let link = '';
        let assocProductsArr = item.assocProducts.split( '\n');

        assocProductsArr.forEach(function (el) {
            let a = `<a href="#">${el}</a>`;
            link += a + ' ';
        });

        html += cardTemplate(item,link);
        cardContent.innerHTML = html;
    });

    const HandleUnit = document.querySelectorAll('.cards-item');

    HandleUnit.forEach(function (e) {
        e.addEventListener('click', function (event) {
            let target = event.target;

            if(target.classList.contains("unit-item") && !target.classList.contains("unit-active")){
                let price = Array.from(this.querySelectorAll('.prise__prise'));
                let unitActive = this.querySelectorAll('.unit-active');

              price.forEach(function (el) {
                   if(el.classList.contains("prise__prise--active")){
                       el.classList.remove("prise__prise--active");
                   }
                   else{
                       el.classList.add("prise__prise--active");
                   }
               });

                unitActive[0].classList.remove('unit-active');
                target.classList.add('unit-active');
            }
            let priceCnt = this.querySelector('.product__count');
            let number = + priceCnt.value;
            let unitCnt = this.querySelector('.unit--cnt');
            let unitNumber = +unitCnt.innerText;
            let unitNumberNew;


            if(target.classList.contains("up")){
                unitNumber = unitNumber / number;
                number += 1;
                priceCnt.value = number;
                unitNumberNew =  unitNumber * number;
                unitCnt.innerText = unitNumberNew.toFixed(3)
            }else if(target.classList.contains("down") && priceCnt.value>1){
                unitNumber = unitNumber / number;
                number -= 1;
                priceCnt.value = number;
                unitNumberNew = unitNumber * number;
                unitCnt.innerText = unitNumberNew.toFixed(3)
            }

        });
    });

});

let cardContent  = document.querySelector('.cards');

const cardTemplate = (item , link) =>
    `
     <div class="cards-item">
                <div class="cards-item__img">
                <a href="#"><img class="cards-item__img--img" src="${item.primaryImageUrl}" alt="img"></a>   
                </div>
                <div class="cards__content">
                    <div class="cards-status">
                        <div class="cards-status__code">Код: ${item.code}</div>
                        <div class="cards-status__status">
                        <a class="cards-status__status--link" href="#">Наличие</a></div>
                    </div>
                    <div class="cards-content__content">
                        <div class="cards-content__description">
                            <div class="cards-description__title"><a href="#">${item.title}</a></div>
                            <div class="cards-description__description">${item.description}</div>
                            <div class="cards-description__additionally"><span class="additionally-bold">Могут понадобиться: </span>${link}</div>
                        </div>
                            <div class="cards-content__prise">
                             <div class="prise__content">
                                <div class="prise-block">
                                <div class="prise__club-card">По карте клуба</div>
                                <div class="prise__prise prise__prise--active">
                                    <div class="prise__prise__club-card">${item.priceGoldAlt}</div>
                                    <div class="prise__prise__default">${item.priceRetailAlt}</div>
                                </div>
                                 <div class="prise__prise">
                                    <div class="prise__prise__club-card">${item.priceGold}</div>
                                    <div class="prise__prise__default">${item.priceRetail}</div>
                                </div>
                            </div>
                                <div class="prise__unit">
                                    <div class="unit__m unit-item unit-active">
                                        За м.кв.
                                    </div>
                                    <div class="unit__packaging unit-item">
                                        За упаковку
                                    </div>
                                </div>
                                <div class="prise__info">Продаетя упаковками:<br><span class="prise__info--cnt">1</span> упак. = <span class="unit--cnt">${item.unitRatioAlt}</span> ${item.unitAlt}  </div>    
                                <div class="prise__buy">
                                    <div class="prise__buy__quantity">
                                        <input class="product__count stepper-input" type="text" readonly value="1"">
                                        <div class="product__count--arrow">
                                            <span class="stepper-arrow up" ></span>
                                            <span class="stepper-arrow down"></span>
                                        </div>
                                        
                                    </div>
                                    <div class="prise__buy__btn">
                                        <button class="btn--card" data-product-id="${item.productId}">
                                            <span class="img-btn-bye"><svg>
        <path d="m14.571 16.381c.571 0 .952.381.952.952 0 .571-.381.952-.952.952-.571 0-.952-.381-.952-.952 0-.571.476-.952.952-.952m0-.952c-1.048 0-1.905.857-1.905 1.905 0 1.048.857 1.905 1.905 1.905 1.048 0 1.905-.857 1.905-1.905 0-1.048-.857-1.905-1.905-1.905"></path>
        <path d="m7.905 16.381c.571 0 .952.381.952.952 0 .571-.381.952-.952.952-.571 0-.952-.381-.952-.952 0-.571.476-.952.952-.952m0-.952c-1.048 0-1.905.857-1.905 1.905 0 1.048.857 1.905 1.905 1.905 1.048 0 1.905-.857 1.905-1.905 0-1.048-.857-1.905-1.905-1.905"></path>
        <path d="m16.476 14.476h-10.857l-.095-.381c0-.095-1.429-9.714-1.905-11.524-.381-1.524-3.333-1.429-3.333-1.429v-.952c.095 0 3.714-.286 4.286 2.19.381 1.714 1.619 9.333 1.81 11.143h10.1v.952"></path>
        <path d="m4.095 3.048h15.238v.952h-15.238z"></path>
        <path d="m5.05 10.667h12.381v.952h-12.381z"></path>
        <path d="m16.476 11.619h.952l1.905-8.571h-.952l-1.905 8.571"></path>
    </svg></span>в корзину</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                </div>
            </div>
    `;


