import {
  NgModule,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-ULD2L2EY.js";
import {
  __name,
  __publicField
} from "./chunk-TK2CMIGJ.js";

// node_modules/@angular/cdk/fesm2022/test-environment.mjs
function _isTestEnvironment() {
  return (
    // @ts-ignore
    typeof __karma__ !== "undefined" && !!__karma__ || // @ts-ignore
    typeof jasmine !== "undefined" && !!jasmine || // @ts-ignore
    typeof jest !== "undefined" && !!jest || // @ts-ignore
    typeof Mocha !== "undefined" && !!Mocha
  );
}
__name(_isTestEnvironment, "_isTestEnvironment");

// node_modules/@angular/cdk/fesm2022/platform.mjs
var _PlatformModule = class _PlatformModule {
};
__name(_PlatformModule, "PlatformModule");
__publicField(_PlatformModule, "ɵfac", /* @__PURE__ */ __name(function PlatformModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PlatformModule)();
}, "PlatformModule_Factory"));
__publicField(_PlatformModule, "ɵmod", ɵɵdefineNgModule({
  type: _PlatformModule
}));
__publicField(_PlatformModule, "ɵinj", ɵɵdefineInjector({}));
var PlatformModule = _PlatformModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformModule, [{
    type: NgModule,
    args: [{}]
  }], null, null);
})();

export {
  _isTestEnvironment
};
//# sourceMappingURL=chunk-RKYOEZV4.js.map
