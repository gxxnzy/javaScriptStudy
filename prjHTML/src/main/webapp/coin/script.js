async function fetchCoinData() {
    const response = await fetch('https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&count=100');
    const data = await response.json();
    return data;
}

// Chart.js를 사용하여 캔들스틱 차트 생성
async function createChart() {
    const coinData = await fetchCoinData();

    const labels = coinData.map(candle => {
        const date = new Date(candle.timestamp);
        return `${date.getHours()}:${date.getMinutes()}`;
    }).reverse();

    const prices = coinData.map(candle => ({
        t: new Date(candle.timestamp),
        o: candle.opening_price,
        h: candle.high_price,
        l: candle.low_price,
        c: candle.trade_price
    })).reverse();

    const ctx = document.getElementById('coinChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'candlestick',
        data: {
            labels: labels,
            datasets: [{
                label: 'BTC/USDT',
                data: prices,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: false
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// 페이지 로드 시 차트 생성
window.onload = createChart;