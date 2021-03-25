const calculator = () => {
  if (document.getElementById("price-total")) {
    const cardSelectForm = document.getElementById("card_order");
    const servicePeriodTabs = document.querySelectorAll("input[name='card-type']");
    const totalPrice = document.getElementById("price-total");
    const promoInput = document.getElementById("promo");

    const getPrice = (data) => {
      let temp = data;
      let res = temp.match(/class="cost">\d+<span/g);
      let arr = res
        .filter((item) => !item.includes("day"))
        .map((item) => +item.replace(/\D/g, ""));
      return arr;
    };
    const switchPrice = (priceArray) => {
      servicePeriodTabs.forEach((item, index) => {
        item.dataset.price = priceArray[index];
        if (item.checked) {
          totalPrice.textContent = item.dataset.price;
          //добавлем проверку промокода при переключении вкладок для динамического изменения цены
          if(promoInput.value === "ТЕЛО2020") {
              totalPrice.textContent = Math.round(item.dataset.price*0.7);
          }
        }
      });
      document.querySelector(".time").addEventListener("change", (event) => {
        const target = event.target;
        if (target) {
          totalPrice.textContent = target.dataset.price;
          //добавлем проверку промокода при переключении вкладок для динамического изменения цены
          if(promoInput.value === "ТЕЛО2020") {
              totalPrice.textContent = Math.round(target.dataset.price*0.7);
          }
        }
      });
    };
    //вызываем этот фетч вне обработчика, чтобы отобразить актуальную цену за 1 месяц,
    // т.к. по дефолту выбран клуб "Мозаика"
    fetch("./mozaika.html")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network failed");
        }
        return response.text();
      })
      .then((data) => {
        return getPrice(data);
      })
      .then((priceArray) => {
        switchPrice(priceArray);
      })
      .catch((err) => {console.error(err)});

    cardSelectForm.addEventListener("change", (e) => {
      const target = e.target;

      if (target.matches("#card_leto_mozaika")) {
        fetch("./mozaika.html")
          .then((response) => {
            if (response.status !== 200) {
              throw new Error("Network failed");
            }
            return response.text();
          })
          .then((data) => {
            return getPrice(data);
          })
          .then((priceArray) => {
            switchPrice(priceArray);
          })
          .catch((err) => {console.error(err)});
      }
      if (target.matches("#card_leto_schelkovo")) {
        fetch("./schelkovo.html")
          .then((response) => {
            if (response.status !== 200) {
              throw new Error("Network failed");
            }
            return response.text();
          })
          .then((data) => {
            return getPrice(data);
          })
          .then((priceArray) => {
            switchPrice(priceArray);
          })
          .catch((err) => {console.error(err)});
      }
    });
//Промокод
    promoInput.addEventListener("input", (e) => {
        if (promoInput.value === "ТЕЛО2020") {
        promoInput.style.border = "2px solid green";
        totalPrice.textContent = Math.round(totalPrice.textContent * 0.7);
        } else {
        promoInput.style.border = "";
        servicePeriodTabs.forEach((item) => {
            if (item.checked) {
            totalPrice.textContent = item.dataset.price;
            }
        });
        }
    });
  }
};

export default calculator;
