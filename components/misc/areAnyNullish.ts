export const areAnyNullish = (
  items: unknown[],
  { allowZero } = { allowZero: true }
) =>
  !!items.find((item) =>
    item === null || typeof item === "undefined" || allowZero
      ? false
      : item === 0
  );
