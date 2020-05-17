/* eslint-disable */
const prepareProduct = product => {
  if (typeof product.versions !== "object") {
    return product;
  }

  // code below converts array of versions to hashMap
  return {
    ...product,
    versions: product.versions.reduce((hashMap, version, index) => {
      hashMap[index] = {
        id: index,
        measure: version.value.measure,
        price: version.value.price
      };
      return hashMap;
    }, {}),
    chosenVersion: 0
  };
};

const getProductsByKey = key =>
  fetch(`/cockpit/api/collections/get/${key}?token=8f58b07f619a7107a45d5765df196b`, {
    method: "POST",
    body: JSON.stringify({ filter: { published: true } })
  })
    .then(response => response.json())
    .then(blob => blob.entries.filter(({ published }) => published).map(prepareProduct));

const getCollectionByKey = key =>
  fetch(`/cockpit/api/collections/get/${key}?token=8f58b07f619a7107a45d5765df196b`)
    .then(response => response.json())
    .then(blob => blob.entries);

const getRegionByKey = key =>
  fetch(`/cockpit/api/regions/data/${key}?token=8f58b07f619a7107a45d5765df196b`)
    .then(response => response.json())
    .then(blob => blob);

const sendForm = form =>
  fetch("/order/", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      form
    })
  })
    .then(response => response.json())
    .then(blob => blob);

const saveOrder = order =>
  fetch("/cockpit/api/collections/save/orders?token=8f58b07f619a7107a45d5765df196b", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: order
    })
  })
    .then(response => response.json())
    .then(blob => blob);

export default {
  getProductsByKey,
  getCollectionByKey,
  getRegionByKey,
  sendForm,
  saveOrder
};
