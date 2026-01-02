import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  Globe,
  User,
  Briefcase,
  ChevronRight,
  Sparkles,
  X,
  MessageSquare,
  Send,
  Instagram,
  MapPin,
  Calendar,
  Layers,
  Award,
  Milestone,
  Trophy,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

// --- Configuration & Data ---

const DEVELOPER_NAME = "Soham Roy Chowdhury";
const DEVELOPER_EMAIL = "sohamroychowdhury2004@gmail.com";
const DEVELOPER_ROLE = "Creative Engineer & Student";
const BIO = "I'm Soham Roy Chowdhury, a proactive engineering student passionate about creating dynamic web experiences. From frontend to backend, I thrive on solving complex problems with clean, efficient code. My expertise spans C++, Python, JavaScript, and I'm always eager to learn more.";
const EXTRA_BIO = "When I'm not immersed in work, I'm exploring new ideas and staying curious. Life's about balance, and I love embracing every part of it. I believe in waking up each day eager to make a difference!";

// The photo provided by the user (local file `hero1.jpg` placed at project root)
const PROFILE_PHOTO = "/hero1.jpg";

const TECH_STACK = [
  "C++",
  "Python",
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Tailwind CSS",
  "Git",
];

const PROJECTS = [
  {
    title: "Agri Grow",
    description: "Agri Grow — a small showcase and tools collection focused on agriculture growth workflows and data-driven UI patterns. Built with HTML and CSS.",
    tags: ["HTML", "CSS"],
    link: "https://github.com/sohamroyc/Aiportfolio",
    image: "/journey4.png"
  },
  {
    title: "Pocketdoctor",
    description: "A lightweight web demo for healthcare resources and UI patterns, implemented with HTML/CSS and minimal JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/sohamroyc/Pocketdoctor",
    image: "/journey5.png"
  },
  {
    title: "Margdarsak AI",
    description: "Margdarsak AI — an assistant-focused project extending the original billing system into an AI-enhanced guidance tool. Originally implemented as a Java desktop app and extended with modern interfaces.",
    tags: ["Java", "AI"],
    link: "https://github.com/sohamroyc/Electricity_Billing_System-master",
    image: "/journey6.png"
  }
];

const JOURNEY_ITEMS = [
  {
    year: "2025",
    title: "Google Student Ambassador",
    achievement: "Selected as a Google Student Ambassador to promote tech innovation and community engagement on campus.",
    image: "/journey1.jpg",
    icon: <Trophy className="w-5 h-5" />
  },
 {
  year: "2025",
  title: "SAP TechEd 2025",
  achievement: "Attended SAP TechEd 2025, engaging with sessions on SAP BTP, Generative AI, enterprise cloud-native development, and scalable architectures. Connected with industry experts and gained practical insights into modern enterprise solutions.",
  image: "/journey2.jpg",
  icon: <Briefcase className="w-5 h-5" />
},
{
  year: "2025",
  title: "Community Manager at LNC",
  achievement: "Served as Community Manager at LNC, a vibrant developer community focused on open source collaboration, hackathons, and hands-on coding sessions. Facilitated project collaboration, mentorship, and growth opportunities for developers, turning caffeine into code and shared success.",
  image: "/journey3.jpeg",
  icon: <Code2 className="w-5 h-5" />
}

];

// --- Utilities ---

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// --- Components ---

const PlexusBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const points: { x: number; y: number; vx: number; vy: number }[] = [];
    const pointCount = 80;
    const connectionDistance = 150;

    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 1;

      points.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (dist < connectionDistance) {
            ctx.globalAlpha = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none -z-10" aria-hidden="true" />;
};

const LazyImage = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-white/5 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[pulse_2s_infinite] bg-[length:200%_100%]" />
      )}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          filter: isLoaded ? 'blur(0px)' : 'blur(10px)',
          scale: isLoaded ? 1 : 1.05
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
};

const GlassCard = ({ children, className = "", id }: { children?: React.ReactNode, className?: string, id?: string }) => (
  <motion.div 
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:bg-white/[0.05] transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: `Hi, I'm Soham's digital assistant. How can I help you learn more about his engineering journey?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key missing");
      
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are the digital twin assistant of ${DEVELOPER_NAME}, a ${DEVELOPER_ROLE}.
        Bio: ${BIO}
        Personal Philosophy: ${EXTRA_BIO}
        Stack: ${TECH_STACK.join(', ')}
        Instructions: Be enthusiastic, professional, and curious. Speak in first person as if you are Soham's representative. Mention his interest in making a difference.
        User: ${userMsg}`,
      });
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm always ready to talk about Soham's work!" }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'ai', text: "Looks like a technical glitch! Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-80 bg-[#111] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-label="AI Assistant Chat"
          >
            <div className="p-4 bg-white/5 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                <span className="text-xs font-bold tracking-widest uppercase text-gray-200">AI Agent</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors focus:ring-2 focus:ring-indigo-500 outline-none"
                aria-label="Close chat window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div ref={scrollRef} className="h-64 md:h-80 overflow-y-auto p-4 space-y-3 bg-black/20 scroll-smooth">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2 rounded-2xl text-xs leading-relaxed max-w-[85%] ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-gray-200'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2 rounded-2xl bg-white/10 flex gap-1 items-center" aria-label="AI is thinking">
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 flex gap-2 bg-black/40">
              <input 
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Message Soham's AI..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-gray-500"
                aria-label="Chat input"
              />
              <button 
                onClick={handleSend} 
                className="bg-white p-2 rounded-xl text-black hover:bg-gray-200 transition-colors flex items-center justify-center focus:ring-2 focus:ring-indigo-500 outline-none"
                aria-label="Send message to AI assistant"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl text-black hover:scale-110 active:scale-95 transition-all group focus:ring-4 focus:ring-indigo-500/50 outline-none"
        aria-label={isOpen ? "Close AI assistant chat" : "Open AI assistant chat"}
      >
        {isOpen ? <X aria-hidden="true" /> : <MessageSquare className="group-hover:rotate-12 transition-transform" aria-hidden="true" />}
      </button>
    </div>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center" role="navigation" aria-label="Main Navigation">
    <div className="text-2xl font-black tracking-tighter" aria-label="Soham Roy Chowdhury Logo">SRC</div>
    <div className="bg-white/5 border border-white/10 rounded-full px-8 py-3 flex gap-8 backdrop-blur-md hidden lg:flex">
      {['Home', 'About', 'Journey', 'Skills', 'Projects', 'Get in Touch'].map(item => (
        <a 
          key={item} 
          href={`#${item.toLowerCase().replace(/\s/g, '')}`} 
          className="text-[11px] font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors focus:outline-none focus:text-indigo-400"
          aria-label={`Navigate to ${item} section`}
        >
          {item}
        </a>
      ))}
    </div>
    <div className="hidden sm:block">
       <a href="#getintouch" className="bg-white text-black text-[10px] font-bold px-6 py-2.5 rounded-full uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-colors">Hire Me</a>
    </div>
  </nav>
);

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [senderEmail, setSenderEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(senderEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    window.location.href = `mailto:${DEVELOPER_EMAIL}?subject=Contact Request from ${senderEmail}&body=Hi Soham, I'd like to connect. My email is ${senderEmail}.`;
  };

  return (
    <div className="min-h-screen selection:bg-indigo-500/30 overflow-x-hidden bg-[#050505] text-white">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-indigo-500 origin-left z-[60]" 
        style={{ scaleX }} 
        role="progressbar" 
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
      />
      
      <PlexusBackground />
      <Navbar />

      <main className="container mx-auto px-6 max-w-6xl">
        {/* Hero Section - Redesigned to fit user photo */}
        <section id="home" className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 pt-20" aria-labelledby="hero-title">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 w-fit px-6 py-1.5 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-[11px] font-bold tracking-widest text-indigo-300"
            >
              Engineering Student & Creative Developer
            </motion.div>

            <motion.h1 
              id="hero-title"
              className="text-5xl md:text-[6.5rem] font-black tracking-tight leading-[0.9] mb-12"
            >
              crafting <br />
              <span className="font-serif-italic text-indigo-400 italic">visionary</span><br />
              logic.
            </motion.h1>

            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-xl mb-12 leading-relaxed">
              Hello, I'm <span className="text-white font-bold">{DEVELOPER_NAME}</span>. I bridge the gap between complex engineering and elegant design.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <a 
                href="#projects" 
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-500 hover:scale-105 transition-all shadow-lg shadow-indigo-500/20 focus:ring-4 focus:ring-indigo-500/50 outline-none"
                aria-label="Scroll to projects section"
              >
                View My Work <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <div className="flex gap-4">
                <a href="https://github.com/sohamroyc" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all" aria-label="Soham's GitHub profile" target="_blank" rel="noreferrer">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/soham-roy-chowdhury-711426209/" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all" aria-label="Soham's LinkedIn profile" target="_blank" rel="noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all" aria-label="Soham's Instagram" target="_blank" rel="noreferrer">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* User Photo Container - Fitting the photo here */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative z-10 w-full aspect-[4/5] max-w-[450px] mx-auto group">
              {/* Photo Frame */}
              <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full opacity-50"></div>
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm">
                <LazyImage 
                  src={PROFILE_PHOTO} 
                  alt={`Portrait of ${DEVELOPER_NAME}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Floating Status Badge */}
                <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Available</span>
                </div>
              </div>

              {/* Decorative floating elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 bg-indigo-600/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Code2 className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase text-indigo-200 tracking-widest mb-1">Tech Stack</div>
                    <div className="text-sm font-black">C++ / React / ML</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 grid grid-cols-1 md:grid-cols-3 gap-6" aria-labelledby="about-heading">
          <h2 id="about-heading" className="sr-only">About Me</h2>
          <GlassCard className="md:col-span-2">
            <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">The Journey</h3>
            <p className="text-2xl md:text-3xl font-medium text-gray-200 leading-tight">
              {BIO}
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col justify-between">
            <div>
              <Cpu className="text-indigo-500 mb-4 w-5 h-5" aria-hidden="true" />
              <h4 className="text-xl font-bold tracking-tight">Eager to Learn</h4>
              <p className="text-sm text-gray-400">Currently exploring the depths of Backend Architecture and AI.</p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="text-4xl font-black">2025</div>
              <div className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Graduation Year</div>
            </div>
          </GlassCard>

          <GlassCard id="skills">
            <Layers className="text-indigo-500 mb-4 w-5 h-5" aria-hidden="true" />
            <h4 className="text-xl font-bold mb-4">Tech Arsenal</h4>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Skills and Technologies">
              {TECH_STACK.map(tech => (
                <span 
                  key={tech} 
                  role="listitem"
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-tight text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="md:col-span-2">
            <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">Philosophy</h3>
            <p className="text-xl font-medium text-gray-300 leading-relaxed italic">
              "{EXTRA_BIO}"
            </p>
          </GlassCard>
        </section>

        {/* Journey Section */}
        <section id="journey" className="py-24 relative" aria-labelledby="journey-heading">
          <div className="mb-20 text-center">
             <h2 id="journey-heading" className="text-4xl md:text-7xl font-black tracking-tighter mb-4 uppercase">My Journey</h2>
             <p className="text-gray-400 font-medium">Tracing the path of growth and learning.</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" aria-hidden="true"></div>

            <div className="space-y-24 md:space-y-48">
              {JOURNEY_ITEMS.map((item, idx) => (
                <article key={idx} className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`} aria-label={`Milestone: ${item.title} in ${item.year}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full md:w-1/2 px-4 md:px-12"
                  >
                    <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 group bg-gray-900 shadow-xl">
                      <LazyImage 
                        src={item.image} 
                        alt={`Photo related to ${item.title}`} 
                        className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </motion.div>

                  <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-12 h-12 bg-[#050505] border border-white/20 rounded-full items-center justify-center z-10" aria-hidden="true">
                    <div className="text-indigo-500">{item.icon}</div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`w-full md:w-1/2 px-4 md:px-12 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                  >
                    <span className="text-4xl md:text-6xl font-black text-white/10 mb-2 block" aria-hidden="true">{item.year}</span>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 justify-start md:justify-[inherit]">
                       {idx % 2 !== 0 && <span className="md:hidden text-indigo-500" aria-hidden="true">{item.icon}</span>}
                       {item.title}
                       {idx % 2 === 0 && <span className="md:hidden text-indigo-500" aria-hidden="true">{item.icon}</span>}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed max-w-lg mx-auto md:mx-[inherit]">
                      {item.achievement}
                    </p>
                  </motion.div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24" aria-labelledby="projects-heading">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 id="projects-heading" className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Selected Work</h2>
              <p className="text-gray-400 mt-2 font-medium">Building bridges with logic.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
                aria-label={`Project: ${project.title}`}
              >
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-900 mb-6 border border-white/5 relative">
                  <LazyImage 
                    src={project.image} 
                    alt={`Preview image for project ${project.title}`} 
                    className="w-full h-full grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                     <a 
                        href={project.link} 
                        className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-colors outline-none focus:ring-2 focus:ring-white"
                        aria-label={`View details for ${project.title}`}
                      >
                        View Details <ExternalLink className="w-3 h-3" aria-hidden="true" />
                     </a>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-2 font-medium">{project.description}</p>
                <div className="flex gap-2" role="list" aria-label="Project technologies">
                  {project.tags.map(tag => (
                    <span key={tag} role="listitem" className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{tag}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="getintouch" className="py-32 mb-20" aria-labelledby="contact-heading">
          <GlassCard className="flex flex-col items-center text-center p-12 md:p-32 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full group-hover:bg-indigo-500/20 transition-all" aria-hidden="true"></div>
            <h2 id="contact-heading" className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] relative z-10 uppercase">
              Let's build <br /> together.
            </h2>
            <p className="text-gray-300 max-w-sm mb-12 text-sm md:text-base font-medium relative z-10">
              I believe in waking up each day eager to make a difference. Enter your email to start a conversation.
            </p>
            
            <form onSubmit={handleConnectSubmit} className="relative z-10 w-full max-w-md space-y-4" aria-label="Contact form">
              <div className="relative">
                <input 
                  type="email"
                  placeholder="Your professional email address"
                  value={senderEmail}
                  onChange={(e) => {
                    setSenderEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  className={`w-full bg-white/5 border ${emailError ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-gray-500 text-white`}
                  aria-label="Your email address"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
                <AnimatePresence>
                  {emailError && (
                    <motion.div 
                      id="email-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 -bottom-6 flex items-center gap-1.5 text-red-500 text-[10px] font-bold uppercase tracking-wider"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {emailError}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-white text-black text-lg font-bold py-4 rounded-2xl hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center gap-3 focus:ring-4 focus:ring-white/30 outline-none"
                aria-label="Submit contact request to open mail client"
              >
                Get In Touch <Mail className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </form>
          </GlassCard>
        </section>
      </main>

      <footer className="p-8 md:p-12 border-t border-white/5 bg-black/40 backdrop-blur-xl mt-20" role="contentinfo">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <div aria-label={`Copyright ${new Date().getFullYear()} ${DEVELOPER_NAME}`}>© {new Date().getFullYear()} {DEVELOPER_NAME.toUpperCase()}.</div>
          <div className="flex gap-8">
            <a href="https://github.com/sohamroyc" className="hover:text-white transition-colors focus:outline-none focus:text-indigo-400" aria-label="Visit Soham's GitHub profile" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/soham-roy-chowdhury-711426209/" className="hover:text-white transition-colors focus:outline-none focus:text-indigo-400" aria-label="Visit Soham's LinkedIn profile" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors focus:outline-none focus:text-indigo-400" aria-label="Visit Soham's Instagram profile" target="_blank" rel="noreferrer">Instagram</a>
          </div>
          <div className="flex items-center gap-2" aria-label="Current status: Online & Ready to Collaborate">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" aria-hidden="true"></div>
            Online & Ready to Collaborate
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
