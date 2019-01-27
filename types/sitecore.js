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
const sitecore_constants = require("../constants/sitecore.js");


/**
 * CONSTANTS
 */

const SHARED_LANGUAGE_KEY = "Shared";
const UNVERSIONED_VERSION_KEY = "Unversioned"; 


/**
 * ENUMS
 */

const TypeNames = {
    Database: "Database",
    StandardValues: "StandardValues",
    TemplateField: "TemplateField",
    TemplateSection: "TemplateSection",
    TemplateFolder: "TemplateFolder",
    Template: "Template",
    Item: "Item",
};


/**
 * TYPES
 */

function Entity(type) {
    this.Type = type; 
};


function Item(id, templateID, parent, path) {
    Entity.call(this, TypeNames.Item);

    this.ReferenceID = id;
    this.TemplateID = templateID;
    this.Parent = parent;
    this.Path = path;

    this.Name = path.substring(path.lastIndexOf("/"));

    this.LanguageVersions = [];
};

Item.prototype = Object.create(Entity.prototype);
Item.prototype.constructor = Item;

Item.prototype.getLanguages = function () {
    return Object.keys(this.LanguageVersions);
};

Item.prototype.getFieldValue = function (fieldID, language = SHARED_LANGUAGE_KEY, version = UNVERSIONED_VERSION_KEY) {
    var language = this.LanguageVersions[language];
    if (!language) {
        return undefined;
    }

    var languageVersion = language[version];
    if (!version) {
        return undefined;
    }

    return languageVersion[fieldID];
};

Item.prototype.setFieldValue = function (fieldID, value, language = SHARED_LANGUAGE_KEY, version = UNVERSIONED_VERSION_KEY) {
    var lang = this.LanguageVersions[language];
    if (!lang) {
        lang = {};
        this.LanguageVersions[language] = lang;
    }

    var langVersion = lang[version];
    if (!langVersion) {
        langVersion = {};
        lang[version] = langVersion;
    }

    langVersion[fieldID] = value;
};


function Template(id, templateID, parent, path, baseTemplates = [], templateSections = [], standardValues = undefined) {
    Item.call(this, id, templateID, parent, path, TypeNames.Template);

    this.BaseTemplates = baseTemplates;
    this.TemplateSections = templateSections;

    this.StandardValues = standardValues;
};

Template.prototype = Object.create(Item.prototype);
Template.prototype.constructor = Template;

Template.prototype.getFields = function () {
    return this.TemplateSections
        .map(function (templateSection) {
            return templateSection.TemplateFields;
        });
};


function TemplateFolder(id, templateID, parent, path, children = []) {
    Item.call(this, id, templateID, parent, path, TypeNames.TemplateFolder);

    this.Children = children;
};

TemplateFolder.prototype = Object.create(Item.prototype);
TemplateFolder.prototype.constructor = TemplateFolder;


function TemplateSection(id, templateID, parent, path, templateFields = []) {
    Item.call(this, id, templateID, parent, path, TypeNames.Database);

    this.TemplateFields = templateFields;
};

TemplateSection.prototype = Object.create(Item.prototype);
TemplateSection.prototype.constructor = TemplateSection;


function TemplateField(id, templateID, parent, path, fieldType, sortOrder = 100, source = "", shared = false, unversioned = false) {
    Item.call(this, id, templateID, parent, path, TypeNames.TemplateField);

    this.FieldType = fieldType;
    this.SortOrder = sortOrder;
    this.Source = source;
    this.Shared = shared;
    this.Unversioned = unversioned;
};

TemplateField.prototype = Object.create(Item.prototype);
TemplateField.prototype.constructor = TemplateField;

TemplateField.prototype.addTitle = function (value, language) {
    this.setFieldValue(sitecore_constants.TEMPLATE_FIELD_TITLE_FIELD_ID, value, language);
};

TemplateField.prototype.getTitle = function (language) {
    return this.getFieldValue(sitecore_constants.TEMPLATE_FIELD_TITLE_FIELD_ID, language);
};


function StandardValues(id, templateID, parent, path) {
    Item.call(this, id, templateID, parent, path, TypeNames.Database);
};

StandardValues.prototype = Object.create(Item.prototype);
StandardValues.prototype.constructor = StandardValues;


function Database(name, itemTree = {}) {
    Entity.call(this, TypeNames.Database);

    this.Name = name;
    this.ItemTree = itemTree;
};

Database.prototype = Object.create(Entity.prototype);
Database.prototype.constructor = Database;


/**
 * EXPORTS
 */

exports.Database = Database;
exports.StandardValues = StandardValues;
exports.TemplateField = TemplateField;
exports.TemplateSection = TemplateSection;
exports.TemplateFolder = TemplateFolder;
exports.Template = Template;
exports.Item = Item;

exports.TypeNames = TypeNames;
