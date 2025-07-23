export interface Designer {
  id: number;
  name: string;
  channel_link: string;
  contribution: string;
  contribution_link: string;
}

export interface Credit {
  id: number;
  name: string;
  channel_link: string;
  contribution: string;
  contribution_link: string;
}

export interface DropRate {
  variant: string;
  versions: string;
  drop: string;
  condition: string;
  rate: string;
  interval: string;
  note: string;
}

export interface LagMeasurement {
  variant: string;
  lag: number;
}

export interface LagInfo {
  cpu: string;
  lithium: boolean;
  version: number;
  variant: string;
  idle: LagMeasurement[];
  active: LagMeasurement[];
  notes: string[];
}

export interface VideoLink {
  description: string;
  url: string;
}

export interface FileLink {
  description: string;
  url: string;
}

export interface Instructions {
  notes: string[];
  build: string[];
  how_to_use: string[];
}

export interface Versions {
  base: string;
  modifications: string;
  thread: string;
}

export interface Rates {
  drops: DropRate[];
  consumption: DropRate[];
  notes: string[];
}

export interface Files {
  schematics: FileLink[];
  world_downloads: FileLink[];
  images: FileLink[];
  videos: FileLink[];
}

export interface FarmData {
  channel_id: number;
  id: number;
  slug: string;
  title: string;
  author: number;
  created_at: string;
  tags: string[];
  designers: Designer[];
  credits: Credit[];
  versions: Versions;
  rates: Rates;
  lag_info: LagInfo;
  video_links: VideoLink[];
  files: Files;
  description: string[];
  positives: string[];
  negatives: string[];
  design_specifications: string[];
  instructions: Instructions;
  figures: string[];
}
