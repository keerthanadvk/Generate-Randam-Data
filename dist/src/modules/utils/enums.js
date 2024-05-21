"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrichmentTypeEnums = exports.SuppressMatchStatus = void 0;
var SuppressMatchStatus;
(function (SuppressMatchStatus) {
    SuppressMatchStatus["SSN_MATCHED"] = "Suppressed SSN-Matched";
    SuppressMatchStatus["LAST_NAME_ADDRESS_MATCHED"] = "Suppressed LastName_Address-Matched";
    SuppressMatchStatus["ADDRESS_MATCHED"] = "Suppressed Address-Matched";
    SuppressMatchStatus["SINGLE_SUPPRESSION_MATCHED"] = "Suppressed Single Supression-Matched";
    SuppressMatchStatus["WORD_SUPPRESSION_MATCHED"] = "Suppressed Word-Matched";
})(SuppressMatchStatus || (exports.SuppressMatchStatus = SuppressMatchStatus = {}));
var EnrichmentTypeEnums;
(function (EnrichmentTypeEnums) {
    EnrichmentTypeEnums["cass"] = "cass";
    EnrichmentTypeEnums["geocoding"] = "geocoding";
    EnrichmentTypeEnums["ncoa"] = "ncoa";
})(EnrichmentTypeEnums || (exports.EnrichmentTypeEnums = EnrichmentTypeEnums = {}));
//# sourceMappingURL=enums.js.map