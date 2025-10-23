// API Types based on backend models
export interface User {
  id: number;
  email: string;
  name?: string;
  barangayId?: number;
}

export interface Barangay {
  id: number;
  name: string;
  municipality: string;
  province: string;
}

export interface Shelter {
  id: number;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  capacity?: number;
  barangayId: number;
}

export interface HazardArea {
  id: number;
  type: 'FLOOD' | 'LANDSLIDE' | 'STORM_SURGE' | 'WIND';
  severity: number;
  geometry: any; // GeoJSON
  barangayId?: number;
}

// Frontend-specific types for the advisory system
export interface Advisory {
  id: string;
  type: 'thunderstorm' | 'landslide' | 'flood' | 'storm_surge' | 'wind';
  title: string;
  affectedAreas: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  date: string;
  time: string;
  description?: string;
}

export interface AdvisoryGroup {
  date: string;
  advisories: Advisory[];
}

// Navigation types
export type TabType = 'info' | 'home' | 'alerts';

export interface NavigationTab {
  id: TabType;
  icon: string;
  label: string;
  active?: boolean;
}
