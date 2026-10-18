import sys, json, asyncio
from playwright.async_api import async_playwright
BASE=sys.argv[1]; OUT=sys.argv[2]; AXE=sys.argv[3]; LABEL=sys.argv[4]
pages=['/','/about','/services','/experience','/skills','/contact']
widths=[375,768,1280,1440]
async def main():
    axe=open(AXE).read(); res={}
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for w in widths:
            ctx=await b.new_context(viewport={'width':w,'height':900}, reduced_motion='no-preference')
            pg=await ctx.new_page()
            for path in pages:
                await pg.goto(BASE+path, wait_until='networkidle')
                await pg.wait_for_timeout(1200)
                name=(path.strip('/') or 'home')
                # scroll to trigger whileInView then back
                await pg.evaluate("async()=>{for(let y=0;y<document.body.scrollHeight;y+=300){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,200))}window.scrollTo(0,0)}")
                await pg.wait_for_timeout(1200)
                await pg.screenshot(path=f'{OUT}/{LABEL}-{name}-{w}.png', full_page=True)
                if w in (375,1280):
                    await pg.add_script_tag(content=axe)
                    r=await pg.evaluate("async()=>{const r=await axe.run(document,{runOnly:['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']});return r.violations.map(v=>({id:v.id,impact:v.impact,n:v.nodes.length,sample:v.nodes.slice(0,3).map(n=>n.target.join(' ')+' :: '+(n.failureSummary||'').slice(0,160))}))}")
                    res[f'{name}@{w}']=r
                    # tap targets <44px
                    small=await pg.evaluate("()=>[...document.querySelectorAll('a,button,input,select,textarea')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.width<44||r.height<44)}).map(e=>(e.innerText||e.getAttribute('aria-label')||e.tagName).trim().slice(0,30)+` ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`)")
                    res[f'{name}@{w}-small-targets']=small
            await ctx.close()
        await b.close()
    json.dump(res,open(f'{OUT}/../axe-{LABEL}.json','w'),indent=1)
    for k,v in res.items():
        if 'small' in k: print(k, len(v), v[:8])
        else: print(k, [(x['id'],x['impact'],x['n']) for x in v])
asyncio.run(main())
