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

define([], function () {
    'use strict';

    return {
        alert: function (title, message, type) {
            // type: undefined | 'info' | 'success' | 'danger'
            if (typeof(message) !== 'string') {
                message = message.toString();
            }
            var duration = 3000 + (title.length + message.length) * 50;
            
            if (message.toLowerCase().indexOf('no such file') < 0) {
                $.toast('<h4>' + title + '</h4> ' + message, {duration: duration, type: type});
            }
        },
        
        info: function (message) {
            this.alert('Information', message, 'info');
        },

        success: function (message) {
            this.alert('Success', message, 'success');
        },
        
        warning: function (message) {
            this.alert('Warning', message, 'danger');
        },

        error: function (message) {
            this.alert('Error', message, 'danger');
        },
    };
});
