export const easeInOut = [0.76, 0, 0.24, 1] as const;
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};
