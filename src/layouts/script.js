import SwupFragmentPlugin from "@swup/fragment-plugin";
import Swup from "swup";
const swup = new Swup({
    plugins: [
        
        new SwupFragmentPlugin({
            rules: [
        
            {
                    from: "/dashboard/(.*)",
                    to: "/dashboard/(.*)",
                    containers: ["#dashboard"],
                },
                {
                    from: "/(.*)",
                    to: "/(.*)",
                    containers: ["#swup"],
            },
            
            ],
        }),
    ],
});

swup.hooks.on("page:load", function(){
    console.log('Salam')
})