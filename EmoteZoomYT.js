// ==UserScript==
// @name         EmoteZoomYT
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Preview emotes
// @author       Nekupaska
// @match        http://www.youtube.com/watch?v=*
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==
'use strict';

let checkExistChat = setInterval(function() {
    if ($('#chatframe').length) {
        clearInterval(checkExistChat);

        ///
        let zoom = $('<div id="emoteZoomYT" style="z-index:1000;background-color:white;display:none;position:absolute;padding:10px;border:1px solid grey;border-radius:10px;width:80px;height:80px;box-shadow:-1px -1px 10px grey inset"><img src="" style="width: 100%;border-radius:5px;border: 1px solid grey;"/></div></div>');
        $("body").append(zoom);

        let x = 0;
        let y = 0;
        let offset=20;
        let src = "";

        let iframe = $("#chatframe"); //finds chat iframe


        iframe.on("load",function() {
            iframe.contents().on("mouseenter",".emoji",function(e) {
                x = e.clientX + $("#secondary").position().left;
                y = e.clientY + $("#secondary").position().top;

                zoom.css("left",(x + offset) + 'px');
                zoom.css("top",(y + offset) + 'px');
                //change image
                src = e.target.getAttribute("src");
                src = src.replace("w24-h24-", "w240-h240-");
                zoom.find("img").attr("src", src);
                zoom.show();//show
            });
            iframe.contents().on("mouseleave",".emoji",function() {
                zoom.hide();
            });
        });

    }
}, 100);
