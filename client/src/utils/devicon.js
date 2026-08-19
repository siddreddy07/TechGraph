export function getDeviconSrc(name) {
  const slug = name.toLowerCase().replace(".js", "js");
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`;
}
