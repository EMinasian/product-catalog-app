import { createContext } from 'react';

export const FilterContext = createContext({});

export const FilterProvider = ({ children, value }) => (
  <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
);