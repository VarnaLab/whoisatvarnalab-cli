# whoisatvarnalab-cli

This is a simple command line nodejs application which shows active dhcp clients for a mikrotik router.

## pre-requirements

* mikrotik router
* nodejs v4 + npm

## setup

    $ git clone {repo} {installpath}
    $ cd {installpath}
    $ npm install
    edit ./dna/secrets.json

## use

    $ cd whoisatvarnalab-cli
    $ node index.js

## what is does in details

1. reads its configuration from `{installpath}/dna/*.json`
2. connects to Mikrotik using `dna.secrets.mikrotik-api` configuration
3. fetches active dhcp clients connected at the router
4. outputs to the console a `json` with the following structure

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
