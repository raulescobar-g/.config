"use strict";var K=Object.create;var m=Object.defineProperty;var Q=Object.getOwnPropertyDescriptor;var ee=Object.getOwnPropertyNames;var te=Object.getPrototypeOf,re=Object.prototype.hasOwnProperty;var h=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),oe=(e,t)=>{for(var o in t)m(e,o,{get:t[o],enumerable:!0})},P=(e,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of ee(t))!re.call(e,r)&&r!==o&&m(e,r,{get:()=>t[r],enumerable:!(n=Q(t,r))||n.enumerable});return e};var ae=(e,t,o)=>(o=e!=null?K(te(e)):{},P(t||!e||!e.__esModule?m(o,"default",{value:e,enumerable:!0}):o,e)),ne=e=>P(m({},"__esModule",{value:!0}),e);var v=h((Pe,U)=>{"use strict";var E=require("fs"),w;function le(){try{return E.statSync("/.dockerenv"),!0}catch{return!1}}function se(){try{return E.readFileSync("/proc/self/cgroup","utf8").includes("docker")}catch{return!1}}U.exports=()=>(w===void 0&&(w=le()||se()),w)});var O=h((ke,A)=>{"use strict";var ie=require("os"),ue=require("fs"),T=v(),I=()=>{if(process.platform!=="linux")return!1;if(ie.release().toLowerCase().includes("microsoft"))return!T();try{return ue.readFileSync("/proc/version","utf8").toLowerCase().includes("microsoft")?!T():!1}catch{return!1}};process.env.__IS_WSL_TEST__?A.exports=I:A.exports=I()});var M=h((Be,L)=>{"use strict";L.exports=(e,t,o)=>{let n=r=>Object.defineProperty(e,t,{value:r,enumerable:!0,writable:!0});return Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get(){let r=o();return n(r),r},set(r){n(r)}}),e}});var N=h((Ee,q)=>{var ce=require("path"),fe=require("child_process"),{promises:C,constants:z}=require("fs"),x=O(),de=v(),S=M(),$=ce.join(__dirname,"xdg-open"),{platform:d,arch:R}=process,pe=(()=>{let e="/mnt/",t;return async function(){if(t)return t;let o="/etc/wsl.conf",n=!1;try{await C.access(o,z.F_OK),n=!0}catch{}if(!n)return e;let r=await C.readFile(o,{encoding:"utf8"}),s=/(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(r);return s?(t=s.groups.mountPoint.trim(),t=t.endsWith("/")?t:`${t}/`,t):e}})(),V=async(e,t)=>{let o;for(let n of e)try{return await t(n)}catch(r){o=r}throw o},b=async e=>{if(e={wait:!1,background:!1,newInstance:!1,allowNonzeroExitCode:!1,...e},Array.isArray(e.app))return V(e.app,i=>b({...e,app:i}));let{name:t,arguments:o=[]}=e.app||{};if(o=[...o],Array.isArray(t))return V(t,i=>b({...e,app:{name:i,arguments:o}}));let n,r=[],s={};if(d==="darwin")n="open",e.wait&&r.push("--wait-apps"),e.background&&r.push("--background"),e.newInstance&&r.push("--new"),t&&r.push("-a",t);else if(d==="win32"||x&&!de()){let i=await pe();n=x?`${i}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`:`${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`,r.push("-NoProfile","-NonInteractive","\u2013ExecutionPolicy","Bypass","-EncodedCommand"),x||(s.windowsVerbatimArguments=!0);let u=["Start"];e.wait&&u.push("-Wait"),t?(u.push(`"\`"${t}\`""`,"-ArgumentList"),e.target&&o.unshift(e.target)):e.target&&u.push(`"${e.target}"`),o.length>0&&(o=o.map(p=>`"\`"${p}\`""`),u.push(o.join(","))),e.target=Buffer.from(u.join(" "),"utf16le").toString("base64")}else{if(t)n=t;else{let i=!__dirname||__dirname==="/",u=!1;try{await C.access($,z.X_OK),u=!0}catch{}n=process.versions.electron||d==="android"||i||!u?"xdg-open":$}o.length>0&&r.push(...o),e.wait||(s.stdio="ignore",s.detached=!0)}e.target&&r.push(e.target),d==="darwin"&&o.length>0&&r.push("--args",...o);let f=fe.spawn(n,r,s);return e.wait?new Promise((i,u)=>{f.once("error",u),f.once("close",p=>{if(e.allowNonzeroExitCode&&p>0){u(new Error(`Exited with code ${p}`));return}i(f)})}):(f.unref(),f)},D=(e,t)=>{if(typeof e!="string")throw new TypeError("Expected a `target`");return b({...t,target:e})},ge=(e,t)=>{if(typeof e!="string")throw new TypeError("Expected a `name`");let{arguments:o=[]}=t||{};if(o!=null&&!Array.isArray(o))throw new TypeError("Expected `appArguments` as Array type");return b({...t,app:{name:e,arguments:o}})};function j(e){if(typeof e=="string"||Array.isArray(e))return e;let{[R]:t}=e;if(!t)throw new Error(`${R} is not supported`);return t}function _({[d]:e},{wsl:t}){if(t&&x)return j(t);if(!e)throw new Error(`${d} is not supported`);return j(e)}var y={};S(y,"chrome",()=>_({darwin:"google chrome",win32:"chrome",linux:["google-chrome","google-chrome-stable","chromium"]},{wsl:{ia32:"/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",x64:["/mnt/c/Program Files/Google/Chrome/Application/chrome.exe","/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"]}}));S(y,"firefox",()=>_({darwin:"firefox",win32:"C:\\Program Files\\Mozilla Firefox\\firefox.exe",linux:"firefox"},{wsl:"/mnt/c/Program Files/Mozilla Firefox/firefox.exe"}));S(y,"edge",()=>_({darwin:"microsoft edge",win32:"msedge",linux:["microsoft-edge","microsoft-edge-dev"]},{wsl:"/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"}));D.apps=y;D.openApp=ge;q.exports=D});var De={};oe(De,{default:()=>H});module.exports=ne(De);var a=require("@raycast/api");var k=["candy","breeze","crimson","falcon","meadow","midnight","raindrop","sunset"],B=[{label:"Auto-Detect",value:"auto"},{label:"Bash",value:"bash"},{label:"C#",value:"csharp"},{label:"Clojure",value:"Clojure"},{label:"CoffeeScript",value:"coffeescript"},{label:"Crystal",value:"crystal"},{label:"CSS",value:"css"},{label:"D",value:"d"},{label:"Dart",value:"dart"},{label:"Diff",value:"diff"},{label:"Docker",value:"dockerfile"},{label:"Elm",value:"elm"},{label:"Erlang",value:"erlang"},{label:"Fortran",value:"fortran"},{label:"Gherkin",value:"gherkin"},{label:"Go",value:"Go"},{label:"Groovy",value:"groovy"},{label:"Haskell",value:"haskell"},{label:"Java",value:"java"},{label:"Javascript",value:"javascript"},{label:"JSON",value:"json"},{label:"JSX",value:"jsx"},{label:"Julia",value:"julia"},{label:"Kotlin",value:"kotlin"},{label:"LaTeX",value:"latex"},{label:"Lisp",value:"lisp"},{label:"Lua",value:"lua"},{label:"Markdown",value:"markdown"},{label:"MATLAB/Octave",value:"octave"},{label:"NGINX",value:"nginx"},{label:"Objective C",value:"objectivec"},{label:"OCaml",value:"ocaml"},{label:"Perl",value:"perl"},{label:"PHP",value:"php"},{label:"Powershell",value:"powershell"},{label:"Python",value:"python"},{label:"R",value:"r"},{label:"Ruby",value:"ruby"},{label:"Rust",value:"rust"},{label:"Scala",value:"scala"},{label:"Smalltalk",value:"smalltalk"},{label:"Swift",value:"swift"},{label:"Typescript",value:"typescript"},{label:"Twig",value:"twig"},{label:"Verilog",value:"verilog"},{label:"VHDL",value:"vhdl"},{label:"XQuery",value:"xquery"},{label:"YAML",value:"yaml"}];var J=require("react"),Y=ae(N());var me=typeof btoa=="function",F=typeof Buffer=="function",Ue=typeof TextDecoder=="function"?new TextDecoder:void 0,W=typeof TextEncoder=="function"?new TextEncoder:void 0,he="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",g=Array.prototype.slice.call(he),Te=(e=>{let t={};return e.forEach((o,n)=>t[o]=n),t})(g);var c=String.fromCharCode.bind(String),Ie=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):(e,t=o=>o)=>new Uint8Array(Array.prototype.slice.call(e,0).map(t)),xe=e=>e.replace(/=/g,"").replace(/[+\/]/g,t=>t=="+"?"-":"_");var be=e=>{let t,o,n,r,s="",f=e.length%3;for(let i=0;i<e.length;){if((o=e.charCodeAt(i++))>255||(n=e.charCodeAt(i++))>255||(r=e.charCodeAt(i++))>255)throw new TypeError("invalid character found");t=o<<16|n<<8|r,s+=g[t>>18&63]+g[t>>12&63]+g[t>>6&63]+g[t&63]}return f?s.slice(0,f-3)+"===".substring(f):s},X=me?e=>btoa(e):F?e=>Buffer.from(e,"binary").toString("base64"):be,ye=F?e=>Buffer.from(e).toString("base64"):e=>{let o=[];for(let n=0,r=e.length;n<r;n+=4096)o.push(c.apply(null,e.subarray(n,n+4096)));return X(o.join(""))};var we=e=>{if(e.length<2){var t=e.charCodeAt(0);return t<128?e:t<2048?c(192|t>>>6)+c(128|t&63):c(224|t>>>12&15)+c(128|t>>>6&63)+c(128|t&63)}else{var t=65536+(e.charCodeAt(0)-55296)*1024+(e.charCodeAt(1)-56320);return c(240|t>>>18&7)+c(128|t>>>12&63)+c(128|t>>>6&63)+c(128|t&63)}},ve=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,Ae=e=>e.replace(ve,we),G=F?e=>Buffer.from(e,"utf8").toString("base64"):W?e=>ye(W.encode(e)):e=>X(Ae(e)),Ce=(e,t=!1)=>t?xe(G(e)):G(e),Z=e=>Ce(e,!0);var l=require("react/jsx-runtime"),Se={title:"Untitled%201",background:"true",darkMode:"true",padding:"16",language:"auto",snippet:"",color:"candy"};function H(){let[e,t]=(0,J.useState)(Se),o=`https://ray.so/#theme=${e.color}&background=${e.background}&darkMode=${e.darkMode}&padding=${e.padding}&title=${e.title||"Untitled%201"}&code=${Z(e.snippet)}&language=${e.language}`;return(0,l.jsxs)(a.Form,{actions:(0,l.jsx)(a.ActionPanel,{children:(0,l.jsx)(a.SubmitFormAction,{title:"Create Snippet",onSubmit:async()=>{if(!e.snippet){await(0,a.showToast)(a.ToastStyle.Failure,"Missing Code","Code cannot be empty");return}(0,Y.default)(o),(0,a.closeMainWindow)()}})}),children:[(0,l.jsx)(a.Form.TextField,{id:"title",title:"Title",placeholder:"Untitled 1",onChange:r=>t({...e,title:r.replace(/ /g,"%20").trim()})}),(0,l.jsx)(a.Form.TextArea,{id:"code",title:"Code",placeholder:"Paste your code here",onChange:r=>t({...e,snippet:r})}),(0,l.jsx)(a.Form.Separator,{}),(0,l.jsx)(a.Form.Dropdown,{id:"color",title:"Color",storeValue:!0,onChange:r=>t({...e,color:r}),children:k.map((r,s)=>(0,l.jsx)(a.Form.Dropdown.Item,{icon:{source:`${r}.png`},value:r,title:r.charAt(0).toUpperCase()+r.substring(1).toLowerCase()},s))}),(0,l.jsx)(a.Form.Dropdown,{id:"language",title:"Language",storeValue:!0,onChange:r=>t({...e,language:r}),children:B.map((r,s)=>(0,l.jsx)(a.Form.Dropdown.Item,{value:r.value,title:r.label},s))}),(0,l.jsxs)(a.Form.Dropdown,{id:"background",title:"Background",storeValue:!0,onChange:r=>t({...e,background:r}),children:[(0,l.jsx)(a.Form.Dropdown.Item,{value:"true",title:"Yes"}),(0,l.jsx)(a.Form.Dropdown.Item,{value:"false",title:"No"})]}),(0,l.jsxs)(a.Form.Dropdown,{id:"darkMode",title:"Dark Mode",storeValue:!0,onChange:r=>t({...e,darkMode:r}),children:[(0,l.jsx)(a.Form.Dropdown.Item,{value:"true",title:"Yes"}),(0,l.jsx)(a.Form.Dropdown.Item,{value:"false",title:"No"})]}),(0,l.jsxs)(a.Form.Dropdown,{id:"padding",title:"Padding",storeValue:!0,onChange:r=>t({...e,padding:r}),children:[(0,l.jsx)(a.Form.Dropdown.Item,{value:"16",title:"16"}),(0,l.jsx)(a.Form.Dropdown.Item,{value:"32",title:"32"}),(0,l.jsx)(a.Form.Dropdown.Item,{value:"64",title:"64"}),(0,l.jsx)(a.Form.Dropdown.Item,{value:"128",title:"128"})]})]})}0&&(module.exports={});