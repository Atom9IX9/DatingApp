export const transformAvatarStyle = (
  scale: number,
  x: number,
  y: number,
  containerSize: number = 260,
) => {
  const baseContainerSize = 260;

  const containerX = x * (containerSize / baseContainerSize);
  const containerY = y * (containerSize / baseContainerSize);

  const transformStyle = `
  scale(${scale})
  translate(${containerX / scale}px, ${containerY / scale}px)
`;

  return transformStyle;
};
