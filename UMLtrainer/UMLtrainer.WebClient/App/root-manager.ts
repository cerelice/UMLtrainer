export class RootManager {
    constructor(private $rootScope: ng.IRootScopeService) {
    }

    public showLoadScreen = () => {
        this.changeScreenState(true);
    }

    public hideLoadScreen = () => {
        this.changeScreenState(false);
    }

    private changeScreenState(isLoading: boolean) {
        (this.$rootScope as any).stateIsLoading = isLoading;
    };
﻿}

let rootManagerFactory = ($rootScope: ng.IRootScopeService): RootManager => {
    return new RootManager($rootScope);
};

﻿rootManagerFactory.$inject = ["$rootScope"];

﻿angular
    .module("app-common", [])
    .factory("rootManager", rootManagerFactory);