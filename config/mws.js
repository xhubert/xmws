const hosts = {
  us: {
    country_code: 'US',
    marketplaceid: 'ATVPDKIKX0DER',
    endpoint: 'https://mws.amazonservices.com'
  }
};

const mwsCfg = {
  accessKeyId: 'lol',
  secretAccessKey: 'kek',
  merchantId: 'hue',
  host: hosts.us.endpoint, // .de, .es, .fr, .it, etc
  meta: {
    retry: true, // retry requests when throttled
    next: true, // auto-paginate
    limit: Infinity // only get this number of items (NOT the same as MaxRequestsPerPage)
  }
};

export default mwsCfg;
