// authAtoms.ts
import { atom } from 'jotai';
import type { User } from '../types/user.types';

export const UserAtom = atom<User | null>(null);

// También puedes crear un atom derivado para saber si hay usuario logueado
