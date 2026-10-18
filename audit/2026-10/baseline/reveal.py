import asyncio,sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1280,'height':900})
        await pg.goto(sys.argv[1], wait_until='networkidle'); await pg.wait_for_timeout(1500)
        print(await pg.evaluate("""async()=>{const s=ms=>new Promise(r=>setTimeout(r,ms));
          const hid=()=>[...document.querySelectorAll('main [style*="opacity"]')].filter(e=>getComputedStyle(e).opacity==='0').length;
          const before=hid(); const H=document.documentElement.scrollHeight;
          for(let y=0;y<H;y+=300){window.scrollTo(0,y);await s(200)}
          const sy=window.scrollY; await s(1000);
          return {before, after:hid(), H, sy, total:document.querySelectorAll('main [style*="opacity"]').length}}"""))
        await pg.mouse.wheel(0,0)
        # real wheel scrolling
        await pg.evaluate("window.scrollTo(0,0)")
        for i in range(60):
            await pg.mouse.wheel(0,300); await pg.wait_for_timeout(120)
        await pg.wait_for_timeout(1000)
        print('after wheel', await pg.evaluate("""()=>({sy:scrollY,hidden:[...document.querySelectorAll('main [style*="opacity"]')].filter(e=>getComputedStyle(e).opacity==='0').map(e=>e.textContent.trim().slice(0,30)).slice(0,8)})"""))
        await b.close()
asyncio.run(main())
