const fs = require('fs');
const logger = require('../logger');

const errorLogfilePath = 'logs/error-test.log';
const combinedLogfilePath = 'logs/combined-test.log';

describe('logger', ()=>{

  it('should be truthy', ()=>{
    expect(logger).toBeTruthy();
  });
  
  it('should create error.log file', () => {
    expect(fs.existsSync(errorLogfilePath)).toBe(true);
  })
  
  it('should create combined.log file', () => {
    expect(fs.existsSync(combinedLogfilePath)).toBe(true);
  })

});