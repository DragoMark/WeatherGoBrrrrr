const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast('necfYso5wkwq8FaSAH3nQnpYV1xb12Vz');

const updateUI = (data) => {
    //destructure object
    const { cityDets , weather } = data;

    // update details
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    </div>`;

    //day/night imgs and icons
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src',iconSrc);

    let timeSrc = null;
    timeSrc = weather.IsDayTime?'img/day.svg':'img/night.svg';
    time.setAttribute('src', timeSrc);


    //unhide card 
    if(card.classList.contains('d-none'))
        card.classList.remove('d-none');
};


cityForm.addEventListener('submit',e => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
    
    // local storage
    localStorage.setItem('city', city);

});

if(localStorage.getItem('city'))
{
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}