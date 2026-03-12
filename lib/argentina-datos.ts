// lib/argentina-datos.ts
const BASE_URL = 'https://api.argentinadatos.com';

export type Cotizacion = {
  casa: string;
  compra: number;
  venta: number;
  fecha: string;
};

export type Indice = {
  fecha: string;
  valor: number;
};

export const argentinaDatos = {
  getDolares: async (): Promise<Cotizacion[]> => {
    const res = await fetch(`${BASE_URL}/v1/cotizaciones/dolares`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Error al cargar dólares');
    return res.json();
  },

  getDolarHistorico: async (casa: string): Promise<Cotizacion[]> => {
    const res = await fetch(`${BASE_URL}/v1/cotizaciones/dolares/${casa}`, { next: { revalidate: 3600 } });
    return res.json();
  },

  getInflacion: async (): Promise<Indice[]> => {
    const res = await fetch(`${BASE_URL}/v1/finanzas/indices/inflacion`, { next: { revalidate: 3600 } });
    return res.json();
  },

  getUVA: async (): Promise<Indice[]> => {
    const res = await fetch(`${BASE_URL}/v1/finanzas/indices/uva`, { next: { revalidate: 3600 } });
    return res.json();
  },
};
