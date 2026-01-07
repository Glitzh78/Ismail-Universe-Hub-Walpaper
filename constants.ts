
import { Character, AspectRatioConfig } from './types';

export const DEVICES: Record<string, AspectRatioConfig> = {
  desktop: {
    label: 'Desktop',
    ratio: '16:9',
    value: '16:9',
    icon: 'Monitor'
  },
  mobile: {
    label: 'Smartphone',
    ratio: '9:16',
    value: '9:16',
    icon: 'Smartphone'
  },
  tablet: {
    label: 'Tablet',
    ratio: '4:3',
    value: '4:3',
    icon: 'Tablet'
  }
};

export const CHARACTERS: Character[] = [
  // --- TIM ZAFAAFF ---
  {
    id: 'zaky',
    name: 'Zaky (Raja Langit)',
    category: 'Heroes',
    group: 'Tim ZAFAAFF',
    description: 'Raja Langit dengan kekuatan elemen bulan, awan, bintang, dan langit.',
    note: 'Satu-satunya yang bisa mengakses Phase 3 tanpa bantuan alat.',
    power: 'Celestial / Moon / Sky King Phase 3',
    importance: 'Leader',
    basePrompt: 'Zaky the Sky King, a heroic young man with messy black hair, glowing celestial moon and star aura, majestic clouds background, Phase 3 power manifestation, blue and gold lighting.'
  },
  {
    id: 'fadhil',
    name: 'Fadhil (Master Api)',
    category: 'Heroes',
    group: 'Tim ZAFAAFF',
    description: 'Sahabat Zaky, penguasa teknik TamStep dan elemen api inti bumi.',
    note: 'Memiliki kecepatan TamStep yang mampu menciptakan bayangan api.',
    power: 'Fire / TamStep Technique',
    importance: '+4',
    basePrompt: 'Fadhil the Fire Master, powerful young man with spiky black hair, intense flames erupting, martial arts stance, fiery masculine aura.'
  },
  {
    id: 'affan',
    name: 'Affan (Master Air)',
    category: 'Heroes',
    group: 'Tim ZAFAAFF',
    description: 'Sahabat Zaky, Master Abadi Air yang mencapai Phase 3.',
    note: 'Mampu memanipulasi air di berbagai kondisi lingkungan.',
    power: 'Eternal Water Phase 3',
    importance: '+2',
    basePrompt: 'Affan the Eternal Water Master, heroic man with straight black hair, controlling massive water dragons, blue spiritual aura.'
  },

  // --- TIM RANCANAOLA ---
  {
    id: 'ghojo',
    name: 'Ghojo',
    category: 'Heroes',
    group: 'Tim Rancanaola',
    description: 'Anggota Tim Rancanaola dengan kekuatan Galaxy, Quantum, dan Voltage.',
    note: 'Rival terberat Zaky dengan kemampuan Quantum yang sulit ditebak.',
    power: 'Quantum / Voltage / Galaxy',
    importance: '+3',
    basePrompt: 'Ghojo the Quantum Warrior, cool young man with stylish black hair, glowing purple galaxy energy, electricity sparks, cosmic void background.'
  },
  {
    id: 'kawasar',
    name: 'Kawasar',
    category: 'Allies & Support',
    group: 'Tim Rancanaola',
    description: 'Anggota Tim Rancanaola dengan kekuatan imajinasi.',
    note: 'Mampu mematerialisasikan senjata dari pikirannya.',
    power: 'Imagination',
    importance: '+1',
    basePrompt: 'Kawasar from Tim Rancanaola, creative young man with black hair, conjuring objects with colorful imagination energy.'
  },
  {
    id: 'iqoq',
    name: 'IQOQ',
    category: 'Villains',
    group: 'Tim Rancanaola',
    description: 'Anggota Tim Rancanaola berkekuatan melati (racun saraf).',
    note: 'Bunga melatinya menyimpan bahaya bagi saraf lawan.',
    power: 'Jasmine Flower Poison',
    importance: '+3',
    basePrompt: 'IQOQ the Jasmine warrior, male fighter with neat black hair, surrounded by deadly white jasmine flowers and dark green vines.'
  },

  // --- TIM 969 (POWER ACADEMY - ANAK SD) ---
  {
    id: 'davied',
    name: 'Davied (Anak SD)',
    category: 'Allies & Support',
    group: 'Tim 969',
    description: 'Ketua Tim 969 dari Power Academy, murid berbakat kelas 6 SD.',
    note: 'Ahli strategi tempur meskipun masih berusia anak-anak.',
    power: 'Academy Warrior Tactics',
    importance: 'Leader 969',
    basePrompt: 'Davied the Academy warrior, a 12-year-old boy (elementary school student) with short black hair, wearing high-tech Power Academy blue school uniform, determined young hero face.'
  },
  {
    id: 'dhori',
    name: 'Dhori (Anak SD)',
    category: 'Allies & Support',
    group: 'Tim 969',
    description: 'Anggota Tim 969, murid kelas 5 SD dengan pertahanan fisik kuat.',
    note: 'Pelindung utama tim 969 dari serangan musuh.',
    power: 'Physical Defense',
    importance: 'Tanker 969',
    basePrompt: 'Dhori, a strong 11-year-old boy (elementary school student) with black hair in Power Academy school uniform, glowing spiritual shield, young powerful build.'
  },
  {
    id: 'diki',
    name: 'Diki (Anak SD)',
    category: 'Allies & Support',
    group: 'Tim 969',
    description: 'Anggota Tim 969, murid kelas 5 SD yang sangat lincah.',
    note: 'Anggota tercepat di Tim 969.',
    power: 'High Speed Agility',
    importance: 'Speedster 969',
    basePrompt: 'Diki, an agile 11-year-old boy (elementary school student) with black hair in Power Academy school uniform, moving with high-speed blue energy trails.'
  },

  // --- FIGHTING ACADEMY ---
  {
    id: 'zaidaun',
    name: 'Master Zaidaun',
    category: 'Masters & Military',
    group: 'Fighting Academy',
    description: 'Master legendaris Penguasa Daun dengan teknik DuanStep.',
    note: 'Menjaga rahasia teknik langkah kaki kuno.',
    power: 'Leaf Master / DuanStep',
    importance: 'Legendary',
    basePrompt: 'Master Zaidaun, legendary warrior with long flowing black hair, controlling a vortex of sharp leaves, performing DuanStep technique.'
  },

  // --- KUIL MATAHARI ---
  {
    id: 'rapip',
    name: 'Rapip Man (Raja Matahari)',
    category: 'Villains',
    group: 'Sun Temple',
    description: 'Bos terkuat di Kuil Matahari dengan energi surya.',
    note: 'Kekuatannya memuncak saat matahari tepat di atas kepala.',
    power: 'Sun King',
    importance: 'Boss',
    basePrompt: 'Rapip Man the Sun King, powerful man with black hair under a crown of burning solar fire, golden light aura, inside the Sun Temple.'
  },

  // --- NEGERI KEGELAPAN ---
  {
    id: 'jabar',
    name: 'Jabar (Jawir)',
    category: 'Villains',
    group: 'Dark Kingdom',
    description: 'Pembawa kapak maut dari Negeri Kegelapan.',
    note: 'Kapaknya mampu membelah dimensi bayangan.',
    power: 'Darkness Axe',
    importance: 'Deadly',
    basePrompt: 'Jabar the Darkness Axe bearer, menacing man with black hair, red glowing eyes, massive heavy obsidian axe, dark forest background.'
  },

  // --- AHONOK ---
  {
    id: 'lalun',
    name: 'Jenderal Lalun',
    category: 'Masters & Military',
    group: 'Ahonok Military',
    description: 'Pemimpin armada militer Ahonok yang menjaga keamanan galaksi.',
    note: 'Ahli strategi militer luar angkasa.',
    power: 'Galactic Strategy',
    importance: 'General',
    basePrompt: 'General Lalun, high-ranking military officer with black hair in chrome galactic uniform, standing on a spaceship bridge looking at Earth.'
  },

  // --- RAS JRUB ---
  {
    id: 'ras-jrub',
    name: 'Rally & Amim (Ras Jrub)',
    category: 'Monsters',
    group: 'Ras Jrub',
    description: 'Dua titan bayangan dari dimensi gelap yang mengancam dunia.',
    note: 'Wujud fisik mereka adalah manifestasi kegelapan murni.',
    power: 'Shadow Titan Chaos',
    importance: 'World Threat',
    basePrompt: 'The shadow titans Rally and Amim from Ras Jrub, massive humanoid dark entities with jagged black hair, red glowing energy cores, destruction background.'
  },

  // --- GROUP ENTRIES ---
  {
    id: 'group-zafaaff',
    name: 'Full Team ZAFAAFF',
    category: 'Groups & Academy',
    group: 'Tim ZAFAAFF',
    description: 'Zaky, Fadhil, dan Affan dalam satu formasi elemen.',
    power: 'Elemental Resonance',
    importance: 'S-Rank',
    basePrompt: 'The trio of Tim ZAFAAFF: Zaky, Fadhil, and Affan. Three powerful young men with black hair standing back-to-back, explosion of sky, fire, and water energy.'
  },
  {
    id: 'group-969',
    name: 'Full Team 969 (Elite SD)',
    category: 'Groups & Academy',
    group: 'Tim 969',
    description: 'Davied, Dhori, dan Diki dari Power Academy.',
    power: 'Tactical Synergy',
    importance: 'A-Rank',
    basePrompt: 'The trio of Tim 969: Davied, Dhori, and Diki. Three elementary school boys with black hair in tactical school armor, standing in front of Power Academy.'
  },
  {
    id: 'group-rancanaola',
    name: 'Full Team Rancanaola',
    category: 'Groups & Academy',
    group: 'Tim Rancanaola',
    description: 'Ghojo, Kawasar, dan IQOQ.',
    power: 'Quantum Voltage',
    importance: 'Rivals',
    basePrompt: 'The trio of Tim Rancanaola: Ghojo, Kawasar, and IQOQ. Three stylish young men with black hair, purple quantum energy and jasmine petals swirling.'
  },
  {
    id: 'group-power-academy',
    name: 'Tim Power Academy',
    category: 'Groups & Academy',
    group: 'Power Academy',
    description: 'Skuad pahlawan anak SD dari Power Academy dalam formasi tempur.',
    power: 'Nano-Sync Tactics',
    importance: 'Elite Academy',
    basePrompt: 'A full team of elite Power Academy students, a group of brave elementary school boys with black hair, wearing futuristic high-tech blue and silver school uniforms with glowing nano-elemental gauntlets, standing proudly in a futuristic classroom background.'
  },
  {
    id: 'group-fighting-academy',
    name: 'Tim Fighting Academy',
    category: 'Groups & Academy',
    group: 'Fighting Academy',
    description: 'Kumpulan pendekar Fighting Academy pimpinan Master Zaidaun.',
    power: 'DuanStep & TamStep Mastery',
    importance: 'Elite Dojo',
    basePrompt: 'A group of powerful male martial artists from Fighting Academy led by Master Zaidaun, all with black hair, performing synchronized martial arts poses, swirling sharp green leaves, glowing spiritual energy, traditional mountain temple background.'
  }
];

export const ART_STYLES = [
  { id: 'anime', label: 'Epic Anime', prompt: 'Modern high-budget anime style, vibrant colors, clean lines, Ufotable aesthetic' },
  { id: 'cinematic', label: 'Cinematic 3D', prompt: 'Hyper-realistic 3D render, Unreal Engine 5 style, dramatic lighting, volumetric fog' },
  { id: 'manga', label: 'Detailed Manga', prompt: 'Detailed black and white manga illustration with professional character designs, screentones, dynamic action lines' },
  { id: 'oil', label: 'Epic Oil Painting', prompt: 'Grand oil painting, thick brushstrokes, dramatic chiaroscuro, classical fantasy art' }
];
