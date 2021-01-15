import axios from 'axios';

export function validateWorker(worker) {
  if (
    !worker.name ||
    !worker.email ||
    !worker.phone ||
    !worker.address ||
    !worker.type
  )
    return false;
  return true;
}

export function validateOrder(order) {
  if (!order.type || !order.date_requested || !order.zip || !order.items)
    return false;
  return true;
}

export function validateCustomer(customer) {
  if (!customer.name || !customer.email || !customer.phone || !customer.address)
    return false;
  return true;
}
const serverUrl = 'http://localhost:3000';

export async function postNewThing(endpoint, thing, authKey) {
  let url = `${serverUrl}/${endpoint}`;
  console.log(url)
  var config = {
    headers: {
      Authorization: authKey,
      'Content-Type': 'application/json',
    },
  };
  try {
    let promise = await axios.post(url, thing, config);
    let result = promise.data;
    return result;
  } catch (error) {
    return error;
  }
}
