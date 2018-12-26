import _ from 'lodash';

export const invertObjectServerToClient = (object) => {
  const newObject = _.invertBy(object)
  return newObject;
}

export const invertObjectClientToServer = (object) => {
  let newObject = {};
  Object.keys(object).forEach(key =>
    object[key].forEach(index => newObject[index] = key));
  return newObject;
}