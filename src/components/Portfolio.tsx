import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Smartphone, Globe, Database, Zap, Users, Award, ArrowUp } from 'lucide-react';

// Types for better TypeScript support
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

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
}

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string[];
  tech: string[];
}

// Custom hook for intersection observer (performance optimization)
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible] as const;
};

// Custom hook for smooth scrolling
const useSmoothScroll = () => {
  return useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);
};

// Context for theme management (Context API demonstration)
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

// Mock data (in real app, this would come from CMS/API)
const mockProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include real-time inventory, payment processing, and admin dashboard.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    github: "#",
    live: "#",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates, drag-and-drop functionality, and team collaboration features.",
    tech: ["React", "Firebase", "Tailwind", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
    github: "#",
    live: "#",
    featured: true
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Data visualization dashboard with interactive charts, real-time data updates, and responsive design.",
    tech: ["React", "D3.js", "TypeScript", "REST API"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    github: "#",
    featured: false
  }
];

const mockSkills: Skill[] = [
  { name: "React", level: 95, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "Node.js", level: 80, category: "backend" },
  { name: "PostgreSQL", level: 75, category: "backend" },
  { name: "Docker", level: 70, category: "tools" },
];

const mockExperience: Experience[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    description: [
      "Led development of React-based dashboard serving 50k+ users",
      "Implemented performance optimizations reducing load time by 40%",
      "Mentored junior developers and established coding standards"
    ],
    tech: ["React", "TypeScript", "AWS", "GraphQL"]
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Solutions Co.",
    period: "2020 - 2022",
    description: [
      "Built and maintained multiple client applications",
      "Developed RESTful APIs and database schemas",
      "Collaborated with design team to implement pixel-perfect UIs"
    ],
    tech: ["React", "Node.js", "MongoDB", "Express"]
  }
];

// Animated component for fade-in effects
const FadeInSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Skill bar component with animation
const SkillBar: React.FC<{ skill: Skill; delay: number }> = ({ skill, delay }) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setWidth(skill.level), delay);
    return () => clearTimeout(timer);
  }, [skill.level, delay]);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 dark:text-gray-200 font-medium">{skill.name}</span>
        <span className="text-blue-600 dark:text-blue-400 text-sm">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

// Project card component
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        project.featured ? 'md:col-span-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className={`w-full h-48 object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {project.github && (
              <button className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors">
                <Github className="w-4 h-4 inline mr-1" />
                Code
              </button>
            )}
            {project.live && (
              <button className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors">
                <ExternalLink className="w-4 h-4 inline mr-1" />
                Live
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Navigation component
const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTo = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portfolio
          </h1>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero section
const HeroSection: React.FC = () => {
  const scrollTo = useSmoothScroll();
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const phrases = ['React Developer', 'TypeScript Expert', 'UI/UX Enthusiast', 'Problem Solver'];

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[index % phrases.length];
    if (text.length < currentPhrase.length) {
      const timer = setTimeout(() => setText(currentPhrase.slice(0, text.length + 1)), 100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setText('');
        setIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [text, index]);

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="text-center space-y-6 z-10 px-4">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">
            Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Alex</span>
          </h1>
          <div className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 h-12">
            <span>{text}</span>
            <span className="animate-pulse">|</span>
          </div>
        </div>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Passionate about creating exceptional digital experiences with modern web technologies.
          Specialized in React, TypeScript, and scalable frontend architectures.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => scrollTo('projects')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            View My Work
          </button>
          <button 
            onClick={() => scrollTo('contact')}
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-full font-medium hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Get In Touch
          </button>
        </div>
        
        <div className="flex justify-center space-x-6 pt-8">
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
      
      <button 
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 dark:text-gray-400 animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

// Main Portfolio Component
const Portfolio: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollTo = useSmoothScroll();

  // Theme toggle
  const toggleTheme = useCallback(() => setIsDark(!isDark), [isDark]);

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoized values for performance
  const featuredProjects = useMemo(() => mockProjects.filter(p => p.featured), []);
  const skillsByCategory = useMemo(() => ({
    frontend: mockSkills.filter(s => s.category === 'frontend'),
    backend: mockSkills.filter(s => s.category === 'backend'),
    tools: mockSkills.filter(s => s.category === 'tools'),
  }), []);

  const themeValue = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className={isDark ? 'dark' : ''}>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <Navigation />
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isDark ? '🌞' : '🌙'}
          </button>

          <HeroSection />

          {/* About Section */}
          <section id="about" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <FadeInSection>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">About Me</h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>
              </FadeInSection>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <FadeInSection>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      Crafting Digital Experiences
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      With over 4 years of experience in frontend development, I specialize in creating 
                      performant, scalable, and user-friendly web applications. My expertise spans across 
                      modern React patterns, TypeScript, and contemporary web technologies.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      I'm passionate about clean code, optimal user experiences, and staying current with 
                      the latest industry trends and best practices.
                    </p>
                  </div>
                </FadeInSection>

                <FadeInSection className="grid grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-center">
                    <Code className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Clean Code</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Maintainable, scalable solutions</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl text-center">
                    <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Performance</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Optimized for speed</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl text-center">
                    <Smartphone className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Responsive</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Mobile-first approach</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl text-center">
                    <Users className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">User-Centric</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Intuitive experiences</p>
                  </div>
                </FadeInSection>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="max-w-6xl mx-auto">
              <FadeInSection>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">Experience</h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>
              </FadeInSection>

              <div className="space-y-8">
                {mockExperience.map((exp, index) => (
                  <FadeInSection key={exp.id}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 font-medium">{exp.period}</span>
                      </div>
                      
                      <ul className="space-y-2 mb-4">
                        {exp.description.map((desc, idx) => (
                          <li key={idx} className="text-gray-600 dark:text-gray-300 flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            {desc}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <FadeInSection>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                  <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                    Here are some of my favorite projects that showcase my skills and passion for development.
                  </p>
                </div>
              </FadeInSection>

              <div className="grid md:grid-cols-3 gap-8">
                {mockProjects.map((project, index) => (
                  <FadeInSection key={project.id}>
                    <ProjectCard project={project} index={index} />
                  </FadeInSection>
                ))}
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="max-w-6xl mx-auto">
              <FadeInSection>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">Skills & Expertise</h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>
              </FadeInSection>

              <div className="grid md:grid-cols-3 gap-8">
                <FadeInSection>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                    <h3 className="text-xl font-bold mb-6 text-blue-600 dark:text-blue-400">Frontend</h3>
                    {skillsByCategory.frontend.map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} delay={index * 200} />
                    ))}
                  </div>
                </FadeInSection>

                <FadeInSection>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                    <h3 className="text-xl font-bold mb-6 text-purple-600 dark:text-purple-400">Backend</h3>
                    {skillsByCategory.backend.map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} delay={index * 200 + 600} />
                    ))}
                  </div>
                </FadeInSection>

                <FadeInSection>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                    <h3 className="text-xl font-bold mb-6 text-green-600 dark:text-green-400">Tools</h3>
                    {skillsByCategory.tools.map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} delay={index * 200 + 1200} />
                    ))}
                  </div>
                </FadeInSection>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <FadeInSection>
                <div className="mb-16">
                  <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Ready to bring your ideas to life? Let's discuss how we can create something amazing together.
                  </p>
                </div>
              </FadeInSection>

              <FadeInSection>
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">hello@example.com</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Linkedin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">LinkedIn</h3>
                    <p className="text-gray-600 dark:text-gray-300">/in/yourprofile</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Github className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">GitHub</h3>
                    <p className="text-gray-600 dark:text-gray-300">@yourusername</p>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection>
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  Start a Conversation
                </button>
              </FadeInSection>
            </div>
          </section>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </ThemeContext.Provider>
  );
};

export default Portfolio;