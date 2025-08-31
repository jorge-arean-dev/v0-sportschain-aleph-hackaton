#  ⚽🎾SportChain - Aleph Hackathon 2025 

<p align="center">
  <img src="https://www.sportchain.io/_next/image?url=%2Fsportchain_isotipo.png&w=96&q=75" alt="SportChain Logo" width="120" />
</p>


> **Tokenize and democratize sports infrastructure investment through blockchain technology**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/jorge-arean-devs-projects/v0-sportschain-aleph-hackaton)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-^0.8.27-blue?style=for-the-badge&logo=solidity)](https://soliditylang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## 🎯 Project Overview

SportChain is a decentralized platform that enables fractional ownership of sports infrastructure through tokenization. Built for the Aleph Hackathon 2025, this project demonstrates how blockchain technology can democratize access to sports facility investments, allowing individuals to own portions of real-world sports infrastructure and earn passive income.

### 🌟 Key Features

- **🏗️ Smart Contract Infrastructure**: Deploy and manage sports facility tokens
- **💰 Investment Platform**: Fractional ownership with real-time tracking
- **📱 Modern Web Interface**: Responsive design with wallet integration
- **🔒 Secure & Transparent**: Built on Ethereum with OpenZeppelin contracts
- **🌐 IPFS Integration**: Decentralized metadata storage
- **📊 Real-time Analytics**: Investment performance and portfolio tracking

## 🚀 Live Demo

**Project URL**: [https://vercel.com/jorge-arean-devs-projects/v0-sportschain-aleph-hackaton](https://vercel.com/jorge-arean-devs-projects/v0-sportschain-aleph-hackaton)

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Wagmi + Viem** - Ethereum wallet integration
- **RainbowKit** - Wallet connection UI

### Smart Contracts
- **Solidity ^0.8.27** - Smart contract language
- **Foundry** - Development and testing framework
- **OpenZeppelin** - Secure contract libraries
- **Hardhat** - Development environment

### Infrastructure
- **IPFS/Pinata** - Decentralized file storage
- **Vercel** - Deployment platform
- **Ethereum** - Blockchain network

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm
- **Git**
- **Foundry** (for smart contract development)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sportchain-aleph-hackathon.git
cd sportchain-aleph-hackathon
```

### 2. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Blockchain Configuration
NEXT_PUBLIC_SPORTS_CHAIN_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Pinata Configuration (for IPFS)
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_token
NEXT_PUBLIC_PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/

# WalletConnect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
```

### 4. Smart Contract Setup

```bash
# Navigate to contracts directory
cd contracts

# Install Foundry (if not already installed)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Build contracts
forge build

# Deploy to testnet (Sepolia)
forge script script/SportsChain.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast
```

### 5. Generate Favicons

```bash
# Install Sharp for image processing
npm install sharp

# Generate favicon files
node generate-favicons.js
```

### 6. Start Development Server

```bash
# Return to root directory
cd ..

# Start development server
pnpm dev
```

Your application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
sportchain-aleph-hackathon/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Investment dashboard
│   ├── projects/          # Project management
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components
│   ├── NavBar.tsx        # Navigation bar
│   └── Footer.tsx        # Footer component
├── contracts/            # Smart contracts
│   ├── src/              # Solidity source files
│   ├── test/             # Contract tests
│   └── script/           # Deployment scripts
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
└── public/               # Static assets
```

## 🔐 Smart Contracts

### SportsChain.sol
Main contract for deploying and managing sports facility tokens.

**Key Functions:**
- `deploySportsToken()` - Create new sports facility tokens
- `addToWhitelist()` - Manage investor access
- `isWhitelisted()` - Check investor eligibility

### SportsToken.sol
Individual facility token contract with investment logic.

**Key Functions:**
- `invest()` - Purchase facility tokens
- `getData()` - Retrieve token information
- `pause()/unpause()` - Emergency controls

## 🚀 Deployment

### Frontend Deployment

```bash
# Build for production
pnpm build

# Deploy to Vercel
vercel --prod
```

### Smart Contract Deployment

```bash
# Deploy to mainnet
forge script script/SportsChain.s.sol --rpc-url $MAINNET_RPC_URL --broadcast

# Verify on Etherscan
forge verify-contract $CONTRACT_ADDRESS src/SportsChain.sol:SportsChain --chain-id 1
```

## 🧪 Testing

### Smart Contract Tests

```bash
cd contracts
forge test
```

### Frontend Tests

```bash
# Run linting
pnpm lint

# Run type checking
pnpm type-check
```

## 🌐 Supported Networks

- **Ethereum Mainnet** - Production deployment
- **Sepolia Testnet** - Development and testing
- **Base Sepolia** - Layer 2 testing
- **Lisk** - Alternative blockchain support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Information

**Event**: Aleph Hackathon 2025  
**Track**: DeFi & Infrastructure  
**Team**: SportChain Developers  
**Project**: Sports Infrastructure Tokenization Platform

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/your-username/sportchain-aleph-hackathon/issues)
- **Documentation**: [Project Wiki](https://github.com/your-username/sportchain-aleph-hackathon/wiki)
- **Discord**: Join our community server

## 🙏 Acknowledgments

- **OpenZeppelin** for secure smart contract libraries
- **Next.js Team** for the amazing React framework
- **Ethereum Foundation** for blockchain infrastructure
- **Aleph Hackathon** organizers for this opportunity

---

**Built with ❤️ for the Aleph Hackathon 2025**

*SportChain - Democratizing sports infrastructure investment through blockchain technology*
