document.getElementById('crypto-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const crypto = document.getElementById('crypto-type').value;
    const currency = document.getElementById('currency-select').value;
    const quantity = parseFloat(document.getElementById('crypto-quantity').value);

    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${crypto}${currency}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la cotización');
            }
            return response.json();
        })
        .then(data => {
            const rate = parseFloat(data.price);
            const total = rate * quantity;
            const quoteP = document.getElementById('quote');
            const valueP = document.getElementById('value');

            // Comparar con la cotización anterior
            const previousRate = parseFloat(quoteP.dataset.previousRate || rate);
            const previousTotal = parseFloat(valueP.dataset.previousTotal || total);

            quoteP.style.color = rate > previousRate ? 'green' : rate < previousRate ? 'red' : 'black';
            valueP.style.color = total > previousTotal ? 'green' : total < previousTotal ? 'red' : 'black';

            // Guardar la cotización actual para la próxima comparación
            quoteP.dataset.previousRate = rate;
            valueP.dataset.previousTotal = total;

            quoteP.textContent = `1 ${crypto} = ${rate} ${currency}`;
            valueP.textContent = `Valor de ${quantity} ${crypto} = ${total} ${currency}`;
            document.getElementById('result').style.display = 'block';
            document.getElementById('value-result').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo obtener la cotización. Verifique si el par es válido en Binance.');
        });
});
