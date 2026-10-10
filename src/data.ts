export type Item = {code:string; name:string; specification:string; aliases:string[]};
export type Stock = {code:string; department:string; shelf:string; quantity:number; unit:string};
export const items:Item[] = [
{code:'DEMO-001',name:'滅菌ガーゼ',specification:'10 × 10 cm / 5枚入',aliases:['めっきんがーぜ','ガーゼ','gauze']},
{code:'DEMO-002',name:'シリンジ',specification:'10 mL / ルアーロック',aliases:['しりんじ','注射器','ちゅうしゃき']},
{code:'DEMO-003',name:'ニトリル手袋',specification:'M / 100枚入',aliases:['にとりるてぶくろ','グローブ','ぐろーぶ']},
{code:'DEMO-004',name:'サージカルテープ',specification:'25 mm × 9 m',aliases:['さーじかるてーぷ','テープ','てーぷ']},
{code:'DEMO-005',name:'輸液セット',specification:'20滴 / mL',aliases:['ゆえきせっと','点滴','てんてき']},
{code:'DEMO-006',name:'アルコール綿',specification:'個包装 / 100包入',aliases:['あるこーるめん','酒精綿','しゅせいめん']}
];
export const stocks:Stock[] = items.flatMap((item,index)=>[
{code:item.code,department:'架空・外来',shelf:`A-${String(index+1).padStart(2,'0')}`,quantity:(index+1)*5,unit:index===2?'箱':'袋'},
{code:item.code,department:'架空・病棟',shelf:`B-${String(index+1).padStart(2,'0')}`,quantity:(index+1)*10,unit:index===2?'箱':'袋'}]);
