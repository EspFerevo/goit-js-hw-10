import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as r}from"./assets/vendor-77e16229.js";function o(e,t){return new Promise((s,i)=>{setTimeout(()=>{t==="fulfilled"?s(e):i(e)},e)})}function n(e,t){t==="fulfilled"?r.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`}):r.error({title:"Error",message:`❌ Rejected promise in ${e}ms`})}document.querySelector(".form").addEventListener("submit",function(e){e.preventDefault();const t=parseInt(this.elements.delay.value),s=this.elements.state.value;o(t,s).then(i=>n(i,s)).catch(i=>n(i,s))});
//# sourceMappingURL=commonHelpers2.js.map
