!function(r,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):r.Qrize=t()}(this,function(){"use strict";function r(r){return"function"==typeof r?r:function(){}}function t(t){!function(t){var e=t.method,n=t.url,o=t.onSuccess,i=t.onFailure,u=r(o),a=r(i),f=new XMLHttpRequest;f.open(e,n,!0),f.send(null),f.onreadystatechange=function(){4===f.readyState&&(200===f.status?u(f.responseText):a(f.status,f.responseText))}}({method:"GET",url:t.url,onSuccess:t.onSuccess,onFailure:t.onFailure})}function e(e){var n=e.url,o=e.onSuccess,i=e.onFailure,u=r(o);t({url:n,onSuccess:function(r){return u(JSON.parse(r))},onFailure:i})}function n(r){return!Number.isNaN(parseInt(r,10))}function o(r){if(!function(r){return n(r)&&!(r%1)}(r))throw new TypeError('Invalid "version": '+r+". Must be an integer");if(!(r>=0&&r<=40))throw new RangeError('Invalid "version": '+r+". Must be between 0 and 40")}function i(r){return function(r){if(!(r instanceof Element))throw new TypeError('Invalid "element": '+r+". Must be an instance of Element")}(r.element),function(r){if(!n(r))throw new TypeError('Invalid "cellSize": '+r+". Must be a number");if(r<0)throw new RangeError('Invalid "cellSize": '+r+". Must be greater than zero")}(r.cellSize),function(r){if(!n(r))throw new TypeError('Invalid "margin": '+r+". Must be a number");if(r<0)throw new RangeError('Invalid "margin": '+r+". Must be greater than zero")}(r.margin),o(r.version),function(r){if(!c[r]){var t=Object.keys(c).join(", ");throw new Error("Invalid error correction level: "+this.value+". Should be one of these: "+t)}}(r.level),!0}var u=function(r,t){return t={exports:{}},r(t,t.exports),t.exports}(function(r,t){var e=function(){function r(t,e){if(void 0===t.length)throw new Error(t.length+"/"+e);var n=function(){for(var r=0;r<t.length&&0==t[r];)r+=1;for(var n=new Array(t.length-r+e),o=0;o<t.length-r;o+=1)n[o]=t[o+r];return n}(),o={};return o.getAt=function(r){return n[r]},o.getLength=function(){return n.length},o.multiply=function(t){for(var e=new Array(o.getLength()+t.getLength()-1),n=0;n<o.getLength();n+=1)for(var i=0;i<t.getLength();i+=1)e[n+i]^=w.gexp(w.glog(o.getAt(n))+w.glog(t.getAt(i)));return r(e,0)},o.mod=function(t){if(o.getLength()-t.getLength()<0)return o;for(var e=w.glog(o.getAt(0))-w.glog(t.getAt(0)),n=new Array(o.getLength()),i=0;i<o.getLength();i+=1)n[i]=o.getAt(i);for(i=0;i<t.getLength();i+=1)n[i]^=w.gexp(w.glog(t.getAt(i))+e);return r(n,0).mod(t)},o}var t=function(t,e){var n=t,o=u[e],i=null,a=0,f=null,c=new Array,s={},l=function(r,t){i=function(r){for(var t=new Array(r),e=0;e<r;e+=1){t[e]=new Array(r);for(var n=0;n<r;n+=1)t[e][n]=null}return t}(a=4*n+17),h(0,0),h(a-7,0),h(0,a-7),v(),g(),k(r,t),n>=7&&w(r),null==f&&(f=C(n,o,c)),b(f,t)},h=function(r,t){for(var e=-1;e<=7;e+=1)if(!(r+e<=-1||a<=r+e))for(var n=-1;n<=7;n+=1)t+n<=-1||a<=t+n||(i[r+e][t+n]=0<=e&&e<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==e||6==e)||2<=e&&e<=4&&2<=n&&n<=4)},g=function(){for(var r=8;r<a-8;r+=1)null==i[r][6]&&(i[r][6]=r%2==0);for(var t=8;t<a-8;t+=1)null==i[6][t]&&(i[6][t]=t%2==0)},v=function(){for(var r=d.getPatternPosition(n),t=0;t<r.length;t+=1)for(var e=0;e<r.length;e+=1){var o=r[t],u=r[e];if(null==i[o][u])for(var a=-2;a<=2;a+=1)for(var f=-2;f<=2;f+=1)i[o+a][u+f]=-2==a||2==a||-2==f||2==f||0==a&&0==f}},w=function(r){for(var t=d.getBCHTypeNumber(n),e=0;e<18;e+=1){var o=!r&&1==(t>>e&1);i[Math.floor(e/3)][e%3+a-8-3]=o}for(e=0;e<18;e+=1){o=!r&&1==(t>>e&1);i[e%3+a-8-3][Math.floor(e/3)]=o}},k=function(r,t){for(var e=o<<3|t,n=d.getBCHTypeInfo(e),u=0;u<15;u+=1){var f=!r&&1==(n>>u&1);u<6?i[u][8]=f:u<8?i[u+1][8]=f:i[a-15+u][8]=f}for(u=0;u<15;u+=1){f=!r&&1==(n>>u&1);u<8?i[8][a-u-1]=f:u<9?i[8][15-u-1+1]=f:i[8][15-u-1]=f}i[a-8][8]=!r},b=function(r,t){for(var e=-1,n=a-1,o=7,u=0,f=d.getMaskFunction(t),c=a-1;c>0;c-=2)for(6==c&&(c-=1);;){for(var s=0;s<2;s+=1)if(null==i[n][c-s]){var l=!1;u<r.length&&(l=1==(r[u]>>>o&1));f(n,c-s)&&(l=!l),i[n][c-s]=l,-1==(o-=1)&&(u+=1,o=7)}if((n+=e)<0||a<=n){n-=e,e=-e;break}}},C=function(t,e,n){for(var o=p.getRSBlocks(t,e),i=y(),u=0;u<n.length;u+=1){var a=n[u];i.put(a.getMode(),4),i.put(a.getLength(),d.getLengthInBits(a.getMode(),t)),a.write(i)}var f=0;for(u=0;u<o.length;u+=1)f+=o[u].dataCount;if(i.getLengthInBits()>8*f)throw new Error("code length overflow. ("+i.getLengthInBits()+">"+8*f+")");for(i.getLengthInBits()+4<=8*f&&i.put(0,4);i.getLengthInBits()%8!=0;)i.putBit(!1);for(;!(i.getLengthInBits()>=8*f||(i.put(236,8),i.getLengthInBits()>=8*f));)i.put(17,8);return function(t,e){for(var n=0,o=0,i=0,u=new Array(e.length),a=new Array(e.length),f=0;f<e.length;f+=1){var c=e[f].dataCount,s=e[f].totalCount-c;o=Math.max(o,c),i=Math.max(i,s),u[f]=new Array(c);for(var l=0;l<u[f].length;l+=1)u[f][l]=255&t.getBuffer()[l+n];n+=c;var h=d.getErrorCorrectPolynomial(s),g=r(u[f],h.getLength()-1).mod(h);for(a[f]=new Array(h.getLength()-1),l=0;l<a[f].length;l+=1){var v=l+g.getLength()-a[f].length;a[f][l]=v>=0?g.getAt(v):0}}var w=0;for(l=0;l<e.length;l+=1)w+=e[l].totalCount;var p=new Array(w),y=0;for(l=0;l<o;l+=1)for(f=0;f<e.length;f+=1)l<u[f].length&&(p[y]=u[f][l],y+=1);for(l=0;l<i;l+=1)for(f=0;f<e.length;f+=1)l<a[f].length&&(p[y]=a[f][l],y+=1);return p}(i,o)};return s.addData=function(r,t){var e=null;switch(t=t||"Byte"){case"Numeric":e=m(r);break;case"Alphanumeric":e=B(r);break;case"Byte":e=A(r);break;case"Kanji":e=S(r);break;default:throw"mode:"+t}c.push(e),f=null},s.isDark=function(r,t){if(r<0||a<=r||t<0||a<=t)throw new Error(r+","+t);return i[r][t]},s.getModuleCount=function(){return a},s.make=function(){if(n<1){for(var r=1;r<40;r++){for(var t=p.getRSBlocks(r,o),e=y(),i=0;i<c.length;i++){var u=c[i];e.put(u.getMode(),4),e.put(u.getLength(),d.getLengthInBits(u.getMode(),r)),u.write(e)}var a=0;for(i=0;i<t.length;i++)a+=t[i].dataCount;if(e.getLengthInBits()<=8*a)break}n=r}l(!1,function(){for(var r=0,t=0,e=0;e<8;e+=1){l(!0,e);var n=d.getLostPoint(s);(0==e||r>n)&&(r=n,t=e)}return t}())},s.createTableTag=function(r,t){r=r||2;var e="";e+='<table style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: "+(t=void 0===t?4*r:t)+"px;",e+='">',e+="<tbody>";for(var n=0;n<s.getModuleCount();n+=1){e+="<tr>";for(var o=0;o<s.getModuleCount();o+=1)e+='<td style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: 0px;",e+=" width: "+r+"px;",e+=" height: "+r+"px;",e+=" background-color: ",e+=s.isDark(n,o)?"#000000":"#ffffff",e+=";",e+='"/>';e+="</tr>"}return e+="</tbody>",e+="</table>"},s.createSvgTag=function(r,t){r=r||2,t=void 0===t?4*r:t;var e,n,o,i,u=s.getModuleCount()*r+2*t,a="";for(i="l"+r+",0 0,"+r+" -"+r+",0 0,-"+r+"z ",a+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',a+=' width="'+u+'px"',a+=' height="'+u+'px"',a+=' viewBox="0 0 '+u+" "+u+'" ',a+=' preserveAspectRatio="xMinYMin meet">',a+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',a+='<path d="',n=0;n<s.getModuleCount();n+=1)for(o=n*r+t,e=0;e<s.getModuleCount();e+=1)s.isDark(n,e)&&(a+="M"+(e*r+t)+","+o+i);return a+='" stroke="transparent" fill="black"/>',a+="</svg>"},s.createImgTag=function(r,t){r=r||2,t=void 0===t?4*r:t;var e=s.getModuleCount()*r+2*t,n=t,o=e-t;return M(e,e,function(t,e){if(n<=t&&t<o&&n<=e&&e<o){var i=Math.floor((t-n)/r),u=Math.floor((e-n)/r);return s.isDark(u,i)?0:1}return 1})},s};t.stringToBytes=(t.stringToBytesFuncs={default:function(r){for(var t=[],e=0;e<r.length;e+=1){var n=r.charCodeAt(e);t.push(255&n)}return t}}).default,t.createStringToBytes=function(r,t){var e=function(){for(var e=b(r),n=function(){var r=e.read();if(-1==r)throw new Error;return r},o=0,i={};;){var u=e.read();if(-1==u)break;var a=n(),f=n()<<8|n();i[String.fromCharCode(u<<8|a)]=f,o+=1}if(o!=t)throw new Error(o+" != "+t);return i}(),n="?".charCodeAt(0);return function(r){for(var t=new Array,o=0;o<r.length;o+=1){var i=r.charCodeAt(o);if(i<128)t.push(i);else{var u=e[r.charAt(o)];"number"==typeof u?(255&u)==u?t.push(u):(t.push(u>>>8),t.push(255&u)):t.push(n)}}return t}};var e=1,n=2,o=4,i=8,u={L:1,M:0,Q:3,H:2},a=0,f=1,c=2,s=3,l=4,h=5,g=6,v=7,d=function(){var t=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],u={},d=function(r){for(var t=0;0!=r;)t+=1,r>>>=1;return t};return u.getBCHTypeInfo=function(r){for(var t=r<<10;d(t)-d(1335)>=0;)t^=1335<<d(t)-d(1335);return 21522^(r<<10|t)},u.getBCHTypeNumber=function(r){for(var t=r<<12;d(t)-d(7973)>=0;)t^=7973<<d(t)-d(7973);return r<<12|t},u.getPatternPosition=function(r){return t[r-1]},u.getMaskFunction=function(r){switch(r){case a:return function(r,t){return(r+t)%2==0};case f:return function(r,t){return r%2==0};case c:return function(r,t){return t%3==0};case s:return function(r,t){return(r+t)%3==0};case l:return function(r,t){return(Math.floor(r/2)+Math.floor(t/3))%2==0};case h:return function(r,t){return r*t%2+r*t%3==0};case g:return function(r,t){return(r*t%2+r*t%3)%2==0};case v:return function(r,t){return(r*t%3+(r+t)%2)%2==0};default:throw new Error("bad maskPattern:"+r)}},u.getErrorCorrectPolynomial=function(t){for(var e=r([1],0),n=0;n<t;n+=1)e=e.multiply(r([1,w.gexp(n)],0));return e},u.getLengthInBits=function(r,t){if(1<=t&&t<10)switch(r){case e:return 10;case n:return 9;case o:case i:return 8;default:throw new Error("mode:"+r)}else if(t<27)switch(r){case e:return 12;case n:return 11;case o:return 16;case i:return 10;default:throw new Error("mode:"+r)}else{if(!(t<41))throw new Error("type:"+t);switch(r){case e:return 14;case n:return 13;case o:return 16;case i:return 12;default:throw new Error("mode:"+r)}}},u.getLostPoint=function(r){for(var t=r.getModuleCount(),e=0,n=0;n<t;n+=1)for(var o=0;o<t;o+=1){for(var i=0,u=r.isDark(n,o),a=-1;a<=1;a+=1)if(!(n+a<0||t<=n+a))for(var f=-1;f<=1;f+=1)o+f<0||t<=o+f||0==a&&0==f||u==r.isDark(n+a,o+f)&&(i+=1);i>5&&(e+=3+i-5)}for(n=0;n<t-1;n+=1)for(o=0;o<t-1;o+=1){var c=0;r.isDark(n,o)&&(c+=1),r.isDark(n+1,o)&&(c+=1),r.isDark(n,o+1)&&(c+=1),r.isDark(n+1,o+1)&&(c+=1),0!=c&&4!=c||(e+=3)}for(n=0;n<t;n+=1)for(o=0;o<t-6;o+=1)r.isDark(n,o)&&!r.isDark(n,o+1)&&r.isDark(n,o+2)&&r.isDark(n,o+3)&&r.isDark(n,o+4)&&!r.isDark(n,o+5)&&r.isDark(n,o+6)&&(e+=40);for(o=0;o<t;o+=1)for(n=0;n<t-6;n+=1)r.isDark(n,o)&&!r.isDark(n+1,o)&&r.isDark(n+2,o)&&r.isDark(n+3,o)&&r.isDark(n+4,o)&&!r.isDark(n+5,o)&&r.isDark(n+6,o)&&(e+=40);var s=0;for(o=0;o<t;o+=1)for(n=0;n<t;n+=1)r.isDark(n,o)&&(s+=1);return e+=10*(Math.abs(100*s/t/t-50)/5)},u}(),w=function(){for(var r=new Array(256),t=new Array(256),e=0;e<8;e+=1)r[e]=1<<e;for(e=8;e<256;e+=1)r[e]=r[e-4]^r[e-5]^r[e-6]^r[e-8];for(e=0;e<255;e+=1)t[r[e]]=e;var n={};return n.glog=function(r){if(r<1)throw new Error("glog("+r+")");return t[r]},n.gexp=function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return r[t]},n}(),p=function(){var r=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],t=function(r,t){var e={};return e.totalCount=r,e.dataCount=t,e},e={};return e.getRSBlocks=function(e,n){var o=function(t,e){switch(e){case u.L:return r[4*(t-1)+0];case u.M:return r[4*(t-1)+1];case u.Q:return r[4*(t-1)+2];case u.H:return r[4*(t-1)+3];default:return}}(e,n);if(void 0===o)throw new Error("bad rs block @ typeNumber:"+e+"/errorCorrectionLevel:"+n);for(var i=o.length/3,a=new Array,f=0;f<i;f+=1)for(var c=o[3*f+0],s=o[3*f+1],l=o[3*f+2],h=0;h<c;h+=1)a.push(t(s,l));return a},e}(),y=function(){var r=new Array,t=0,e={};return e.getBuffer=function(){return r},e.getAt=function(t){var e=Math.floor(t/8);return 1==(r[e]>>>7-t%8&1)},e.put=function(r,t){for(var n=0;n<t;n+=1)e.putBit(1==(r>>>t-n-1&1))},e.getLengthInBits=function(){return t},e.putBit=function(e){var n=Math.floor(t/8);r.length<=n&&r.push(0),e&&(r[n]|=128>>>t%8),t+=1},e},m=function(r){var t=e,n=r,o={};o.getMode=function(){return t},o.getLength=function(r){return n.length},o.write=function(r){for(var t=n,e=0;e+2<t.length;)r.put(i(t.substring(e,e+3)),10),e+=3;e<t.length&&(t.length-e==1?r.put(i(t.substring(e,e+1)),4):t.length-e==2&&r.put(i(t.substring(e,e+2)),7))};var i=function(r){for(var t=0,e=0;e<r.length;e+=1)t=10*t+u(r.charAt(e));return t},u=function(r){if("0"<=r&&r<="9")return r.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+r};return o},B=function(r){var t=n,e=r,o={};o.getMode=function(){return t},o.getLength=function(r){return e.length},o.write=function(r){for(var t=e,n=0;n+1<t.length;)r.put(45*i(t.charAt(n))+i(t.charAt(n+1)),11),n+=2;n<t.length&&r.put(i(t.charAt(n)),6)};var i=function(r){if("0"<=r&&r<="9")return r.charCodeAt(0)-"0".charCodeAt(0);if("A"<=r&&r<="Z")return r.charCodeAt(0)-"A".charCodeAt(0)+10;switch(r){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+r}};return o},A=function(r){var e=o,n=t.stringToBytes(r),i={};return i.getMode=function(){return e},i.getLength=function(r){return n.length},i.write=function(r){for(var t=0;t<n.length;t+=1)r.put(n[t],8)},i},S=function(r){var e=i,n=t.stringToBytesFuncs.SJIS;if(!n)throw"sjis not supported.";!function(r,t){var e=n("友");if(2!=e.length||38726!=(e[0]<<8|e[1]))throw"sjis not supported."}();var o=n(r),u={};return u.getMode=function(){return e},u.getLength=function(r){return~~(o.length/2)},u.write=function(r){for(var t=o,e=0;e+1<t.length;){var n=(255&t[e])<<8|255&t[e+1];if(33088<=n&&n<=40956)n-=33088;else{if(!(57408<=n&&n<=60351))throw"illegal char at "+(e+1)+"/"+n;n-=49472}n=192*(n>>>8&255)+(255&n),r.put(n,13),e+=2}if(e<t.length)throw"illegal char at "+(e+1)},u},k=function(){var r=new Array,t={};return t.writeByte=function(t){r.push(255&t)},t.writeShort=function(r){t.writeByte(r),t.writeByte(r>>>8)},t.writeBytes=function(r,e,n){e=e||0,n=n||r.length;for(var o=0;o<n;o+=1)t.writeByte(r[o+e])},t.writeString=function(r){for(var e=0;e<r.length;e+=1)t.writeByte(r.charCodeAt(e))},t.toByteArray=function(){return r},t.toString=function(){var t="";t+="[";for(var e=0;e<r.length;e+=1)e>0&&(t+=","),t+=r[e];return t+="]"},t},b=function(r){var t=r,e=0,n=0,o=0,i={};i.read=function(){for(;o<8;){if(e>=t.length){if(0==o)return-1;throw new Error("unexpected end of file./"+o)}var r=t.charAt(e);if(e+=1,"="==r)return o=0,-1;r.match(/^\s$/)||(n=n<<6|u(r.charCodeAt(0)),o+=6)}var i=n>>>o-8&255;return o-=8,i};var u=function(r){if(65<=r&&r<=90)return r-65;if(97<=r&&r<=122)return r-97+26;if(48<=r&&r<=57)return r-48+52;if(43==r)return 62;if(47==r)return 63;throw new Error("c:"+r)};return i},C=function(r,t){var e=r,n=t,o=new Array(r*t),i={};i.setPixel=function(r,t,n){o[t*e+r]=n},i.write=function(r){r.writeString("GIF87a"),r.writeShort(e),r.writeShort(n),r.writeByte(128),r.writeByte(0),r.writeByte(0),r.writeByte(0),r.writeByte(0),r.writeByte(0),r.writeByte(255),r.writeByte(255),r.writeByte(255),r.writeString(","),r.writeShort(0),r.writeShort(0),r.writeShort(e),r.writeShort(n),r.writeByte(0);var t=u(2);r.writeByte(2);for(var o=0;t.length-o>255;)r.writeByte(255),r.writeBytes(t,o,255),o+=255;r.writeByte(t.length-o),r.writeBytes(t,o,t.length-o),r.writeByte(0),r.writeString(";")};var u=function(r){for(var t=1<<r,e=1+(1<<r),n=r+1,i=a(),u=0;u<t;u+=1)i.add(String.fromCharCode(u));i.add(String.fromCharCode(t)),i.add(String.fromCharCode(e));var f=k(),c=function(r){var t=r,e=0,n=0,o={};return o.write=function(r,o){if(r>>>o!=0)throw new Error("length over");for(;e+o>=8;)t.writeByte(255&(r<<e|n)),o-=8-e,r>>>=8-e,n=0,e=0;n|=r<<e,e+=o},o.flush=function(){e>0&&t.writeByte(n)},o}(f);c.write(t,n);var s=0,l=String.fromCharCode(o[s]);for(s+=1;s<o.length;){var h=String.fromCharCode(o[s]);s+=1,i.contains(l+h)?l+=h:(c.write(i.indexOf(l),n),i.size()<4095&&(i.size()==1<<n&&(n+=1),i.add(l+h)),l=h)}return c.write(i.indexOf(l),n),c.write(e,n),c.flush(),f.toByteArray()},a=function(){var r={},t=0,e={};return e.add=function(n){if(e.contains(n))throw new Error("dup key:"+n);r[n]=t,t+=1},e.size=function(){return t},e.indexOf=function(t){return r[t]},e.contains=function(t){return void 0!==r[t]},e};return i},M=function(r,t,e,n){for(var o=C(r,t),i=0;i<t;i+=1)for(var u=0;u<r;u+=1)o.setPixel(u,i,e(u,i));var a=k();o.write(a);for(var f=function(){var r=0,t=0,e=0,n="",o={},i=function(r){n+=String.fromCharCode(u(63&r))},u=function(r){if(r<0);else{if(r<26)return 65+r;if(r<52)return r-26+97;if(r<62)return r-52+48;if(62==r)return 43;if(63==r)return 47}throw new Error("n:"+r)};return o.writeByte=function(n){for(r=r<<8|255&n,t+=8,e+=1;t>=6;)i(r>>>t-6),t-=6},o.flush=function(){if(t>0&&(i(r<<6-t),r=0,t=0),e%3!=0)for(var o=3-e%3,u=0;u<o;u+=1)n+="="},o.toString=function(){return n},o}(),c=a.toByteArray(),s=0;s<c.length;s+=1)f.writeByte(c[s]);f.flush();var l="";return l+="<img",l+=' src="',l+="data:image/gif;base64,",l+=f,l+='"',l+=' width="',l+=r,l+='"',l+=' height="',l+=t,l+='"',n&&(l+=' alt="',l+=n,l+='"'),l+="/>"};return t}();e.stringToBytesFuncs["UTF-8"]=function(r){return function(r){for(var t=[],e=0;e<r.length;e++){var n=r.charCodeAt(e);n<128?t.push(n):n<2048?t.push(192|n>>6,128|63&n):n<55296||n>=57344?t.push(224|n>>12,128|n>>6&63,128|63&n):(e++,n=65536+((1023&n)<<10|1023&r.charCodeAt(e)),t.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n))}return t}(r)},function(t){r.exports=t()}(function(){return e})}),a="0.3.0",f={getHash:"http://qrize.me/get-hash/<url>",getUrl:"http://qrize.me/get-url/<hash>",redirector:"http://qrize.me/<hash>"},c={L:1,M:2,Q:3,H:4},s={shema:/((?:http|ftp)s?:\/\/)/,domain:/(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)/,ip:/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,port:/(?::\d+)/,query:/(?:\/?|[/?]\S+)/};s.composed=new RegExp("^"+s.shema.source+"?(?:"+s.domain.source+"|localhost|"+s.ip.source+")"+s.port.source+"?"+s.query.source+"$","i");var l=function(r,t){if(!(r instanceof t))throw new TypeError("Cannot call a class as a function")},h=function(){function r(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}return function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}}();return function(){function t(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};l(this,t),this.version=a,this.options={element:r.element,cellSize:r.cellSize||2,margin:r.margin||0,version:0,level:"L"},i(this.options)}return h(t,[{key:"prepareQR",value:function(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=n.url,i=n.onSuccess,a=n.onFailure,c=o||t.getDefaultURL();!function(r){if(!s.composed.test(r))throw new Error('Invalid "url": '+r)}(c);var l=r(i);t.getHash({url:c,onSuccess:function(r){var t=f.redirector.replace("<hash>",r.hash),n=u(e.options.version,e.options.level);n.addData(t),n.make(),l(n,{hash:r.hash,url:r.url})},onFailure:a})}},{key:"createSvg",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.url,o=e.onSuccess,i=e.onFailure,u=r(o);return this.prepareQR({url:n,onSuccess:function(r,e){t.options.element.innerHTML=r.createSvgTag(t.options.cellSize,t.options.margin),u({hash:e.hash,url:e.url})},onFailure:i}),this}},{key:"createImg",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.url,o=e.onSuccess,i=e.onFailure,u=r(o);return this.prepareQR({url:n,onSuccess:function(r,e){t.options.element.innerHTML=r.createImgTag(t.options.cellSize,t.options.margin),u({hash:e.hash,url:e.url})},onFailure:i}),this}},{key:"createTable",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.url,o=e.onSuccess,i=e.onFailure,u=r(o);return this.prepareQR({url:n,onSuccess:function(r,e){t.options.element.innerHTML=r.createTableTag(t.options.cellSize,t.options.margin),u({hash:e.hash,url:e.url})},onFailure:i}),this}}],[{key:"getDefaultURL",value:function(){return window.location.href}},{key:"getUrl",value:function(r){var t=r.hash,n=r.onSuccess,o=r.onFailure;e({url:f.getUrl.replace("<hash>",t),onSuccess:n,onFailure:o})}},{key:"getHash",value:function(r){var t=r.url,n=r.onSuccess,o=r.onFailure,i=encodeURIComponent(t);e({url:f.getHash.replace("<url>",i),onSuccess:n,onFailure:o})}}]),t}()});
