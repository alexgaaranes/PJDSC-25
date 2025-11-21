import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { Barangay, Shelter, User } from '@/lib/types';

export function useBarangays() {
  const [barangays, setBarangays] = useState<Barangay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBarangays = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getBarangays();
        setBarangays(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch barangays');
      } finally {
        setLoading(false);
      }
    };

    fetchBarangays();
  }, []);

  return { barangays, loading, error };
}

export function useShelters() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getShelters();
        setShelters(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch shelters');
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }, []);

  return { shelters, loading, error };
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}
