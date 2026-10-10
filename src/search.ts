import type { Item } from './data';
export function normalize(value:string):string {
return value.normalize('NFKC').toLowerCase().replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60)).replace(/[\s\-‐‑–—ー×x・/／]/g,'');
}
export function searchItems(items:Item[],query:string):Item[] {
const terms=query.trim().split(/\s+/).map(normalize).filter(Boolean);
return items.filter(item=>{const fields=[item.name,item.code,item.specification,...item.aliases].map(normalize);return terms.every(term=>fields.some(field=>field.includes(term)));});
}
