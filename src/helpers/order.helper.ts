const PAYMENT_METHOD = Object.freeze({
  CREDIT: "credit",
  DEBIT: "debit",
  PIX: "pix",
  VOUCHER: "vale-refeicao",
});

const ORDER_STATUS = Object.freeze({
  CANCELED: "canceled",
  COMPLETED: "completed",
  CREATING: "creating",
  ON_DELIVERY: "on delivery",
});

export { ORDER_STATUS, PAYMENT_METHOD };
