const contextToArray = (context: __WebpackModuleApi.RequireContext) => {
  return context.keys().map((path) => {
    return {
      path,
      file: context(path),
      name: path.slice(2, -4),
    };
  });
};
export default contextToArray;
