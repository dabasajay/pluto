const isEmpty = require('../isEmpty');

describe('isEmpty function', ()=>{

    it('should return true for undefined', ()=>{
        expect(isEmpty(undefined)).toBe(true);
    });

    it('should return true for null', ()=>{
        expect(isEmpty(null)).toBe(true);
    });

    it('should return true for empty array', ()=>{
        expect(isEmpty([])).toBe(true);
    });

    it('should return true for empty object', ()=>{
        expect(isEmpty({})).toBe(true);
    });

    it('should return true for empty string', ()=>{
        expect(isEmpty('')).toBe(true);
    });

});