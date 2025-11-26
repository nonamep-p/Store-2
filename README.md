# Zenith Market

Welcome to Zenith Market, a modern, feature-rich e-commerce storefront built with Next.js and styled with Tailwind CSS. This project serves as a comprehensive demonstration of building a high-quality online store, complete with product listings, a shopping cart, a checkout process, and AI-powered recommendations. This project was bootstrapped using Firebase Studio.

## Features

- **Responsive Design**: Fully mobile-friendly layout that looks great on any device.
- **Product Catalog**: Browse all products with advanced filtering and search capabilities.
- **Product Details**: View detailed information for each product.
- **Shopping Cart**: Add/remove items and update quantities with a client-side cart.
- **Checkout Process**: A multi-step form for shipping and payment information.
- **AI Recommendations**: Genkit-powered AI suggests related products to users.
- **Modern UI/UX**: Built with ShadCN UI components, Framer Motion for animations, and a clean, modern aesthetic.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context API
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit)
- **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 20 or later) and a package manager like [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nonamep-p/Store-2.git
    cd Store-2
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run the following command. This will start the app on `http://localhost:9002`.

```bash
npm run dev
```

### Building for Production

To create an optimized production build of the application, run:

```bash
npm run build
```

This will generate a `.next` folder with the production-ready assets. To run the production server locally, use:

```bash
npm run start
```

## Deployment

This project is configured for continuous deployment to **Firebase App Hosting** via **GitHub Actions**.

- **Production Deployment**: Pushing or merging changes to the `main` branch will automatically trigger a build and deploy the application to the live channel.
- **Preview Deployments**: Opening a pull request against the `main` branch will automatically build the changes and deploy them to a unique, temporary preview URL.

To enable this, you will need to configure the following secrets in your GitHub repository's settings under `Settings > Secrets and variables > Actions`:

- `FIREBASE_SERVICE_ACCOUNT`: Your Firebase service account JSON key.
- `FIREBASE_PROJECT_ID`: Your Firebase project ID.
