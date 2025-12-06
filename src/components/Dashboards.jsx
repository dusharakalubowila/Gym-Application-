import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, User, Activity, Play, Plus, Edit, Trash2, Save, X, Utensils, Dumbbell } from 'lucide-react';

// --- Input Helper ---
const InputField = ({ label, type, placeholder, value, onChange, name, required = false }) => (
  <div className="mb-4">
    <label className="block text-neon-green text-xs uppercase tracking-widest mb-2 font-bold">{label}</label>
    <input 
      type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required}
      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all placeholder:text-zinc-600"
    />
  </div>
);

// --- Auth Form ---
export const AuthForm = ({ onLogin, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (username === 'admin' && password === 'admin123') {
      onLogin({ id: 'admin', name: 'Administrator', role: 'admin' });
      return;
    }

    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      onLogin(foundUser);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-black border border-zinc-800 p-8 md:p-12 rounded-3xl w-full max-w-md relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent" />
        <h2 className="text-3xl font-black italic text-white mb-2 uppercase">Welcome Back</h2>
        <p className="text-zinc-400 mb-8 text-sm">Enter your credentials to access your dashboard.</p>
        
        {error && <div className="bg-red-500/10 text-red-500 p-3 rounded mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <InputField label="Username" type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <InputField label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-neon-green text-black font-black uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors mt-4">Sign In</button>
        </form>

        <div className="mt-8 p-3 bg-zinc-900/50 rounded text-xs text-zinc-600 text-center">
          <p>Admin Login: admin / admin123</p>
          <p>Demo User: kamal / 1234</p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Admin Components ---
const MemberModal = ({ isOpen, onClose, onSave, editingUser }) => {
  const [formData, setFormData] = useState({ username: '', password: '', fullName: '', email: '', address: '', age: '', mobile: '', weight: '', height: '' });

  useEffect(() => {
    if (editingUser) setFormData(editingUser);
    else setFormData({ username: '', password: '', fullName: '', email: '', address: '', age: '', mobile: '', weight: '', height: '' });
  }, [editingUser, isOpen]);

  if (!isOpen) return null;
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900 z-10">
          <h3 className="text-xl font-bold text-white">{editingUser ? 'Edit Member' : 'Add New Member'}</h3>
          <button onClick={onClose}><X className="text-zinc-400 hover:text-white" /></button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Username" name="username" type="text" value={formData.username} onChange={handleChange} required />
          <InputField label="Password" name="password" type="text" value={formData.password} onChange={handleChange} required />
          <div className="md:col-span-2"><InputField label="Full Name" name="fullName" type="text" value={formData.fullName} onChange={handleChange} required /></div>
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <InputField label="Mobile" name="mobile" type="text" value={formData.mobile} onChange={handleChange} />
          <div className="md:col-span-2"><InputField label="Address" name="address" type="text" value={formData.address} onChange={handleChange} /></div>
          <div className="grid grid-cols-3 gap-2 md:col-span-2">
             <InputField label="Age" name="age" type="number" value={formData.age} onChange={handleChange} />
             <InputField label="Weight (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} />
             <InputField label="Height (cm)" name="height" type="number" value={formData.height} onChange={handleChange} />
          </div>
        </div>
        <div className="p-6 border-t border-zinc-800 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-zinc-400 hover:text-white">Cancel</button>
          <button onClick={() => onSave(formData)} className="px-6 py-2 bg-neon-green text-black font-bold rounded hover:bg-white">Save Member</button>
        </div>
      </div>
    </div>
  );
};

const PlanEditor = ({ user, onUpdatePlan, onBack }) => {
  const [activeTab, setActiveTab] = useState('workout');
  const [schedule, setSchedule] = useState(() => {
    const defaultDays = { Mon: {}, Tue: {}, Wed: {}, Thu: {}, Fri: {}, Sat: {}, Sun: {} };
    const current = user.schedule || {};
    const merged = {};
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
      merged[day] = (typeof current[day] === 'string') ? { focus: current[day], exercises: '' } : (current[day] || { focus: '', exercises: '' });
    });
    return merged;
  });

  const [mealPlan, setMealPlan] = useState(() => {
    if (typeof user.mealPlan === 'string') {
       return { Mon: user.mealPlan, Tue: user.mealPlan, Wed: user.mealPlan, Thu: user.mealPlan, Fri: user.mealPlan, Sat: user.mealPlan, Sun: user.mealPlan };
    }
    return user.mealPlan || { Mon: '', Tue: '', Wed: '', Thu: '', Fri: '', Sat: '', Sun: '' };
  });

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const handleSave = () => onUpdatePlan(user.id, { schedule, mealPlan });
  const updateSchedule = (day, field, value) => setSchedule(prev => ({ ...prev, [day]: { ...prev[day], [field]: value } }));

  return (
    <div className="animate-fade-in pb-12">
       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-zinc-400 hover:text-white flex items-center gap-1 text-sm uppercase tracking-wider"><ChevronRight className="rotate-180" size={16}/> Back</button>
            <h2 className="text-2xl font-bold text-white">Plan For: <span className="text-neon-green">{user.fullName}</span></h2>
         </div>
         <button onClick={handleSave} className="bg-neon-green text-black px-6 py-3 rounded-full font-black uppercase tracking-widest hover:bg-white flex items-center gap-2 w-full md:w-auto justify-center"><Save size={20}/> Save All</button>
       </div>
       <div className="flex flex-col md:flex-row gap-4 mb-8">
         <button onClick={() => setActiveTab('workout')} className={`px-6 py-3 rounded-full font-bold uppercase text-sm tracking-wider transition-all ${activeTab === 'workout' ? 'bg-zinc-800 text-neon-green border border-neon-green' : 'bg-zinc-900 text-zinc-500 border border-transparent'}`}>Workout Schedule</button>
         <button onClick={() => setActiveTab('nutrition')} className={`px-6 py-3 rounded-full font-bold uppercase text-sm tracking-wider transition-all ${activeTab === 'nutrition' ? 'bg-zinc-800 text-neon-green border border-neon-green' : 'bg-zinc-900 text-zinc-500 border border-transparent'}`}>Meal Plans</button>
       </div>

       {activeTab === 'workout' ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {days.map(day => (
             <div key={day} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
               <div className="flex justify-between items-center mb-4"><span className="text-neon-green font-black uppercase text-xl">{day}</span><Dumbbell size={16} className="text-zinc-600" /></div>
               <label className="text-xs text-zinc-500 font-bold uppercase mb-1 block">Focus Area</label>
               <input type="text" value={schedule[day]?.focus || ''} onChange={(e) => updateSchedule(day, 'focus', e.target.value)} placeholder="e.g. Chest & Triceps" className="w-full bg-black border border-zinc-700 rounded px-3 py-2 text-white text-sm mb-4 focus:border-neon-green focus:outline-none" />
               <label className="text-xs text-zinc-500 font-bold uppercase mb-1 block">Detailed Exercises</label>
               <textarea value={schedule[day]?.exercises || ''} onChange={(e) => updateSchedule(day, 'exercises', e.target.value)} placeholder="e.g. Bench Press 3x10..." className="w-full h-32 bg-black border border-zinc-700 rounded px-3 py-2 text-white text-sm focus:border-neon-green focus:outline-none resize-none" />
             </div>
           ))}
         </div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {days.map(day => (
             <div key={day} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
               <div className="flex justify-between items-center mb-4"><span className="text-neon-green font-black uppercase text-xl">{day}</span><Utensils size={16} className="text-zinc-600" /></div>
               <label className="text-xs text-zinc-500 font-bold uppercase mb-1 block">Daily Meal Plan</label>
               <textarea value={mealPlan[day] || ''} onChange={(e) => setMealPlan({...mealPlan, [day]: e.target.value})} placeholder={`Breakfast: ... \nLunch: ...`} className="w-full h-48 bg-black border border-zinc-700 rounded px-3 py-2 text-white text-sm focus:border-neon-green focus:outline-none resize-none" />
             </div>
           ))}
         </div>
       )}
    </div>
  );
};

export const AdminDashboard = ({ users, setUsers }) => {
  const [activeView, setActiveView] = useState('list');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleSaveMember = (formData) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    } else {
      const newUser = { 
        ...formData, id: Date.now(), role: 'user', 
        schedule: { Mon: { focus: 'Rest', exercises: '' }, Tue: { focus: 'Rest', exercises: '' }, Wed: { focus: 'Rest', exercises: '' }, Thu: { focus: 'Rest', exercises: '' }, Fri: { focus: 'Rest', exercises: '' }, Sat: { focus: 'Rest', exercises: '' }, Sun: { focus: 'Rest', exercises: '' } },
        mealPlan: { Mon: 'Balanced Diet', Tue: 'Balanced Diet', Wed: 'Balanced Diet', Thu: 'Balanced Diet', Fri: 'Balanced Diet', Sat: 'Balanced Diet', Sun: 'Balanced Diet' }
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false); setEditingUser(null);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this member?')) setUsers(users.filter(u => u.id !== id));
  };

  const handleUpdatePlan = (userId, newPlanData) => {
    setUsers(users.map(u => u.id === userId ? { ...u, ...newPlanData } : u));
    alert('Plan updated successfully!');
  };

  return (
    <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
      <MemberModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingUser(null); }} onSave={handleSaveMember} editingUser={editingUser} />
      {activeView === 'list' ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div><h1 className="text-4xl font-black italic uppercase text-white">Admin <span className="text-neon-green">Control</span></h1><p className="text-zinc-400">Manage members and assign custom plans.</p></div>
            <button onClick={() => setIsModalOpen(true)} className="bg-neon-green text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-white flex items-center gap-2"><Plus size={20}/> Add Member</button>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-zinc-400 min-w-[800px] md:min-w-0">
                <thead className="text-xs uppercase tracking-widest border-b border-zinc-800 bg-zinc-950"><tr><th className="p-4">Name</th><th className="p-4">Username</th><th className="p-4">Mobile</th><th className="p-4">Stats</th><th className="p-4 text-right">Actions</th></tr></thead>
                <tbody className="text-sm">
                  {users.length === 0 ? (<tr><td colSpan="5" className="p-8 text-center">No members found.</td></tr>) : (
                    users.map((member) => (
                      <tr key={member.id} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/50 transition-colors">
                        <td className="p-4"><div className="font-bold text-white">{member.fullName}</div><div className="text-xs">{member.email}</div></td>
                        <td className="p-4 text-neon-green font-mono">{member.username}</td>
                        <td className="p-4">{member.mobile}</td>
                        <td className="p-4 text-xs"><span className="block">H: {member.height}cm</span><span className="block">W: {member.weight}kg</span></td>
                        <td className="p-4 text-right"><div className="flex justify-end gap-2">
                            <button onClick={() => { setSelectedUser(member); setActiveView('editPlan'); }} className="bg-zinc-800 hover:bg-neon-green hover:text-black p-2 rounded text-xs uppercase font-bold tracking-wider transition-colors">Plan</button>
                            <button onClick={() => { setEditingUser(member); setIsModalOpen(true); }} className="p-2 text-zinc-400 hover:text-white"><Edit size={16}/></button>
                            <button onClick={() => handleDelete(member.id)} className="p-2 text-zinc-400 hover:text-red-500"><Trash2 size={16}/></button>
                        </div></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <PlanEditor user={selectedUser} onUpdatePlan={handleUpdatePlan} onBack={() => { setActiveView('list'); setSelectedUser(null); }} />
      )}
    </div>
  );
};

// --- User Dashboard ---
const AccordionItem = ({ title, subTitle, children, isOpen, onClick }) => {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mb-3">
            <button onClick={onClick} className={`w-full p-4 flex items-center justify-between text-left transition-all ${isOpen ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'}`}>
                <div className="flex items-center gap-4"><span className={`font-black uppercase text-lg w-12 ${isOpen ? 'text-neon-green' : 'text-zinc-500'}`}>{title}</span><span className="text-white font-bold">{subTitle}</span></div>
                <ChevronDown className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>{isOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="p-6 bg-black/50 border-t border-zinc-800 text-zinc-300 whitespace-pre-line text-sm leading-relaxed">{children || "No details available."}</div></motion.div>)}</AnimatePresence>
        </div>
    );
};

export const UserDashboard = ({ user }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().toString().split(' ')[0];
  const [activeTab, setActiveTab] = useState('workout');
  const [expandedDay, setExpandedDay] = useState(today);

  const getSchedule = (day) => {
    const s = user.schedule?.[day];
    if (!s) return { focus: 'Rest', exercises: '' };
    if (typeof s === 'string') return { focus: s, exercises: '' };
    return s;
  };
  const getMeal = (day) => user.mealPlan?.[day] || (typeof user.mealPlan === 'string' ? user.mealPlan : "No meal plan.");
  const todayData = getSchedule(today);

  return (
    <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl text-center sticky top-24">
            <div className="w-32 h-32 bg-zinc-800 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-neon-green text-neon-green"><User size={64} /></div>
            <h2 className="text-2xl font-bold text-white mb-1 uppercase">{user.fullName}</h2>
            <p className="text-zinc-500 text-sm mb-6">{user.email}</p>
            <div className="bg-black p-4 rounded-xl border border-zinc-800 mb-6 text-left space-y-3">
              <div className="flex justify-between text-sm"><span className="text-zinc-400">Age</span> <span className="text-white font-bold">{user.age}</span></div>
              <div className="flex justify-between text-sm"><span className="text-zinc-400">Weight</span> <span className="text-white font-bold">{user.weight}kg</span></div>
              <div className="flex justify-between text-sm"><span className="text-zinc-400">Height</span> <span className="text-white font-bold">{user.height}cm</span></div>
            </div>
            <div className="p-4 bg-neon-green/10 rounded-xl border border-neon-green/20"><p className="text-neon-green text-xs font-bold uppercase tracking-widest mb-1">Status</p><p className="text-white font-bold">Active Member</p></div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 space-y-8">
          <div className="bg-gradient-to-r from-neon-green to-green-600 p-8 rounded-2xl relative overflow-hidden text-black">
             <div className="relative z-10">
               <div className="flex justify-between items-start"><div><p className="font-bold text-black/60 uppercase text-xs tracking-widest mb-2">Today is {today}</p><h3 className="font-black text-4xl italic uppercase mb-2">{todayData.focus}</h3></div><div className="bg-black/20 p-2 rounded-full"><Activity size={24} className="text-black"/></div></div>
               <div className="mt-4 bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-black/5"><p className="font-bold text-sm mb-1 uppercase opacity-70">Quick Look:</p><p className="text-sm font-medium line-clamp-2">{todayData.exercises || "No specific exercises listed. Consult your coach."}</p></div>
               <button className="mt-6 bg-black text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-wider hover:scale-105 transition-transform flex items-center gap-2">Start Workout <Play size={14} fill="white" /></button>
             </div>
             <Dumbbell className="absolute right-[-40px] bottom-[-40px] text-black opacity-10 transform -rotate-12" size={300} />
          </div>

          <div className="flex gap-4 border-b border-zinc-800 pb-4 overflow-x-auto">
             <button onClick={() => setActiveTab('workout')} className={`text-lg font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'workout' ? 'text-neon-green' : 'text-zinc-600 hover:text-white'}`}>Workout Schedule</button>
             <button onClick={() => setActiveTab('nutrition')} className={`text-lg font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'nutrition' ? 'text-neon-green' : 'text-zinc-600 hover:text-white'}`}>Meal Plan</button>
          </div>

          <div className="space-y-2">
            {activeTab === 'workout' ? (
                days.map(day => {
                    const data = getSchedule(day);
                    return (<AccordionItem key={day} title={day} subTitle={data.focus} isOpen={expandedDay === day} onClick={() => setExpandedDay(expandedDay === day ? null : day)}><div className="flex flex-col gap-2"><span className="text-neon-green text-xs font-bold uppercase tracking-widest">Instructions</span><p>{data.exercises || "Rest day or no exercises assigned."}</p></div></AccordionItem>);
                })
            ) : (
                days.map(day => (<AccordionItem key={day} title={day} subTitle="Nutrition Plan" isOpen={expandedDay === day} onClick={() => setExpandedDay(expandedDay === day ? null : day)}><div className="flex flex-col gap-2"><span className="text-neon-green text-xs font-bold uppercase tracking-widest">Meals</span><p>{getMeal(day)}</p></div></AccordionItem>))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};