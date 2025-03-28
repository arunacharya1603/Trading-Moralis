import { useEffect, useRef, memo } from 'react';

function TradingViewChart({ tokenAddress }) {
    const container = useRef();

    useEffect(() => {

        function loadWidget() {
            // Add retry mechanism
            let attempts = 0;
            const maxAttempts = 5;
            
            const tryLoadWidget = () => {
                if (typeof window.createMyWidget === 'function') {
                    window.createMyWidget('price-chart-widget-container', {
                        autoSize: true,
                        chainId: 'solana',
                        tokenAddress: tokenAddress,
                        defaultInterval: '1D',
                        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Etc/UTC',
                        theme: 'moralis',
                        locale: 'en',
                        backgroundColor: '#071321',
                        gridColor: '#0d2035',
                        textColor: '#68738D',
                        candleUpColor: '#4CE666',
                        candleDownColor: '#E64C4C',
                        hideLeftToolbar: false,
                        hideTopToolbar: false,
                        hideBottomToolbar: false
                    });
                } else if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(tryLoadWidget, 1000); // Retry after 1 second
                    console.log(`Waiting for widget to load... Attempt ${attempts} of ${maxAttempts}`);
                } else {
                    console.error('Failed to load Moralis chart widget after multiple attempts');
                }
            };
            
            tryLoadWidget();
        }

        if (!document.getElementById('moralis-chart-widget')) {
            const script = document.createElement('script');
            script.id = 'moralis-chart-widget';
            script.src = 'https://moralis.com/static/embed/chart.js';
            script.type = 'text/javascript';
            script.async = true;
            script.onload = loadWidget;
            document.body.appendChild(script);
        } else {
            loadWidget();
        }
    }, [tokenAddress]);

    return (
        <div id="price-chart-widget-container" ref={container} style={{ width: "90vw", height: "70vh" }}>
            <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
        </div>
    );
}

export const Moralis = memo(TradingViewChart);