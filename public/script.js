const sampleIPOs = [
    {
        id: 1,
        company_name: "TechCorp Solutions Ltd",
        logo: null,
        price_band: "₹500-550",
        open_date: "2025-06-20",
        close_date: "2025-06-24",
        issue_size: "₹2,500 Cr",
        issue_type: "Mainboard",
        listing_date: null,
        status: "upcoming",
        ipo_price: null,
        listing_price: null,
        current_market_price: null
    },
    {
        id: 2,
        company_name: "GreenEnergy Industries",
        logo: null,
        price_band: "₹300-350",
        open_date: "2025-06-15",
        close_date: "2025-06-19",
        issue_size: "₹1,800 Cr",
        issue_type: "Mainboard",
        listing_date: null,
        status: "ongoing",
        ipo_price: 325,
        listing_price: null,
        current_market_price: null
    },
    {
        id: 3,
        company_name: "FinTech Innovations",
        logo: null,
        price_band: "₹800-900",
        open_date: "2025-05-20",
        close_date: "2025-05-24",
        issue_size: "₹5,000 Cr",
        issue_type: "Mainboard",
        listing_date: "2025-06-01",
        status: "listed",
        ipo_price: 850,
        listing_price: 1020,
        current_market_price: 1150
    },
    {
        id: 4,
        company_name: "HealthCare Plus",
        logo: null,
        price_band: "₹200-250",
        open_date: "2025-04-15",
        close_date: "2025-04-19",
        issue_size: "₹1,200 Cr",
        issue_type: "SME",
        listing_date: "2025-05-01",
        status: "listed",
        ipo_price: 225,
        listing_price: 195,
        current_market_price: 210
    },
    {
        id: 5,
        company_name: "AutoTech Motors",
        logo: null,
        price_band: "₹400-450",
        open_date: "2025-06-25",
        close_date: "2025-06-29",
        issue_size: "₹3,200 Cr",
        issue_type: "Mainboard",
        listing_date: null,
        status: "upcoming",
        ipo_price: null,
        listing_price: null,
        current_market_price: null
    },
    {
        id: 6,
        company_name: "CloudSoft Technologies",
        logo: null,
        price_band: "₹600-700",
        open_date: "2025-03-10",
        close_date: "2025-03-14",
        issue_size: "₹4,500 Cr",
        issue_type: "Mainboard",
        listing_date: "2025-03-25",
        status: "listed",
        ipo_price: 650,
        listing_price: 780,
        current_market_price: 920
    }
];

class IPODashboard {
    constructor() {
        this.ipos = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadIPOs();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                
                e.target.classList.add('active');
                
                this.currentFilter = e.target.dataset.filter;
                this.renderIPOs();
            });
        });
    }

    async loadIPOs() {
        try {
            // Show loading state
            const grid = document.getElementById('ipoGrid');
            grid.innerHTML = '<div class="loading">Loading IPO data...</div>';

            await new Promise(resolve => setTimeout(resolve, 1000));
            this.ipos = sampleIPOs;
            this.renderIPOs();
        } catch (error) {
            console.error('Error loading IPOs:', error);
            document.getElementById('ipoGrid').innerHTML = 
                '<div class="loading">Error loading IPO data. Please try again later.</div>';
        }
    }
    calculateListingGain(ipoPrice, listingPrice) {
        if (!ipoPrice || !listingPrice) return null;
        return ((listingPrice - ipoPrice) / ipoPrice * 100).toFixed(2);
    }
    calculateCurrentReturn(ipoPrice, currentPrice) {
        if (!ipoPrice || !currentPrice) return null;
        return ((currentPrice - ipoPrice) / ipoPrice * 100).toFixed(2);
    }

    getCompanyInitials(companyName) {
        return companyName.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 3); 
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
    }

    renderIPOs() {
        const grid = document.getElementById('ipoGrid');
        const filteredIPOs = this.currentFilter === 'all' 
            ? this.ipos 
            : this.ipos.filter(ipo => ipo.status === this.currentFilter);

        if (filteredIPOs.length === 0) {
            grid.innerHTML = '<div class="loading">No IPOs found for the selected filter.</div>';
            return;
        }

        grid.innerHTML = filteredIPOs.map(ipo => this.createIPOCard(ipo)).join('');
    }

    createIPOCard(ipo) {
        const listingGain = this.calculateListingGain(ipo.ipo_price, ipo.listing_price);
        const currentReturn = this.calculateCurrentReturn(ipo.ipo_price, ipo.current_market_price);
        const initials = this.getCompanyInitials(ipo.company_name);

        return `
            <div class="ipo-card" data-ipo-id="${ipo.id}">
                <div class="company-header">
                    <div class="company-logo">
                        ${initials}
                    </div>
                    <div class="company-info">
                        <h3>${ipo.company_name}</h3>
                        <span class="status-badge status-${ipo.status}">${ipo.status}</span>
                    </div>
                </div>

                <div class="ipo-details">
                    <div class="detail-item">
                        <div class="detail-label">Price Band</div>
                        <div class="detail-value">${ipo.price_band}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Issue Size</div>
                        <div class="detail-value">${ipo.issue_size}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Open Date</div>
                        <div class="detail-value">${this.formatDate(ipo.open_date)}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Close Date</div>
                        <div class="detail-value">${this.formatDate(ipo.close_date)}</div>
                    </div>
                    ${ipo.issue_type ? `
                        <div class="detail-item">
                            <div class="detail-label">Issue Type</div>
                            <div class="detail-value">${ipo.issue_type}</div>
                        </div>
                    ` : ''}
                    ${ipo.listing_date ? `
                        <div class="detail-item">
                            <div class="detail-label">Listing Date</div>
                            <div class="detail-value">${this.formatDate(ipo.listing_date)}</div>
                        </div>
                    ` : ''}
                </div>

                ${ipo.status === 'listed' && ipo.ipo_price ? `
                    <div class="performance-section">
                        <div class="performance-grid">
                            <div class="performance-item">
                                <div class="performance-value">₹${ipo.ipo_price}</div>
                                <div class="performance-label">IPO Price</div>
                            </div>
                            <div class="performance-item">
                                <div class="performance-value ${listingGain && listingGain >= 0 ? 'gain-positive' : 'gain-negative'}">
                                    ${listingGain ? listingGain + '%' : 'N/A'}
                                </div>
                                <div class="performance-label">Listing Gain</div>
                            </div>
                            <div class="performance-item">
                                <div class="performance-value ${currentReturn && currentReturn >= 0 ? 'gain-positive' : 'gain-negative'}">
                                    ${currentReturn ? currentReturn + '%' : 'N/A'}
                                </div>
                                <div class="performance-label">Current Return</div>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="viewDetails(${ipo.id})">
                        View Details
                    </button>
                    <button class="btn btn-secondary" onclick="downloadRHP(${ipo.id})">
                        Download RHP
                    </button>
                </div>
            </div>
        `;
    }
    getIPOById(id) {
        return this.ipos.find(ipo => ipo.id === id);
    }
}

function viewDetails(ipoId) {
    const dashboard = window.ipoDashboard;
    const ipo = dashboard.getIPOById(ipoId);
    
    if (ipo) {
        alert(`Viewing details for: ${ipo.company_name}\nStatus: ${ipo.status}\nPrice Band: ${ipo.price_band}`);
    }
}

function downloadRHP(ipoId) {
    const dashboard = window.ipoDashboard;
    const ipo = dashboard.getIPOById(ipoId);
    
    if (ipo) {
        alert(`Downloading RHP for: ${ipo.company_name}`);
    }
}

function refreshData() {
    if (window.ipoDashboard) {
        window.ipoDashboard.loadIPOs();
    }
}

function exportIPOData() {
    if (window.ipoDashboard && window.ipoDashboard.ipos.length > 0) {
        const data = JSON.stringify(window.ipoDashboard.ipos, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ipo_data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    window.ipoDashboard = new IPODashboard();
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey) {
            refreshData();
        }
        
        const filterMap = {
            '1': 'all',
            '2': 'upcoming', 
            '3': 'ongoing',
            '4': 'listed'
        };
        
        if (filterMap[e.key]) {
            const filterBtn = document.querySelector(`[data-filter="${filterMap[e.key]}"]`);
            if (filterBtn) {
                filterBtn.click();
            }
        }
    });
});

window.addEventListener('error', (e) => {
    console.error('Dashboard Error:', e.error);
});

window.addEventListener('online', () => {
    console.log('Connection restored');
    refreshData();
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
});

async function getStockData(ticker) {
  const response = await fetch(`http://localhost:3000/api/stock/${ticker}`);
  const data = await response.json();
  return data;
}

async function fetchStockData(ticker) {
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:3000/api/stock/${ticker}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await res.json();
  console.log(data);
}

if (!localStorage.getItem('token')) {
  window.location.href = 'login.html'; 
}