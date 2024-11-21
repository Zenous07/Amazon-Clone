import {formatMoney} from '../scripts/utils/money.js';

let result1;
let result2;
let result3;
let result4;
if(formatMoney(2095)==='20.95'){
  console.log('Test Passed');
  result1='Test Passed';
}
else{
  console.log('Test Failed');
  result1='Test Failed'
}


if(formatMoney(0)==='0.00'){
  result2='Test Passed';
  console.log("Test Passed")
}
else{
  result2='Test Failed';
  console.log("Test Failes");
}


if(formatMoney(2000.5)==='20.01'){
  result3='Test Passed';
  console.log("Test Passed")
}
else{
  result3='Test Failed';
  console.log("Test Failes");
}
if(formatMoney(2000.4)==='20.00'){
  result4='Test Passed';
  console.log("Test Passed")
}
else{
  result4='Test Failed';
  console.log("Test Failes");
}


document.querySelector('.test-result-container').innerHTML=`Test 1:${result1}, Test 2:${result2}, Test 3:${result3}, Test 4:${result4}`;