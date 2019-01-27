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

// node
const fs = require("fs");

// local
const json_converter = require("./converters/json-converter.js");
const unicorn_converter = require("./converters/unicorn-converter.js");


/**
 * PARAMETERS
 */

const unicornSourcesGlob = "C:/Dev/Habitat/src/**/serialization{,/!(Roles)/**}/*.yml";
const database = "master";


/**
 * EXECUTE
 */


// TODO: change to read the database name from a configuration setting
var sitecoreDatabases = unicorn_converter.readAndParseDatabases(unicornSourcesGlob, database);

fs.writeFileSync("./SampleOutput.json", json_converter.serialize(sitecoreDatabases));

var serialized = json_converter.serialize(sitecoreDatabases);
var deserialized = json_converter.deserialize(serialized);

console.log("Serialization from YAML to JSON for SitecoreUML completed");



