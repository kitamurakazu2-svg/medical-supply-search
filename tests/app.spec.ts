import {test,expect} from '@playwright/test';
test('スマホ表示、名前・コード・規格・別名、在庫設定なし',async({page})=>{
 await page.goto('./');
 await expect(page.locator('article')).toHaveCount(7);
 for(const width of [320,390,430]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 const input=page.getByLabel('材料を探す');
 for(const [query,name] of [['ｶﾞｰｾﾞ','滅菌ガーゼ'],['ＤＥＭＯ００２','シリンジ'],['注射器 １０ｍＬ','シリンジ'],['ｱﾙ綿','アルコール綿']]){await input.fill(query);await expect(page.locator('article')).toHaveCount(1);await expect(page.getByRole('heading',{name,exact:true})).toBeVisible();}
 await input.fill('保護メガネ');await expect(page.getByText('在庫設定品目ではありません')).toBeVisible();
 await input.fill('');await page.getByLabel('定数部署',{exact:true}).selectOption('架空・外来');await expect(page.locator('article')).toHaveCount(6);await expect(page.locator('article').getByText('架空・病棟',{exact:true})).toHaveCount(0);
 await input.fill('不存在');await expect(page.getByText('該当する材料がありません。品目名や規格の一部で検索してください。')).toBeVisible();
});
test('音声検索結果を検索欄に反映（APIを模擬）',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,'SpeechRecognition',{value:class{onresult:any;onend:any;start(){this.onresult?.({results:[[{transcript:'ガーゼ'}]]});this.onend?.();}stop(){this.onend?.();}}});});
 await page.goto('./');await page.getByRole('button',{name:'音声入力'}).click();await expect(page.getByLabel('材料を探す')).toHaveValue('ガーゼ');await expect(page.locator('article')).toHaveCount(1);
});
test('サブパスでPWA登録し、オフラインでも再起動・検索',async({page,context})=>{
 await page.goto('./');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
 await page.reload();
 await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
 const manifest=await page.locator('link[rel="manifest"]').getAttribute('href');expect(manifest).toContain('/medical-supply-search/');
 await context.setOffline(true);await page.reload();await expect(page.getByRole('heading',{name:'診療材料検索',exact:true})).toBeVisible();await page.getByLabel('材料を探す').fill('シリンジ');await expect(page.locator('article')).toHaveCount(1);
});
