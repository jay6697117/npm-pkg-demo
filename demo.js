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
// import dayjs from 'dayjs';
// console.log('dayjs :>> ', dayjs);
// const res = dayjs().format('YYYY/MM/DD HH:mm:ss');
// console.log('res :>> ', res);

// 5.0 uuid
// import { v4 as uuidv4 } from 'uuid';
// console.log('uuidv4 :>> ', uuidv4);
// const res = uuidv4();
// console.log('res :>> ', res);

// 6.0 faker.js
// import faker from 'faker';
// const Faker = faker.constructor;
// console.log('faker :>> ', faker); // 实例对象
// console.log('Faker :>> ', Faker); // 构造器constructor
// console.log('Faker.prototype :>> ', Faker.prototype); // 原形对象

// function generateCustomers () {
//   const customers = [];

//   for (let id = 0; id < 50; id++) {
//     const firstName = faker.name.firstName();
//     const lastName = faker.name.firstName();
//     const phoneNumber = faker.phone.phoneNumberFormat();
//     const zipCode = faker.address.zipCode();
//     const date = faker.date.recent();

//     customers.push({
//       id,
//       firstName,
//       lastName,
//       phoneNumber,
//       zipCode,
//       date
//     });
//   }

//   return { customers };
// }

// const data = generateCustomers();
// console.log('data :>> ', data);

// 7.0 mockjs
// import Mock from 'mockjs';
// console.log('Mock :>> ', Mock);
// const { Random } = Mock;
// console.log('Random :>> ', Random);

// function generateCustomers () {
//   const customers = [];

//   for (let id = 0; id < 50; id++) {
//     const firstName = Random.first();
//     const lastName = Random.last();
//     const province = Random.province();
//     const date = Random.date();

//     customers.push({
//       id,
//       firstName,
//       lastName,
//       province,
//       date
//     });
//   }

//   return { customers };
// }
// const data = generateCustomers();
// console.log('data :>> ', data);

// data.customers.forEach(element => {
//   console.log('element :>> ', element);
//   const h3 = document.createElement('h3');
//   h3.innerHTML = element.province;
//   for (const key in element) {
//     if (Object.hasOwnProperty.call(element, key)) {
//       const item = element[key];
//       const span = document.createElement('span');
//       span.innerHTML = `${key}: ${item}; `;
//       h3.appendChild(span);
//     }
//   }
//   document.getElementById('app').appendChild(h3);
// });

// 8.0 sum.js
// export default function sum (x, y) {
//   return x + y;
// }

// 9.0 sum.js
import Xenginecore from './x-engine-core/src';
console.log('Xenginecore :>> ', Xenginecore);
