export function validateWorker(worker) {
  if (
    !worker.name ||
    !worker.email ||
    !worker.phone ||
    !worker.address ||
    !worker.services
  )
    return false;
  else {
    return true;
  }
}

export function validateOrder(order) {
  if (!order.type || !order.date_requested || !order.zip || !order.items)
    return false;
  return true;
}

export function validateCustomer(customer) {
  if (!customer.name || !customer.email || !customer.phone || !customer.address)
    return false;
  else {
    return true;
  }
}
