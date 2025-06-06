# 🚀 Modern React TypeScript Portfolio

A cutting-edge portfolio website built with React 18, TypeScript, and Tailwind CSS, showcasing advanced React patterns, performance optimizations, and modern web development best practices.

![Portfolio Preview](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Portfolio+Preview)

## ✨ Features

### 🎯 **React Mastery**
- **Custom Hooks**: `useIntersectionObserver`, `useSmoothScroll`
- **Context API**: Global theme management with TypeScript
- **Performance Optimization**: `useMemo`, `useCallback`, component memoization
- **Modern Patterns**: Functional components, hooks, proper state management

### 🔷 **TypeScript Excellence**
- **Strong Typing**: Comprehensive interfaces and type definitions
- **Type Safety**: Compile-time error prevention
- **Generic Types**: Flexible, reusable type patterns
- **Professional Standards**: Industry-grade TypeScript practices

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with CSS Grid/Flexbox
- **Dark/Light Theme**: Smooth theme switching with persistence
- **Smooth Animations**: Intersection Observer API for performant animations
- **Interactive Elements**: Hover effects, smooth scrolling, dynamic content

### ⚡ **Performance Optimized**
- **Lazy Loading**: Intersection Observer for efficient rendering
- **Optimized Re-renders**: Strategic use of React optimization hooks
- **Smooth Animations**: Hardware-accelerated CSS transforms
- **Bundle Optimization**: Tree shaking and code splitting ready

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript 4.9+
- **Styling**: Tailwind CSS 3.x
- **Icons**: Lucide React
- **Build Tool**: Create React App with TypeScript template
- **Deployment**: Vercel/Netlify ready

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LucianoBuhler/portfolio-react-ts.git
   cd portfolio-react-ts
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/
│   │   ├── ProjectCard.tsx
│   │   ├── SkillBar.tsx
│   │   └── FadeInSection.tsx
│   └── layout/
│       └── Navigation.tsx
├── hooks/
│   ├── useIntersectionObserver.ts
│   ├── useSmoothScroll.ts
│   └── useTheme.ts
├── types/
│   └── portfolio.ts
├── data/
│   └── portfolio-data.ts
├── styles/
│   └── globals.css
└── App.tsx
```

## 🎯 Key Technical Implementations

### Custom Hooks
```typescript
// useIntersectionObserver - Efficient scroll animations
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // ... implementation
};

// useSmoothScroll - Navigation between sections
const useSmoothScroll = () => {
  return useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);
};
```

### Context API Implementation
```typescript
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);
```

### TypeScript Integration
```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  live?: string;
  featured: boolean;
}
```

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Custom responsive breakpoints
- **Flexible Layouts**: CSS Grid and Flexbox
- **Touch Friendly**: Optimized for touch interactions

## 🎨 Customization

### Theme Configuration
Edit `src/styles/globals.css` for custom colors and themes:

```css
:root {
  --primary-color: #3B82F6;
  --secondary-color: #8B5CF6;
  --background-light: #FFFFFF;
  --background-dark: #111827;
}
```

### Content Updates
Modify `src/data/portfolio-data.ts` to update:
- Personal information
- Projects showcase
- Skills and experience
- Contact information

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Deploy `build` folder to Netlify
3. Configure continuous deployment

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d build
```

## 📊 Performance Features

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for Google's standards
- **Bundle Size**: Minimal dependencies, tree-shaking enabled
- **Loading Speed**: Optimized images and lazy loading

## 🧪 Testing

```bash
# Run tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for beautiful icons
- Vercel for seamless deployment

## 📧 Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/LucianoBuhler/portfolio-react-ts](https://github.com/LucianoBuhler/portfolio-react-ts)

---

⭐ **Star this repository if it helped you!**