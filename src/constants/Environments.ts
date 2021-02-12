const Environments = {
  MVP: {
    subdomain: 'mickey'
  },
  STAGING: {
    hostnames: ['staging.amplehills.com'],
    subdomain: 'staging'
  },
  PRODUCTION: {
    hostnames: ['www.amplehills.com', 'amplehills.com'],
    subdomain: 'www'
  },
  LOCAL: {
    hostnames: ['localhost:3000'],
    subdomain: 'localhost:3000'
  }
};

export default Environments;
