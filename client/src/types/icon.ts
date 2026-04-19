import { type LucideIcon } from 'lucide-react';

/**
 * Tipado estricto para los diccionarios de iconos.
 * Evita el uso de 'any' asegurando que cada llave contenga un componente de Lucide.
 */
export type IconMap = Record<string, LucideIcon>;