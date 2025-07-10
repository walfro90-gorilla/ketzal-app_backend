"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wallet_controller_1 = require("./wallet.controller");
const router = (0, express_1.Router)();
router.get('/:userId', wallet_controller_1.getWallet);
router.post('/:userId/add-funds', wallet_controller_1.addFunds);
router.post('/:userId/transfer', wallet_controller_1.transferFunds);
router.get('/:userId/transactions', wallet_controller_1.getTransactions);
router.post('/:userId/convert', wallet_controller_1.convertCurrency);
exports.default = router;
//# sourceMappingURL=wallet.routes.js.map