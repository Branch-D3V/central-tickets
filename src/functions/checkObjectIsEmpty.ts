export const checkObjectIsEmpty = (obj: unknown): boolean => {
  return (
    typeof obj === "object" && obj !== null && Object.keys(obj).length === 0
  );
};
