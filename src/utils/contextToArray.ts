const contextToArray = (context: __WebpackModuleApi.RequireContext) => {
  // const length = context.keys().length - (context.keys().length % 4);

  // const result = [];
  // for (let i = 0; i < length; i++) {
  //   // for (let i in context.keys()) {
  //   const path = context.keys()[i];

  //   result.push({
  //     file: context(path),
  //     name: path.slice(2, -4),
  //   });
  // }
  // return result;

  return context.keys().map((path, index) => {
    return {
      path,
      file: context(path),
      name: path.slice(2, -4),
    };
  });
};
export default contextToArray;
