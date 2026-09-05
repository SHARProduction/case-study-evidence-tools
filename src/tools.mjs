export const evaluators={
  'public-case-study-evidence-checker': i=>{const rows=(i.claims||[]).map(x=>({...x,ready:Boolean(String(x.sourceUrl||'').startsWith('https://')&&x.permission==='approved'&&x.eventDate&&x.retrievedAt)}));return{valid:rows.length>0&&rows.every(x=>x.ready),rows}},
  'portfolio-claim-citation-validator': i=>{const rows=(i.claims||[]).map(x=>({...x,citable:Boolean(String(x.url||'').startsWith('https://')&&x.retrievedAt&&x.excerpt)}));return{valid:rows.length>0&&rows.every(x=>x.citable),rows,uncited:rows.filter(x=>!x.citable).map(x=>x.id)}}
};
export function evaluate(slug,input){const fn=evaluators[slug];if(!fn)throw new Error('Unknown tool');return fn(input)}
