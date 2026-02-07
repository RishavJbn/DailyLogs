export const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

export const loadTheme = () => {
  const saved = localStorage.getItem("theme") || "terminal";
  document.documentElement.setAttribute("data-theme", saved);
};
