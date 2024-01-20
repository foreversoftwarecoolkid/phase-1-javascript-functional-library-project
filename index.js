// File: index.js

function isIterable(obj) {
    return obj !== null && typeof obj === 'object' && Symbol.iterator in obj;
  }
  
  function myEach(collection, callback) {
    if (isIterable(collection)) {
      for (const item of collection) {
        callback(item);
      }
    } else {
      for (const key in collection) {
        if (collection.hasOwnProperty(key)) {
          callback(collection[key]);
        }
      }
    }
    return collection;
  }
  
  function myMap(collection, callback) {
    const result = [];
    myEach(collection, (item) => {
      result.push(callback(item));
    });
    return result;
  }
  
  function myReduce(collection, callback, initialValue) {
    if (isIterable(collection)) {
      let accumulator = initialValue !== undefined ? initialValue : collection[0];
      for (let i = initialValue !== undefined ? 0 : 1; i < collection.length; i++) {
        accumulator = callback(accumulator, collection[i]);
      }
      return accumulator;
    } else if (typeof collection === 'object' && collection !== null) {
      let accumulator = initialValue !== undefined ? initialValue : collection[Object.keys(collection)[0]];
      myEach(collection, (item) => {
        accumulator = callback(accumulator, item);
      });
      return accumulator;
    } else {
      return initialValue !== undefined ? initialValue : NaN;
    }
  }
  
  function myFilter(collection, callback) {
    const result = [];
    myEach(collection, (item) => {
      if (callback(item)) {
        result.push(item);
      }
    });
    return result;
  }
  
  function myFind(collection, callback) {
    for (const item of collection) {
      if (callback(item)) {
        return item;
      }
    }
  }
  
  function mySize(collection) {
    return isIterable(collection) ? collection.length : Object.keys(collection).length;
  }
  
  function myFirst(collection, n = 1) {
    return n === 1 ? (collection.length > 0 ? collection[0] : undefined) : collection.slice(0, n);
  }
  
  function myLast(collection, n = 1) {
    return n === 1 ? (collection.length > 0 ? collection[collection.length - 1] : undefined) : collection.slice(-n);
  }
  
  function myKeys(collection) {
    return Object.keys(collection);
  }
  
  function myValues(collection) {
    return Object.values(collection);
  }
  
  module.exports = {
    myEach,
    myMap,
    myReduce,
    myFilter,
    myFind,
    mySize,
    myFirst,
    myLast,
    myKeys,
    myValues,
  };
  