import React from 'react';
import {Platform} from 'react-native';
import Share from 'react-native-share';

const OnShare = (url, title, message) => {
    // console.log("url: ", url, "title: ", title, "message: ", message);
    
    const options = Platform.select({
        ios: {
            activityItemSources: [
                {
                    placeholderItem: { type:'url', content: url},
                    item: {
                        default: {type:'url', content: url},
                    },
                    subject: {
                        default: title
                    },
                    linkMetadata: {originalUrl: url, url, title},
                },
                {
                    placeholderItem: {type: 'text', content: message},
                    item: {
                        default: { type:'text', content: message},
                        message: null,
                    },
                },
            ],
        },
        default: {
            title: title,
            url: url,
            subject: `${title} \n`,
            message: `${message} \n`,
            
        },
    });
    
    return (
        Share.open(options)
        .then((res) => { 
            // console.log("Result----: ",res) 
        })
        .catch((err) => { err && console.log("Error-----: ",err); })
    );
   
};

export default OnShare;