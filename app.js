const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const euro = document.querySelector('#euro');

const convertator = (elem, target, target2, isTrue) => {
  elem.oninput = () => {
    const request = new XMLHttpRequest(); 
    request.open('GET', 'data.json');
    request.setRequestHeader('Content-type', 'application/json');
    request.send();
    request.onload = () => {
      const response = JSON.parse(request.response);
      if (isTrue === 'som') {
        target.value = (elem.value / response.usd).toFixed(2);
        target2.value = (elem.value / response.euro).toFixed(2);
      } else if (isTrue === 'usd') {
        target.value = (elem.value * response.usd).toFixed(2); 
        target2.value = (elem.value * (response.euro / response.usd)).toFixed(2);
      } else if (isTrue === 'euro') {
        target.value = (elem.value * response.euro).toFixed(2);
        target2.value = (elem.value * response.usd / response.euro).toFixed(2);
      } 
      elem.value === '' && (target.value = '');
      elem.value === '' && (target2.value = '');
    };
  };
};

convertator(som, usd, euro, 'som');
convertator(usd, som, euro, 'usd');
convertator(euro, som, usd, 'euro');