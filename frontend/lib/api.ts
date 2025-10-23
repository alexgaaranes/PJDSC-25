import { User, Barangay, Shelter } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.68.127:8000/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Users API
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  // Barangays API
  async getBarangays(): Promise<Barangay[]> {
    return this.request<Barangay[]>('/barangays');
  }

  async createBarangay(barangay: Omit<Barangay, 'id'>): Promise<Barangay> {
    return this.request<Barangay>('/barangays', {
      method: 'POST',
      body: JSON.stringify(barangay),
    });
  }

  // Shelters API
  async getShelters(): Promise<Shelter[]> {
    return this.request<Shelter[]>('/shelters');
  }

  async createShelter(shelter: Omit<Shelter, 'id'>): Promise<Shelter> {
    return this.request<Shelter>('/shelters', {
      method: 'POST',
      body: JSON.stringify(shelter),
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    return this.request<{ status: string }>('/health');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
