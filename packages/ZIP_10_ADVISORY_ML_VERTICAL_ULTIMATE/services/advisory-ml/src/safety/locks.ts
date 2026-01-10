
if (process.env.ADVISORY_WRITE_CONTRACTS === 'true') {
  throw new Error('Safety violation: advisory cannot write contracts')
}
