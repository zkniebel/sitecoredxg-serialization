#!/usr/local/env node

/*
 * Copyright (c) 2018 Zachary Kniebel. All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains the 
 * property of Zachary Kniebel. The intellectual and technical 
 * concepts contained herein are proprietary to Zachary Kniebel and
 * may be covered by U.S. and Foreign Patents, patents in process, 
 * and are protected by trade secret or copyright law. Dissemination 
 * of this information or reproduction of this material is strictly 
 * forbidden unless prior written permission is obtained from Zachary
 * Kniebel (contact@zacharykniebel.com).
 *
 */


/**
 * DEPENDENCIES
 */

// third-party
const requirejs = require("requirejs");
 

/**
 * CONSTANTS
 */

const sitecore_constants_id     =       "constants/Sitecore";
const unicorn_converter_id      =       "converters/Unicorn";
const json_converter_id         =       "converters/JSON";
const documentation_types_id    =       "types/Documentation";
const object_types_id           =       "types/Object";
const sitecore_types_id         =       "types/Sitecore";


/**
 * CONFIG
 */

requirejs.config({
    paths: {
        sitecore_constants_id   :       __dirname + "/constants/Sitecore",
        unicorn_converter_id    :       __dirname + "/converters/Unicorn",
        json_converter_id       :       __dirname + "/converters/JSON",
        documentation_types_id  :       __dirname + "/types/Documentation",
        object_types_id         :       __dirname + "/types/Object",
        sitecore_types_id       :       __dirname + "/types/Sitecore",
    }
});


/**
 * EXPORTS
 */

exports.Sitecore_Constants = requirejs(sitecore_constants_id);
exports.Unicorn_Converter = requirejs(unicorn_converter_id);
exports.Json_Converter = requirejs(json_converter_id);
exports.Documentation_Types = requirejs(documentation_types_id);
exports.Object_Types = requirejs(object_types_id);
exports.Sitecore_Types = requirejs(sitecore_types_id);

