import bcrypt from 'bcryptjs';

const pass = 'VictorAkinode@10';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(pass, salt);

console.log('--- PASSWORD TEST ---');
console.log('Password:', pass);
console.log('Generated Hash:', hash);
console.log('Verification check:', bcrypt.compareSync(pass, hash));
console.log('----------------------');
