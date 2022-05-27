export const getDiffs = (a: any, b: any) => {
  let y=[];
  let z=[];
  let flag=0;
  for(let i: any = 0; i < a.length; i++) {
    if(b.indexOf(a[i]) === -1) {
      z.push(a[i]);
    }
  }
  for(let j: any = 0; j < b.length; j++) {
    if(a.indexOf(b[j]) === -1) {
      y.push(b[j]);
    }
  }
  return y.concat(z);
}