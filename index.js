"use strict";

var _ = require("underscore"),
    request = require("request"),
    config = {
        serverDomain: 'https://api.xendit.co',
        secretKey: ''
    };

/*
 * Main application file
 *
 * @param userConfig {Object} - Optional user configuration object
 *
 * @return {Object} - Xendit api interface library
 */

module.exports = function (userConfig) {
    config = _.extend(config, userConfig);

    function Client(config) {
        this.config = config;

        this.createInvoice = function (external_id, amount, payer_email, description, done) {
            var options = {
                url: this.config.serverDomain + '/v2/invoices',
                auth: {
                    user: this.config.secretKey,
                    pass: '',
                    sendImmediately: true
                },
                form: {
                    external_id: external_id,
                    payer_email: payer_email,
                    description: description,
                    amount: amount
                }
            };

            request.post(options, function (err, resRequest, body) {
                var body = JSON.parse(body);

                if(err) done(err);
                else if(body.error_code) done(body.error_code);
                else return done(null, body);
            });
        };

        this.createDisbursement = function (external_id, amount, bank_code, account_holder_name, account_name, done) {
            var options = {
                url: this.config.serverDomain + '/disbursements',
                auth: {
                    user: this.config.secretKey,
                    pass: '',
                    sendImmediately: true
                },
                form: {
                    external_id: external_id,
                    amount: amount,
                    bank_code: bank_code,
                    account_holder_name: account_holder_name,
                    account_number: account_number
                }
            };

            request.post(options, function (err, resRequest, body) {
                var body = JSON.parse(body);

                if(err) done(err);
                else if(body.error_code) done(body.error_code);
                else return done(null, body);
            });
        };

        this.getVirtualAccountBanks = function (done) {
            var options = {
                url: this.config.serverDomain + '/available_virtual_account_banks',
                auth: {
                    user: this.config.secretKey,
                    pass: '',
                    sendImmediately: true
                }
            };

            request.get(options, function (err, resRequest, body) {
                var body = JSON.parse(body);

                if(err) done(err);
                else if(body.error_code) done(body.error_code);
                else return done(null, body);
            });
        };

        this.createCallbackVirtualAccount = function (external_id, bank_code, name, done) {
            var options = {
                url: this.config.serverDomain + '/callback_virtual_accounts',
                auth: {
                    user: this.config.secretKey,
                    pass: '',
                    sendImmediately: true
                },
                form: {
                    external_id: external_id,
                    bank_code: bank_code,
                    name: name
                }
            };

            request.post(options, function (err, resRequest, body) {
                var body = JSON.parse(body);

                if(err) done(err);
                else if(body.error_code) done(body.error_code);
                else return done(null, body);
            });
        };

        this.getDisbursement = function (disbursement_id, done) {
            var options = {
                url: this.config.serverDomain + '/disbursements/' + disbursement_id,
                auth: {
                    user: this.config.secretKey,
                    pass: '',
                    sendImmediately: true
                }
            };

            request.get(options, function (err, resRequest, body) {
                var body = JSON.parse(body);

                if(err) done(err);
                else if(body.error_code) done(body.error_code);
                else return done(null, body);
            });
        };

        this.getAvailableDisbursementBanks = function (disbursement_id, done) {
            var options = {
                url: this.config.serverDomain + '/available_disbursements_banks/',
                auth: {
                    user: this.config.secretKey,
                    pass: '',
                    sendImmediately: true
                }
            };

            request.get(options, function (err, resRequest, body) {
                var body = JSON.parse(body);

                if(err) done(err);
                else if(body.error_code) done(body.error_code);
                else return done(null, body);
            });
        };

        this.getInvoice = function (invoice_id, done) {
            var options = {
                url: this.config.serverDomain + '/v2/invoices/' + invoice_id,
                auth: {
                    user: this.config.secretKey,
                    pass: '',
                    sendImmediately: true
                }
            };

            request.get(options, function (err, resRequest, body) {
                var body = JSON.parse(body);

                if(err) done(err);
                else if(body.error_code) done(body.error_code);
                else return done(null, body);
            });
        };

        this.getBalance = function (invoice_id, done) {
            var options = {
                url: this.config.serverDomain + '/balance',
                auth: {
                    user: this.config.secretKey,
                    pass: '',
                    sendImmediately: true
                }
            };

            request.get(options, function (err, resRequest, body) {
                var body = JSON.parse(body);

                if(err) done(err);
                else if(body.error_code) done(body.error_code);
                else return done(null, body);
            });
        };

        this.captureCreditCardPayment = function (external_id, token_id, amount, done) {
            var options = {
                url: this.config.serverDomain + '/credit_card_charges',
                auth: {
                    user: this.config.secretKey,
                    pass: '',
                    sendImmediately: true
                },
                form: {
                    external_id: external_id,
                    token_id: token_id,
                    amount: amount
                }
            };

            request.post(options, function (err, resRequest, body) {
                var body = JSON.parse(body);

                if(err) done(err);
                else if(body.error_code) done(body.error_code);
                else return done(null, body);
            });
        };

        this.issueCreditCardRefund = function (credit_card_charge_id, amount, done) {
            var options = {
                url: this.config.serverDomain + '/credit_card_charges/' + credit_card_charge_id + '/refunds',
                auth: {
                    user: this.config.secretKey,
                    pass: '',
                    sendImmediately: true
                },
                form: {
                    amount: amount
                }
            };

            request.post(options, function (err, resRequest, body) {
                var body = JSON.parse(body);

                if(err) done(err);
                else if(body.error_code) done(body.error_code);
                else return done(null, body);
            });
        };

        this.validateBankAccountHolderName = function (bank_account_number, bank_code, done) {
            var options = {
                url: this.config.serverDomain + '/bank_account_data_requests',
                auth: {
                    user: this.config.secretKey,
                    pass: '',
                    sendImmediately: true
                },
                form: {
                    bank_account_number: bank_account_number,
                    bank_code: bank_code
                }
            };

            request.post(options, function (err, resRequest, body) {
                var body = JSON.parse(body);

                if(err) done(err);
                else if(body.error_code) done(body.error_code);
                else return done(null, body);
            });
        };

        this.subscribeCreditCardRecurringPayment = function (token_id, initial_charge_amount, initial_charge_external_id, done) {
            var options = {
                url: this.config.serverDomain + '/recurring_credit_card_subscription',
                auth: {
                    user: this.config.secretKey,
                    pass: '',
                    sendImmediately: true
                },
                form: {
                    token_id: token_id,
                    initial_charge_amount: initial_charge_amount,
                    initial_charge_external_id: initial_charge_external_id
                }
            };

            request.post(options, function (err, resRequest, body) {
                var body = JSON.parse(body);

                if(err) done(err);
                else if(body.error_code) done(body.error_code);
                else return done(null, body);
            });
        };

        this.captureSubsequentCreditCardRecurringPayment = function (subscription_id, amount, external_id, done) {
            var options = {
                url: this.config.serverDomain + '/recurring_credit_card_subscription/' + subscription_id + '/charges',
                auth: {
                    user: this.config.secretKey,
                    pass: '',
                    sendImmediately: true
                },
                form: {
                    amount: amount,
                    external_id: external_id
                }
            };

            request.post(options, function (err, resRequest, body) {
                var body = JSON.parse(body);

                if(err) done(err);
                else if(body.error_code) done(body.error_code);
                else return done(null, body);
            });
        };
    };

    return new Client(config);
};
