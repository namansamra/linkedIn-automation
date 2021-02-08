const puppeteer = require('puppeteer');
require('dotenv').config();
 sendRequest = async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/login');
    await page.type("input[id='username']",process.env.USERID,{delay:100});
    await page.type("input[id='password']",process.env.PASS,{delay:100});
    await Promise.all([
        page.waitForNavigation({waitUntil:'networkidle2'}),
        page.click("button[type='submit']")
    ]);
    
    // await page.waitForSelector("button[data-control-name='overlay.close_conversation_window']",{visible:true})
    // await page.click("button[data-control-name='overlay.close_conversation_window']")
    await page.waitForSelector("input[placeholder='Search']",{visible:true})
    await page.type("input[placeholder='Search']",process.argv[2],{delay:100});
    await Promise.all([
        page.waitForNavigation({waitUntil:'networkidle2'}),
        page.keyboard.type(String.fromCharCode(13))
    ]);
    await page.waitForSelector(".msg-overlay-bubble-header__controls button:nth-child(3)",{visible:true});
    await page.click(".msg-overlay-bubble-header__controls button:nth-child(3)")
    await page.waitForSelector("button[aria-label='People']");
    await Promise.all([
        page.waitForNavigation({waitUntil:'networkidle2'}),
        page.click("button[aria-label='People']")
    ]);
    var i = 1
    var id = setInterval(()=>{
        temp(i++,id);
    },5000)
      



    async function temp(j,id){
        if(j > process.argv[3]){
            clearInterval(id);
            return;
        }
        // await page.waitForSelector(`.reusable-search__entity-results-list li:nth-child(${i}) div div:nth-child(3) button`,{display:true});
        await page.click(`.reusable-search__entity-results-list li:nth-child(${j}) div div:nth-child(3) button`,{delay:200});
        await page.waitForSelector("button[aria-label='Send now']",{visible:true});
        await page.click("button[aria-label='Send now']",{delay:100});
    }
};

acceptRequest = async ()=> {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/login');
    await page.type("input[id='username']",process.env.USERID,{delay:100});
    await page.type("input[id='password']",process.env.PASS,{delay:100});
    await Promise.all([
        page.waitForNavigation({waitUntil:'networkidle2'}),
        page.click("button[type='submit']")
    ]);
    await Promise.all([
        page.waitForNavigation({waitUntil:'networkidle2'}),
        await page.click(".global-nav__nav ul li:nth-child(2) a")
    ]);

    var i = 1;
    var id = setInterval(()=>temp2(i++,id),5000);

    async function temp2(j,id){
        if(j>process.argv[2]){
            clearInterval(id);
            return;
        }
        await page.click(`.mn-invitation-list li:nth-child(${1}) div:nth-child(2) button:nth-child(2)`);
        await page.waitForSelector("button[aria-label='Close confirmation card']",{visible:true});
        await page.click("button[aria-label='Close confirmation card']");

    }


}

// sendRequest();
acceptRequest();