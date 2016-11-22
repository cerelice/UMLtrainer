"use strict";
var CustomHttpInterceptor = (function () {
    function CustomHttpInterceptor($q, rootManager) {
        var _this = this;
        this.$q = $q;
        this.rootManager = rootManager;
        this.response = function (response) {
            return _this.$q.when(response);
        };
        this.responseError = function (rejection) {
            return _this.$q.reject(rejection);
        };
    }
    CustomHttpInterceptor.factory = function ($q, rootManager) {
        return new CustomHttpInterceptor($q, rootManager);
    };
    return CustomHttpInterceptor;
}());
exports.CustomHttpInterceptor = CustomHttpInterceptor;
//# sourceMappingURL=request-response-handler.js.map