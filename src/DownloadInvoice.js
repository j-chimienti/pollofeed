"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var utils_1 = require("./utils");
function downloadInv(inv) {
    var klass = 'text-success';
    var klass2 = 'fa-spin';
    var dl = document.getElementById('dl');
    dl.classList.add(klass, klass2);
    Object.assign(inv, {
        link: window.location.href + ("/order/id/" + inv.id)
    });
    utils_1.downloadObjectAsJson(inv, "pollofeed-order-" + inv.id);
    setTimeout(function () {
        dl.classList.remove(klass, klass2);
    }, 1000);
}
function DownloadInvoice(_a) {
    var inv = _a.inv;
    return (<button className={'btn btn-warning'} onClick={function () { return downloadInv(inv); }}>
           <i id={'dl'} className={'fa fa-download mx-2 pointer'}>

           </i>
       </button>);
}
DownloadInvoice.propTypes = {
    inv: prop_types_1.default.object.isRequired
};
DownloadInvoice.defaultProps = {};
exports.default = DownloadInvoice;
//# sourceMappingURL=DownloadInvoice.js.map