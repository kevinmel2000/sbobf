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
#tool made by maoundis
#from xiuz code 
#https://ikbal-hanafi.github.io/sbobf

${v1}=$(${h("cat")} $0);
  
${v2}=\${#${v1}}
while true; do 
  if(( \${#${v2}} == 2 )); then
     break
  fi
  ${v2}=$(( $${v2} / 2 ))
done

${h("eval")} $(${h("echo")} ${h("-e")} $(${h("sed")} "s/x00/x$${v2}/g" <<< ${c}))

`);
  
},
obf=async (i,c=500)=>{
  var a=`${h("eval")} $(${h("echo")} ${h(btoa(i))} | ${h("base64")} ${h("-d")})`, a = h(a, false);
  var b=j(a,c).length;
  
  while(true){
    if(b.toString().length === 2) {
      i=b;break;
    }
    b=Math.floor(b / 2);
  }
  
  
  return j(a.replace(/`x${b}`/g, 'x00'),c);
};