// axios egy third party package, ezt megírták, hogy lehessen vele requesteket csinálni
// ez itt olyan mint egy using .NET-ben
const axios = require('axios');

// itt ha átírjátok a ti címetekre a stringben, akkor azt fogja kidobni a formatted_addresben
// és annak a helynek az időjárás adatait fogja kiírni
let address = 'Budapest Lobbano utca 5';

// itt jon az REST API hívás
// ezt az URL-t a netről lehet megszerezni, ami a &key= után jön az az API KEY ezt igényelni kell
axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDcuLUve3hlxwXsat7XVaJIsECy1ZCePHg`)

    // ez itt a promise, mivel a JavaScript asyn,
    // ez az egész azért kell, hogy megvárja, amíg vissza jön a response a szerverről
    .then(res => {

        // a res az az elöző függvény visszatérési értéke, ebben az esetben egy JSON object, amiben a geolocation adatok vannak
        // a data csak a geolocation adatokat tartalmazza, azon belül van rengeteg minden, én most csak a formatted_address-t iratom ki
        // ha csak console.log(res) lenne, abban még egy csomó más adat is szerepelne
        // de ki tudjátok próbálni, ha
        //https://maps.googleapis.com/maps/api/geocode/json?address=budapest gomb utca 24&key=AIzaSyDcuLUve3hlxwXsat7XVaJIsECy1ZCePHg
        // ezt bemásoljátok a böngészőbe, akkor kidobja a JSON-t
        console.log(res.data.results[0].formatted_address);
        // kiszedem a latitude
        let lat = res.data.results[0].geometry.location.lat;
        // és a longitude koordinátákat a JSON-ből
        let lng = res.data.results[0].geometry.location.lng;

        // a következő REST API hívás, ahol az elözőleg lekért koordinátákkal lekérem az adott hely időjárási adatait
        // hasonlóan JSON, ha behelyettesítetek számokat a ${lat} és a ${lng} helyére
        // és bedobjátok a böngészőbe, akkor kiadja a JSON objectet
        let URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=8246a6ee0367d4a16136b4e1a82f5f9f`;
        // megint Promise
        axios.get(URL).then(res => {
            // kiszedem a maximum hőmérsékletet, meg a páratartalmat, azt kiiratom
            console.log(res.data.main.temp_max - 272.15 + ' C fok');
            console.log(res.data.main.humidity+ ' % páratartalom');
        })
    })
    // ez itt a promise catch ága, kb olyan mint egy try catch
    // csak itt a promise akármelyik ágában történő hibát elkapja, és azt kiiratom a konzolra
    .catch(e => console.log(e));

