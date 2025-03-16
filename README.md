# Yums.fun - Memecoin Launchpad

Yums.fun is a modern memecoin launchpad built on Solana, allowing users to easily create and trade tokens with minimal effort. The platform features a sleek, user-friendly interface with a distinctive yellow branding.

![Yums.fun Screenshot](https://placeholder.com/yums-screenshot.png)

## Features

- **Token Creation**: Create your own memecoin in minutes with a simple multi-step form
- **Token Discovery**: Browse trending tokens and filter by categories
- **Trading Interface**: Buy and sell tokens directly on the platform
- **Watchlist**: Keep track of your favorite tokens
- **Wallet Integration**: Seamless connection with popular Solana wallets
- **Codex.io Integration**: Real-time Solana token data from the Codex.io API

## Tech Stack

- **Frontend**: React, Next.js, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana web3.js
- **Wallet Integration**: Solana Wallet Adapter
- **Data API**: Codex.io for real-time token information

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Solana wallet (Phantom, Solflare, etc.)
- Codex.io API key (for real-time token data)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yums-fun.git
   cd yums-fun
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following:
   ```
   NEXT_PUBLIC_CODEX_API_KEY=your_codex_api_key_here
   ```
   Replace `your_codex_api_key_here` with your actual Codex.io API key.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
yums-fun/
├── public/            # Static assets
│   └── tokens/        # Token images and placeholders
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # Reusable UI components
│   ├── providers/     # Context providers
│   ├── services/      # API services and data fetching
│   ├── styles/        # Global styles
│   └── utils/         # Utility functions
├── tailwind.config.js # Tailwind CSS configuration
└── next.config.js     # Next.js configuration
```

## Key Components

- **TokenCard**: Displays individual token information in listings
- **PriceChart**: Visualizes token price movements
- **TokenCreationForm**: Multi-step form for creating new tokens
- **Header**: Navigation and wallet connection
- **TrendingTokens**: Displays trending tokens with filtering options
- **CodexTokens**: Displays real-time Solana token data from Codex.io

## API Integration

### Codex.io

The application uses Codex.io API to fetch real-time data about Solana tokens. To enable this feature:

1. Sign up for an account at [Codex.io](https://codex.io)
2. Generate an API key from your dashboard
3. Add the API key to your `.env.local` file as described in the installation section

The application will fall back to mock data if no API key is provided, but for the best experience, a valid API key is recommended.

## Deployment

The application can be deployed to Vercel with a single click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fyums-fun)

When deploying, make sure to add your Codex.io API key as an environment variable in your Vercel project settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Inspired by [pump.fun](https://pump.fun)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Solana integration with [web3.js](https://solana-labs.github.io/solana-web3.js/)
- Token data provided by [Codex.io](https://codex.io)
