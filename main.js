const ApiKey = 'b8914a77fc7a4227b8c224125231905';


//Получаем название города
const header = document.querySelector('.header')
const form = document.querySelector('#form');
const input = document.querySelector('#input');

form.onsubmit = function(e)
{   
    e.preventDefault();

    let city = input.value;
    //Адрес запроса
    const url = `http://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${city}&lang=ru`;

    console.log(city);

    //Выполненние запроса
    fetch(url).then((response) =>
    {
        return response.json()
    }).then((data) =>
    {
        const prevInfo = document.querySelector('.info');
        if(prevInfo) prevInfo.remove();
        //Проверка на наличие ошибки
        if(data.error)
        {
            console.log(data.error.messege);
            const html = '<div class="info"><h2 class="info-error">Город не найден</h2></div>';
            header.insertAdjacentHTML('afterend', html);
        }
        else
        {
            console.log(data.location.name);
            console.log(data.current.condition.text);
            console.log(data.current.temp_c);
    
            //Очистка прошлого результата

    
            const html = `<div class="info">
                            <h2 class="info-city">${city}</h2>
                            <div class="info-weather">
                                <div class="info-temperature">${data.current.temp_c}°C</div>
                                <img class="info-img" src="./img/cloud/35.png" alt="Погода">
                                </div>
                                <div class="info-description">${data.current.condition.text}</div>
                        </div>`;
    
            header.insertAdjacentHTML('afterend', html);
        }
        //Отображение полученных данных

    })
}