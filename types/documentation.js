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

// local
const { Entity } = require("./object.js");


/**
 * ENUMS
 */

/**
 * @summary Type names of Sitecore object types
 */
const TypeNames = {
    Entity: "Metaball",
    GenerationSource: "GenerationSource"
};

/**
 * TYPES
 */

/**
 * @summary Represents the metadata for the documentation
 */
function Metaball(DocumentationTitle = "", ProjectName = "", EnvironmentName = "", CommitAuthor = "", CommitHash = "", CommitLink = "", DeployLink = "") {
    Entity.call(this, TypeNames.Item);

    /**
     * @property project name passed in the input data
     */
    this.ProjectName = "";
    /**
     * @property environment name passed in the input data
     */
    this.EnvironmentName = "";
    /**
     * @property name of the author passed in the input data
     */
    this.CommitAuthor = "";
    /**
     * @property commit hash passed in the input data
     */
    this.CommitHash = "";
    /**
     * @property commit link passed in the input data
     */
    this.CommitLink = "";
    /**
     * @property documentation title passed in the input data
     */
    this.DocumentationTitle = "";
    /**
     * @property deploy link passed in the input data
     */
    this.DeployLink = "";
    /**
     * @property set to [true] if validation errors were detected; otherwise [false] 
     */
    this.ValidationErrorsDetected = false;
    /**
     * @property validation error objects
     */
    this.ValidationErrors = [];
    /**
     * @property generation start time
     */
    this.StartTime = Date.now();
    /**
     * @property generation end time
     */
    this.EndTime = -1;
};

Metaball.prototype = Object.create(Entity.prototype);
Metaball.prototype.constructor = Metaball;


/**
 * @summary Represents the source data to be used for generation
 * @param {Metaball} metaball the metadata for the generation 
 * @param {Array<Database>} databases array of databases holding the items in the solution 
 */
function GenerationSource(metaball, databases) {
    Entity.call(this, TypeNames.GenerationSource);

    this.DocumentationConfiguration = metaball;
    this.Databases = databases;
};

GenerationSource.prototype = Object.create(Entity.prototype);
GenerationSource.prototype.constructor = GenerationSource;


/**
 * EXPORTS
 */

exports.Metaball = Metaball;
exports.GenerationSource = GenerationSource;

exports.TypeNames = TypeNames;