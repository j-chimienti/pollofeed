"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./SocialShare.css");
var react_share_1 = require("react-share");
var react_share_2 = require("react-share");
function SocialShare(_a) {
    var _b = _a.title, title = _b === void 0 ? "" : _b, _c = _a.hashtags, hashtags = _c === void 0 ? [] : _c, _d = _a.klass, klass = _d === void 0 ? null : _d;
    var url = 'https://pollofeed.com';
    return (<span className={klass}>

            <react_share_1.TwitterShareButton url={url} title={title} className={'social-share-icon__share-button'}>
                <react_share_2.TwitterIcon className={'social-share-icon__share-icon'}/>
            </react_share_1.TwitterShareButton>
            <div className={'social-share-icon'}>
                <react_share_1.FacebookShareButton quote={title} url={url} className={'social-share-icon__share-button'}>
                    <react_share_2.FacebookIcon className={'social-share-icon__share-icon'}/>
                </react_share_1.FacebookShareButton>
                
                    
                    
                
            </div>
            <div>
                <react_share_1.RedditShareButton url={url} title={title} className={'social-share-icon__share-button'}>
                    <react_share_2.RedditIcon className={'social-share-icon__share-icon'}/>

                </react_share_1.RedditShareButton>
                
            </div>
               <react_share_1.EmailShareButton subject={title} url={url} className={'social-share-icon__share-button'} body={title}>
                <react_share_2.EmailIcon className={'social-share-icon__share-icon'}/>
               </react_share_1.EmailShareButton>
        </span>);
}
SocialShare.propTypes = {};
SocialShare.defaultProps = {};
exports.default = SocialShare;
//# sourceMappingURL=SocialShare.js.map