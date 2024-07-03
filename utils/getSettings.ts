//theme.js

import fetchApi from "./fetchApi";

export const getColors = async () => {
  const color = await fetchApi("/settings", "GET");
  document.documentElement.style.setProperty(
    "--dark-blue",
    color.data.color[0]
  );

  return color.data.color[0];
};
