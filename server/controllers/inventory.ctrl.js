var accessKey = 'AKIARFJSOEFRPETLWRQ';
const accessSecret = '/MWGCBKNC/FF';

var amazonMws = require('../../../lib/amazon-mws')(accessKey, accessSecret);

var fulfillmentInventoryRequest = function () {
    amazonMws.fulfillmentInventory.search({
        'Version': '2010-10-01',
        'Action': 'ListInventorySupply',
        'SellerId': 'SELLER_ID',
        'MWSAuthToken': 'MWS_AUTH_TOKEN',
        'MarketplaceId': 'MARKET_PLACE_ID',
        'QueryStartDateTime': new Date(2016, 11, 24)
    }, function (error, response) {
        if (error) {
            console.log('error ', error);
            return;
        }
        console.log('response', response);
    });
};

fulfillmentInventoryRequest();