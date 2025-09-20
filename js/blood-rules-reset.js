function resetLogic() {
    
    const resultContainer = document.querySelector('#result-container');
    resultContainer.innerHTML = '';

    
    const allRadios = document.querySelectorAll('input[type="radio"]');
    allRadios.forEach(radio => {
        radio.checked = false;
    });
}
