const recursivelyStringify = target => {
  switch (typeof target) {
    case 'string':
      return target;
    case 'object':
      return recursivelyStringify(Object.values(target));
    case 'array':
      return recursivelyStringify(target);
    case 'number':
      return target.toString();
    default:
      return '';
  }
};

export default recursivelyStringify;
