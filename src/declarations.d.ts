declare module '*?raw' {
  export default string;
}
declare module '*.module.scss' {
  const content: { [className: string]: string };
  export default content;
}
