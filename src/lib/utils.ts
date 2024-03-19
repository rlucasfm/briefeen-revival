import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isCpfValid(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, ''); // Remove tudo exceto números
  if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) return false; // Verifica se o CPF tem 11 dígitos

  // Verifica se todos os dígitos são iguais, o que tornaria o CPF inválido
  if (/^(\d)\1+$/.test(cpf)) return false;

  // Calcula os dígitos verificadores
  let sum = 0;
  let mod = 0;

  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
  mod = (sum * 10) % 11;

  if (mod === 10 || mod === 11) mod = 0;
  if (mod !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
  mod = (sum * 10) % 11;

  if (mod === 10 || mod === 11) mod = 0;
  if (mod !== parseInt(cpf.charAt(10))) return false;

  return true;
}

export function formatCpfInput(event: React.FormEvent<HTMLInputElement>) {
  const target = event.currentTarget;
  let value = target.value.replace(/\D/g, '');
  value = value.substring(0, 11);
  value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  // Valida o CPF
  const isValid = isCpfValid(value);

  // target.className = isValid ? 'valid' : 'invalid';

  target.value = value;
}

export function formatPhoneInput(event: React.FormEvent<HTMLInputElement>) {
  event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '').substring(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}