export const getEnumAsOptions = (data: any) => {
  return Object.entries(data).map(([key, value]) => {
    return {
      label: key,
      value: value,
    };
  });
};
