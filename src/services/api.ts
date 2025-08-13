import axios from 'axios';
import type { Claim, Policy } from '../types/claim';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  headers: { 'Content-Type': 'application/json' }
});

export async function fetchClaims(): Promise<Claim[]> {
  const { data } = await api.get<Claim[]>('/claims');
  return data;
}

export async function createClaim(payload: {
  amount: string;
  holder: string;
  policyNumber: string;
  insuredItem: string;
  description: string;
  processingFee: string;
  incidentDate: string;
}) {
  const body = { ...payload, insuredName: payload.insuredItem };
  const { data } = await api.post('/claims', body);
  return data;
}

export async function lookupPolicies(q: string): Promise<Policy[]> {
  const { data } = await api.get<Policy[]>('/policies', { params: { q } });
  return data;
}
