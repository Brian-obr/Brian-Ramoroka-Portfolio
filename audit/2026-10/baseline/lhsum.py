import json,sys,statistics,glob
for ff in ['mobile','desktop']:
    runs=[json.load(open(f)) for f in sorted(glob.glob(f'lighthouse/*-{ff}-*.json'))]
    def med(k): return statistics.median(r['audits'][k]['numericValue'] for r in runs)
    print(ff, 'perf', [round(r['categories']['performance']['score']*100) for r in runs],
      {c: round(runs[0]['categories'][c]['score']*100) for c in runs[0]['categories']})
    for k in ['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index','server-response-time','total-byte-weight','interactive']:
        print('  ',k, round(med(k),3))
    r=runs[1]; a=r['audits']
    print('  LCP elem:', json.dumps(a['largest-contentful-paint-element']['details'])[:700])
    for k in ['lcp-phases','largest-contentful-paint-element']:
        pass
    for k in ['render-blocking-resources','unused-javascript','uses-responsive-images','modern-image-formats','offscreen-images','bootup-time','mainthread-work-breakdown','color-contrast','target-size','image-size-responsive','font-display','legacy-javascript']:
        if k in a: print('  ',k, a[k].get('score'), a[k].get('displayValue',''))
    items=a['network-requests']['details']['items']
    big=sorted(items,key=lambda x:-x.get('transferSize',0))[:8]
    for b in big: print('    req',b.get('transferSize'),b['url'][:100])
    if ff=='mobile':
      for k in ['color-contrast','target-size']:
        for it in a[k].get('details',{}).get('items',[])[:6]: print('     ',k, it.get('node',{}).get('snippet','')[:120], it.get('node',{}).get('explanation','')[:160].replace('\n',' '))
