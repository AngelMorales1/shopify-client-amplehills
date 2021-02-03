function formatError(e: any) {
  if (!e) return { message: 'Undefined Error' };
  if (e.data) return e.data;
  if (e.message) return { message: e.message };

  return { message: 'Unknown Error' };
};

export default formatError;
