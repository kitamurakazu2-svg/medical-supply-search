import {test} from 'node:test';
import assert from 'node:assert/strict';
import {searchItems} from './search';
import {items} from './data';
test('半角カナとかな別名',()=>assert.equal(searchItems(items,'ｶﾞｰｾﾞ')[0]?.code,'DEMO-001'));
test('コードの全角・区切り',()=>assert.equal(searchItems(items,'ＤＥＭＯ００２')[0]?.name,'シリンジ'));
test('規格と別名の複合検索',()=>assert.equal(searchItems(items,'注射器 １０ｍＬ').length,1));
test('該当なし',()=>assert.equal(searchItems(items,'不存在').length,0));
