# 🏡 Staybee - Professional Property Management Website

A modern, minimalist, and aesthetic website for Staybee co-hosting services. Built with vanilla HTML, CSS, and JavaScript for optimal performance and easy deployment.

## 📋 Features

- **Modern UI Design** - Clean, minimalist aesthetic with smooth animations
- **Responsive Layout** - Works perfectly on all devices (mobile, tablet, desktop)
- **Fast Loading** - Lightweight static site with no dependencies
- **SEO Optimized** - Semantic HTML structure
- **Contact Form** - Built-in contact form for lead generation
- **Performance Optimized** - Optimized images and CSS for fast load times
- **Accessibility** - WCAG compliant with proper color contrast and keyboard navigation

## 🎨 Sections

- **Hero Section** - Eye-catching headline with floating stat cards
- **Services Grid** - 6 professional services with icons
- **Features Section** - Key benefits with numbered list
- **Statistics** - Real-time counter animations
- **Process Timeline** - Step-by-step how it works
- **Pricing Cards** - Transparent pricing structure
- **Contact Form** - Lead capture and inquiry management
- **Footer** - Social links and navigation

## 🚀 Getting Started Locally

### Prerequisites
- A web browser
- (Optional) Node.js and npm for local development server

### Installation & Local Development

1. **Clone or extract the project:**
   ```bash
   cd staybee
   ```

2. **Option A: Simple - Just open in browser**
   ```bash
   # Open index.html directly in your browser
   # Double-click index.html or drag it to your browser
   ```

3. **Option B: Using Python** (if you have Python installed)
   ```bash
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

4. **Option C: Using Node.js**
   ```bash
   npm install
   npm run dev
   # Then visit: http://localhost:8000
   ```

## 📦 Project Structure

```
staybee/
├── index.html          # Main HTML file
├── styles.css          # All styling (responsive & animations)
├── script.js           # Interactive features
├── package.json        # NPM configuration
├── render.yaml         # Render deployment config
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## 🌐 Deployment on Render (Free)

### Step 1: Connect to GitHub

1. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Staybee website"
   git remote add origin https://github.com/YOUR_USERNAME/staybee.git
   git push -u origin main
   ```

2. Go to [render.com](https://render.com) and sign up

3. Click "New" → "Static Site"

### Step 2: Configure Render

1. **Connect your GitHub repository** to Render
2. **Configure settings:**
   - **Name:** staybee-website
   - **Build Command:** (leave empty or use `npm install` if using npm scripts)
   - **Publish Directory:** . (current directory)

3. **Click Deploy**

### Step 3: Add Custom Domain (Optional)

Once deployed, you can:
- Use the free `*.onrender.com` domain provided by Render
- Add your own custom domain in Render settings

Your site will be live at: `https://staybee.onrender.com` (or your custom domain)

## 🔧 Customization

### Colors
Edit the CSS variables in `styles.css` (line ~15):
```css
:root {
    --primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary: #f093fb;
    --accent: #4facfe;
    /* ... more colors ... */
}
```

### Content
Edit `index.html` to:
- Change service descriptions
- Update pricing
- Modify contact information
- Add/remove sections

### Animations
Adjust animation speeds in `styles.css`. Look for `@keyframes` sections.

## 📱 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ⚠️ Limited support (no CSS gradients on some elements)

## ⚡ Performance Tips

1. **Images** - If you add images, optimize them using:
   - TinyPNG: https://tinypng.com
   - ImageOptim: https://imageoptim.com

2. **Lazy Loading** - The site uses lazy loading for images (via data-src)

3. **Caching** - Add caching headers in Render dashboard

## 🔐 Security

- All third-party resources (FontAwesome) are loaded from CDN
- No sensitive data is stored locally
- HTTPS enabled by default on Render

## 📊 Analytics (Optional)

To add Google Analytics:

1. Add this before closing `</head>` in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your actual Google Analytics ID.

## 🛠️ Troubleshooting

### Site looks broken on mobile?
- Clear browser cache
- Check browser width is properly detected
- Ensure you're viewing the correct version

### Contact form not working?
- Currently shows a demo message
- To make it functional, add a backend service like:
  - Formspree: https://formspree.io
  - EmailJS: https://www.emailjs.com
  - Any REST API endpoint

### Styles not loading?
- Ensure `styles.css` is in the same directory as `index.html`
- Clear browser cache
- Check browser console for CSS file errors

## 🎯 Next Steps

1. **Customize content** with your actual information
2. **Add your logo** if needed
3. **Set up email forwarding** for contact form
4. **Configure analytics** for tracking visitors
5. **Add your custom domain** to Render
6. **Create social media** links in footer

## 📝 License

MIT License - Feel free to use and modify

## 📞 Contact & Support

Visit the contact form on the website or email: hello@staybee.co

---

**Built with ❤️ for Staybee**

Happy hosting! 🚀
