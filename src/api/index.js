/* eslint-disable no-param-reassign */
const prepareProduct = (product) => {
  if (typeof product.versions !== 'object') {
    return product;
  }

  // code below converts array of versions to hashMap
  return {
    ...product,
    versions: product.versions.reduce((hashMap, version, index) => {
      hashMap[index] = {
        id: index,
        measure: version.value.measure,
        price: version.value.price,
      };
      return hashMap;
    }, {}),
    chosenVersion: 0,
  };
};

const getProductsByKey = key => fetch(`/cockpit/api/collections/get/${key}?token=${process.env.VUE_APP_API_KEY}`)
  .then(response => response.json())
  .then(blob => blob.entries.map(prepareProduct));

const getRegionByKey = key => fetch(`/cockpit/api/regions/data/${key}?token=${process.env.VUE_APP_API_KEY}`)
  .then(response => response.json())
  .then(blob => blob);

const sendForm = form => fetch('/order/', {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    form,
  }),
})
  .then(response => response.json())
  .then(blob => blob);

const saveOrder = order => fetch(`/cockpit/api/collections/save/orders?token=${process.env.VUE_APP_API_KEY}`, {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: order,
  }),
})
  .then(response => response.json())
  .then(blob => blob);

export default {
  getProductsByKey,
  getRegionByKey,
  sendForm,
  saveOrder,
};
