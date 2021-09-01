let API = "MnHOJdSW2pq8ofHbiTKYOaL3pCvbLiW8"; // API her değiştiğinde karmaşıklık olmaması için bir yerde bu şekilde tutmak daha temiz.
document.addEventListener("DOMContentLoaded", init); // bu kod görüntülerin yüklenmesini beklemez. Dolayısıyla bu kod olmadan gifleri göremeyiz.
function init() {
  document.getElementById("btnSrc").addEventListener("click", ev => { // id'si btnSrc olan elemente her click eventi olduğunda demek bunun anlamı
    ev.preventDefault();     // her sorguda sayfa yenilenmemesi için preventDefault kullandım
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${API}&limit=5&q=`; // url
    let str = document.getElementById("src").value.trim(); // aradığımız kelimedeki boşlukları sildik.
    url = url.concat(str); // concat ile url'nin sonuna str'yi ekledim.
    fetch(url) // fetch'i api'yi okuyabilmemiz için kullanmamız gerek.
      .then(response => response.json()) // response direkt bize json vermediği için json() kullandım.
      .then(content => {
        for(let i=0; i<5; i++){ // her aramada 5 gif çıkması için for döngüsünde yazdım. Yukarıda da limiti 5 ile sınırladım zaten
        let imgDiv = document.createElement("div"); // div oluşturdum
        imgDiv.setAttribute("class", "imgDiv");
        let img = document.createElement("img"); // img oluşturuyor
        img.src = content.data[i].images.downsized.url;  // data url'sini img src kısmına yazdırıyoruz.
        imgDiv.appendChild(img); // figure'ın alt elemanı olarak img'ı dahil ediyoruz.
        let out = document.querySelector(".out"); // göstereceğimiz giflerin olduğu divi seçtik.
        out.insertAdjacentElement("afterbegin", imgDiv); // figure ögesini belirli bir konuma eklemeye yarar insertAdjacentElement() fonksiyonu.
        }  
        document.querySelector("#src").value = ""; // daha sonra inputumuzun içini temizliyoruz.
        if(content.meta.msg=="OK"){ // json'dan aldığımız bilgilere göre sonuç OK ise başarı mesajı 
            Swal.fire(str + ' kelimesine ilişkin gifler başarıyla gösterildi'); // sweetalert library'sini kullanarak kullanıcıyla etkileşimi artırmak amaçlı mesaj yazdırdım.
        }       
      })
      .catch(err => {
        //herhangi bir hatayı yakalama amaçlı alert.
        Swal.fire(err);
      });
  });
}