# TailorPro - Modern Tailor Shop Management Software

**TailorPro** is a comprehensive, all-in-one management platform designed specifically for modern tailor shops. It streamlines every aspect of the tailoring business, from order intake and payment tracking to customer management and delivery coordination. Built with a modern tech stack, TailorPro provides a seamless experience for shop owners, staff, and customers alike.

## ✨ Key Features

  - **👔 Order Management**: A complete system to create, view, update, and track tailoring orders with detailed descriptions, pricing, and status updates (Pending, Partial, Paid).
  - **💳 Payment Tracking**: Integrated payment processing to manage down payments, full payments, and outstanding balances. It includes an integration with the **Chapa** payment gateway for online transactions in Ethiopia.
  - **👤 Customer Portal**: A dedicated dashboard for customers to view their order history, track the status of current orders, and make payments online.
  - **🚚 Delivery Management**: A full module for managing deliveries, assigning orders to deliverers, and tracking delivery status from "pending" to "delivered".
  - **🔐 Role-Based Access Control**: Pre-configured roles for **Admin**, **Staff**, **Deliverer**, and **Customer**, each with a dedicated interface and appropriate permissions.
  - **📊 Admin & Analytics Dashboard**: A powerful admin panel to manage users, view comprehensive reports on revenue, track outstanding balances, and oversee all shop operations.
  - **📄 PDF Receipt Generation**: Dynamically generate and download PDF receipts for any order, complete with payment history and delivery details.
  - **📱 Responsive Design**: A fully responsive interface that works beautifully on desktops, tablets, and mobile devices, built with **shadcn/ui** and **Tailwind CSS**.

## 🛠️ Tech Stack

  - **Frontend**:
      - **Vite**: High-performance build tool for modern web development.
      - **React**: A JavaScript library for building user interfaces.
      - **TypeScript**: For strong typing and improved code quality.
      - **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
      - **shadcn/ui**: A collection of beautifully designed, accessible UI components.
      - **React Router**: For client-side routing and navigation.
      - **TanStack Query (React Query)**: For data fetching, caching, and state management.
  - **Backend**:
      - **Supabase**: Open-source Firebase alternative providing a PostgreSQL database, authentication, and serverless Edge Functions.
  - **Key Libraries**:
      - **Zod**: For schema declaration and validation.
      - **React Hook Form**: For building robust and performant forms.
      - **Lucide React**: For beautiful and consistent icons.
      - **jsPDF**: For client-side PDF generation.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

  - Node.js (v18.0.0 or higher)
  - npm or bun
  - A Supabase account

### Installation & Local Development

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/awalahimed6/stitch-pay-manage.git
    cd stitch-pay-manage
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Supabase project credentials. You can find these in your Supabase project's API settings.

    ```env
    VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
    VITE_SUPABASE_PUBLISHABLE_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

4.  **Set up the database:**
    Use the Supabase CLI or the in-browser SQL editor to run the migration files located in the `supabase/migrations/` directory. The files should be run in chronological order based on their timestamps.

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:8080`.

### Available Scripts

  - `npm run dev`: Starts the development server.
  - `npm run build`: Builds the app for production.
  - `npm run lint`: Lints the code using ESLint.
  - `npm run preview`: Serves the production build locally for testing.

## 📁 Project Structure

The project follows a standard Vite + React structure with a clear separation of concerns.

```
/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components (including shadcn/ui)
│   ├── hooks/               # Custom React hooks
│   ├── integrations/        # Supabase client and types
│   ├── lib/                 # Core utilities, auth context, etc.
│   ├── pages/               # Application pages/routes
│   ├── App.tsx              # Main app component with routing
│   └── main.tsx             # Application entry point
├── supabase/
│   ├── migrations/          # Database schema migrations
│   └── functions/           # Serverless edge functions (e.g., Chapa payment)
└── package.json             # Project dependencies and scripts
```

## 🤝 Contributing

Contributions are welcome\! If you have suggestions for how to improve the project, please feel free to fork the repository and submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.