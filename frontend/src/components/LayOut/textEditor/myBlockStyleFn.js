const myBlockStyleFn = (contentBlock) => {
  const type = contentBlock.getType();
  switch (type) {
    case "blockquote":
      return "myBlockquote";
  }
};

export default myBlockStyleFn;
