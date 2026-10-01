import { createContext, useContext, useEffect, useState } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const savedFavoritos = localStorage.getItem("favoritos");

    return savedFavoritos ? JSON.parse(savedFavoritos) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const isFavorito = (itemId) => {
    return favoritos.includes(itemId);
  };

  const toggleFavorito = (itemId) => {
    setFavoritos((currentFavoritos) => {
      if (currentFavoritos.includes(itemId)) {
        return currentFavoritos.filter((id) => id !== itemId);
      }

      return [...currentFavoritos, itemId];
    });
  };

  const removeFavorito = (itemId) => {
    setFavoritos((currentFavoritos) =>
      currentFavoritos.filter((id) => id !== itemId),
    );
  };

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        isFavorito,
        toggleFavorito,
        removeFavorito,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}