import React from 'react';
import PropTypes from 'prop-types';
import './SocialShare.css';

import {
    FacebookShareButton,
    TwitterShareButton,
    RedditShareButton,
    EmailShareButton,
    FacebookShareCount,
    RedditShareCount,
} from 'react-share';

import {
    FacebookIcon,
    TwitterIcon,
    RedditIcon,
    EmailIcon,
} from 'react-share';


function SocialShare({title = "", hashtags = [], klass = null}) {

    const url = 'https://pollofeed.com'

    return (
        <span className={klass}>

            <TwitterShareButton
                url={url}
                title={'@pollofeed'}
                className={'social-share-icon__share-button'}
            >
                <TwitterIcon
                    className={'social-share-icon__share-icon'}
                />
            </TwitterShareButton>
            <div className={'social-share-icon'}>
                <FacebookShareButton
                    quote={url}
                    url={url}
                    className={'social-share-icon__share-button'}
                >
                    <FacebookIcon
                        className={'social-share-icon__share-icon'}
                    />
                </FacebookShareButton>
                {/*<FacebookShareCount*/}
                    {/*url={url}*/}
                    {/*className={'social-share-icon__share-icon'}*/}
                {/*/>*/}
            </div>
            <div>
                <RedditShareButton
                    url={url}
                    title={url}
                    className={'social-share-icon__share-button'}

                >
                    <RedditIcon
                        className={'social-share-icon__share-icon'}
                    />

                </RedditShareButton>
                {/*<RedditShareCount url={url}/>*/}
            </div>
               <EmailShareButton
                   subject={url}
                   url={url}
                   className={'social-share-icon__share-button'}
                   body={title}
               >
                <EmailIcon
                    className={'social-share-icon__share-icon'}
                />
               </EmailShareButton>
        </span>
    );
}

SocialShare.propTypes = {};
SocialShare.defaultProps = {};

export default SocialShare;
