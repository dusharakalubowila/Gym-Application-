import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Menu, X, LogOut, ChevronRight, Instagram, Facebook, Twitter, Youtube, Quote, Users, Utensils } from 'lucide-react';
import { HeroSection, AboutUs, ContactUs, SuccessStories, BMICalculator, TiltCard } from './components/LandingSections';
import { AuthForm, AdminDashboard, UserDashboard } from './components/Dashboards';

export default function App() {
  const [view, setView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Demo Data
  const [users, setUsers] = useState([
    { 
      id: 1, username: 'kamal', password: '123', fullName: 'Kamal Perera', email: 'kamal@gmail.com', address: '123, Main St, Colombo', age: 24, mobile: '0771234567', weight: 75, height: 175, role: 'user', 
      schedule: { 
          Mon: { focus: 'Chest & Triceps', exercises: 'Bench Press: 4 sets x 10 reps\nIncline DB Press: 3 sets x 12 reps\nCable Flys: 3 sets x 15 reps\nTricep Pushdowns: 4 sets x 12 reps' }, 
          Tue: { focus: 'Back & Biceps', exercises: 'Lat Pulldowns: 4 sets x 10 reps\nBent Over Rows: 3 sets x 10 reps\nBarbell Curls: 3 sets x 12 reps' }, 
          Wed: { focus: 'Rest', exercises: 'Active recovery. Light walk.' }, 
          Thu: { focus: 'Legs', exercises: 'Squats: 5 sets x 8 reps\nLeg Press: 4 sets x 12 reps\nCalf Raises: 4 sets x 20 reps' }, 
          Fri: { focus: 'Shoulders', exercises: 'Overhead Press: 4 sets x 8 reps\nLateral Raises: 4 sets x 15 reps' }, 
          Sat: { focus: 'Cardio & Abs', exercises: 'Treadmill: 20 mins\nPlanks: 3 sets x 1 min' }, 
          Sun: { focus: 'Rest', exercises: 'Full rest.' } 
      },
      mealPlan: {
          Mon: 'Breakfast: Oatmeal with banana\nLunch: Grilled Chicken & Rice\nDinner: Fish & Salad',
          Tue: 'Breakfast: Scrambled Eggs\nLunch: Tuna Sandwich\nDinner: Chicken Soup',
          Wed: 'Breakfast: Smoothie\nLunch: Rice & Curry\nDinner: Lean Beef & Veggies',
          Thu: 'Breakfast: Oatmeal\nLunch: Grilled Chicken\nDinner: Salad',
          Fri: 'Breakfast: Eggs & Toast\nLunch: Pasta with Chicken\nDinner: Fish',
          Sat: 'Breakfast: Pancakes (Healthy)\nLunch: Rice & Chicken\nDinner: Soup',
          Sun: 'Cheat Meal (Moderate)'
      }
    }
  ]);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const handleLogin = (userData) => { setCurrentUser(userData); setView('dashboard'); };
  const handleLogout = () => { setCurrentUser(null); setView('home'); };

  const renderContent = () => {
    if (view === 'login') return <AuthForm onLogin={handleLogin} users={users} />;
    if (view === 'about') return <AboutUs />;
    if (view === 'contact') return <ContactUs />;
    if (view === 'dashboard' && currentUser) return currentUser.role === 'admin' ? <AdminDashboard users={users} setUsers={setUsers} /> : <UserDashboard user={currentUser} />;

    return (
      <>
        <HeroSection onCtaClick={() => setView('login')} />
        <section id="features" className="py-24 bg-black relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase mb-4">Why Choose <span className="text-neon-green">Elite?</span></h2>
              <div className="w-24 h-1 bg-neon-green mx-auto" />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-auto md:h-96">
              {[
                { title: "Advanced Equipment", icon: Dumbbell, desc: "Latest biomechanics technology for maximum muscle isolation and safety." },
                { title: "Expert Coaching", icon: Users, desc: "Certified trainers dedicated to pushing your limits and perfecting your form." },
                { title: "Nutrition Plans", icon: Utensils, desc: "Customized meal prep guides to fuel your body and accelerate recovery." },
              ].map((feature, idx) => ( <TiltCard key={idx} {...feature} /> ))}
            </div>
          </div>
        </section>

        <section id="coaches" className="py-24 bg-zinc-900 border-t border-zinc-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-neon-green/5 skew-x-12 transform origin-top-right pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-neon-green shadow-[0_0_50px_rgba(204,255,0,0.3)] z-10 relative">
                      <img src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=800" alt="Sampath Silva" className="w-full h-full object-cover transition-all duration-500" />
                  </div>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-[-20px] border border-dashed border-zinc-600 rounded-full z-0 opacity-50" />
                </div>
              </div>
              <div className="w-full md:w-2/3 text-left">
                <div className="mb-8">
                  <h2 className="text-4xl md:text-7xl font-black italic uppercase text-white mb-2">Sampath <span className="text-neon-green">Silva</span></h2>
                  <h3 className="text-xl text-zinc-400 font-bold tracking-widest uppercase mb-6 flex items-center gap-2"><div className="w-8 h-1 bg-neon-green"/> Head Coach & Founder</h3>
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-6 text-zinc-800 transform -scale-x-100" size={64} />
                    <p className="text-zinc-300 text-lg leading-relaxed relative z-10 font-medium">"Fitness is not just about building a body; it's about building a mindset. My mission is to push you beyond your limits and help you discover the strength you never knew you had."</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl relative group bg-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
                  <video autoPlay loop muted playsInline className="w-full h-64 md:h-80 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    <source src="https://static.videezy.com/system/resources/previews/000/005/030/original/P1030248.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /><span className="text-red-500 font-bold uppercase text-xs tracking-widest">Live Action</span></div>
                    <h4 className="text-white font-bold uppercase text-xl italic">Training in Progress</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <BMICalculator />
        <SuccessStories />
      </>
    );
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden selection:bg-zinc-800 selection:text-neon-green">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
              <Dumbbell className="text-neon-green transform -rotate-45" size={32} />
              <span className="text-2xl font-black tracking-tighter italic">ELITE<span className="text-neon-green">FITNESS</span></span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex gap-8 font-medium text-sm tracking-widest uppercase">
                <button onClick={() => setView('home')} className={`hover:text-neon-green transition-colors ${view === 'home' ? 'text-neon-green' : ''}`}>Home</button>
                <button onClick={() => setView('about')} className={`hover:text-neon-green transition-colors ${view === 'about' ? 'text-neon-green' : ''}`}>About</button>
                <button onClick={() => setView('contact')} className={`hover:text-neon-green transition-colors ${view === 'contact' ? 'text-neon-green' : ''}`}>Contact</button>
                {currentUser && <button onClick={() => setView('dashboard')} className={`hover:text-neon-green transition-colors ${view === 'dashboard' ? 'text-neon-green' : ''}`}>Dashboard</button>}
              </div>
              {currentUser ? (
                <div className="flex items-center gap-4"><span className="text-xs uppercase font-bold text-zinc-400">Hi, {currentUser.fullName || currentUser.name}</span><button onClick={handleLogout} className="bg-zinc-800 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"><LogOut size={18} /></button></div>
              ) : (
                <button onClick={() => setView('login')} className="bg-neon-green text-black px-6 py-2 rounded-full font-bold uppercase text-sm tracking-wider hover:bg-white hover:shadow-neon transition-all duration-300">Member Area</button>
              )}
            </div>
            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>{isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
          </div>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden pt-4 pb-2 border-t border-zinc-800 mt-4 overflow-hidden">
                <div className="flex flex-col gap-4 font-medium text-sm tracking-widest uppercase text-center">
                  <button onClick={() => { setView('home'); setIsMobileMenuOpen(false); }} className="py-2 hover:text-neon-green transition-colors">Home</button>
                  <button onClick={() => { setView('about'); setIsMobileMenuOpen(false); }} className="py-2 hover:text-neon-green transition-colors">About</button>
                  <button onClick={() => { setView('contact'); setIsMobileMenuOpen(false); }} className="py-2 hover:text-neon-green transition-colors">Contact</button>
                  {currentUser && <button onClick={() => { setView('dashboard'); setIsMobileMenuOpen(false); }} className="py-2 hover:text-neon-green transition-colors">Dashboard</button>}
                  {currentUser ? (
                    <div className="flex flex-col items-center gap-4 pt-4 border-t border-zinc-800"><span className="text-xs uppercase font-bold text-zinc-400">Hi, {currentUser.fullName || currentUser.name}</span><button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 text-red-500"><LogOut size={18} /> Logout</button></div>
                  ) : (
                    <button onClick={() => { setView('login'); setIsMobileMenuOpen(false); }} className="bg-neon-green text-black px-6 py-3 rounded-full font-bold uppercase text-sm tracking-wider mt-2">Member Area</button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      <main className="pt-20">{renderContent()}</main>
      <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-900 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-6"><Dumbbell className="text-neon-green transform -rotate-45" size={24} /><span className="text-2xl font-black tracking-tighter italic text-white">ELITE<span className="text-neon-green">FITNESS</span></span></div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">More than just a gym. We are a community dedicated to physical excellence and mental toughness.</p>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Quick Links</h4>
              <ul className="space-y-4 text-zinc-400 text-sm"><li><button onClick={() => setView('home')}>Home</button></li><li><button onClick={() => setView('about')}>About Us</button></li><li><button onClick={() => setView('contact')}>Contact</button></li></ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Connect</h4>
              <div className="flex gap-4">{[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (<a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-neon-green hover:text-black transition-all"><Icon size={18} /></a>))}</div>
            </div>
          </div>
          <div className="border-t border-zinc-900 pt-8 text-center"><p className="text-zinc-600 text-xs uppercase tracking-widest">© 2024 Elite Fitness Gym. All Rights Reserved.</p></div>
        </div>
      </footer>
    </div>
  );
}