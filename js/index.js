/*
 * Copyright (c) 2012-2015 S-Core Co., Ltd.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


require([
    'services/Auth',
    'ModalFactory',
    'notify',
], function (Auth, ModalFactory, notify) {
    'use strict';

    jQuery.fn.closeModal = function () {
        if (this.attr('role') !== 'dialog') {
            throw this.selector + ' is not a dialog';
        }
        this.find('button.close').click();
    };

    var app = {
        init: function () {
            this.checkLogin();
            this.cacheElements();
            this.bindEvents();
        },

        checkLogin: function () {
            Auth.getLoginStatusOnce().then(function (a) {
                location.href = 'main.html';
            }).catch(function (e) {
                console.log('not logged in.');
                app.setOnlineView();
            });
        },

        cacheElements: function () {
            // page widgets
            this.$loginButton = $('button.login');
            this.$newAccountButton = $('button.new-account');

            // Modal
            this.$newAccountModal = $('#new-account');
            this.$newAccountEmail = $('#new-account-email');
            this.$newAccountCreateButton = this.$newAccountModal.find('button.create');

            this.signingUpModal = ModalFactory('#common-modal', '#common-modal-template');
        },

        bindEvents: function () {
            this.$loginButton.on('click', function (e) {
                location.href = Auth.getLoginUrl();
            });

            this.$newAccountModal.on('hidden.bs.modal', function (e) {
                app.$newAccountEmail.val('');
                app.$newAccountCreateButton.removeAttr('disabled');
            });

            this.$newAccountButton.on('click', function (e) {
                app.$newAccountModal.modal();
            });

            this.$newAccountEmail.on('keypress', function (e) {
                if (e.keyCode === 13) { // Enter
                    app.$newAccountCreateButton.click();
                }
            });

            this.$newAccountCreateButton.on('click', function (e) {
                app.$newAccountCreateButton.attr('disabled', '');

                var email = app.$newAccountEmail.val();
                Auth.createAccount(email).then(function () {
                    app.$newAccountModal.closeModal();
                    app.signingUpModal.popup();
                }).catch(function (e) {
                    app.$newAccountCreateButton.removeAttr('disabled');
                    notify.alert(e);
                    console.log(e);
                });
            });

            this.signingUpModal.setup({
                title: 'Thank you for signing up!',
                message: 'Please check your email for the confirmation request with a link that will validate your account. Once you click the link, your registration will be complete. ',
                buttons: [{
                    id: 'signingup-ok-button',
                    name: 'Ok',
                    default: true,
                    close: true
                }]
            });
        },

        setOnlineView: function () {
            $('#account-menu').removeClass('webida-hidden');
        },
    };


    $(function () {
        app.init();
        // for debugging
        window.app = app;
    });
});