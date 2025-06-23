import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Livro = {
  id: string;
  titulo: string;
  autor: string;
  genero: string;
  ano: number;
  progresso: number;
  totalPaginas: number;
  favorito: boolean;
};

type LeituraContextType = {
  livros: Livro[];
  adicionarLivro: (livro: Livro) => void;
  alternarFavorito: (id: string) => void;
  atualizarProgresso: (id: string, novoProgresso: number) => void;
  excluirLivro: (id: string) => void;
};

const LeituraContext = createContext<LeituraContextType | undefined>(undefined);

export function LeituraProvider({ children }: { children: ReactNode }) {
  const [livros, setLivros] = useState<Livro[]>([
    {
      id: '1',
      titulo: 'Dom Casmurro',
      autor: 'Machado de Assis',
      genero: 'Romance',
      ano: 1899,
      progresso: 0,
      totalPaginas: 256,
      favorito: false,
    },
    {
      id: '2',
      titulo: 'O Pequeno Príncipe',
      autor: 'Antoine de Saint-Exupéry',
      genero: 'Fábula',
      ano: 1943,
      progresso: 0,
      totalPaginas: 96,
      favorito: false,
    },
    {
      id: '3',
      titulo: '1984',
      autor: 'George Orwell',
      genero: 'Distopia',
      ano: 1949,
      progresso: 0,
      totalPaginas: 328,
      favorito: false,
    },
    {
      id: '4',
      titulo: 'A Revolução dos Bichos',
      autor: 'George Orwell',
      genero: 'Sátira',
      ano: 1945,
      progresso: 0,
      totalPaginas: 152,
      favorito: false,
    },
    {
      id: '5',
      titulo: 'Harry Potter e a Pedra Filosofal',
      autor: 'J.K. Rowling',
      genero: 'Fantasia',
      ano: 1997,
      progresso: 0,
      totalPaginas: 320,
      favorito: false,
    },
    {
      id: '6',
      titulo: 'O Hobbit',
      autor: 'J.R.R. Tolkien',
      genero: 'Fantasia',
      ano: 1937,
      progresso: 0,
      totalPaginas: 310,
      favorito: false,
    },
    {
      id: '7',
      titulo: 'Senhor dos Anéis: A Sociedade do Anel',
      autor: 'J.R.R. Tolkien',
      genero: 'Fantasia',
      ano: 1954,
      progresso: 0,
      totalPaginas: 576,
      favorito: false,
    },
    {
      id: '8',
      titulo: 'O Alquimista',
      autor: 'Paulo Coelho',
      genero: 'Ficção',
      ano: 1988,
      progresso: 0,
      totalPaginas: 208,
      favorito: false,
    },
    {
      id: '9',
      titulo: 'Capitães da Areia',
      autor: 'Jorge Amado',
      genero: 'Romance',
      ano: 1937,
      progresso: 0,
      totalPaginas: 272,
      favorito: false,
    },
    {
      id: '10',
      titulo: 'O Código Da Vinci',
      autor: 'Dan Brown',
      genero: 'Suspense',
      ano: 2003,
      progresso: 0,
      totalPaginas: 480,
      favorito: false,
    }
  ]);

  const adicionarLivro = (livro: Livro) => setLivros(prev => [...prev, livro]);

  const alternarFavorito = (id: string) => {
    setLivros(prev =>
      prev.map(l =>
        l.id === id ? { ...l, favorito: !l.favorito } : l
      )
    );
  };

  const atualizarProgresso = (id: string, novoProgresso: number) => {
    setLivros(prev =>
      prev.map(l =>
        l.id === id ? { ...l, progresso: novoProgresso } : l
      )
    );
  };

  const excluirLivro = (id: string) => {
    setLivros(prev => prev.filter(l => l.id !== id));
  };

  return (
    <LeituraContext.Provider value={{ livros, adicionarLivro, alternarFavorito, atualizarProgresso, excluirLivro }}>
      {children}
    </LeituraContext.Provider>
  );
}

export function useLeitura() {
  const context = useContext(LeituraContext);
  if (!context) throw new Error('useLeitura deve ser usado dentro de LeituraProvider!');
  return context;
}