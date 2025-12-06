import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Dumbbell, ChevronRight, MapPin, Clock, Phone, MessageCircle, Send, Calculator, RefreshCw, Activity, Quote } from 'lucide-react';

// --- 3D Card Component ---
export const TiltCard = ({ title, icon: Icon, desc }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  };

  const rotateX = useTransform(mouseY, [-100, 100], [15, -15]); 
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);

  return (
    <motion.div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        style={{ rotateX, rotateY }}
        className="h-full bg-zinc-900 border border-zinc-800 p-8 rounded-2xl relative overflow-hidden group hover:border-neon-green transition-colors duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex flex-col items-center text-center h-full">
          <div className="bg-zinc-800 p-4 rounded-full mb-6 group-hover:bg-neon-green group-hover:text-black transition-colors duration-300">
            <Icon size={32} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-wider">{title}</h3>
          <p className="text-zinc-400 leading-relaxed">{desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Hero Section ---
export const HeroSection = ({ onCtaClick }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.9),rgba(0,0,0,1)),url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center bg-fixed" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.1)_0%,transparent_70%)]" />
      
      <motion.div style={{ opacity, scale, y }} className="relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-neon-green font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base">Welcome to the Future of Fitness</h2>
          <h1 className="text-5xl md:text-9xl font-black italic tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 drop-shadow-2xl">
            BUILD YOUR<br />LEGACY
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg mb-10">
            Experience the ultimate transformation at Elite Fitness. High-end equipment, professional coaching, and a community driven by results.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={onCtaClick} className="bg-neon-green text-black px-8 py-4 rounded-none font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Member Login <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// --- About Us ---
export const AboutUs = () => {
  return (
    <div className="pt-24 pb-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black italic uppercase text-white mb-6">Our <span className="text-neon-green">Story</span></h1>
        <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Established in 2015, Elite Fitness wasn't just built to be a gym. It was built to be a sanctuary for those who refuse to be average.
        </p>
      </div>

      <div className="bg-zinc-900 border-y border-zinc-800 py-12 mb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
           {[
             { label: "Active Members", val: "1,500+" },
             { label: "Years of Excellence", val: "9+" },
             { label: "Certified Trainers", val: "12" },
             { label: "Success Stories", val: "500+" }
           ].map((stat, i) => (
             <div key={i}>
               <h3 className="text-4xl font-black text-white mb-1">{stat.val}</h3>
               <p className="text-neon-green uppercase text-xs tracking-widest font-bold">{stat.label}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

// --- Contact Us ---
export const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', type: 'Membership', message: '' });

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    const phoneNumber = "94771234567";
    const text = `Hi Elite Fitness,%0A%0AMy Name: ${formData.name}%0AInquiry Type: ${formData.type}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="pt-24 pb-12 animate-fade-in min-h-screen">
       <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black italic uppercase text-white mb-4">Get In <span className="text-neon-green">Touch</span></h1>
            <p className="text-zinc-400">We are here to help you start your journey.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="space-y-6">
                <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 flex items-start gap-6 hover:border-neon-green transition-colors">
                   <div className="bg-black p-4 rounded-full text-neon-green"><MapPin size={24}/></div>
                   <div>
                      <h3 className="text-xl font-bold text-white mb-2 uppercase">Visit Us</h3>
                      <p className="text-zinc-400">123, Fitness Avenue,<br/>Colombo 07, Sri Lanka.</p>
                   </div>
                </div>
                <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 flex items-start gap-6 hover:border-neon-green transition-colors">
                   <div className="bg-black p-4 rounded-full text-neon-green"><Clock size={24}/></div>
                   <div>
                      <h3 className="text-xl font-bold text-white mb-2 uppercase">Opening Hours</h3>
                      <p className="text-zinc-400">Mon - Fri: 5:00 AM - 10:00 PM</p>
                      <p className="text-zinc-400">Sat - Sun: 6:00 AM - 08:00 PM</p>
                   </div>
                </div>
                <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 flex items-start gap-6 hover:border-neon-green transition-colors">
                   <div className="bg-black p-4 rounded-full text-neon-green"><Phone size={24}/></div>
                   <div>
                      <h3 className="text-xl font-bold text-white mb-2 uppercase">Call Us</h3>
                      <p className="text-zinc-400">+94 11 234 5678</p>
                      <p className="text-zinc-400">+94 77 123 4567</p>
                   </div>
                </div>
             </div>

             <div className="bg-black border border-zinc-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 rounded-full blur-3xl pointer-events-none"/>
                <h3 className="text-2xl font-bold text-white mb-6 uppercase flex items-center gap-2">
                   <MessageCircle className="text-green-500"/> Chat on WhatsApp
                </h3>
                <form onSubmit={handleWhatsAppSend} className="space-y-6">
                   <div>
                      <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Your Name</label>
                      <input 
                        type="text" required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-4 text-white focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                   </div>
                   <div>
                      <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Inquiry Type</label>
                      <select 
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-4 text-white focus:border-green-500 focus:outline-none transition-colors"
                      >
                          <option>Membership Inquiry</option>
                          <option>Personal Training</option>
                          <option>Nutrition Plans</option>
                          <option>Other</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Message</label>
                      <textarea 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full h-32 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-4 text-white focus:border-green-500 focus:outline-none transition-colors resize-none"
                        placeholder="Hi, I would like to know about..."
                      />
                   </div>
                   <button type="submit" className="w-full bg-[#25D366] text-black font-black uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                      <Send size={20}/> Send via WhatsApp
                   </button>
                </form>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Success Stories ---
export const SuccessStories = () => {
  const stories = [
    { name: "Ruwan Fernado", lost: "25kg", time: "8 Months", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600" },
    { name: "Dilhani Perera", lost: "15kg", time: "6 Months", img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=600" },
    { name: "Aruna Silva", lost: "Muscle Gain", time: "1 Year", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600" },
  ];

  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase mb-4">Real <span className="text-neon-green">Results</span></h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">Real people, real stories. See how our members transformed their lives.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <div key={i} className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-neon-green transition-all duration-500">
              <img src={story.img} alt={story.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-black italic uppercase text-white mb-2">{story.name}</h3>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <div className="bg-neon-green/20 border border-neon-green/50 p-3 rounded-lg flex-1 text-center backdrop-blur-sm">
                    <span className="block text-xs uppercase text-neon-green font-bold">Result</span>
                    <span className="text-white font-bold">{story.lost}</span>
                  </div>
                  <div className="bg-zinc-800/80 border border-zinc-700 p-3 rounded-lg flex-1 text-center backdrop-blur-sm">
                    <span className="block text-xs uppercase text-zinc-400 font-bold">Time</span>
                    <span className="text-white font-bold">{story.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- BMI Calculator ---
export const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');

  const calculateBMI = () => {
    if (height && weight) {
      const h = height / 100;
      const bmiValue = (weight / (h * h)).toFixed(1);
      setBmi(bmiValue);
      
      if (bmiValue < 18.5) setStatus({ text: 'Underweight', color: 'text-blue-400', width: '20%' });
      else if (bmiValue < 25) setStatus({ text: 'Normal', color: 'text-neon-green', width: '50%' });
      else if (bmiValue < 30) setStatus({ text: 'Overweight', color: 'text-yellow-400', width: '75%' });
      else setStatus({ text: 'Obese', color: 'text-red-500', width: '100%' });
    }
  };

  const reset = () => {
    setHeight(''); setWeight(''); setBmi(null); setStatus('');
  };

  return (
    <section className="py-24 bg-black border-t border-zinc-900 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="text-neon-green" size={32} />
              <h2 className="text-3xl md:text-4xl font-black italic uppercase text-white">BMI <span className="text-neon-green">Check</span></h2>
            </div>
            <p className="text-zinc-400 mb-8 leading-relaxed">Find out if you are in the healthy range.</p>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Height (cm)</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-4 text-white text-lg focus:border-neon-green focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Weight (kg)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-4 text-white text-lg focus:border-neon-green focus:outline-none transition-colors" />
              </div>
              <div className="flex gap-4 pt-2">
                <button onClick={calculateBMI} className="flex-1 bg-neon-green text-black font-black uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">Calculate</button>
                <button onClick={reset} className="w-16 bg-zinc-800 text-white rounded-lg flex items-center justify-center hover:bg-zinc-700 transition-colors"><RefreshCw size={20} /></button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-black rounded-2xl p-8 border border-zinc-800 h-full flex flex-col justify-center items-center text-center relative overflow-hidden">
            {bmi ? (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full">
                <p className="text-zinc-500 uppercase text-sm tracking-widest font-bold mb-2">Your BMI Score</p>
                <h3 className="text-7xl font-black text-white mb-2">{bmi}</h3>
                <p className={`text-2xl font-bold uppercase italic mb-8 ${status.color}`}>{status.text}</p>
                <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden mb-4 relative">
                  <motion.div initial={{ width: 0 }} animate={{ width: status.width }} transition={{ duration: 1, type: 'spring' }} className={`h-full ${status.text === 'Normal' ? 'bg-neon-green' : status.text === 'Underweight' ? 'bg-blue-400' : 'bg-red-500'}`} />
                </div>
              </motion.div>
            ) : (
              <div className="opacity-30">
                <Activity size={100} className="text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-500 uppercase tracking-widest font-bold">Enter details to calculate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};