import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ArrowUpRight, Code, Database, Brain, X, ChevronRight, Layers 
} from 'lucide-react';

// --- DATA (Tetap sama) ---
const profile = {
  name: "Wilbert Coandadiputra",
  title: "AI & Data Science Engineer",
  summary: "Master's graduate of Computer Science (GPA 4.00/4.00). Expert in Swarm Intelligence, Hybrid Neural Networks, and Big Data Architecture.", 
  contacts: { email: "wilbert.coand@gmail.com", linkedin: "#", github: "#" }
};

const experience = [
  {
    id: "exp1",
    role: "Operations & System Staff",
    company: "Bina Nusantara University",
    period: "Jul 2025 - Present",
    shortDesc: "Maintained 3+ apps including Ping! & AI services. Improved efficiency by 35% for 2300+ users.",
    details: ["Maintained and updated 3+ applications.", "Improving existing applications efficiency by 35%.", "Enhancing user experience for 2300++ students."]
  },
  {
    id: "exp2",
    role: "Subject Coordinator",
    company: "Bina Nusantara University",
    period: "Feb 2024 - Jul 2025",
    shortDesc: "Supervised laboratory courses. Led RIG to win 1st place in Cheat-Prevention System.",
    details: ["Supervised courses, improving efficiency by 30%.", "Produced video-based-learning increasing passing grade by 20%.", "Guided RIG in Cheat-Prevention System (1st Winner)."]
  },
  {
    id: "exp3",
    role: "App Developer Intern",
    company: "Bina Nusantara University",
    period: "Feb 2024 - Sep 2024",
    shortDesc: "Developed 'MeetLecturer' & ML model for graduation prediction (~89% accuracy).",
    details: ["Developed MeetLecturer platform.", "Improved coordination efficiency by 65%.", "Implemented ML classification model (~89% accuracy)."]
  }
];

const projects = [
  {
    id: "proj1",
    title: "Ping! - Command App",
    tech: ["RAG", "LangGraph", "ChromaDB"],
    shortDesc: "Centralized command app using RAG for context-aware responses.",
    details: ["Centralized chat & command execution.", "Integrated RAG with LangGraph.", "Real-time chat via WebSocket."]
  },
  {
    id: "proj2",
    title: "Walmart Big Data",
    tech: ["Hadoop", "Spark", "Kafka", "Neo4J"],
    shortDesc: "Distributed AI pipeline with real-time streaming & churn prediction.",
    details: ["Implemented Hadoop ecosystem.", "Real-time streaming with Kafka.", "Spark MLlib for churn prediction."]
  },
  {
    id: "proj3",
    title: "SuaraNusa",
    tech: ["GenAI", "IoT", "RAG", "Gemini"],
    shortDesc: "GarudaHacks Finalist. Cultural platform with AI translation.",
    details: ["NusaTech: IoT + AI translation.", "NusaPedia: Historical chatbot (RAG).", "GarudaHacks 6.0 Finalist."]
  },
  {
    id: "proj4",
    title: "Bi-Eye Proctoring",
    tech: ["CV", "Tauri", "Haarcascade"],
    shortDesc: "AI desktop app detecting suspicious head movements during exams.",
    details: ["Desktop app using Tauri.", "Computer Vision pipeline for head tracking.", "Detects suspicious behavior."]
  }
];

const skills = [
  { category: "Languages", items: ["Python", "JavaScript", "C", "SQL", "Golang"] },
  { category: "Big Data", items: ["Spark", "Hadoop", "Kafka", "Neo4J", "Cloudera"] },
  { category: "AI/ML", items: ["PyTorch", "TensorFlow", "RAG", "LLMs", "Transformers"] },
  { category: "Stack", items: ["React", "Docker", "Next.js", "Flask", "Tauri"] }
];

// --- VISUAL COMPONENTS ---

// Background Blobs untuk efek Liquid Glass agar terlihat
const BackgroundGradient = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
    <motion.div 
      animate={{ 
        x: [0, 100, 0], 
        y: [0, -50, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-neutral-800/30 rounded-full blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        x: [0, -100, 0], 
        y: [0, 50, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-neutral-900/40 rounded-full blur-[120px]" 
    />
     <motion.div 
      animate={{ opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-slate-800/20 rounded-full blur-[100px]" 
    />
  </div>
);

const Modal = ({ item, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!item) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      {/* Glassmorphism Modal */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto 
                   bg-neutral-900/80 backdrop-blur-2xl border border-white/10 
                   rounded-2xl shadow-2xl p-8"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors"><X size={24}/></button>
        <h3 className="text-2xl font-bold text-white mb-1">{item.title || item.role}</h3>
        <p className="text-neutral-400 font-mono text-sm mb-6">{item.company ? `${item.company} • ` : ''}{item.period}</p>
        
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest border-b border-white/5 pb-2">Key Details</h4>
          <ul className="space-y-3">
            {item.details?.map((detail, i) => (
              <li key={i} className="flex gap-3 text-neutral-300 text-sm leading-relaxed">
                <ChevronRight size={16} className="mt-1 text-white/50 shrink-0"/> {detail}
              </li>
            ))}
          </ul>
        </div>
        {item.tech && (
          <div className="mt-8 pt-6 border-t border-white/5">
             <div className="flex flex-wrap gap-2">
               {item.tech.map((t, i) => (
                 <span key={i} className="text-xs text-white bg-white/10 px-3 py-1 rounded-full border border-white/5 shadow-sm">
                   {t}
                 </span>
               ))}
             </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const GlassCard = ({ item, onClick }) => (
  <motion.div 
    layoutId={item.id}
    onClick={() => onClick(item)}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover="hover"
    className="group relative p-8 rounded-2xl cursor-pointer overflow-hidden transition-all duration-500
               bg-white/[0.03] hover:bg-white/[0.06] 
               backdrop-blur-xl border border-white/5 hover:border-white/20 
               shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
    
    <motion.div 
      variants={{ hover: { x: 5, y: -5, opacity: 1 } }}
      initial={{ opacity: 0.3 }}
      className="absolute top-6 right-6 text-neutral-400 group-hover:text-white transition-all"
    >
      <ArrowUpRight size={22} />
    </motion.div>

    <div className="relative z-10">
      <h3 className="text-xl font-bold text-neutral-100 group-hover:text-white mb-1">{item.title || item.role}</h3>
      <div className="text-neutral-400 text-xs font-medium mb-4">{item.company || "Project"}</div>
      <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:text-neutral-300 transition-colors">{item.shortDesc}</p>
      <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 group-hover:text-white transition-colors">
        <Layers size={12}/> <span>View Details</span>
      </div>
    </div>
  </motion.div>
);

const SectionHeading = ({ children }) => (
  <motion.h2 
    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
    className="text-4xl font-bold text-white mb-16 flex items-center gap-4 tracking-tight"
  >
    {children} <span className="text-neutral-800 text-2xl">/</span>
  </motion.h2>
);

export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState(null);
  
  // --- PARALLAX SETUP ---
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  // Parallax Values: Different speeds for depth effect
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]); // Moves Fast
  const ySub = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);   // Moves Slow
  const opacityHero = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <BackgroundGradient /> {/* Background Blobs */}
      
      <AnimatePresence>
        {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>

      {/* Navbar Glass */}
      <nav className="fixed top-0 w-full z-40 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="font-bold text-xl text-white tracking-tighter">WC.</div>
          <div className="flex gap-6">
            {[Mail, Linkedin, Github].map((Icon, i) => (
               <a key={i} href="#" className="text-neutral-400 hover:text-white transition-colors"><Icon size={20}/></a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO PARALLAX SECTION */}
      <section ref={ref} className="h-screen flex flex-col justify-center px-6 relative perspective-1000">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-3 gap-10 pt-20 relative z-10">
          <motion.div style={{ y: yTitle, opacity: opacityHero }} className="md:col-span-2">
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration: 0.8 }}
              className="inline-block px-3 py-1 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm text-neutral-400 text-xs font-mono uppercase tracking-widest"
            >
              Portfolio & Resume
            </motion.div>
<h1 className="text-4xl sm:text-7xl md:text-9xl font-bold text-white mb-6 tracking-tighter leading-[0.9]">
  WILBERT<br/>COANDADIPUTRA
</h1>
            <motion.p style={{ y: ySub }} className="text-2xl text-neutral-300 max-w-lg font-light leading-snug">
              {profile.title}
            </motion.p>
            <br></br>
            <motion.div 
             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
             className="hidden md:flex flex-col justify-end pb-4"
          >
            <p className="text-neutral-400 text-sm text-justify leading-relaxed border-t border-neutral-800 pt-6">
              {profile.summary}
            </p>
          </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-600"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-neutral-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* Experience Grid */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <SectionHeading>Experience</SectionHeading>
        <div className="grid md:grid-cols-3 gap-6">
          {experience.map((exp) => <GlassCard key={exp.id} item={exp} onClick={setSelectedItem} />)}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-32 px-6 bg-black/30 border-y border-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>Selected Projects</SectionHeading>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => <GlassCard key={project.id} item={project} onClick={setSelectedItem} />)}
          </div>
        </div>
      </section>

      {/* Skills & Education */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <SectionHeading>Education</SectionHeading>
            <div className="space-y-8 border-l border-white/10 ml-2 pl-8">
              {[
                { deg: "Master of Computer Science", school: "BINUS University", gpa: "4.00", year: "2024-2026" },
                { deg: "Bachelor of Computer Science", school: "BINUS University", gpa: "3.98", year: "2021-2024" }
              ].map((edu, idx) => (
                <div key={idx} className="relative group">
                  <span className="absolute -left-[37px] top-2 w-4 h-4 bg-neutral-900 rounded-full border border-neutral-700 group-hover:bg-white group-hover:border-white transition-all"></span>
                  <h3 className="text-xl font-bold text-white">{edu.deg}</h3>
                  <div className="text-neutral-400">{edu.school}</div>
                  <div className="text-sm text-neutral-500 mt-2 font-mono flex gap-3">
                    <span className="bg-white/5 px-2 py-1 rounded">{edu.year}</span>
                    <span className="bg-white/5 px-2 py-1 rounded text-white">GPA {edu.gpa}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading>Skills</SectionHeading>
            <div className="grid grid-cols-1 gap-10">
              {skills.map((skillGroup, idx) => (
                <div key={idx}>
                  <h4 className="text-white font-bold mb-4 flex items-center gap-3 text-sm uppercase tracking-widest opacity-70">
                    {skillGroup.category === 'AI/ML' ? <Brain size={16}/> : 
                     skillGroup.category === 'Big Data' ? <Database size={16}/> : <Code size={16}/>}
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.items.map((item, i) => (
                      <motion.span 
                        key={i} 
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        className="text-sm text-neutral-300 bg-white/[0.03] border border-white/10 px-4 py-2 rounded-lg cursor-default transition-colors"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 bg-black text-center">
        <div className="text-neutral-600 text-sm font-mono">© {new Date().getFullYear()} Wilbert Coandadiputra</div>
      </footer>
    </div>
  );
}