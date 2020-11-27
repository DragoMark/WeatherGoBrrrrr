class Forecast{
    constructor(key){
        this.key = key;
        this.cityUri = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherUri = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }

    async updateCity(city){
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);

        return { cityDets, weather };
    }

    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityUri + query);
        const data  = await response.json();
        return data[0];
    }
    
    async getWeather(locationCode){
        const query = `${locationCode}?apikey=${this.key}`;
        const response = await fetch(this.weatherUri + query);
        const data  = await response.json();
        return data[0];
    }
}
