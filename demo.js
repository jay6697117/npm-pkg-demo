// 1.0 lodash
// import { cloneDeep } from 'lodash';
// console.log('cloneDeep :>> ', cloneDeep);
// const obj = { a: 1, b: 2 };
// const newObj = cloneDeep(obj);
// console.log('obj :>> ', obj);
// newObj.a = 111;
// newObj.b = 222;
// console.log('newObj :>> ', newObj);

// 2.0 qs
// import { parse, stringify } from 'qs';
// console.log('parse :>> ', parse);
// console.log('stringify :>> ', stringify);
// const obj = parse('name=zjh&age=33&sex=man&height=177');
// console.log('obj :>> ', obj);
// const str = stringify({ name: 'zjh', age: 33, sex: 'man', height: '177' });
// console.log('str :>> ', str);

// 3.0 numeral
// import numeral from 'numeral';
// console.log('numeral :>> ', numeral);
// // 格式化
// const res = numeral(10000.23).format("0,0.0"); // '10,000'
// console.log('res :>> ', res); // res :>>  10,000.2

// 4.0 dayjs
import dayjs from 'dayjs'


console.log('dayjs :>> ', dayjs)



const res = dayjs().format('YYYY/MM/DD HH:mm:ss')


console.log('res :>> ', res)
