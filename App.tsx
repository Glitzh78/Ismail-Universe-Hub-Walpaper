
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
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('desktop');
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0] || {} as Character);
  const [selectedStyle, setSelectedStyle] = useState(ART_STYLES[0]);
  const [customDescription, setCustomDescription] = useState('');
  const [activeCategory, setActiveCategory] = useState<CharacterCategory | 'All'>('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState<GeneratedWallpaper | null>(null);
  const [history, setHistory] = useState<GeneratedWallpaper[]>([]);
  const [error, setError] = useState<string | null>(null);

  const filteredCharacters = useMemo(() => {
    if (activeCategory === 'All') return CHARACTERS;
    return CHARACTERS.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  const handleGenerate = async () => {
    if (!selectedCharacter || !selectedCharacter.basePrompt) {
      setError('Silakan pilih karakter terlebih dahulu.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    const visualEnforcement = "Portrait or group shot of powerful male characters, handsome men or boy warriors. Strictly no female features. All human characters MUST have black hair.";
    const userExtra = customDescription.trim() ? `Additional details: ${customDescription}.` : '';
    const fullPrompt = `${visualEnforcement} ${selectedCharacter.basePrompt}. ${userExtra} Style: ${selectedStyle.prompt}. Aspect ratio optimized for ${DEVICES[selectedDevice].label}. High resolution, masterpiece, detailed ${selectedCharacter.power}. ${selectedCharacter.group ? `Member of group ${selectedCharacter.group}.` : ''}`;
    
    try {
      const imageUrl = await generateWallpaper(fullPrompt, DEVICES[selectedDevice].value);
      
      const newWallpaper: GeneratedWallpaper = {
        id: Math.random().toString(36).substr(2, 9),
        url: imageUrl,
        prompt: fullPrompt,
        device: selectedDevice,
        timestamp: Date.now()
      };
      
      setCurrentWallpaper(newWallpaper);
      setHistory(prev => [newWallpaper, ...prev.slice(0, 9)]);
    } catch (err) {
      console.error("Generation error:", err);
      setError('Gagal membuat wallpaper. Pastikan API Key valid dan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!currentWallpaper) return;
    const link = document.createElement('a');
    link.href = currentWallpaper.url;
    link.download = `BulanDanLangit_${selectedCharacter?.name?.replace(/\s+/g, '_') || 'wallpaper'}_${selectedDevice}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categoryColor = (cat: CharacterCategory) => {
    switch (cat) {
      case 'Heroes': return 'text-blue-400 bg-blue-400/10';
      case 'Masters & Military': return 'text-emerald-400 bg-emerald-400/10';
      case 'Villains': return 'text-red-400 bg-red-400/10';
      case 'Monsters': return 'text-purple-400 bg-purple-400/10';
      case 'Groups & Academy': return 'text-yellow-400 bg-yellow-400/10';
      case 'Allies & Support': return 'text-amber-400 bg-amber-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  // Guard clause for early return if characters are missing
  if (!CHARACTERS || CHARACTERS.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Memuat data lore...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">Bulan Dan Langit</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Wallpaper Studio</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
             <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full text-[10px] text-blue-400 border border-blue-500/20 font-bold uppercase tracking-wider">
               <GraduationCap className="w-3 h-3" />
               Power Academy Kids Edition
             </div>
             <div className="flex items-center gap-1.5 text-[9px] text-slate-500 uppercase font-bold border border-slate-800 px-2 py-1 rounded-md">
                <Info className="w-3 h-3" />
                Original Lore Studio
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-blue-400" />
              1. Pilih Device
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(DEVICES) as DeviceType[]).map((key) => {
                const device = DEVICES[key];
                const Icon = key === 'desktop' ? Monitor : key === 'mobile' ? Smartphone : Tablet;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDevice(key)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                      selectedDevice === key 
                        ? 'bg-blue-600/10 border-blue-600 text-blue-400 shadow-lg shadow-blue-600/20' 
                        : 'bg-slate-800/50 border-transparent text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="text-xs font-bold">{device.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl overflow-hidden">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 px-1">
              <Users className="w-5 h-5 text-yellow-400" />
              2. Pilih Legenda Lore
            </h2>
            
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border ${
                  activeCategory === 'All' ? 'bg-slate-100 text-slate-950 border-white' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                Semua
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border ${
                    activeCategory === cat ? 'bg-slate-100 text-slate-950 border-white' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {cat === 'Groups & Academy' ? 'Grup & Akademi' : cat}
                </button>
              ))}
            </div>

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredCharacters.map((char) => (
                <button
                  key={char.id}
                  onClick={() => setSelectedCharacter(char)}
                  className={`w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
                    selectedCharacter.id === char.id
                      ? 'bg-slate-800 border-blue-500/50 ring-1 ring-blue-500/30'
                      : 'bg-slate-800/30 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-bold text-sm leading-tight pr-12">{char.name}</div>
                    <span className={`absolute top-4 right-4 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${categoryColor(char.category)}`}>
                      {char.importance}
                    </span>
                  </div>
                  {char.group && (
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-2 font-semibold">
                      <Users className="w-3 h-3" />
                      {char.group}
                    </div>
                  )}
                  <div className="text-[11px] text-slate-400 leading-tight mb-2 italic line-clamp-2">
                    {char.description}
                  </div>
                  <div className="text-[10px] font-mono text-blue-400 uppercase tracking-tighter bg-blue-500/5 inline-block px-2 py-0.5 rounded">
                    {char.power}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-400" />
                3. Detail Kustom
              </h2>
              {customDescription && (
                <button 
                  onClick={() => setCustomDescription('')}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              )}
            </div>
            <textarea
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              placeholder="Contoh: Menyerang dengan aura naga air, latar belakang istana kristal..."
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[100px] resize-none placeholder:text-slate-600"
            />
          </section>

          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-400" />
              4. Gaya Visual
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {ART_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={`p-3 rounded-xl border text-[11px] font-bold transition-all ${
                    selectedStyle.id === style.id
                      ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </section>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Membentuk Wallpaper...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Buat Wallpaper Epik
              </>
            )}
          </button>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative group min-h-[500px] flex items-center justify-center shadow-2xl">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-4 text-center px-4">
                <div className="relative">
                  <div className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="w-12 h-12 text-blue-500 animate-spin-slow" />
                  </div>
                  <div className="absolute inset-0 w-24 h-24 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Membentuk Dimensi {selectedCharacter.name}</h3>
                  <p className="text-slate-400 text-sm max-w-xs mx-auto italic leading-relaxed">
                    Sedang melukis sang legenda berdasarkan lore asli...
                  </p>
                </div>
              </div>
            ) : currentWallpaper ? (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img 
                  src={currentWallpaper.url} 
                  alt="Generated Wallpaper" 
                  className={`max-w-full max-h-[750px] shadow-2xl rounded-xl transition-all duration-1000 transform scale-100 hover:scale-[1.01] ${
                    selectedDevice === 'mobile' ? 'w-auto h-[600px] aspect-[9/16]' : 
                    selectedDevice === 'tablet' ? 'w-auto h-[600px] aspect-[4/3]' : 'w-full aspect-video'
                  }`}
                />
                
                <div className="absolute bottom-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={handleDownload}
                    className="bg-white text-slate-950 px-6 py-4 rounded-2xl shadow-2xl hover:bg-slate-100 transition-all flex items-center gap-2 font-black uppercase tracking-wider text-sm"
                  >
                    <Download className="w-5 h-5" />
                    Simpan Wallpaper
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center p-12">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ImageIcon className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Katalog Bulan Dan Langit</h3>
                <p className="text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Pilih karakter atau grup resmi untuk menciptakan wallpaper epik untuk HP, Tablet, atau Desktop.
                </p>
              </div>
            )}

            {error && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg z-50">
                {error}
              </div>
            )}
          </div>

          {/* Lore Notes Panel */}
          {selectedCharacter && selectedCharacter.note && (
            <section className="bg-slate-900 border border-blue-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <BookOpen className="w-12 h-12 text-blue-400" />
              </div>
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2 text-blue-400 uppercase tracking-widest">
                <BookOpen className="w-4 h-4" />
                Arsip Lore
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-blue-500/30 pl-3">
                "{selectedCharacter.note}"
              </p>
            </section>
          )}

          {/* Core Lore Groups Display */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl hover:bg-slate-900 transition-all group">
                <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-600 transition-colors">
                  <GraduationCap className="w-5 h-5 text-blue-400 group-hover:text-white" />
                </div>
                <h3 className="font-bold text-sm mb-2">Power Academy (SD)</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  Institusi pahlawan anak SD (Tim 969) dengan teknologi Nano-Sync tercanggih.
                </p>
             </div>
             <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl hover:bg-slate-900 transition-all group">
                <div className="w-10 h-10 bg-emerald-600/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-emerald-600 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:text-white" />
                </div>
                <h3 className="font-bold text-sm mb-2">Fighting Academy</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  Dojo Master Zaidaun, menjaga rahasia teknik DuanStep dan TamStep kuno.
                </p>
             </div>
             <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl hover:bg-slate-900 transition-all group">
                <div className="w-10 h-10 bg-purple-600/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-600 transition-colors">
                  <Rocket className="w-5 h-5 text-purple-400 group-hover:text-white" />
                </div>
                <h3 className="font-bold text-sm mb-2">Ahonok Military</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  Armada Galactic pimpinan Jenderal Lalun, pelindung bumi dari ancaman luar.
                </p>
             </div>
             <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl hover:bg-slate-900 transition-all group">
                <div className="w-10 h-10 bg-yellow-600/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-yellow-600 transition-colors">
                  <Zap className="w-5 h-5 text-yellow-400 group-hover:text-white" />
                </div>
                <h3 className="font-bold text-sm mb-2">Tim ZAFAAFF</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  Trio legendaris pilar pertahanan dunia dari invasi Ras Jrub.
                </p>
             </div>
          </section>

          {/* History / Gallery */}
          {history.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <History className="w-5 h-5 text-slate-400" />
                  Galeri Wallpaper Terbaru
                </h2>
                <span className="text-xs text-slate-500 font-bold">{history.length} Item</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentWallpaper(item)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all group ${
                      currentWallpaper?.id === item.id ? 'border-blue-500 scale-105 z-10' : 'border-transparent hover:border-slate-700'
                    }`}
                  >
                    <img src={item.url} className="w-full h-full object-cover" alt="History" />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ChevronRight className="w-6 h-6 text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/80 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm font-medium">
            Kisah Epik "Bulan Dan Langit" oleh Arvio Magani Rallytama & Muhammad Ghazi Daris Hamizan.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-[10px] text-slate-600 uppercase tracking-widest font-bold max-w-2xl mx-auto">
            <span>Fighting Academy</span>
            <span>&bull;</span>
            <span>Power Academy</span>
            <span>&bull;</span>
            <span>Jrub Realm</span>
            <span>&bull;</span>
            <span>Tim Rancanaola</span>
            <span>&bull;</span>
            <span>Tim ZAFAAFF</span>
            <span>&bull;</span>
            <span>Tim 969</span>
            <span>&bull;</span>
            <span>Ahonok Fleet</span>
            <span>&bull;</span>
            <span>Sun Temple</span>
            <span>&bull;</span>
            <span>Dark Kingdom</span>
          </div>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
