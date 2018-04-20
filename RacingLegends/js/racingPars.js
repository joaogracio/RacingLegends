//discorPars.js****************************************************************************
document.addEventListener('DOMContentLoaded', function main(e) {

    const root = document.querySelector('#root');
    const url = 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/categories';
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            categories(data);
        })
        .catch(function (error) {
            console.log(error);
        }); 
    
});


