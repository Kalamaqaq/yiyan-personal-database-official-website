import{Capacitor as P,CapacitorHttp as U}from"./index-Bton3lqe.js";import{h as F,j as u,g as nt,e as it}from"./index-bmfXHrWD.js";import{F as X,D as $}from"./filesystemAdapter-CnydWnfw.js";import{c as W}from"./types-nSJQG2lU.js";import"./vendor-react-Ca85dylG.js";const C="attachments/",St=`
CREATE TABLE IF NOT EXISTS entries (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  source TEXT,
  supplement TEXT,
  is_starred INTEGER DEFAULT 0,
  is_deleted INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  copy_count INTEGER DEFAULT 0,
  content_hash TEXT,
  backup_batch_id TEXT
);

CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT,
  is_smart INTEGER DEFAULT 0,
  search_criteria TEXT,
  is_deleted INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  backup_batch_id TEXT
);

CREATE TABLE IF NOT EXISTS groups_table (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_deleted INTEGER DEFAULT 0,
  backup_batch_id TEXT
);

CREATE TABLE IF NOT EXISTS entry_tags (
  entry_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (entry_id, tag_id)
);

CREATE TABLE IF NOT EXISTS links (
  id TEXT PRIMARY KEY,
  source_id TEXT NOT NULL,
  target_id TEXT NOT NULL,
  description TEXT,
  is_deleted INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  backup_batch_id TEXT
);

CREATE TABLE IF NOT EXISTS todos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  note TEXT,
  folder_date TEXT,
  time TEXT,
  is_done INTEGER DEFAULT 0,
  is_today INTEGER DEFAULT 0,
  is_deleted INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  completed_at INTEGER,
  backup_batch_id TEXT
);

CREATE TABLE IF NOT EXISTS todo_tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT,
  is_deleted INTEGER DEFAULT 0,
  backup_batch_id TEXT
);

CREATE TABLE IF NOT EXISTS todo_tag_relations (
  todo_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (todo_id, tag_id)
);

CREATE TABLE IF NOT EXISTS templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  is_deleted INTEGER DEFAULT 0,
  backup_batch_id TEXT
);

CREATE TABLE IF NOT EXISTS template_items (
  id TEXT PRIMARY KEY,
  template_id TEXT NOT NULL,
  title TEXT,
  note TEXT,
  time TEXT,
  sort_order INTEGER DEFAULT 0,
  backup_batch_id TEXT
);

CREATE TABLE IF NOT EXISTS attachments_meta (
  id TEXT PRIMARY KEY,
  entry_id TEXT NOT NULL,
  r2_key_orig TEXT,
  r2_key_thumb TEXT,
  mime_type TEXT,
  sort_order INTEGER DEFAULT 0,
  is_deleted INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  backup_batch_id TEXT
);

CREATE TABLE IF NOT EXISTS _backup_manifests (
  id TEXT PRIMARY KEY,
  timestamp INTEGER NOT NULL,
  type TEXT NOT NULL,
  entry_count INTEGER DEFAULT 0,
  todo_count INTEGER DEFAULT 0,
  tag_count INTEGER DEFAULT 0,
  group_count INTEGER DEFAULT 0,
  attachment_count INTEGER DEFAULT 0,
  app_version TEXT,
  created_at INTEGER DEFAULT (strftime('%s','now') * 1000)
);

CREATE TABLE IF NOT EXISTS _sync_state (
  key TEXT PRIMARY KEY,
  value TEXT
);

CREATE TABLE IF NOT EXISTS chat_sessions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  messages TEXT NOT NULL,
  model TEXT,
  mcp_enabled_tools TEXT,
  mcp_search_results TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  backup_batch_id TEXT
);

CREATE INDEX IF NOT EXISTS idx_entries_updated ON entries(updated_at);
CREATE INDEX IF NOT EXISTS idx_todos_updated ON todos(updated_at);
CREATE INDEX IF NOT EXISTS idx_tags_updated ON tags(updated_at);
CREATE INDEX IF NOT EXISTS idx_entries_deleted ON entries(is_deleted);
CREATE INDEX IF NOT EXISTS idx_attachments_entry ON attachments_meta(entry_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_updated ON chat_sessions(updated_at);
`,tt=1e4;async function T(s,e=[]){return Rt(s,e)}async function Rt(s,e=[]){F();const r=`${u.url}/d1/query`,i={db:u.db,sql:s,params:e};let d;if(P.isNativePlatform()){const n=await U.post({url:r,headers:{Authorization:`Bearer ${u.token}`,"Content-Type":"application/json"},data:i,connectTimeout:tt,readTimeout:tt});if(n.status<200||n.status>=300)throw new Error(`D1(TS) HTTP ${n.status}: ${JSON.stringify(n.data).slice(0,300)}`);d=typeof n.data=="string"?JSON.parse(n.data):n.data}else{const n=await fetch(r,{method:"POST",headers:{Authorization:`Bearer ${u.token}`,"Content-Type":"application/json"},body:JSON.stringify(i)});if(!n.ok)throw new Error(`D1(TS) HTTP ${n.status}: ${(await n.text()).slice(0,300)}`);d=await n.json()}if(!d.ok)throw new Error(`D1(TS) 查询失败: ${d.error??JSON.stringify(d)}`);return d.results??[]}async function It(s){await T(s,[])}async function _(s,e,r=10){if(e.length===0)return;const i=Math.max(1,r);let d=0;const n=new Array(Math.min(i,e.length)).fill(0).map(async()=>{for(;d<e.length;){const l=d++;await T(s,e[l])}});await Promise.all(n)}let et=!1;async function D(){et||(await It(St),et=!0)}async function ot(s){const e=await T("SELECT value FROM _sync_state WHERE key = ?",[s]);return e.length>0?e[0].value:null}async function Nt(s,e){await T("INSERT OR REPLACE INTO _sync_state (key, value) VALUES (?, ?)",[s,e])}async function yt(){try{const s=await T("SELECT name FROM sqlite_master WHERE type='table' LIMIT 1");return{ok:!0,message:`连接成功，表：${s.length>0?s[0].name:"(空)"}`}}catch(s){return{ok:!1,message:s instanceof Error?s.message:"连接失败"}}}const At=15e3,j=8e3,k=1e4;async function V(s,e={},r=At){const i=new AbortController,d=setTimeout(()=>i.abort(),r);try{return await fetch(s,{...e,signal:i.signal})}finally{clearTimeout(d)}}async function at(s,e,r="image/jpeg"){const i=atob(e),d=new Uint8Array(i.length);for(let n=0;n<i.length;n++)d[n]=i.charCodeAt(n);await ft(s,d,r)}async function ft(s,e,r){F();const i=`${u.url}/r2/put/${encodeURIComponent(s)}?bucket=${u.bucket}`;if(P.isNativePlatform()){let l="";for(let m=0;m<e.length;m++)l+=String.fromCharCode(e[m]);const p=btoa(l),h=await U.put({url:i,headers:{Authorization:`Bearer ${u.token}`,"Content-Type":r},data:p,connectTimeout:k,readTimeout:k});if(h.status<200||h.status>=300)throw new Error(`R2(TS) 上传失败 ${h.status}: ${JSON.stringify(h.data).slice(0,200)}`);return}const d=new ArrayBuffer(e.byteLength);new Uint8Array(d).set(e);const n=await V(i,{method:"PUT",headers:{Authorization:`Bearer ${u.token}`,"Content-Type":r},body:d});if(!n.ok){const l=await n.text();throw new Error(`R2(TS) 上传失败 ${n.status}: ${l.slice(0,200)}`)}}async function st(s){const e=await wt(s);let r="";for(let i=0;i<e.length;i++)r+=String.fromCharCode(e[i]);return btoa(r)}async function wt(s){var d;F();const e=`${u.url}/r2/get?bucket=${u.bucket}&key=${encodeURIComponent(s)}`;if(P.isNativePlatform()){const n=await U.get({url:e,headers:{Authorization:`Bearer ${u.token}`},connectTimeout:k,readTimeout:k});if(n.status<200||n.status>=300)throw n.status===404?new Error(`R2 object not found: ${s}`):new Error(`R2(TS) 下载失败 ${n.status}: ${JSON.stringify(n.data).slice(0,200)}`);const l=typeof n.data=="string"?n.data:((d=n.data)==null?void 0:d.data)??"",p=atob(l),h=new Uint8Array(p.length);for(let m=0;m<p.length;m++)h[m]=p.charCodeAt(m);return h}const r=await V(e,{method:"GET",headers:{Authorization:`Bearer ${u.token}`}});if(!r.ok){if(r.status===404)throw new Error(`R2 object not found: ${s}`);const n=await r.text();throw new Error(`R2(TS) 下载失败 ${r.status}: ${n.slice(0,200)}`)}const i=await r.arrayBuffer();return new Uint8Array(i)}function rt(s){return s===401||s===403?{ok:!1,message:`中转站密钥无效（HTTP ${s}）`}:s>=500?{ok:!1,message:`中转站服务异常（HTTP ${s}）`}:{ok:!0,message:`R2 中转站连接成功（HTTP ${s}）`}}async function Lt(){try{F();const s=`${u.url}/r2/get?bucket=${u.bucket}&key=__connection_test__`;if(P.isNativePlatform()){const r=await U.get({url:s,headers:{Authorization:`Bearer ${u.token}`},connectTimeout:j,readTimeout:j});return rt(r.status)}const e=await V(s,{method:"GET",headers:{Authorization:`Bearer ${u.token}`}},j);return rt(e.status)}catch(s){return{ok:!1,message:s instanceof Error?s.name==="AbortError"?"连接超时（8秒）":s.message:"R2 连接失败"}}}const Ot="2.7.3",K="last_backup_ts";async function ct(s,e,r){const i=new Array(s.length);let d=0;const n=new Array(Math.min(e,s.length||1)).fill(0).map(async()=>{for(;d<s.length;){const l=d++;i[l]=await r(s[l])}});return await Promise.all(n),i}async function Ut(){const[s,e]=await Promise.all([yt(),Lt()]);return{d1:s.message,r2:e.message,ok:s.ok&&e.ok}}async function Ft(){var q,Q;const s=Date.now(),e={batchId:`backup_${Date.now()}`,timestamp:s,entriesSynced:0,todosSynced:0,tagsSynced:0,groupsSynced:0,linksSynced:0,templatesSynced:0,attachmentsUploaded:0,deletionsSynced:0,duration:0,errors:[]},r=await nt(),i=await it();await((q=r.ensureConnection)==null?void 0:q.call(r)),await((Q=i.ensureConnection)==null?void 0:Q.call(i)),await D();const d=await ot(K),n=d?parseInt(d,10):0,[l,p,h,m,M,b,y,A,G]=await Promise.all([r.getAllEntries(),r.getAllTags(),r.getAllGroups(),i.getAllTodos(),i.getAllTodoTags(),i.getAllTemplates(),r.getAllAttachments(),r.getAllLinks(),i.getAllTemplateItems()]),f=new Map;for(const t of G){const S=f.get(t.templateId)||[];S.push(t),f.set(t.templateId,S)}const B=l.filter(t=>t.updatedAt>n),R=[],Y="INSERT OR IGNORE INTO entry_tags (entry_id, tag_id) VALUES (?, ?)",w=[],I=[];for(const t of B)if(R.push([t.id,t.content,t.source||null,t.supplement||null,t.isStarred?1:0,t.createdAt,t.updatedAt,t.copyCount||0,W(t.content||""),e.batchId]),t.tags&&t.tags.length>0){I.push([t.id]);for(const S of t.tags)w.push([t.id,S.id])}try{await _(`INSERT OR REPLACE INTO entries
       (id, content, source, supplement, is_starred, is_deleted, created_at, updated_at, copy_count, content_hash, backup_batch_id)
       VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?)`,R),e.entriesSynced=R.length}catch(t){e.errors.push(`entries 批量同步失败: ${t instanceof Error?t.message:String(t)}`)}I.length>0&&(await _("DELETE FROM entry_tags WHERE entry_id = ?",I),await _(Y,w));const a=p.filter(t=>t.createdAt>n);try{await _(`INSERT OR REPLACE INTO tags
       (id, name, color, is_smart, search_criteria, is_deleted, created_at, updated_at, backup_batch_id)
       VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)`,a.map(t=>[t.id,t.name,t.color||null,t.isSmart?1:0,t.searchCriteria?JSON.stringify(t.searchCriteria):null,t.createdAt,Date.now(),e.batchId])),e.tagsSynced=a.length}catch(t){e.errors.push(`tags 批量同步失败: ${t instanceof Error?t.message:String(t)}`)}const o=new Set((await T("SELECT id FROM groups_table WHERE is_deleted = 0",[])).map(t=>t.id)),c=h.filter(t=>!o.has(t.id));try{await _(`INSERT OR REPLACE INTO groups_table
       (id, name, sort_order, is_deleted, backup_batch_id)
       VALUES (?, ?, ?, 0, ?)`,c.map(t=>[t.id,t.name,t.sortOrder||0,e.batchId])),e.groupsSynced=c.length}catch(t){e.errors.push(`groups 批量同步失败: ${t instanceof Error?t.message:String(t)}`)}const E=A.filter(t=>t.createdAt>n);try{await _(`INSERT OR REPLACE INTO links
       (id, source_id, target_id, description, is_deleted, created_at, backup_batch_id)
       VALUES (?, ?, ?, ?, 0, ?, ?)`,E.map(t=>[t.id,t.sourceId,t.targetId,t.description||null,t.createdAt,e.batchId])),e.linksSynced=E.length}catch(t){e.errors.push(`links 批量同步失败: ${t instanceof Error?t.message:String(t)}`)}const L=m.filter(t=>(t.updatedAt||t.createdAt)>n);try{await _(`INSERT OR REPLACE INTO todos
       (id, title, note, folder_date, time, is_done, is_today, is_deleted, created_at, updated_at, completed_at, backup_batch_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?)`,L.map(t=>[t.id,t.title,t.note||null,t.folderDate||null,t.startTime!=null?String(t.startTime):null,t.status==="done"?1:0,t.isToday?1:0,t.createdAt,t.updatedAt||t.createdAt,t.completedAt||null,e.batchId])),e.todosSynced=L.length}catch(t){e.errors.push(`todos 批量同步失败: ${t instanceof Error?t.message:String(t)}`)}const O=M.filter(t=>t.createdAt>n);try{await _(`INSERT OR REPLACE INTO todo_tags
       (id, name, color, is_deleted, backup_batch_id)
       VALUES (?, ?, ?, 0, ?)`,O.map(t=>[t.id,t.name,t.color||null,e.batchId]))}catch(t){e.errors.push(`todo_tags 批量同步失败: ${t instanceof Error?t.message:String(t)}`)}const dt=new Set(b.filter(t=>t.updatedAt>n).map(t=>t.id)),H=b.filter(t=>dt.has(t.id)),J=[],Tt=new Set((await T("SELECT id FROM template_items",[])).map(t=>t.id));for(const t of H){const S=f.get(t.id)||[];for(const g of S)Tt.has(g.id)||J.push([g.id,t.id,g.title||null,g.note||null,g.startTime!=null?String(g.startTime):null,g.sortOrder||0,e.batchId])}try{await _(`INSERT OR REPLACE INTO templates
       (id, name, is_deleted, backup_batch_id)
       VALUES (?, ?, 0, ?)`,H.map(t=>[t.id,t.name,e.batchId])),e.templatesSynced=H.length,await _(`INSERT OR REPLACE INTO template_items
       (id, template_id, title, note, time, sort_order, backup_batch_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,J)}catch(t){e.errors.push(`templates 批量同步失败: ${t instanceof Error?t.message:String(t)}`)}const Et=await T("SELECT id FROM attachments_meta WHERE is_deleted = 0",[]),lt=new Set(Et.map(t=>t.id)),z=[],ut=y.filter(t=>!lt.has(t.id));await ct(ut,4,async t=>{const S=`${C}${t.id}_orig.jpg`,g=`${C}${t.id}_thumb.jpg`;try{const[N,Z]=await Promise.all([X.readFile({path:t.filePath,directory:$.Data}).catch(()=>null),X.readFile({path:t.thumbPath,directory:$.Data}).catch(()=>null)]);await Promise.all([N?at(S,N.data,t.mimeType||"image/jpeg").catch(()=>e.errors.push(`附件原图上传失败 att=${t.id}`)):Promise.resolve().then(()=>e.errors.push(`附件原图缺失 att=${t.id}, 跳过上传`)),Z?at(g,Z.data,t.mimeType||"image/jpeg").catch(()=>e.errors.push(`附件缩略图上传失败 att=${t.id}`)):Promise.resolve().then(()=>e.errors.push(`附件缩略图缺失 att=${t.id}, 跳过上传`))]),e.attachmentsUploaded++}catch(N){e.errors.push(`attachment ${t.id}: ${N instanceof Error?N.message:String(N)}`)}});for(const t of y)z.push([t.id,t.entryId,`${C}${t.id}_orig.jpg`,`${C}${t.id}_thumb.jpg`,t.mimeType||"image/jpeg",t.sortOrder||0,t.createdAt,e.batchId]);try{await _(`INSERT OR REPLACE INTO attachments_meta
       (id, entry_id, r2_key_orig, r2_key_thumb, mime_type, sort_order, is_deleted, created_at, backup_batch_id)
       VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)`,z)}catch(t){e.errors.push(`attachments_meta 批量同步失败: ${t instanceof Error?t.message:String(t)}`)}const[mt,_t]=await Promise.all([T("SELECT id FROM entries WHERE is_deleted = 0",[]),T("SELECT id FROM todos WHERE is_deleted = 0",[])]),ht=new Set(l.map(t=>t.id)),pt=new Set(m.map(t=>t.id)),x=mt.filter(t=>!ht.has(t.id)).map(t=>[t.id]),v=_t.filter(t=>!pt.has(t.id)).map(t=>[t.id]);x.length>0&&await _("UPDATE entries SET is_deleted = 1 WHERE id = ?",x),v.length>0&&await _("UPDATE todos SET is_deleted = 1 WHERE id = ?",v),e.deletionsSynced=x.length+v.length,await T(`INSERT INTO _backup_manifests
     (id, timestamp, type, entry_count, todo_count, tag_count, group_count, attachment_count, app_version, created_at)
     VALUES (?, ?, 'manual', ?, ?, ?, ?, ?, ?, ?)`,[e.batchId,s,l.length,m.length,p.length,h.length,y.length,Ot,Date.now()]);const gt=(await r.getAllChatSessions()).filter(t=>t.updatedAt>n);try{await _(`INSERT OR REPLACE INTO chat_sessions (id, title, messages, model, mcp_enabled_tools, mcp_search_results, created_at, updated_at, backup_batch_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,gt.map(t=>[t.id,t.title,JSON.stringify(t.messages),t.model||null,t.mcpEnabledTools?JSON.stringify(t.mcpEnabledTools):null,t.mcpSearchResults?JSON.stringify(t.mcpSearchResults):null,t.createdAt,t.updatedAt,e.batchId]))}catch(t){e.errors.push(`chat_sessions 批量同步失败: ${t instanceof Error?t.message:String(t)}`)}return await Nt(K,String(s)),e.duration=Date.now()-s,e}async function Dt(){var w,I;const s=Date.now(),e={entriesPulled:0,entriesSkipped:0,todosPulled:0,todosSkipped:0,tagsPulled:0,groupsPulled:0,linksPulled:0,templatesPulled:0,attachmentsDownloaded:0,duration:0,errors:[]},r=await nt(),i=await it();await((w=r.ensureConnection)==null?void 0:w.call(r)),await((I=i.ensureConnection)==null?void 0:I.call(i)),await D();const d=await T("SELECT * FROM entries WHERE is_deleted = 0",[]),n=await r.getAllContentHashes();for(const a of d){const o=a.content_hash;if(o&&n.has(o)){e.entriesSkipped++;continue}try{const E=`${Date.now().toString(36)}_${Math.random().toString(36).slice(2,11)}`;await r.createEntry({id:E,content:a.content,source:a.source||void 0,supplement:a.supplement||void 0,isStarred:a.is_starred===1,createdAt:a.created_at,updatedAt:a.updated_at,copyCount:a.copy_count||0}),n.add(o),e.entriesPulled++}catch(c){e.errors.push(`restore entry ${a.id}: ${c instanceof Error?c.message:String(c)}`)}}const l=await T("SELECT * FROM tags WHERE is_deleted = 0",[]),p=new Set((await r.getAllTags()).map(a=>a.name));for(const a of l)if(!p.has(a.name))try{await r.createTag(a.name,{isSmart:a.is_smart===1,searchCriteria:a.search_criteria?JSON.parse(a.search_criteria):void 0}),e.tagsPulled++}catch(o){e.errors.push(`restore tag ${a.id}: ${o instanceof Error?o.message:String(o)}`)}const h=await T("SELECT * FROM groups_table WHERE is_deleted = 0",[]),m=new Set((await r.getAllGroups()).map(a=>a.name));for(const a of h)if(!m.has(a.name))try{await r.createGroup(a.name),e.groupsPulled++}catch(o){e.errors.push(`restore group ${a.id}: ${o instanceof Error?o.message:String(o)}`)}const M=await T("SELECT * FROM links WHERE is_deleted = 0",[]);for(const a of M)try{await r.createLink(a.source_id,a.target_id,a.description||void 0),e.linksPulled++}catch{}const b=await T("SELECT * FROM todos WHERE is_deleted = 0",[]),y=await i.getAllTodos(),A=new Set;for(const a of y)A.add(W(a.title+"|"+(a.note||"")));for(const a of b){const o=W((a.title||"")+"|"+(a.note||""));if(A.has(o)){e.todosSkipped++;continue}try{const E=`${Date.now().toString(36)}_${Math.random().toString(36).slice(2,11)}`;await i.createTodo({id:E,title:a.title,note:a.note,folderDate:a.folder_date||"",startTime:a.time?parseInt(a.time,10):void 0,status:a.is_done===1?"done":"pending",isToday:a.is_today===1,createdAt:a.created_at,updatedAt:a.updated_at,completedAt:a.completed_at}),A.add(o),e.todosPulled++}catch(c){e.errors.push(`restore todo ${a.id}: ${c instanceof Error?c.message:String(c)}`)}}const G=await T("SELECT * FROM templates WHERE is_deleted = 0",[]),f=new Set((await i.getAllTemplates()).map(a=>a.name));for(const a of G)if(!f.has(a.name))try{const o=await i.createTemplate(a.name),c=await T("SELECT * FROM template_items WHERE template_id = ? ORDER BY sort_order",[a.id]);for(const E of c)await i.addTemplateItem({templateId:o.id,title:E.title,note:E.note,startTime:E.start_time!=null?parseInt(E.start_time,10):void 0,sortOrder:E.sort_order});e.templatesPulled++}catch(o){e.errors.push(`restore template ${a.id}: ${o instanceof Error?o.message:String(o)}`)}const B=await T("SELECT * FROM attachments_meta WHERE is_deleted = 0",[]),R=new Set((await r.getAllAttachments()).map(a=>a.id)),Y=B.filter(a=>!R.has(a.id));await ct(Y,4,async a=>{try{const o=await r.getEntryById(a.entry_id);if(!o)return;const c=`attachments/${o.id}`,E=`${c}/${a.id}_thumb.jpg`,L=`${c}/${a.id}_orig.jpg`;await Promise.all([a.r2_key_thumb?st(a.r2_key_thumb).then(async O=>{await X.writeFile({path:E,data:O,directory:$.Data,recursive:!0})}).catch(()=>{}):Promise.resolve(),a.r2_key_orig?st(a.r2_key_orig).then(async O=>{await X.writeFile({path:L,data:O,directory:$.Data,recursive:!0})}).catch(()=>{}):Promise.resolve()]),await r.addAttachment({id:a.id,entryId:o.id,filePath:L,thumbPath:E,mimeType:a.mime_type||"image/jpeg",sortOrder:a.sort_order||0,createdAt:a.created_at}),e.attachmentsDownloaded++,R.add(a.id)}catch(o){e.errors.push(`restore attachment ${a.id}: ${o instanceof Error?o.message:String(o)}`)}});try{const a=await T("SELECT * FROM chat_sessions",[]),o=new Set((await r.getAllChatSessions()).map(c=>c.id));for(const c of a)if(!o.has(c.id))try{await r.saveChatSession({id:c.id,title:c.title,messages:JSON.parse(c.messages),createdAt:c.created_at,updatedAt:c.updated_at,model:c.model||void 0,mcpEnabledTools:c.mcp_enabled_tools?JSON.parse(c.mcp_enabled_tools):void 0,mcpSearchResults:c.mcp_search_results?JSON.parse(c.mcp_search_results):void 0})}catch(E){e.errors.push(`restore chat_session ${c.id}: ${E instanceof Error?E.message:String(E)}`)}}catch(a){e.errors.push(`restore chat_sessions: ${a instanceof Error?a.message:String(a)}`)}return e.duration=Date.now()-s,e}async function Mt(){return await D(),await T("SELECT * FROM _backup_manifests ORDER BY timestamp DESC LIMIT 50")}async function Gt(){try{await D();const s=await ot(K);return s?parseInt(s,10):null}catch{return null}}export{Ft as backupToCloud,yt as d1TestConnection,Gt as getLastCloudBackupTime,Mt as listCloudBackups,Lt as r2TestConnection,Dt as restoreFromCloud,Ut as testCloudConnection};
