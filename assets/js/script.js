let chart; 

async function convertirMoneda() {
  const monto = document.getElementById('monto').value;
  const moneda = document.getElementById('moneda').value;
  const resultadoDiv = document.getElementById('resultado');

  if (!monto) {
    resultadoDiv.innerHTML = 'Por favor, ingresa un monto.';
    return;
  }

  try {
    const response = await fetch('https://mindicador.cl/api');
    const data = await response.json();

    let tasaConversion;
    switch (moneda) {
      case 'dolar':
        tasaConversion = data.dolar.valor;
        break;
      case 'euro':
        tasaConversion = data.euro.valor;
        break;
      case 'uf':
        tasaConversion = data.uf.valor;
        break;
      case 'utm':
        tasaConversion = data.utm.valor;
        break;
      default:
        tasaConversion = 1;
    }

    const resultado = (monto / tasaConversion).toFixed(2);
    resultadoDiv.innerHTML = `${monto} CLP son aproximadamente ${resultado} ${moneda.toUpperCase()}`;

    await mostrarGrafico(moneda);
  } catch (error) {
    resultadoDiv.innerHTML = 'Error al consultar la API';
    console.error('Error al consultar la API:', error);
  }
}

async function mostrarGrafico(moneda) {
  try {
    const response = await fetch(`https://mindicador.cl/api/${moneda}`);
    const data = await response.json();

    const ultimos10Dias = data.serie.slice(0, 10).reverse();
    const fechas = ultimos10Dias.map(item => item.fecha.split('T')[0]);
    const valores = ultimos10Dias.map(item => item.valor);

    const ctx = document.getElementById('myChart').getContext('2d');

    
    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: fechas,
        datasets: [{
          label: `Historial últimos 10 días (${moneda.toUpperCase()})`,
          data: valores,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  } catch (error) {
    console.error('Error al consultar el historial:', error);
  }
}
