import { Bonus, BonusHunt } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function getAuthHeader() {
  // Get token from localStorage or your auth management system
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

export async function listBonusHunts(): Promise<BonusHunt[]> {
  const response = await fetch(`${API_URL}/bonus-hunts`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch bonus hunts');
  }
  
  const data = await response.json();
  return data.bonusHunts;
}

export async function getBonusHunt(id: string): Promise<BonusHunt> {
  const response = await fetch(`${API_URL}/bonus-hunts/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch bonus hunt');
  }
  
  const data = await response.json();
  return data.bonusHunt;
}

export async function createBonusHunt(startBalance: number): Promise<BonusHunt> {
  const response = await fetch(`${API_URL}/bonus-hunts`, {
    method: 'POST',
    headers: await getAuthHeader(),
    body: JSON.stringify({ startBalance })
  });
  
  if (!response.ok) {
    throw new Error('Failed to create bonus hunt');
  }
  
  const data = await response.json();
  return data.bonusHunt;
}

export async function updateBonusHunt(id: string, updates: Partial<BonusHunt>): Promise<BonusHunt> {
  const response = await fetch(`${API_URL}/bonus-hunts/${id}`, {
    method: 'PUT',
    headers: await getAuthHeader(),
    body: JSON.stringify(updates)
  });
  
  if (!response.ok) {
    throw new Error('Failed to update bonus hunt');
  }
  
  const data = await response.json();
  return data.bonusHunt;
}

export async function createBonus(huntId: string, bonus: Omit<Bonus, 'id'>): Promise<Bonus> {
  const response = await fetch(`${API_URL}/bonus-hunts/${huntId}/bonuses`, {
    method: 'POST',
    headers: await getAuthHeader(),
    body: JSON.stringify(bonus)
  });
  
  if (!response.ok) {
    throw new Error('Failed to create bonus');
  }
  
  const data = await response.json();
  return data.bonus;
}

export async function updateBonus(huntId: string, bonusId: number, updates: Partial<Bonus>): Promise<Bonus> {
  const response = await fetch(`${API_URL}/bonus-hunts/${huntId}/bonuses/${bonusId}`, {
    method: 'PUT',
    headers: await getAuthHeader(),
    body: JSON.stringify(updates)
  });
  
  if (!response.ok) {
    throw new Error('Failed to update bonus');
  }
  
  const data = await response.json();
  return data.bonus;
}

export async function deleteBonus(huntId: string, bonusId: number): Promise<void> {
  const response = await fetch(`${API_URL}/bonus-hunts/${huntId}/bonuses/${bonusId}`, {
    method: 'DELETE',
    headers: await getAuthHeader()
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete bonus');
  }
}