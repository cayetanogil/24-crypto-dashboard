# Crypto Dashboard

Web application that displays real-time data for various cryptocurrencies.

## Features

- Dashboard: Live price updates for popular cryptocurrencies.
- Collection: Portfolio tracking for favorite coins.
- Detail: Historical price charts and information for each coin.

## Technology Details

- **Frontend**: Vite, React (with TypeScript), ShadCN/UI, Tailwind CSS and Heroicons for styling, Recharts for charting.
- **State Management**: Redux Toolkit.
- **APIs**: Provided Coingecko endpoints (coinsService.ts).
- **Routing**: React Router for navigation within the application.
- **Code Formatting**: ESLint is configured for code linting and formatting.

## Installation

1. Clone the repository: `git clone git@github.com:cayetanogil/24-crypto-dashboard.git`
2. Navigate to the project directory: `cd 24-crypto-dashboard`
3. Install the required dependencies: `npm install`
4. Run the application: `npm run dev`
5. Open `http://localhost:5173` in your web browser.
6. Run `npm run lint` to check for linting errors.

## Usage

1. **Dashboard**: The main page displays a list of cryptocurrencies with current prices.
2. **Collection**: Add cryptocurrencies to your portfolio to track their performance.
3. **Cryptocurrency Details**: Click on a cryptocurrency to view detailed information, including historical price charts.

## Insights

The approach was to create a simple dashboard where the user could see right away a global view of the state of the crypto market.

The sidebar and main dashboard content are fed from the same source / endpoint, and stored in state (via the same hook). The sidebar changes when the site is visited on mobile or other small size screens.

When we click on any of the coins, we are directed to the detail page, that is built using two different endpoints: one for general coin details, and one for the historical information that feeds the chart. The user is able to switch among different metrics and time ranges to see different data displayed in the chart.
The user can also mark any coin as a favorite by clicking on the star icon next to the coin name (and also able to remove from favorites by clicking again).

Coins marked as favorite in the detail page will be added to the Collection page. This page works just based on state and not local storage. This means the information will be wiped out after the browser is refreshed. This choice was made in order to showcase the usage of Redux in this project. In the beginning I went with useState to handle state (as it was a faster way to bring the state together, and I am more familiar with it), and later I converted this approach to Redux.

There is some use of local storage in the app though. Since the Coingecko API has a rate limit that translates into getting 'Too Many Connections' errors constantly when browsing through the app, we store the data as we navigate the app in local storage. If we go back to a section that we visited earlier, and we get the rate limit error, we use the latest data we stored in local storage, if available.

For styling we use different tools. Shadcn/ui, for core components in the UI like 'cards', 'drawers', 'buttons', 'toasts'... These are stored in 'components/ui'. We also use TailwindCSS for quick styling and Heroicons for icons.

Overall, the work so far was done during a period of three days. The first day was dedicated to initial planning, initial setup of the project, creation of the basic layout and sections and hooking up the API endpoints. The second day was dedicated to rendering content in the sidebar, dashboard main content and detail page generic content. Third day was dedicated to complete the detail pages with charts, replace useState with Redux and implement the Collection section.

## Future Work

Some aspects I would like to address next, not in order of priority:

1. Improve the experience loading data. Given the API rate limit, the navigation can be frustrating. There are ways of making the experience better without resorting to an API paid plan (thought that would be the ideal way)
2. Improve data formatting in the details page. Since the range of values in the different metrics can be so different from some big coins to other smaller ones (eg Bitcoin to TRON), we need to make more adjustments to be sure we are displaying the correct data and adapting for very small amounts, or really big ones.
3. The use of state and local storage can be improved through the app, and the user can have a more personalized experience without having to sign up for an account or anything like that.
4. Improve the design to make sure the experience is enjoyable and responsive in all kinds of devices.
5. Perform an accessibility audit to be sure we are delivering the best experience for all our users.
6. Create tests for core functionality to be sure our product is robust as we iterate and more people use it.
7. Create the option of a data table view for the main dashboard view that will allow the users to get more information about the coins, and the ability to filter, sort, etc.
8. Clean up CryptocurrencyDetail.tsx and do a better use of components.
