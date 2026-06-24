// Getter helper that returns computed data for fileurl.
export const getFileUrl = (file?: File) => {
  if (file) {
    return URL.createObjectURL(file);
  }

  return null;
};
