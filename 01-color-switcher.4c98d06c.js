const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,d=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.addEventListener("click",(function(){e.disabled=!0,t.disabled=!1,clearTimeout(d)})),COLOR_CHANGE=1e3;let d=null;
//# sourceMappingURL=01-color-switcher.4c98d06c.js.map
