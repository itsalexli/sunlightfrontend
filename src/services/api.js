const API_BASE_URL = 'http://localhost:8000/test';  // Your Flask server URL

export const tradingApi = {
    // User Management
    initializeUser: () => 
        fetch(`${API_BASE_URL}/initialize-user`, { method: 'POST' })
            .then(res => res.json()),
    
    login: () => 
        fetch(`${API_BASE_URL}/login`, { method: 'POST' })
            .then(res => res.json()),

    // Portfolio Management
    getPortfolio: () => 
        fetch(`${API_BASE_URL}/portfolio`)
            .then(res => res.json()),

    // Trading Operations
    buyStock: (symbol, amount) => 
        fetch(`${API_BASE_URL}/buy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symbol, amount })
        }).then(res => res.json()),

    sellStock: (symbol, quantity) => 
        fetch(`${API_BASE_URL}/sell`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symbol, quantity })
        }).then(res => res.json()),

    // Market Data
    getStockPrice: (symbol) => 
        fetch(`${API_BASE_URL}/stock-price/${symbol}`)
            .then(res => res.json()),

    getBatchStockPrices: (symbols) => 
        fetch(`${API_BASE_URL}/stock-prices`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symbols })
        }).then(res => res.json()),

    getS3P500Data: (page = 1) => 
        fetch(`${API_BASE_URL}/sp500-data?page=${page}`)
            .then(res => res.json())
};

const api = {
    // User Management
    async initializeUser() {
        try {
            const response = await fetch(`${API_BASE_URL}/initialize-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error('Failed to initialize user');
            return await response.json();
        } catch (error) {
            console.error('Error initializing user:', error);
            throw error;
        }
    },

    async login() {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error('Login failed');
            return await response.json();
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },

    // Portfolio Management
    async getPortfolio() {
        try {
            const response = await fetch(`${API_BASE_URL}/portfolio`);
            if (!response.ok) throw new Error('Failed to fetch portfolio');
            return await response.json();
        } catch (error) {
            console.error('Error fetching portfolio:', error);
            throw error;
        }
    },

    // Trading Operations
    async buyStock(symbol, amount) {
        try {
            const response = await fetch(`${API_BASE_URL}/buy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symbol, amount })
            });
            if (!response.ok) throw new Error('Buy order failed');
            return await response.json();
        } catch (error) {
            console.error('Error buying stock:', error);
            throw error;
        }
    },

    async sellStock(symbol, quantity) {
        try {
            const response = await fetch(`${API_BASE_URL}/sell`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symbol, quantity })
            });
            if (!response.ok) throw new Error('Sell order failed');
            return await response.json();
        } catch (error) {
            console.error('Error selling stock:', error);
            throw error;
        }
    },

    // Market Data
    async getStockPrice(symbol) {
        try {
            const response = await fetch(`${API_BASE_URL}/stock-price/${symbol}`);
            if (!response.ok) throw new Error('Failed to fetch stock price');
            return await response.json();
        } catch (error) {
            console.error('Error fetching stock price:', error);
            throw error;
        }
    },

    async getBatchStockPrices(symbols) {
        try {
            const response = await fetch(`${API_BASE_URL}/stock-prices`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symbols })
            });
            if (!response.ok) throw new Error('Failed to fetch batch stock prices');
            return await response.json();
        } catch (error) {
            console.error('Error fetching batch stock prices:', error);
            throw error;
        }
    },

    async getS3P500Data(page = 1) {
        try {
            const response = await fetch(`${API_BASE_URL}/sp500-data?page=${page}`);
            if (!response.ok) throw new Error('Failed to fetch S&P 500 data');
            return await response.json();
        } catch (error) {
            console.error('Error fetching S&P 500 data:', error);
            throw error;
        }
    },

    // API Documentation
    async getApiDocs() {
        try {
            const response = await fetch(`${API_BASE_URL}/`);
            if (!response.ok) throw new Error('Failed to fetch API documentation');
            return await response.json();
        } catch (error) {
            console.error('Error fetching API documentation:', error);
            throw error;
        }
    },

    // Add this new method
    async getPortfolioDetails() {
        try {
            const response = await fetch(`${API_BASE_URL}/portfolio/details`);
            if (!response.ok) throw new Error('Failed to fetch portfolio details');
            return await response.json();
        } catch (error) {
            console.error('Error fetching portfolio details:', error);
            throw error;
        }
    }
};

export default api;