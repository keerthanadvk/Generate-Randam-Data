"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_TEMPLATE_TYPES = exports.NOTIFICATION_TYPES = exports.PROSPIFI_PROVIDERS = exports.MATCH_KEY_INPUT_FIELD_TYPES = exports.NON_PII_INPUT_FIELD_TYPES = exports.FILE_EXT_TYPES = exports.DATA_SOURCE_TYPES = exports.SUPPRESS_INPUT_FIELD_TYPES = exports.SATORI_INPUT_FIELD_TYPES = exports.PROSPIFI_PROGRAMS = exports.ccmDataID = exports.PROGRAM_FILE_NAME = exports.EMAIL_TEMPLATES_FOLDER = exports.CONFIG_FOLDER = exports.ROOT_FOLDER = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const process_1 = require("process");
exports.ROOT_FOLDER = process.cwd();
exports.CONFIG_FOLDER = path_1.default.join(exports.ROOT_FOLDER, "config");
exports.EMAIL_TEMPLATES_FOLDER = path_1.default.join(exports.ROOT_FOLDER, "email-templates");
exports.PROGRAM_FILE_NAME = process_1.env.PROGRAM_FILE_NAME || "programs.json";
exports.ccmDataID = "ccmDataID";
exports.PROSPIFI_PROGRAMS = {
    FILE_IMPORT: 'prospifi-fileimport',
    CASS_NCOA: 'prospifi-cassncoa',
    SUPPRESSION: 'prospifi-suppression',
    DEDUP: 'prospifi-dedup',
    PREVIOUS_MAIL_DROP: 'prospifi-previous-mail-drop',
    NON_PII: 'prospifi-Non-PII',
    RETURN_FILE: 'prospifi-return-file',
    FINAL_FILE: 'prospifi-final-file'
};
exports.SATORI_INPUT_FIELD_TYPES = {
    firstName: "firstname",
    lastName: "lastname",
    businessName: "businessname",
    address: "address",
    address2: "address2",
    city: "city",
    state: "state",
    zip: "zip",
    customnumericimb: "customnumericimb"
};
exports.SUPPRESS_INPUT_FIELD_TYPES = {
    SSN: "SSN",
    LastName: "LName",
    Address: "Address",
    City: "city",
    State: "state",
    Zip: "zip"
};
exports.DATA_SOURCE_TYPES = {
    UNC: "unc",
    FTP: "ftp",
    SFTP: "sftp"
};
exports.FILE_EXT_TYPES = {
    json: "json",
    csv: "csv",
    xml: "xml"
};
exports.NON_PII_INPUT_FIELD_TYPES = {
    TU_MATCH_KEY: "TU_Match_Key",
    STATE: 'State',
    ZIP: "ZipCode",
    CAMPAIGN_TYPE: "CampType",
    CAMPAIGN_DATA_TYPE: "CampDataType"
};
exports.MATCH_KEY_INPUT_FIELD_TYPES = {
    TU_MATCH_KEY: "TU_Match_Key"
};
exports.PROSPIFI_PROVIDERS = {
    TU: 'TU',
    EXPERIAN: 'Experian',
};
exports.NOTIFICATION_TYPES = {
    FTP_CONNECTION_FAIL: "FTP Connection Fail",
    SFTP_CONNECTION_FAIL: "SFTP Connection Fail"
};
exports.EMAIL_TEMPLATE_TYPES = {
    DATA_SOURCE_CONNECTION_FAIL_TEMPLATE: "datasource-connection-error-notification.html",
};
//# sourceMappingURL=constants.js.map