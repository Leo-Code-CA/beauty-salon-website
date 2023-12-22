require('dotenv').config();

const KEY = process.env.API_KEY;

if (typeof document !== 'undefined') {

(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
        key: KEY,
      //   v: "weekly",
        // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
        // Add other bootstrap parameters as needed, using camel case.
      });
    
      let map;
      let marker;
      let infowindow;
    
    async function fetchFooter() {
    
        const response = await fetch('footer.html');
        const html = await response.text();
        document.getElementById('footer').innerHTML = html;
        initMap();
    }
    
    fetchFooter();
    
    
    
    async function initMap() {
    
        const position = { lat: 43.8087399, lng: 4.6635764 };
        
        const { Map } = await google.maps.importLibrary("maps");
        const { Marker } = await google.maps.importLibrary("marker");
        const { InfoWindow } = await google.maps.importLibrary("maps");
        const { Animation } = await google.maps.importLibrary("marker");
    
        map = new Map(document.getElementById("footer__map"), {
            center: position,
            zoom: 15,
        });
    
        map.setCenter({lat: 47.81035232543945, lng: 4.6635764});
    
        const icon = google.maps.Icon = {
            url: '/images/homepage/pin.svg'
        }
    
        marker = new Marker({
            map: map,
            position: position,
            clickable: true,
            icon: icon,
        })
    
        marker.setAnimation(Animation.DROP);
        
    
        const content = document.createElement('div');
        const title = document.createElement('h3');
        const addressLineOne = document.createElement('p');
        const addressLineTwo = document.createElement('p');
        const addressLineThree = document.createElement('p');
    
        content.appendChild(title);
        content.appendChild(addressLineOne);
        content.appendChild(addressLineTwo);
        content.appendChild(addressLineThree);
    
        title.textContent = "Institut For You";
        addressLineOne.textContent = "3 Faubourg Voltaire";
        addressLineTwo.textContent = "13150 Tarascon";
        addressLineThree.textContent = "France"
        content.classList.add('footer__bubble');
    
        infowindow = new InfoWindow({
            minWidth: 250,
        });
    
        infowindow.setContent(content);
    
        const openoptions = infowindow.InfoWindowOpenOptions = {
            anchor: marker,
            map: map,
            shouldFocus: false
        }
    
        infowindow.open(openoptions);
    
        google.maps.event.addListener(marker, "click", function() {
            infowindow.open(openoptions);
        })
    
    
    
    }

}


