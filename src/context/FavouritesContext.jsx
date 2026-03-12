import React, { createContext, useEffect, useMemo, useState } from "react";
import { loadFavourites, saveFavourites } from "../storage/favourites";

export const FavouritesContext = createContext({
  favourites: [],
  isReady: false,
  toggleFavourite: () => {},
  isFavourite: () => false,
});

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const ids = await loadFavourites();
      setFavourites(Array.isArray(ids) ? ids : []);
      setIsReady(true);
    })();
  }, []);

  const toggleFavourite = async (id) => {
    setFavourites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];

      // сохраняем (не блокируя UI)
      saveFavourites(next).catch(() => {});
      return next;
    });
  };

  const isFavourite = (id) => favourites.includes(id);

  const value = useMemo(
    () => ({ favourites, isReady, toggleFavourite, isFavourite }),
    [favourites, isReady]
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}
