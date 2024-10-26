let find = document.querySelector('#search')
let weatherData;




 find.addEventListener('input',async function(){
    if (find.value.length>3){
    
        startApp(find.value)
    }

}) 

async function startApp(city){

    weatherData= await search(city)
    console.log(weatherData);
    today();
    tomorrow();
    afterTomorrow();
    console.log(weatherData);
}

async function search(city) {
    let t = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=37ff852557f749798c7134858242510&q=${city}&days=3`);

    let data= await t.json()
    return data
}

function today(){
    document.querySelector('.today .location').innerHTML = weatherData.location.name
    document.querySelector('.today .degree .num').innerHTML = weatherData.current.temp_c
    document.querySelector('.today #todayImg').setAttribute('src', 'https:' + weatherData.current.condition.icon)
    document.querySelector('.today .custom').innerHTML = weatherData.current.condition.text

}

function tomorrow(){
    
    document.querySelector('.tomorrow .degree').innerHTML = weatherData.forecast.forecastday[1].day.maxtemp_c
    document.querySelector('.tomorrow small').innerHTML = weatherData.forecast.forecastday[1].day.mintemp_c
    document.querySelector('.tomorrow #tomorrowImg').setAttribute('src', 'https:' + weatherData.forecast.forecastday[1].day.condition.icon)
    document.querySelector('.tomorrow .custom').innerHTML = weatherData.forecast.forecastday[1].day.condition.text


}

function afterTomorrow(){
    console.log("leokm")
    document.querySelector('.afterTomorrow .degree  ').innerHTML = weatherData.forecast.forecastday[2].day.maxtemp_c
    document.querySelector('.afterTomorrow small ').innerHTML = weatherData.forecast.forecastday[2].day.mintemp_c
    document.querySelector('.afterTomorrow #aftertomorrowImg').setAttribute('src', 'https:' + weatherData.forecast.forecastday[2].day.condition.icon)
    document.querySelector('.afterTomorrow .custom').innerHTML = weatherData.forecast.forecastday[2].day.condition.text


}


navigator.geolocation.getCurrentPosition( position=>{

    livelocation = position.coords.latitude+','+position.coords.longitude

        
    startApp(livelocation)
    
} )