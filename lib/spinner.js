const Effects = require('cli-spinners');
const spin = require('spinnies');

const spinner = Effects.point
  
  let globalSpinner;
  
  
  const getGlobalSpinner = (disableSpins = false) => {
    if(!globalSpinner) globalSpinner = new spin({ color: 'cyanBright', succeedColor: 'greenBright', spinner, disableSpins});
    return globalSpinner;
  }
  
  spins = getGlobalSpinner(false)
  
  const startspin = (id, text) => {
      spins.add(id, {text: text})
      }
  const info = (id, text) => {
      spins.update(id, {text: text})
  }
  const success = (id, text) => {
      spins.succeed(id, {text: text})
  
      }
  
  const close = (id, text) => {
      spins.fail(id, {text: text})
  }

module.exports = { startspin, info, success, close }