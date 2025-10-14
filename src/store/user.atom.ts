// authAtoms.ts
import { atom } from 'jotai';
import type { PropsUser } from '../types/user.types';

export const UserAtom = atom<PropsUser | null>(null);

// También puedes crear un atom derivado para saber si hay usuario logueado
