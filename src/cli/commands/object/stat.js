'use strict'

const multibase = require('multibase')
const print = require('../../utils').print

module.exports = {
  command: 'stat <key>',

  describe: 'Get stats for the DAG node named by <key>',

  builder: {
    'cid-base': {
      describe: 'Number base to display CIDs in.',
      type: 'string',
      choices: multibase.names
    }
  },

  handler ({ ipfs, key, cidBase }) {
    ipfs.object.stat(key, { enc: 'base58', cidBase }, (err, stats) => {
      if (err) {
        throw err
      }

      delete stats.Hash // only for js-ipfs-api output

      Object.keys(stats).forEach((key) => {
        print(`${key}: ${stats[key]}`)
      })
    })
  }
}