var Mikrotik = require('./mikrotik')

var Person = function (data) {
  this.host = data['host-name']
  this.mac = data['mac-address']
  this.ip = data['address']
}

module.exports = function (plasma, dna) {
  var self = this
  this.dhcpRouter = new Mikrotik(dna.auth)
  this.dhcpRouter.connect(function (err) {
    if (err) {
      self.kill()
      return console.error(err)
    }
    self.fetchPeopleOnline(function (err, peopleOnline) {
      if (err) {
        self.kill()
        return console.error(err)
      }
      var data = {
        timestamp: new Date(),
        peopleOnline: peopleOnline
      }
      console.log(JSON.stringify(data, null, 2))
      self.kill()
    })
  })
  plasma.on('kill', this.kill)
}

module.exports.prototype.fetchPeopleOnline = function (next) {
  this.dhcpRouter.fetchDHCPClientsPopulated(function (err, items) {
    if (err) return next(err)
    var peopleOnline = items.map(function (data) {
      return new Person(data)
    })
    next(null, peopleOnline)
  })
}

module.exports.prototype.kill = function (c, next) {
  if (this.dhcpRouter) this.dhcpRouter.close()
  next && next()
}
