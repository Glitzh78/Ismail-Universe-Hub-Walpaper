
export type DeviceType = 'desktop' | 'mobile' | 'tablet';

export type CharacterCategory = 'Heroes' | 'Masters & Military' | 'Villains' | 'Monsters' | 'Allies & Support' | 'Groups & Academy';

export interface AspectRatioConfig {
  label: string;
  ratio: string;
  value: '16:9' | '9:16' | '4:3';
  icon: string;
}

export interface Character {
  id: string;
  name: string;
  category: CharacterCategory;
  group?: string;
  description: string;
  note?: string; // Additional lore note
  power: string;
  importance: string;
  basePrompt: string;
}

export interface GeneratedWallpaper {
  id: string;
  url: string;
  prompt: string;
  device: DeviceType;
  timestamp: number;
}
