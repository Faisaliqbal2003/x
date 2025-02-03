# X Automation Tool

A powerful automation tool for X (Twitter) marketing and lead generation.

## Features

- 🎯 Lead finder with advanced filters
- 💬 DM automation and campaign management
- 📊 Analytics dashboard
- 🔍 User engagement tracking
- ⚡ Real-time data updates

## Tech Stack

- Next.js 14
- React 18
- Tailwind CSS
- Twitter API v2
- Axios for API calls

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/your-username/x-automation.git
cd x-automation
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with your Twitter API credentials:
```env
NEXT_PUBLIC_TWITTER_BEARER_TOKEN=your_token_here
TWITTER_API_KEY=your_api_key_here
TWITTER_API_SECRET=your_api_secret_here
TWITTER_ACCESS_TOKEN=your_access_token_here
TWITTER_ACCESS_SECRET=your_access_secret_here
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── components/   # React components
│   ├── lib/         # Utilities and helpers
│   └── pages/       # App pages
├── public/          # Static files
└── styles/         # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
