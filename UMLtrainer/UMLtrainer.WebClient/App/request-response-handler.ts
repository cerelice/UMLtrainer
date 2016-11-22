import {RootManager} from "./root-manager";

export class CustomHttpInterceptor implements ng.IHttpInterceptor {
    public static factory($q: ng.IQService, rootManager: RootManager) {
        return new CustomHttpInterceptor($q, rootManager);
    }

    constructor(private $q: ng.IQService, private rootManager: RootManager) {
    }

    public response = <T>(response: ng.IHttpPromiseCallbackArg<T>): ng.IPromise<T> => {
        return this.$q.when(response);
    }

    public responseError = (rejection: any): ng.IPromise<any> => {
        return this.$q.reject(rejection);
    }
}