import type { VerifiedSession } from '@/components/modals/LoginModal';

// Shared by record widgets on this page, scoped to the selected agent. This is
// UI session state, not an authorization substitute for any backend service.
// Keep tokens out of persistent browser storage and never retain credentials.
type LookupSession = { mode: 'verified' | 'identifier'; expiresAt: number; verified?: VerifiedSession };
const sessions = new Map<string, LookupSession>();
const MAX_AGE = 30 * 60 * 1000;

export function rememberStudentLookup(scope: string, verified?: VerifiedSession) {
  if (!scope) return;
  const expiresAt = Math.min(Date.now() + MAX_AGE, verified?.expiresAt ?? Infinity);
  sessions.set(scope, { mode: verified ? 'verified' : 'identifier', expiresAt, verified });
}

export function getStudentLookup(scope: string): LookupSession | undefined {
  const session = sessions.get(scope);
  if (session && session.expiresAt > Date.now()) return session;
  sessions.delete(scope);
}

export function clearStudentLookup(scope: string) { sessions.delete(scope); }
