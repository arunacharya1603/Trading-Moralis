import { useEffect, useRef, memo } from 'react';

function TradingViewChart({ tokenAddress }) {
    const container = useRef();

    useEffect(() => {
        if (!tokenAddress) {
            // Clean up existing widget container and script
            const existingContainer = document.getElementById('price-chart-widget-container');
            if (existingContainer) {
                existingContainer.innerHTML = '';
            }
            const script = document.getElementById('moralis-chart-widget');
            if (script) {
                script.remove();
            }
            return;
        }

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

        // Cleanup function
        return () => {
            const existingContainer = document.getElementById('price-chart-widget-container');
            if (existingContainer) {
                existingContainer.innerHTML = '';
            }
            const script = document.getElementById('moralis-chart-widget');
            if (script) {
                script.remove();
            }
        };
    }, [tokenAddress]);

    // Update the no-token placeholder
    if (!tokenAddress) {
        return (
            <div 
                key="no-token"
                style={{ 
                    width: "100%", 
                    height: "60vh", 
                    display: "flex", 
                    flexDirection: "column",
                    alignItems: "center", 
                    justifyContent: "center",
                    backgroundColor: "#071321",
                    color: "#68738D",
                    borderRadius: "12px",
                    padding: "2rem"
                }}
            >
                <svg 
                    className="w-16 h-16 mb-4 opacity-60" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-7h2v2h-2v-2zm0-8h2v6h-2V5z"/>
                </svg>
                <p className="text-lg text-center mb-2">No Token Selected</p>
                <p className="text-sm text-center opacity-75">Please select a token from the dropdown above to view its price chart</p>
            </div>
        );
    }

    return (
        <div 
            key={tokenAddress}
            id="price-chart-widget-container" 
            ref={container} 
            style={{ 
                width: "100%", 
                height: "60vh",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            }}
        >
            <div 
                className="tradingview-widget-container__widget" 
                style={{ 
                    height: "100%", 
                    width: "100%",
                    backgroundColor: "#071321" 
                }}
            ></div>
        </div>
    );
}

export const Moralis = memo(TradingViewChart);