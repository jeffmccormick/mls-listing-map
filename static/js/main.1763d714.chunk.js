(this["webpackJsonpmls-listing-map"]=this["webpackJsonpmls-listing-map"]||[]).push([[0],{146:function(e,t,n){},158:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),a=n(13),s=n.n(a),o=(n(146),n(210)),c=n(217),u=n(16),l=n(36),d=n(37),h=n(44),p=n(68),v=n(123),b=n(22),m=n(218),f=n(207),g=n(208),A=n(209),j=n(50),x=n(7),O=Object(b.a)((function(){return{buttonsContainer:{padding:"1.5rem",display:"flex",flexDirection:"row",justifyContent:"space-between"}}})),C=function(e){var t=e.title,n=e.isOpen,r=e.confirmButtonLabel,i=e.disableConfirmButton,a=e.hideCancelButton,s=e.children,o=e.onConfirm,c=e.onCancel,u=e.onExited,l=O();return Object(x.jsxs)(m.a,{open:n,maxWidth:!1,onExited:u,children:[Object(x.jsx)(f.a,{children:t}),Object(x.jsx)(g.a,{children:s}),Object(x.jsxs)(A.a,{className:l.buttonsContainer,children:[!a&&Object(x.jsx)(j.a,{onClick:c,variant:"outlined",children:"Cancel"}),Object(x.jsx)(j.a,{onClick:o,variant:"contained",disabled:i,children:r})]})]})},w=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(e,r){var i;return Object(l.a)(this,n),(i=t.call(this,e,r)).state={},i}return Object(d.a)(n,[{key:"componentDidCatch",value:function(e){this.setState({errors:[].concat(Object(u.a)(this.state.errors||[]),[e])})}},{key:"resetErrors",value:function(){this.setState({errors:void 0})}},{key:"render",value:function(){var e;return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(C,{title:"Error",isOpen:null!==this.state&&void 0!==this.state.errors&&this.state.errors.length>0,confirmButtonLabel:"Ok",hideCancelButton:!0,onConfirm:this.resetErrors,onExited:this.resetErrors,children:null===(e=this.state.errors)||void 0===e?void 0:e.map((function(e,t){return Object(x.jsx)(v.a,{children:e},t)}))}),this.props.children]})}}]),n}(r.Component),k=n(6),S=n(213),I=i.a.createContext({errors:null,addError:function(e){},clearAll:function(){}}),y=i.a.createContext({isImporting:!1,selectedListingId:null,listings:null,coordinates:null,hiddenListingIds:null,viewedListingIds:new Set}),E=n(117),F=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0}),Y=[{field:"address",headerName:"Address",flex:2,valueGetter:function(e){return e.row.address.street},disableColumnMenu:!0},{field:"unit",headerName:"Unit",flex:.5,valueGetter:function(e){return e.row.address.unit},disableColumnMenu:!0},{field:"type",headerName:"Type",type:"string",flex:.5},{field:"city",headerName:"City",flex:1,valueGetter:function(e){return e.row.address.city}},{field:"price",headerName:"Price",flex:1,type:"number",valueFormatter:function(e){var t,n;return F.format(null!==(t=null===(n=e.value)||void 0===n?void 0:n.valueOf())&&void 0!==t?t:0)}},{field:"bedCount",headerName:"Beds",type:"number",flex:.5},{field:"bathCount",headerName:"Baths",type:"number",flex:.5}],N=function(e){var t,n,r=e.setSelectedListingId,a=e.setHiddenListingIds,s=i.a.useContext(y);return(null===(t=s.listings)||void 0===t?void 0:t.length)?Object(x.jsx)(E.a,{rows:s.listings,columns:Y,autoHeight:!0,disableMultipleSelection:!0,pagination:!0,pageSize:10,rowsPerPageOptions:[10,25,100],onRowSelected:function(e){return r(e.data.id)},onFilterModelChange:function(e){var t,n=new Set;null===(t=s.listings)||void 0===t||t.forEach((function(t){e.visibleRows.has(t.id)||n.add(t.id)})),a(n)},selectionModel:[null!==(n=s.selectedListingId)&&void 0!==n?n:NaN]}):Object(x.jsx)(x.Fragment,{})},B=n(28),R=n.n(B),T=n(119),J=n(47),M=n(92),P=function(){var e=Object(J.a)(R.a.mark((function e(t){var n,r,i,a;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new DOMParser,e.prev=1,r=n.parseFromString(t,"text/html"),i=r.querySelectorAll("tr[data-ListNo]"),a=[],i.forEach(function(){var e=Object(J.a)(R.a.mark((function e(t){var n,r,i,s,o,c,u,l,d,h,p,v;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:d=parseInt(null!==(n=t.getAttribute("data-ListNo"))&&void 0!==n?n:"0"),h=L(null!==(r=null===(i=t.children.item(11))||void 0===i?void 0:i.textContent)&&void 0!==r?r:""),p=null!==(s=null===(o=t.children)||void 0===o||null===(c=o.item(9))||void 0===c?void 0:c.textContent)&&void 0!==s?s:"",v=q(p),a.push({id:d,address:v,type:h.type,price:U(null!==(u=null===(l=t.children.item(13))||void 0===l?void 0:l.textContent)&&void 0!==u?u:"0"),bedCount:h.bedCount,bathCount:h.bathCount});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.abrupt("return",Promise.resolve({success:!0,data:a}));case 9:return e.prev=9,e.t0=e.catch(1),e.abrupt("return",{success:!1,error:e.t0.toString()});case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}(),L=function(e){var t,n,r,i,a=Object(M.a)(/([0-9])[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]bed,[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9])f[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9])h[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]bath[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF](.*)/,{bed:1,bathfull:2,bathhalf:3,type:4}).exec(e),s=null===a||void 0===a||null===(t=a.groups.type)||void 0===t?void 0:t.replace(/\sx[\d]+.*/,"");return{type:null!==s&&void 0!==s?s:"Unknown",bedCount:parseInt(null!==(n=null===a||void 0===a?void 0:a.groups.bed)&&void 0!==n?n:"0"),bathCount:parseInt(null!==(r=null===a||void 0===a?void 0:a.groups.bathfull)&&void 0!==r?r:"0")+.5*parseInt(null!==(i=null===a||void 0===a?void 0:a.groups.bathhalf)&&void 0!==i?i:"0")}},q=function(e){try{var t=e.match(/.*MA.*/);if(!(null===t||void 0===t?void 0:t.length)||1!==t.length)throw new Error("MA not found");var n=Object(M.a)(/(.*)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([A-Za-z]+(?:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF][A-Za-z]+)*), MA/,{street:1,city:2}).exec(t[0]);if(!(null===n||void 0===n?void 0:n.groups))throw new Error("Could not split street/city");var r=n.groups.street.trim(),i=r.indexOf("U:"),a=i>=0?r.slice(i+2,r.length).trim():null;return{street:r=i>=0?r.slice(0,i-1):r,unit:a,city:n.groups.city,state:"MA"}}catch(s){return{street:s.toString(),city:"nowhere",state:"MA"}}},U=function(e){try{var t=e.match(/(?:\$)([\d,]+)/);if(!(null===t||void 0===t?void 0:t.length)||2!==t.length)throw new Error("Invalid price format: ".concat(e));return parseInt(t[1].replace(",",""))}catch(n){return 0}},G=n(120),z=n.n(G),K=new(function(){function e(t){Object(l.a)(this,e),this._delay=void 0,this._queue=void 0,this._isTicking=void 0,this._delay=t,this._queue=[],this._isTicking=!1}return Object(d.a)(e,[{key:"waitNext",value:function(){var e=this,t=new Promise((function(t,n){return e._queue.push({resolve:t,reject:n})}));return this._isTicking||this.startTick(),t}},{key:"startTick",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this._isTicking&&!e||(this._isTicking=!0,setTimeout(this.pop.bind(this),this._delay))}},{key:"pop",value:function(){var e=this._queue.shift();if(e){try{e.resolve()}catch(t){console.log("DelayQueue callback threw error that was ignored: ".concat(t))}this._queue.length?this.startTick(!0):this._isTicking=!1}}}]),e}())(1500),D=function(){var e=Object(J.a)(R.a.mark((function e(t,n){var r,i,a,s,o,c,u,l;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,(r=localStorage.getItem(t.toString()))||(r=localStorage.getItem(n.toLocaleUpperCase())),!r){e.next=7;break}return(i=JSON.parse(r)).id!==t&&(i.id=t,a=2*Math.random()*Math.PI,i.latitude=i.latitude+5e-5*Math.sin(a),i.longitude=i.longitude+5e-5*Math.cos(a)),e.abrupt("return",{success:!0,data:i});case 7:return e.next=9,K.waitNext();case 9:return s={q:n,format:"jsonv2",limit:1,addressdetails:1,countrycodes:"us"},e.next=12,fetch("https://nominatim.openstreetmap.org/search?".concat(z.a.encode(s)));case 12:if((o=e.sent).ok){e.next=15;break}return e.abrupt("return",{success:!1,error:"Nominatim failed with status: ".concat(o.status)});case 15:return e.next=17,o.json();case 17:if((c=e.sent)&&c.length&&1===c.length){e.next=20;break}return e.abrupt("return",{success:!1,error:"Nominatim returned invalid result: ".concat(c)});case 20:return u={id:t,latitude:parseFloat(c[0].lat),longitude:parseFloat(c[0].lon)},l=JSON.stringify(u),localStorage.setItem(t.toString(),l),localStorage.setItem(n.toLocaleUpperCase(),l),e.abrupt("return",{success:!0,data:u});case 27:return e.prev=27,e.t0=e.catch(0),e.abrupt("return",{success:!1,error:e.t0.toString()});case 30:case"end":return e.stop()}}),e,null,[[0,27]])})));return function(t,n){return e.apply(this,arguments)}}(),H=n(100),V=Object(b.a)((function(){return{sourceInput:{width:"80vw"}}})),Q=function(e){var t=e.isOpen,n=e.setIsImporting,r=e.setListings,a=e.setCoordinates,s=e.close,o=i.a.useState(),c=Object(k.a)(o,2),l=c[0],d=c[1],h=i.a.useContext(I),p=i.a.useContext(y),v=V(),b=function(){var e=Object(J.a)(R.a.mark((function e(){var t,i,o,c,d,v,b,m,f,g,A,j,x;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(l){e.next=3;break}return h.addError("Please enter source information."),e.abrupt("return");case 3:return n(!0),e.next=6,P(l);case 6:if((d=e.sent).success&&(null===(t=d.data)||void 0===t?void 0:t.length)){e.next=10;break}return h.addError("Tell Jeff the parse isn't working: ".concat(null===(v=d.error)||void 0===v?void 0:v.toString())),e.abrupt("return");case 10:b=d.data,m=new Set(null===(i=p.listings)||void 0===i?void 0:i.map((function(e){return e.id}))),b=b.filter((function(e){return!m.has(e.id)&&(m.add(e.id),!0)})),s(),r([].concat(Object(u.a)(null!==(o=p.listings)&&void 0!==o?o:[]),Object(u.a)(b))),f=null!==(c=p.coordinates)&&void 0!==c?c:[],g=Object(T.a)(b),e.prev=17,g.s();case 19:if((A=g.n()).done){e.next=31;break}return j=A.value,e.next=23,D(j.id,"".concat(j.address.street,", ").concat(j.address.city,", ").concat(j.address.state));case 23:if((x=e.sent).success&&x.data){e.next=27;break}return console.log("Failed to get coordinates for ".concat(j.address.street,": ").concat(x.error)),e.abrupt("continue",29);case 27:f.push(x.data),a(Object(u.a)(f));case 29:e.next=19;break;case 31:e.next=36;break;case 33:e.prev=33,e.t0=e.catch(17),g.e(e.t0);case 36:return e.prev=36,g.f(),e.finish(36);case 39:n(!1);case 40:case"end":return e.stop()}}),e,null,[[17,33,36,39]])})));return function(){return e.apply(this,arguments)}}();return Object(x.jsx)(C,{title:"Input MLS Page",isOpen:t,onConfirm:b,confirmButtonLabel:"Import",onCancel:s,children:Object(x.jsx)(H.a,{className:v.sourceInput,multiline:!0,fullWidth:!0,rows:10,rowsMax:30,placeholder:"Paste page source here...",variant:"outlined",onChange:function(e){return d(e.currentTarget.value)}})})},X=n(214),Z=n(221),W=n(215),_=n(216),$=n(27),ee="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACJ0lEQVR4Ae3ShY6bQRADYIeZ3v+9yszMDZPlkSWtslPuiS6+C+8n/zNp4p/froi8Jq/Jxk+TkwmHX//Wz8lG3jNjTeaguabD6HAVbphMwIIzqtd+rzKYhsgUNNcqo3fEBlyyOWmwhbbS4b8SaLBu7SGlpL9gklw3YpYR6J5Bm0zAguspZjvqSVQxqvxsPSJJKYIFKh5A2VIDyMgYfYB9hvcmI0VPTxVZS81ER7qiBoFqBAa9MKOKLzzv2BE3EOnlmDTrNRXryToGOGR65nhvSphjMP6b6WJ6xMYYxSW7l1Pp6CSzbLFPgAN3NGLKPRn3c59qxzapCTPUFNVKh0vUe24azMkW+uRm/B8UU3O3Eiw4nOrrafOSF5gS7PqHUotBQQ6f11p22HDOi+66i2LIHcWJOZrTP+rkhOl7n8YcTzCQIuIvyZPQrvs5Br0OdTsyB+YYrwKokXvsgOIXZzbeQ0DMnhHIqGOdBMEl9qKYAo3pBbbDNkijUSgjv/PrMFhwRwS2YbbMzqg+SzdukoxbeiSEVlgyK6yFmjSYtDxhTXRv1OsgsCb2jflu8hLMyC0P7Qg54NE1qc/MF5PqeAHWSfDL3zxN9dsQ+YD3zEeRS4GeYgFm5I7HNiJPfP4V7/CKeUvwsxpqhkwFzMgjj33Vwe+EnuIxngn8FvNTSCkwmJG+rQm8J/MId/EQL3nZwe2EmSNm9ufkFq9xHzcJPscnLGMRomBKqdzOY2EH+IPOLMEAAAAASUVORK5CYII=",te=Object(b.a)({map:{width:"100%",height:"50vh",margin:"1rem 0"},listingType:{textTransform:"capitalize"}}),ne=new $.Icon({iconUrl:"data:image/png;base64,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",shadowUrl:ee,iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]}),re=new $.Icon({iconUrl:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QwKDi41nxNIMQAABtBJREFUWMOll2uMVVcVx/9r73Puueece2eYB5TOSGmrCagJYimvxrQmfqAxGr/YDz4bTZxEqokaINRYR5sSpFCS0qixsa3GmKop1FajpiY21sTQAgWBBF8gw9zLHeZ9X+exz957+WFgmNuZYe7oSf4f7jn7v35nr73X2vcQM6Od6+n7XuvOoPu1oZUuxIT1+OruNx4ca8dLt4Ic/tAf1rGhL4D4s8zcL4SIHVdqnRlprfUFyVEJvGitfeHrxx88uyzI3fRdsXPr1j0k8J1CMUQYhp7ne3ByAkQEZobSFjpSiKJIVadrxMzfWxUEjz/8pw/rJSFPbvnd3ST5V67rvnd1/22BI10YZWEzhskY1jCEJEiXIFyCzAlok2G0MhapNLsYaf3Qt098/B+LQvZvfWWHJPnrzq5O2dPb7eqYoZoGtETOXV/CCQmTE1N6amLKWNhPPfrmJ16eB9l37297hTT/7uvr6wz9EPG0Bpv2NgUAkCTkOxzEKkKlXGl6ktZ97a8fKwOAuDFISPOTYkchH+QDNMcVrLZg5nmCwIL3rbaIJhV8z0exs+jExvxsNjYAPLHlpc+Q5I+s7rnNS6sGbNEi4QgUulyEvTl4KwTC3hz8LhcyJ+aNTasGvd29npC0bd+WY18CAHpi028CpnRsTd8dgYs8VN20pCHocGDzFhPVMTSbTWSJhuNKhB0BegqrQEYiq2kYe9OTK0pkSDBcGUrI5nscQnKPcCQV/RDNUQUxd3AokVKKUmkI79+xBts/fS+61xYxVW7i1NGLePvYRfT1rIHn58FzXs7UDYqrQkgpLdvkHicjsznwAujEIpuz0EISnJBQHq/ggYH34b7Pr5991ru2iB3f2Ijb16/A7w+cxh2974F1AJtd9xtAJxaO51Gk65sFMd1f8ELfKAtpMSvhEqajGnKdhO2fW7fgjtrw0TvRfVeIanMKTk60+I2yKHihT0z3Cwu7LXR9mJRbFjDnCCRpjDs3rwTR4pXy7m2roXUCR1KL36SM0PVhYbc5xurgRquYW5jMDMsGbsFZshAz6FnPXD8RwVrrCwBn4iQCvfNNMoYrPQydunZLyOXT1+CxNy8TJAlxEoFhT4vM2jfqaTMTsjUlJrFY4XVi5J/TuPCX4QUBw+fGcPH4CDr9LhhlW54JSagnkcrY/Fk4Qp9opFUlJIENz0onFiYm9BX78eLu1/HmS3+H0TOBrLU4+9olvPDlP2Jl8XYgk8iapsUvJCFOqwrQJ+ixDz7Xp5iHN/RvEumkvbkNr/cDv8tFwk2UGpcRxzG6V3dgerQBx5VYU7wLodMBNa6h56yHcAlet8DZ8imjNfqJmfHoxuffelfn2s0dohdptbXiHWKIokQulMg4RaISeK6HnMiDI4u0pqG5NdVep0TNjnOpOvTW/jNf3CYAIIU6VGmUIi8v4BBD8k2xBUzVIKlk4EkBPykAUxLJiEIyrcEWLeMdYnh5gUq9HKdQB2YbZKcjXlZaqZqqAXkBbTFPmWGkMSOuG6QxI9NYcBzyAtPJNJRJG9vX2VdnIYMnBzKG/cFYYyTO+xKCeV53bUc3+l2lWY4tm6ce+uVO03KeGGOemUzGZWojuIFoSUG7ygcCqWqgkVZJZea5lvMEAA6f3zkC4JnL9aHY9eVMB1jmLJxAoNS4EgN46siFRybmQQAgVXp/Q00j0g24oVzwBFxMTiAQZXXUs7otuHSwpTDn/jhy4ZEJEB8qR1fiXChnbto2dH0tSs2hiGH3D54cqC4KAQDO60N1XTMNVUMulADTkvIKDhqqhkbW1MaYp98Zcx7k0PGv1MC070o8FDuBAMPC2sUFYkifUIouR0LYxw+f39lYEgIAhRyOpCZOG1kVuYJzy1n4RYm6mkZk4iSo+t9fKN6CkMGTAxHDDg6nM7MRRAuuhSAC8gLD6VAM4scG//Nw0jYEAKqR+pEyaaOmJpEviIV3VJFQU5NQJq0J0/PjxWItCnn2X19NLZtvlbPhGD6BRGtdkACcvEAlG44h7DcPnP+kWjYEAC71XHs+s2qqqibhhxKOxayCgoOqmkRi0vEt6+xPbxXnlpBjrw9qJrO3bK/ETiBmjmhmkCTIAKiYoYRh997oUf8TBACO/u3az7XJRsazMbiFmb+luaLEmBqFsrp87Ny1XywVY0nIJR60IN5z1ZYSGQCOTxA+46otJSSw5xIP2v8bAgAHz60/aqy+PGHGON/lYlyPsrX20pNnBo61428LAvsAszS7rvKwyqxCBaUMwO62v13a/foFgN0bnn07T97GhNPTB88ObGrXJ7Cci3hXgoRAvHtZvuWcGcyMXR/44d7lev4L/Hno3yJItCsAAAAASUVORK5CYII=",shadowUrl:ee,iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]}),ie=function(e){var t,n=e.setSelectedListingId,r=e.markListingAsViewed,a=i.a.useContext(y),s=te(),o=i.a.useRef();return Object(x.jsx)(S.a,{item:!0,children:Object(x.jsxs)(X.a,{center:[42.41,-71.15],zoom:11.6,scrollWheelZoom:!0,className:s.map,whenCreated:function(e){return o.current=e},children:[Object(x.jsx)(Z.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),null===(t=a.coordinates)||void 0===t?void 0:t.reduce((function(e,t){var i,o,c=null===(i=a.listings)||void 0===i?void 0:i.find((function(e){return e.id===t.id}));return!c||(null===(o=a.hiddenListingIds)||void 0===o?void 0:o.has(c.id))||e.push(Object(x.jsx)(W.a,{position:[t.latitude,t.longitude],eventHandlers:{click:function(e){return n(t.id)}},icon:a.viewedListingIds.has(c.id)?re:ne,children:Object(x.jsx)(_.a,{children:Object(x.jsxs)(S.a,{container:!0,direction:"column",alignItems:"center",children:[Object(x.jsx)(S.a,{item:!0,children:Object(x.jsx)(v.a,{component:"b",children:c.address.street})}),Object(x.jsx)(S.a,{item:!0,children:Object(x.jsx)(v.a,{component:"b",children:c.address.unit?"Unit: ".concat(c.address.unit):""})}),Object(x.jsx)(S.a,{item:!0,children:Object(x.jsx)(v.a,{component:"b",className:s.listingType,children:c.type})}),Object(x.jsx)(S.a,{item:!0,children:Object(x.jsx)(v.a,{component:"b",children:F.format(c.price)})}),Object(x.jsx)(j.a,{variant:"contained",color:"primary",onClick:function(){!function(e){var t=window.open("https://vow.mlspin.com/VOW/listingviews/GetListing?rm=1&vf=2&summ=false&o=2&od=1&f=0&ps=0&offs=0&sel=".concat(e,"&sp=false&cb=16190256"),"_blank","noopener,noreferrer");t&&(t.opener=null)}(c.id),r(c.id)},children:"Open Listing"})]})})},t.id)),e}),[])]})})},ae=Object(b.a)({mainContainer:{margin:"0 5rem",width:"auto"},buttonContainer:{margin:"1rem 0"}}),se=function(){var e=i.a.useState(!1),t=Object(k.a)(e,2),n=t[0],r=t[1],a=i.a.useState(null),s=Object(k.a)(a,2),o=s[0],c=s[1],l=i.a.useState(null),d=Object(k.a)(l,2),h=d[0],p=d[1],v=i.a.useState(null),b=Object(k.a)(v,2),m=b[0],f=b[1],g=i.a.useState(null),A=Object(k.a)(g,2),O=A[0],C=A[1],w=i.a.useState(new Set),E=Object(k.a)(w,2),F=E[0],Y=E[1],B=i.a.useState(null),R=Object(k.a)(B,2),T=R[0],J=R[1],M=i.a.useState(!0),P=Object(k.a)(M,2),L=P[0],q=P[1],U=ae();return Object(x.jsx)(y.Provider,{value:{isImporting:n,selectedListingId:o,listings:h,coordinates:m,hiddenListingIds:O,viewedListingIds:F},children:Object(x.jsx)(I.Provider,{value:{errors:T,addError:function(e){J([].concat(Object(u.a)(null!==T&&void 0!==T?T:[]),[e]))},clearAll:function(){return J(null)}},children:Object(x.jsxs)(S.a,{container:!0,direction:"column",className:U.mainContainer,children:[Object(x.jsx)(S.a,{container:!0,item:!0,direction:"row",justify:"space-evenly",alignItems:"center",className:U.buttonContainer,children:Object(x.jsx)(j.a,{variant:"contained",onClick:function(){return q(!0)},children:"Import"})}),Object(x.jsx)(Q,{isOpen:L,setIsImporting:r,setListings:p,setCoordinates:f,close:function(){return q(!1)}}),Object(x.jsx)(ie,{setSelectedListingId:c,markListingAsViewed:function(e){var t=new Set(F);t.add(e),Y(t)}}),Object(x.jsx)(N,{setSelectedListingId:c,setHiddenListingIds:C})]})})})},oe=n(52),ce=Object(oe.a)({palette:{type:"dark"},shape:{borderRadius:1},overrides:{MuiCssBaseline:{"@global":{body:{margin:0,fontFamily:["-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","sans-serif"].join("."),height:"100%"},html:{height:"100%"}}}}}),ue=function(){return Object(x.jsxs)(o.a,{theme:ce,children:[Object(x.jsx)(c.a,{}),Object(x.jsx)(w,{children:Object(x.jsx)(se,{})})]})};s.a.render(Object(x.jsx)(i.a.StrictMode,{children:Object(x.jsx)(ue,{})}),document.getElementById("root"))}},[[158,1,2]]]);
//# sourceMappingURL=main.1763d714.chunk.js.map