# whoisatvarnalab-cli

This is a simple command line nodejs application which does the following:

1. reads its configuration from `{installpath}/dna/*.json`
2. connects to Mikrotik using `dna.secrets.mikrotik-api` configuration
3. fetches active dhcp clients connected at the router
4. outputs to the console a `json`

  ```
  {
    timestamp: Date,
    peopleOnline: Array[ {
      host: String,
      mac: String,
      ip: String
    } ]
  }
  ```

## pre-requirements

* mikrotik router
* nodejs v4 + npm

## setup

    $ git clone {{{repo}}}
    $ cd whoisatvarnalab-cli
    $ npm install
    edit ./dna/secrets.json

## use

  $ cd whoisatvarnalab-cli
  $ node index.js
