import {
  inject,
  provide,
  readonly,
  ref,
  watch,
  type InjectionKey,
  type Ref,
} from "vue";

interface ThemeContext {
  darkMode: Readonly<Ref<boolean>>;
  toggleTheme: () => void;
}

const themeKey: InjectionKey<ThemeContext> = Symbol("theme");

export const provideTheme = (): ThemeContext => {
  const stored = localStorage.getItem("darkMode");
  const darkMode = ref(stored ? (JSON.parse(stored) as boolean) : true);

  watch(darkMode, (value) => {
    localStorage.setItem("darkMode", JSON.stringify(value));
  });

  const context: ThemeContext = {
    darkMode: readonly(darkMode),
    toggleTheme: () => {
      darkMode.value = !darkMode.value;
    },
  };

  provide(themeKey, context);
  return context;
};

export const useTheme = (): ThemeContext => {
  const context = inject(themeKey);

  if (!context) {
    throw new Error("useTheme must be called below provideTheme");
  }

  return context;
};
