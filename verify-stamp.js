var bitcore = require('bitcore-lib');

console.log("ciao");

var stamp=[[["sha256","",""],["sha256","","4c822a3b88741e8e83e7b9a289ffc97ba5dbb330cfbbf0cf67b94776edad9dcd"],["sha256","",""],["sha256","414c7dd644620431dfd2636c27aadb7c59845258ab0f1efb813857b9edc38e94",""],["sha256","",""],["sha256","","6e8d8f6163ef68207d6432bd6b368e90fbac65d0068bdcaf6b227066694b1a34"],["sha256","",""],["reverse","",""],["sha256","0100000001d63e8684edd156c6a0f76fbabf0518a0034e9e705a5fc55337b9df1e073612b36400000048473044022042e65a41c09f41ffdc311bba52a01700393f839d68b654be9b74139d8afb8d6302200d496df8d8cdaa8a9dda3f4997f4d2fca0ce0cf2d5361ee4ec2ed109a97ed98501ffffffff010000000000000000256a23584557","00000000"],["sha256","",""],["sha256","f35e8feeb21d35f2542f18f5399962c6f6ed8bd6c1a8e9fbf4335865316c145f",""],["sha256","",""],["sha256","","1c7541ea64f5325f90526abb9755177585dafca1f6168618cfcb9b518cfecad1"],["sha256","",""],["sha256","","bc1ecca4e046b51ef5291cc0bc9021bc29730b93f660bbc02e8f7e1933d9a65c"],["sha256","",""],["sha256","","c151d83f8534ae8da90a17f923b1ad48872f4b176a94178eee8598afb5b2fe32"],["sha256","",""],["sha256","","c1a4160af2cb7a2e2d5d917784f81261254c0762ae8604b7a3d5fe127ef638af"],["sha256","",""],["sha256","9dbeb821befbf23899546ca5839429007f3f8823f0a5c67b0633c50aa8b5ac55",""],["sha256","",""],["sha256","0f28de17443e2d474d8f4eb817c954d4b73607723e7bb45977badb6537b7a724",""],["sha256","",""],["sha256","","3934ea7a9466ae53f3036455bcebdd0b3ab5d76a17cc5cf30eb00175a3c3ebf1"],["sha256","",""],["sha256","","9000f0b3dd1ea0b68018f8bf7cfebce06e0aac097e4c65f740979d3fabce7beb"],["sha256","",""],["sha256","","ff01b2d90f0605091d529f5df9ee28fc194d5f6a5f563c779c838522040098ed"],["sha256","",""],["sha256","","dda9310a49e9873a228b72d51614e963a5a4fb694a76880b1bc18135e0de8ce7"],["sha256","",""]],["block_header","bitcoin-mainnet","04000000b6dc26287d15d0633e5aa9e90440fd8ab3bdbc010d463b040000000000000000","e7c9ad56f0280918b58e955d"]];
var hash="20c7ba9c57f653b7c079df5171c196f494a5446d684c1b26a63bc5fc3fa2e25e";
var stampPath=stamp[0];
var stampEnd=stamp[1];

console.log(stampPath);

var value = hash;
for (var i = 1; i < stampPath.length; i++) {
  current = stampPath[i];
  console.log("value= " + value);
  value = exec(current[0], current[1], value, current[2]);
}

var finalValue = finalExec(stampEnd[0], stampEnd[1], stampEnd[2], value, stampEnd[3] )
console.log("finalValue=" + finalValue);

/*
> var value = new Buffer('ciao')
undefined
> value
<Buffer 63 69 61 6f>
> hash=bitcore.crypto.Hash.sha256(value)
<Buffer b1 33 a0 c0 e9 be e3 be 20 16 3d 2a d3 1d 62 48 db 29 2a a6 dc b1 ee 08 7a 2a a5 0e 0f c7 5a e2>

*/


console.log(stampEnd);

function finalExec(what, chain, prefix, prec, suffix) {
  if( what=="block_header" && chain=="bitcoin-mainnet" ) {
    return exec("sha256",exec("sha256",prefix,prec,suffix),"","");
  } else {
    throw new Exception("error");
  }
}
function exec(what, prefix, prec, suffix) {
  value=new Buffer(prefix + prec + suffix, "hex");
  if("sha256" == what) {
    h=bitcore.crypto.Hash.sha256(value);
    return h.toString('hex');
  } else if("reverse" == what) {
    return value.reverse().toString("hex");
  } else if("ripemd160" == what) {
    h=bitcore.crypto.Hash.ripemd160(value);
    return h.toString('hex');
  } else {
    throw new Exception("error");
  }


}
