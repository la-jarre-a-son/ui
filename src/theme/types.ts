export type ThemeContextState = {
  theme: string | null;
  variant: string | null;
};

export type ThemeProviderProps = {
  theme: string | null;
  variant?: string | null;
  children?: React.ReactNode;
  element?: HTMLElement | null;
};
