
import React, { useState, useMemo } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Sparkles, 
  Download, 
  History, 
  Image as ImageIcon,
  Loader2,
  ChevronRight,
  Zap,
  Users,
  Info,
  BookOpen,
  Sword,
  ShieldCheck,
  Edit3,
  XCircle,
  GraduationCap,
  Trophy,
  Rocket
} from 'lucide-react';
import { DEVICES, CHARACTERS, ART_STYLES } from './constants.ts';
import { DeviceType, Character, GeneratedWallpaper, CharacterCategory } from './types.ts';
import { generateWallpaper } from './services/geminiService.ts';

const CATEGORIES: CharacterCategory[] = ['Heroes', 'Groups & Academy', 'Masters & Military', 'Villains', 'Monsters', 'Allies & Support'];

const App: React.FC = () => {
  const initialCharacter = CHARACTERS && CHARACTERS.length > 0 ? CHARACTERS[0] : null;
  const initialStyle = ART_STYLES && ART_STYLES.length > 0 ? ART_STYLES[0] : null;

  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('desktop');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(initialCharacter);
  const [selectedStyle, setSelectedStyle] = useState(initialStyle);
  const [customDescription, setCustomDescription] = useState('');
  const [activeCategory, setActiveCategory] = useState<CharacterCategory | 'All'>('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState<GeneratedWallpaper | null>(null);
  const [history, setHistory] = useState<GeneratedWallpaper[]>([]);
  const [error, setError] = useState<string | null>(null);

  const filteredCharacters = useMemo(() => {
    if (!CHARACTERS) return [];
    if (activeCategory === 'All') return CHARACTERS;
    return CHARACTERS.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  const handleGenerate = async () => {
    if (!selectedCharacter || !selectedStyle) {
      setError('Pilih karakter & gaya dulu, Coeg!');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    const visualEnforcement = "Hyper-detailed cinematic masterpiece. Powerful male characters only, handsome boys/men. Human characters MUST have black hair. Intense energy aura.";
    const userExtra = customDescription.trim() ? `Action: ${customDescription}.` : '';
    const fullPrompt = `${visualEnforcement} ${selectedCharacter.basePrompt}. ${userExtra} Style: ${selectedStyle.prompt}. Optimized for ${DEVICES[selectedDevice].label}. High-end 4k render, spiritual energy: ${selectedCharacter.power}.`;
    
    try {
      const imageUrl = await generateWallpaper(fullPrompt, DEVICES[selectedDevice].value);
      
      const newWallpaper: GeneratedWallpaper = {
        id: Date.now().toString(36),
        url: imageUrl,
        prompt: fullPrompt,
        device: selectedDevice,
        timestamp: Date.now()
      };
      
      setCurrentWallpaper(newWallpaper);
      setHistory(prev => [newWallpaper, ...prev.slice(0, 11)]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Gagal bikin wallpaper, coba lagi!');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!currentWallpaper || !selectedCharacter) return;
    const link = document.createElement('a');
    link.href = currentWallpaper.url;
    link.download = `Lore_${selectedCharacter.name.replace(/\s+/g, '_')}_${selectedDevice}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!initialCharacter) {
    return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-slate-500 font-bold tracking-widest uppercase text-xs">Data Lore Kosong...</div>;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col selection:bg-blue-500/30">
      <nav className="border-b border-white/5 bg-slate-900/40 backdrop-blur-2xl sticky top-0 z-[100]">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 rotate-3">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter leading-none">B&L STUDIO</h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mt-1.5">Arvio & Ghazi Project</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6">
             <div className="flex items-center gap-2.5 bg-white/5 px-5 py-2 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-blue-400">
               <GraduationCap className="w-4 h-4" />
               Tim 969 Academy
             </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-slate-900/30 border border-white/5 rounded-[2rem] p-8 backdrop-blur-sm">
            <h2 className="text-xs font-black mb-6 flex items-center gap-3 text-blue-500 uppercase tracking-widest">
              <span className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center">1</span>
              Dimensi Layar
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {(Object.keys(DEVICES) as DeviceType[]).map((key) => {
                const device = DEVICES[key];
                const Icon = key === 'desktop' ? Monitor : key === 'mobile' ? Smartphone : Tablet;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDevice(key)}
                    className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all duration-500 ${
                      selectedDevice === key 
                        ? 'bg-blue-600 border-blue-400 text-white shadow-xl shadow-blue-600/20 -translate-y-1' 
                        : 'bg-white/5 border-transparent text-slate-500 hover:bg-white/10 hover:text-slate-300'
                    }`}
                  >
                    <Icon className="w-7 h-7 mb-3" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">{device.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="bg-slate-900/30 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-sm">
            <h2 className="text-xs font-black mb-6 flex items-center gap-3 text-yellow-500 uppercase tracking-widest">
              <span className="w-6 h-6 rounded-lg bg-yellow-500/10 flex items-center justify-center">2</span>
              Karakter Lore
            </h2>
            <div className="flex gap-2 overflow-x-auto pb-5 mb-6 no-scrollbar">
              {['All', ...CATEGORIES].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-5 py-2.5 rounded-2xl text-[10px] font-black whitespace-nowrap border transition-all ${
                    activeCategory === cat ? 'bg-white text-slate-900 border-white' : 'bg-white/5 text-slate-500 border-white/5 hover:border-white/20'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-3 custom-scrollbar">
              {filteredCharacters.map((char) => (
                <button
                  key={char.id}
                  onClick={() => setSelectedCharacter(char)}
                  className={`w-full text-left p-5 rounded-[1.5rem] border transition-all duration-300 group ${
                    selectedCharacter?.id === char.id ? 'bg-slate-800 border-blue-500 shadow-lg shadow-blue-500/5' : 'bg-white/5 border-transparent hover:bg-white/10'
                  }`}
                >
                  <div className="font-bold text-sm mb-1.5 group-hover:text-blue-400 transition-colors">{char.name}</div>
                  <div className="text-[10px] text-slate-500 mb-3 italic leading-relaxed line-clamp-2">{char.description}</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[9px] font-black text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-lg uppercase">
                      {char.power}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full h-20 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 text-white font-black rounded-[2rem] shadow-2xl shadow-blue-600/20 flex items-center justify-center gap-4 transition-all active:scale-[0.97] uppercase tracking-widest text-sm group"
          >
            {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
            {isGenerating ? 'Membangkitkan...' : 'Ciptakan Wallpaper'}
          </button>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="bg-slate-900/50 border border-white/5 rounded-[3.5rem] overflow-hidden relative min-h-[650px] flex items-center justify-center shadow-inner group/canvas">
            {isGenerating ? (
              <div className="text-center p-12">
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 border-[6px] border-blue-500/10 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 border-[6px] border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-black mb-3 text-white tracking-tighter">MEMBENTUK DIMENSI...</h3>
                <p className="text-slate-500 text-xs font-semibold italic">Seni Lore sedang dilukis...</p>
              </div>
            ) : currentWallpaper ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-10 animate-in fade-in zoom-in duration-700">
                <img 
                  src={currentWallpaper.url} 
                  className={`rounded-[2.5rem] shadow-2xl object-cover transition-transform duration-1000 ${
                    selectedDevice === 'mobile' ? 'max-h-[70vh] aspect-[9/16]' : 
                    selectedDevice === 'tablet' ? 'max-h-[70vh] aspect-[4/3]' : 'w-full aspect-video'
                  }`} 
                  alt="Wallpaper Output"
                />
                <button 
                  onClick={handleDownload} 
                  className="mt-12 bg-white text-slate-950 px-12 py-5 rounded-[2rem] font-black flex items-center gap-4 hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-90 uppercase text-xs tracking-widest"
                >
                  <Download className="w-6 h-6" /> DOWNLOAD
                </button>
              </div>
            ) : (
              <div className="text-center p-16 max-w-md opacity-40">
                <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-white/5">
                  <ImageIcon className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="font-black uppercase tracking-[0.3em] text-sm mb-4">LORE CATALOG READY</h3>
              </div>
            )}

            {error && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-red-600/90 backdrop-blur-xl text-white px-8 py-4 rounded-[1.5rem] text-[10px] font-black shadow-2xl flex items-center gap-3">
                <Info className="w-5 h-5" /> {error.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 text-center mt-auto">
        <p className="text-[10px] uppercase tracking-[0.5em] font-black text-slate-700">
          &copy; 2024 Arvio & Ghazi &bull; Bulan Dan Langit Project
        </p>
      </footer>
    </div>
  );
};

export default App;
