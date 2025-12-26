# 🚗 Bihh - Move Different

Bihh is a premium Kenyan vehicle rental and curated roadtrip booking platform. Designed with a high-end, minimalist aesthetic, it offers a seamless experience for customers seeking luxury travel and an elite administrative suite for business management.

## ✨ Features

### 💎 Customer Experience
- **Premium Catalog**: Browse an elite fleet of vehicles with high-resolution imagery and detailed technical specifications.
- **Curated Roadtrips**: Discover "Journals" – hand-picked travel experiences that can be booked instantly.
- **Seamless Booking**: A sophisticated multi-item cart system and structured checkout process for vehicles and roadtrips.
- **AI Concierge**: 24/7 intelligent travel assistant powered by **Google Gemini**, capable of handling inquiries and providing recommendations.
- **Real-Time Availability**: Stay updated with live vehicle status and and pricing.
- **WhatsApp Integration**: Immediate access to human support via a dedicated floating contact button.
- **Brand Showcase**: Dynamic display of partner brands and available marques.

### 🛠️ Administrative Suite (Full Sync)
- **Live Dashboard**: Real-time monitoring of fleet status, total revenue, and booking trends.
- **Fleet Commander**: Advanced CRUD interface for vehicle management with integrated drag-and-drop storage for images.
- **Order Processing**: Centralized booking management for both vehicle rentals and roadtrip packages.
- **Customer CRM**: Comprehensive database of customer profiles, booking history, and contact details.
- **Payment Registry**: Manual and automated payment verification, including support for M-Pesa transaction tracking.
- **Roadtrip Editor**: Dynamically create and publish travel journals and itineraries.
- **Identity Verification Desk**: Secure management of driver IDs and license verifications.
- **System Orchestrator**: Configure AI personality, global site settings, and real-time parameters.

---

## 🚀 Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Logic**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN for dynamic styling optimization)
- **Backend/Database**: [Supabase](https://supabase.com/) (Real-time enabled Tables & PostgREST)
- **Intelligence**: [Google Gemini AI API](https://ai.google.dev/)
- **File Storage**: [Supabase Storage](https://supabase.com/storage)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A Supabase project
- A Google Gemini API Key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/moturi311/bihh_moves-.git
   cd bihh_moves-
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

### 🗄️ Database & Storage Setup

Bihh requires specific table structures and storage buckets to function correctly. Please follow these detailed guides:

1. **Database Schema**: Refer to [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for SQL migrations, RLS policies, and real-time configuration.
2. **Storage**: Refer to [STORAGE_SETUP.md](./STORAGE_SETUP.md) to set up the `vehicle-images` bucket and public access policies.

### 🏃 Running Locally

```bash
# Start the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) to view the application.

---

## 🚢 Deployment

The project is configured for automated deployment to **GitHub Pages**.

```bash
# Build and deploy
npm run deploy
```

Visit the live demo: [https://moturi311.github.io/bihh_moves-/](https://moturi311.github.io/bihh_moves-/)

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the Apache-2.0 License. See `LICENSE` for more information.

---

*Made with ❤️ for the Kenyan travel enthusiast.*