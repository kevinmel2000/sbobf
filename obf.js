var h=(s,e=true)=>{
  var a=s.split("").map(x=>`\\x${Number(x.charCodeAt(0)).toString(16)}`).join("");
  return (e ? ["$'", "'"].join(a) : `'${a}'`);
},
r=n=>{
  var a="abcdefghijklmnopqrstuvwxyz",r="";
  for(i=0;i<n;i++)
    r+=a[Math.floor(Math.random() * a.length)];
  return r;
},
j=(c,s)=>{
  var v1=r(s),
      v2=r(s);

  return (`
${v1}(){
  ${v2}=$(cat $0);
  ${v2}=\${#${v2}}
  while true; do 
    if(( $${v2} == 2 )); then
      break
    fi
    ${v2}=$(( $${v2} / 2 ))
  done
  ${h("echo")} $${v2}
}

${h("eval")} $(${h("echo")} -e $(sed "s/x00/x$(${v1})/" <<< ${c}))
  `);
  
},
obf=async (i,c=15)=>{
  var a=`${h("eval")} $(${h("echo")} ${h(btoa(i))} | ${h("base64")} -d)`, a = h(a, false);
  var b=j(a,c).length;
  
  while(true){
    if(b.toString().length === 2) break;
    b=Math.floor(b / 2);
    
  }
  
  
  return j(a.replace(/`x${b}`/g, 'x00'),c);
};