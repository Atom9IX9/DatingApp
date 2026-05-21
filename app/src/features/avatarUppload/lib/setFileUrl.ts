export const getFileUrl = (file?: File) => {
  if (file) {
    return URL.createObjectURL(file)
  }

  return null
};
