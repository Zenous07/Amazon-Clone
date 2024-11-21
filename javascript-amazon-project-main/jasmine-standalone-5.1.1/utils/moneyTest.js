import {formatMoney} from '../../scripts/utils/money.js';

describe('Test Suite: Fromat Currency', ()=>{
  it('Converts Cents Into Dollars', ()=>{
    expect(formatMoney(2095)).toEqual('20.95');
  });

  it('Works with 0', ()=>{
    expect(formatMoney(0)).toEqual('0.00');
  });

  it('Rounding Check',()=>{
    expect(formatMoney(2000.5)).toEqual('20.01');
  });
});