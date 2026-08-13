# 🇨🇭 Swiss Business Kalkulation

> **Praktisch – zeitsparend – übersichtlich.**  
> A browser-based business planning tool for self-employed individuals and startups in Switzerland.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Languages](https://img.shields.io/badge/Languages-DE%20%7C%20EN%20%7C%20FR%20%7C%20IT-blue.svg)]()
[![Made for Switzerland](https://img.shields.io/badge/Made%20for-Switzerland%20🇨🇭-red.svg)]()

---

<p align="center">
  <img alt="banner" src="docs/screenshot.png"> </img>
</p>

## 🌐 Languages / Sprachen / Langues / Lingue

The entire application supports **German, English, French and Italian** – including all labels, help texts, calculations and PDF exports.

| Language | Status |
|----------|--------|
| 🇩🇪 Deutsch | ✅ Complete |
| 🇺🇸 English | ✅ Complete |
| 🇫🇷 Français | ✅ Complete |
| 🇮🇹 Italiano | ✅ Complete |

---

## ✨ Features

- **📊 Dashboard** – Live overview of revenue, operating costs, net profit and year-end liquidity
- **🏢 Master Data** – Company details, legal form, canton, VAT rates
- **🏠 Private Budget** – Private expenses & income to calculate minimum required income
- **🖥️ Investments** – Depreciation (AfA) calculator for existing and planned assets, plus start-up costs
- **📋 Operating Costs** – 20 categories of fixed costs with automatic monthly distribution
- **💰 Revenue Planning** – Up to 4 offer classes with monthly sales curves, VAT and resource input
- **📈 Profit & Taxes** – AHV/IV/EO, simplified income tax, net profit calculation
- **💧 Liquidity** – Monthly cash-flow forecast with cumulative balance
- **⏱️ Hourly Rate** – Minimum, full-cost and target hourly rate incl. VAT
- **📦 Product Calculation** – Cost price, selling price and contribution margin per product
- **💾 Data Portability** – Export / Import your data as JSON
- **📄 PDF Export** – Generate printable PDFs of any page (via html2canvas + jsPDF)
- **🔒 Privacy First** – All data is stored **locally in your browser** (localStorage); no server, no tracking

---

## 🚀 Getting Started

No build step, no dependencies to install, no server required.

### Option 1: Open directly (file://)
1. Download or clone this repository
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari)
3. Start planning

### Option 2: Local development server
```bash
git clone https://github.com/realraven/swiss-business-calc-mini.git
cd swiss-business-calc-mini
# Any static server works, e.g.:
npx serve .
# or
python3 -m http.server 8000
```

### Option 3: GitHub Pages
Enable GitHub Pages in your repository settings and point it to the root folder – the app will be live instantly.

---

## 📁 Project Structure

```
swiss-business-calc-mini/
├── index.html                  # Dashboard / Overview
├── docs
│   └──screenshot.png
├── pages
│   ├── masterdata.html         # Company master data
│   ├── private.html            # Private budget & minimum income
│   ├── investments.html        # Investments & depreciation (AfA)
│   ├── costs.html              # Operating costs (20 categories)
│   ├── revenue.html            # Revenue planning
│   ├── profit.html             # Profit & tax calculation
│   ├── liquidity.html          # Liquidity forecast
│   ├── hourlyrate.html         # Hourly rate calculator
│   └── productcalc.html        # Product calculation
├── src
│   ├── css/
│   │   └── style.css           # Stylesheet
│   └── js/
│       ├── app.js              # Core business logic & calculations       
│       └── i18n.js             # i18n: translations (DE/EN/FR/IT)   
├── data.json                   # Default data template
├── .gitignore
└── README.md                   
```

### Architecture
- **Single-page feel, multi-page setup** – Each module is a separate HTML file for clean separation, sharing `i18n.js`, `app.js` and `style.css`
- **Modular i18n** – `i18n.js` is completely decoupled from business logic; `app.js` only calls `Lang.t(key)`
- **Zero backend** – 100% client-side; data persists via `localStorage`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Vanilla HTML5 | Semantic markup |
| Vanilla CSS3 | Custom properties, Grid, Flexbox |
| Vanilla JavaScript (ES6+) | Business logic, DOM manipulation |
| localStorage | Persistent client-side data storage |
| html2canvas (CDN) | PDF page rendering |
| jsPDF (CDN) | PDF generation |

---

## 📖 Usage Tips

1. **Start with Master Data** – Enter your company details and check the VAT settings
2. **Fill Private Budget** – This determines your minimum required income, which flows into all other calculations
3. **Plan Investments** – Existing assets, planned purchases and one-time start-up costs
4. **Enter Operating Costs** – Add all monthly/quarterly/yearly fixed costs; the tool distributes them automatically
5. **Define Revenue** – Set up your offers, prices and expected monthly sales
6. **Check Profit** – See immediately if your plan works financially
7. **Monitor Liquidity** – Ensure you won't run out of cash in any month
8. **Calculate Hourly Rate** – Know exactly what you need to charge per hour
9. **Run Product Calculation** – Calculate cost prices, selling prices and contribution margins per product

### Data Backup
Use the **Export** button on the dashboard to save your data as a JSON file. You can re-import it later or on another device.

---

## ⚠️ Disclaimer

**This tool is for planning and educational purposes only.**  
It does **not** constitute tax, legal or financial advice. Tax rates (especially income tax) vary by canton and municipality in Switzerland. Always consult a certified tax advisor (Steuerberater) or fiduciary before making business decisions.

*Die vorliegende Kalkulation ersetzt keine Steuerberatung.*  
*Ce calcul ne remplace pas un conseil fiscal.*  
*Questo calcolo non sostituisce una consulenza fiscale.*

---

## 🤝 Contributing

Contributions are welcome! Whether it's:
- Improving translations
- Adding new canton-specific tax rates
- UI/UX enhancements
- Bug fixes

Please open an issue or pull request.

### Translation Workflow
All text is centralized in `i18n.js`. To add a new language:
1. Add a new key (e.g. `es: { ... }`) following the existing structure
2. Translate all strings
3. Add the language button to the navbar in each HTML file
4. Done – no business logic needs to be touched

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

Third-party libraries used:
- [html2canvas](https://github.com/niklasvh/html2canvas) – MIT
- [jsPDF](https://github.com/parallax/jsPDF) – MIT

---

## 🙏 Acknowledgments

Built with ❤️ in Switzerland for Swiss founders, freelancers and small business owners.  
Special thanks to everyone who believes that financial planning tools should be **free, private and accessible**.

---

<div align="center">
  <strong>⭐ Star this repo if it helped you plan your business!</strong>
</div>
