export const getStaticByUrl = (url: string) =>
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/${url}`;
