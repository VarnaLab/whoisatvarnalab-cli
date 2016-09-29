var Api = require('mikronode')
var _ = require('underscore')

module.exports = function (authOptions) {
  this.authOptions = authOptions
}

module.exports.prototype.connect = function (done) {
  var self = this
  this.connection = new Api(this.authOptions.host, this.authOptions.user, this.authOptions.pass, {
    port: this.authOptions.port
  })
  this.connection.connect(function (conn) {
    self.chan = conn.openChannel()
    done && done()
  })
  this.connection.on('error', done)
}

module.exports.prototype.close = function (done) {
  var self = this
  if (self.connection) self.connection.close()
  if (self.chan) self.chan.close()
  done && done()
}

module.exports.prototype.fetchDHCPClientsPopulated = function (done) {
  var self = this
  this.fetchLeasedDHCPClients(function (err, leasedClients) {
    if (err) return done(err)
    self.fetchActiveDHCPClients(function (err, activeClients) {
      if (err) return done(err)
      activeClients = activeClients.map(function (activeClient) {
        var leasedClient = _.findWhere(leasedClients, {'mac-address': activeClient['mac-address']})
        return _.extend(activeClient, leasedClient)
      })
      done(null, activeClients)
    })
  })
}

module.exports.prototype.fetchActiveDHCPClients = function (done) {
  var self = this
  self.chan.write('/ip/arp/getall', function () {
    self.chan.on('error', done)
    self.chan.on('done', function (data) {
      done(null, Api.parseItems(data))
    })
  })
}

module.exports.prototype.fetchLeasedDHCPClients = function (done) {
  var self = this
  if (!self.chan) return done([])
  self.chan.write('/ip/dhcp-server/lease/getall', function () {
    self.chan.on('error', done)
    self.chan.on('done', function (data) {
      done(null, Api.parseItems(data))
    })
  })
}
