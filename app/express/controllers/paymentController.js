const asyncMiddleware = require('../middleware/asyncMiddleware');
const paymentService = require('../../services/payment/payment.update');

module.exports = function paymentController(app) {
  /**
   * @api {get} /api/v1/payments
   * @apiName get
   * @apiGroup payment
   *
   */
  async function get(req, res) {
    const response = await app.payments.get(req.query);
    res.json(response);
  }

  /**
   * @api {payment} /api/v1/payments
   * @apiName create
   * @apiGroup payment
   *
   */
  async function create(req, res) {
    const createdPayment = await app.payments.create(req.body);
    res.json(createdPayment).status(201);
  }

  /**
   * @api {payment} /api/v1/payments/:id
   * @apiName update
   * @apiGroup payment
   *
   */
  async function update(req, res) {
    const updatedPayment = await paymentService.update(
      req.params.id,
      req.body,
      req
    );
    res.status(200).json(updatedPayment);
  }

  /**
   * @api {get} /api/v1/payments/:id
   * @apiName getById
   * @apiGroup payment
   *
   */
  async function getById(req, res) {
    const response = await app.payments.getById(req.params.id);
    res.json(response);
  }

  /**
   * @api {delete} /api/v1/payments/:id
   * @apiName destroy
   * @apiGroup Result
   *
   */
  async function destroy(req, res) {
    const { id } = req.params;

    const deletedPayment = await app.payments.destroy(id, res);
    res.status(200).json({ payment: deletedPayment });
  }
  /**
   * @api {stats} /api/v1/payments/stats
   * @apiName stats
   * @apiGroup Result
   *
   */
  async function stats(req, res) {
    const response = await app.payments.stats();
    res.status(200).json(response);
  }
  return Object.freeze({
    get: asyncMiddleware(get),
    create: asyncMiddleware(create),
    update: asyncMiddleware(update),
    getById: asyncMiddleware(getById),
    destroy: asyncMiddleware(destroy),
    stats: asyncMiddleware(stats),
  });
};
