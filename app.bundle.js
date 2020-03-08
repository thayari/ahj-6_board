!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.columnType=t,this.text=n,this.id=r,this.html=this.setCardHtml(),this.order=null}var t,n,o;return t=e,(n=[{key:"setCardHtml",value:function(){return'<li class="card" data-id='.concat(this.id,'>\n    <div class="card-text">').concat(this.text,'</div>\n    <button class="delete">×</delete>\n    </li>')}}])&&r(t.prototype,n),o&&r(t,o),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.cards=[],this.board=document.querySelector(".board"),this.modal=document.querySelector(".modal"),this.addtext=document.getElementById("text"),this.addtextButton=document.getElementById("submit"),this.todo=document.querySelector("[data-id=todo] .list"),this.inprogress=document.querySelector("[data-id=inprogress] .list"),this.done=document.querySelector("[data-id=done] .list"),this.mouseDown=!1,this.draggedEl=null,this.ghostEl=null,this.placeholder=document.createElement("li"),this.lists=[this.todo,this.inprogress,this.done],this.closestCard=null,this.latestCard=null}var t,n,r;return t=e,(n=[{key:"dnd",value:function(){var e=this;this.board.addEventListener("mousedown",(function(t){t.target.classList.contains("delete")||t.target.closest(".card")&&(e.board.classList.add("grabbing-cursor"),e.mouseDown=!0,e.draggedEl=t.target.closest(".card"),e.ghostEl=t.target.closest(".card").cloneNode(!0),e.ghostEl.classList.add("dragged"),document.body.appendChild(e.ghostEl),e.ghostEl.style.width="".concat(e.draggedEl.offsetWidth,"px"),e.ghostEl.style.height="".concat(e.draggedEl.offsetHeight,"px"),e.ghostLeft=t.clientX-e.draggedEl.getBoundingClientRect().x,e.ghostTop=t.clientY-e.draggedEl.getBoundingClientRect().y,e.ghostEl.style.left="".concat(e.draggedEl.getBoundingClientRect().x,"px"),e.ghostEl.style.top="".concat(e.draggedEl.getBoundingClientRect().y,"px"),e.draggedEl.style.opacity="0.5")})),this.board.addEventListener("mousemove",(function(t){e.draggedEl&&(t.preventDefault(),e.ghostEl.style.left="".concat(t.clientX-e.ghostLeft,"px"),e.ghostEl.style.top="".concat(t.clientY-e.ghostTop,"px"))})),this.board.addEventListener("mouseleave",(function(){e.draggedEl&&e.removeGhostEl()})),document.addEventListener("mouseover",(function(t){if(e.draggedEl){if(e.closestCard=t.target.closest(".card"),null!=e.closestCard&&(e.latestCard=e.closestCard),document.elementFromPoint(t.clientX,t.clientY).classList.contains("board")&&(e.latestCard=null),e.latestCard){e.placeholder.classList.add("card-placeholder"),e.placeholder.style.height="".concat(e.ghostEl.offsetHeight,"px");var n=e.latestCard.offsetHeight/2,r=e.latestCard.getBoundingClientRect();t.clientY<=r.top+n?e.latestCard.before(e.placeholder):t.clientY>r.top+n&&e.latestCard.after(e.placeholder)}e.latestCard||e.placeholder.remove()}})),document.addEventListener("mouseup",(function(t){if(e.draggedEl){t.preventDefault(),e.mouseDown=!1;var n=t.target.closest(".column");n||e.removeGhostEl(),t.target.closest(".column")?(e.draggedEl.style.opacity="1",e.draggedEl&&(e.cards.filter((function(t){return t.id===Number(e.draggedEl.dataset.id)}))[0].columnType=n.dataset.id,e.latestCard&&e.placeholder.insertAdjacentElement("beforebegin",e.draggedEl),e.removeGhostEl(),e.defineOrder(),e.render())):e.draggedEl&&e.removeGhostEl()}})),this.board.addEventListener("mouseleave",(function(){e.removeGhostEl(),e.mouseDown=!1}))}},{key:"removeGhostEl",value:function(){document.body.removeChild(this.ghostEl),this.closestEl=null,this.closestCard=null,this.ghostEl=null,this.draggedEl.style.opacity=1,this.draggedEl=null,this.board.classList.remove("grabbing-cursor")}},{key:"addEvents",value:function(){var e=this;this.board.addEventListener("click",(function(t){if(t.preventDefault(),t.target.classList.contains("add")&&(e.modal.classList.remove("hidden"),e.columnType=t.target.parentNode.dataset.id),t.target.classList.contains("delete")){var n=t.target.parentNode;e.removeCard(n)}})),this.addtextButton.addEventListener("click",(function(t){t.preventDefault();var n=e.addtext.value;e.addNewCard(e.columnType,n),e.columnType=null,e.addtext.value="",e.modal.classList.add("hidden")})),document.getElementById("cancel").addEventListener("click",(function(){e.modal.classList.add("hidden")}))}},{key:"addNewCard",value:function(e,t){var n=new o(e,t,Math.floor(1e7*Math.random()));this.cards.push(n),this.render()}},{key:"removeCard",value:function(e){var t=this.cards.filter((function(t){return t.id===Number(e.dataset.id)}))[0];this.cards.splice(this.cards.indexOf(t),1),this.render()}},{key:"defineOrder",value:function(){this.lists.forEach((function(e){for(var t=Array.from(e.childNodes),n=0;n<t.length;n+=1)t[n].dataset.order=n})),this.cards.forEach((function(e){e.order=document.querySelector('[data-id="'.concat(e.id,'"]')).dataset.order}))}},{key:"render",value:function(){var e=this;this.cards.sort((function(e,t){return Number(e.order)-Number(t.order)})),this.save(),this.todo.innerHTML="",this.done.innerHTML="",this.inprogress.innerHTML="",this.cards.forEach((function(t){"todo"===t.columnType?e.todo.insertAdjacentHTML("beforeend",t.html):"done"===t.columnType?e.done.insertAdjacentHTML("beforeend",t.html):"inprogress"===t.columnType&&e.inprogress.insertAdjacentHTML("beforeend",t.html)})),this.defineOrder()}},{key:"start",value:function(){localStorage.todolist&&(this.cards=JSON.parse(localStorage.todolist),this.render()),this.addEvents(),this.dnd()}},{key:"save",value:function(){localStorage.todolist=JSON.stringify(this.cards)}}])&&a(t.prototype,n),r&&a(t,r),e}())).start()}]);
//# sourceMappingURL=app.bundle.js.map