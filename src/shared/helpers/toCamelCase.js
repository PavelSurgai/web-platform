const isCamelCased = str => str[0] === str[0].toLowerCase();

const strToCamelCase = str => {
  const firstSymbol = str[0].toLowerCase();
  return `${firstSymbol}${str.substring(1)}`;
};

export function toCamelCase(response) {
  const isArray = Array.isArray(response);
  const isObject = typeof response === 'object';
  let convertedData;

  if (isArray) {
    convertedData = response.map(toCamelCase);
  } else if (isObject && response) {
    convertedData = {};

    Object.keys(response).forEach(key => {
      const newKey = isCamelCased(key) ? key : strToCamelCase(key);
      const isDataArray = Array.isArray(response[key]);
      const isDataObject = typeof response[key] === 'object';
      let newData;
  
      if (isDataArray) {
        newData = response[key].map(item => toCamelCase(item));
      } else if (isDataObject) {
        newData = toCamelCase(response[key]);
      } else {
        newData = response[key];
      }
  
      convertedData[newKey] = newData;
    });
  } else {
    convertedData = response;
  }
  
  return convertedData;
}