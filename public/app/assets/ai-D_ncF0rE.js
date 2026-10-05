var P=Object.defineProperty;var k=(f,e,t)=>e in f?P(f,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):f[e]=t;var v=(f,e,t)=>k(f,typeof e!="symbol"?e+"":e,t);import{G as T}from"./index-bmfXHrWD.js";import"./vendor-react-Ca85dylG.js";class K{constructor(){v(this,"config",null);v(this,"glmPoolCursor",0)}setConfig(e){this.config=e}getConfig(){return this.config}getActiveProvider(){var o;const e=this.config;if(!e)return{model:"deepseek-v4-flash",baseURL:"https://api.deepseek.com",apiKey:""};const t=e.provider||(e.isDeepSeek,"deepseek"),s=(o=e.providers)==null?void 0:o[t];return{model:(s==null?void 0:s.model)||e.model||"deepseek-v4-flash",baseURL:(s==null?void 0:s.baseURL)||e.baseURL||"https://api.deepseek.com",apiKey:(s==null?void 0:s.apiKey)||e.apiKey||""}}nextGlmModel(){const e=T,t=e[this.glmPoolCursor%e.length];return this.glmPoolCursor=(this.glmPoolCursor+1)%e.length,t}getSmartModel(){var t;const e=this.config;return e?(t=e.glm)!=null&&t.enabled&&e.glm.apiKey?{model:this.nextGlmModel(),baseURL:e.glm.baseURL||"https://open.bigmodel.cn/api/paas/v4",apiKey:e.glm.apiKey}:this.getActiveProvider():{model:"deepseek-v4-flash",baseURL:"https://api.deepseek.com",apiKey:""}}async chat(e){var g,m,i,c,n,d,u;const t=this.getActiveProvider();if(!t.apiKey)throw new Error("AI API Key 未配置");let s,o,a;if(e.isChat)s=t.model,o=t.baseURL,a=t.apiKey;else{const l=this.getSmartModel();s=l.model,o=l.baseURL,a=l.apiKey}const r=((g=this.config)!=null&&g.provider?this.config.provider==="deepseek":(m=this.config)==null?void 0:m.isDeepSeek)===!0,h={model:s,messages:[{role:"system",content:e.systemPrompt},{role:"user",content:e.userMessage}],temperature:e.temperature??.7,max_tokens:e.maxTokens??2e3};r&&((i=this.config)!=null&&i.deepSeekOptions)&&(this.config.deepSeekOptions.temperature!==void 0&&(h.temperature=this.config.deepSeekOptions.temperature),this.config.deepSeekOptions.maxTokens!==void 0&&(h.max_tokens=this.config.deepSeekOptions.maxTokens));const p=await fetch(`${o}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(h)});if(!p.ok){const l=await p.json().catch(()=>({}));throw new Error(((c=l==null?void 0:l.error)==null?void 0:c.message)||`AI 请求失败: ${p.status}`)}return((u=(d=(n=(await p.json()).choices)==null?void 0:n[0])==null?void 0:d.message)==null?void 0:u.content)||""}async suggestTags(e,t,s){const o=s.tagSuggestion.replace("{content}",e).replace("{context}",t);return(await this.chat({systemPrompt:"你是一个标签建议助手，只返回标签列表。",userMessage:o})).split(`
`).map(r=>r.trim().replace(/^[-*\d.]+\s*/,"")).filter(r=>r.length>0&&r.length<=12).slice(0,5)}async suggestTagsWithRecent(e,t,s){var c,n,d,u,l;if(!this.getActiveProvider().apiKey&&!((n=(c=this.config)==null?void 0:c.glm)!=null&&n.apiKey))throw new Error("AI API Key 未配置");const o=this.config,a=((d=o.smartTag)==null?void 0:d.maxTags)??6,r=((u=o.smartTag)==null?void 0:u.minTags)??1,p=(s||((l=o.smartTag)==null?void 0:l.tagSuggestPrompt)||`你是一个标签建议助手。请分析以下文本内容，从用户最近使用过的标签中选出 ${r}-${a} 个最合适的标签。

重要规则：
1. 只能从「用户最近使用过的标签」列表中选择，不要创建新标签
2. 如果已有标签中没有合适的，返回 "无合适标签"
3. 从内容主题、情感、用途三个维度选择最匹配的已有标签

用户最近使用过的标签：
{recentTags}

当前条目内容：
{content}`).replace(/\{recentTags\}/g,t.join(", ")).replace(/\{content\}/g,e).replace(/\{minTags\}/g,String(r)).replace(/\{maxTags\}/g,String(a)),g=(await this.chat({systemPrompt:"你是一个标签建议助手，只返回标签列表。只能从已有标签中选择。",userMessage:p})).split(`
`).map(S=>S.trim().replace(/^[-*\d.]+\s*/,"")).filter(S=>S.length>0&&S.length<=12),m=new Set(t),i=g.filter(S=>m.has(S));return i.length>0?i.slice(0,a):[]}async suggestRelation(e,t,s){const o=s.relationSuggestion.replace("{contentA}",e).replace("{contentB}",t);return this.chat({systemPrompt:"你是一个知识关联分析助手。",userMessage:o})}async suggestGroups(e,t,s){var m,i,c;if(!this.getActiveProvider().apiKey&&!((i=(m=this.config)==null?void 0:m.glm)!=null&&i.apiKey))throw new Error("AI API Key 未配置");const o=this.config,r=(((c=o.smartGroup)==null?void 0:c.groupSuggestPrompt)||o.prompts.groupSuggestion||`你是一个分组建议助手。请分析以下条目内容，从已有的分组中选出 1-3 个合适的分组。

重要规则：
1. 只能从「已有分组」列表中选择，不要创建新分组
2. 如果已有分组中没有合适的，返回 "无合适分组"
3. 从内容主题、用途、领域三个维度选择最匹配的已有分组

已有分组：
{existingGroups}

条目内容：
{content}`).replace(/\{existingGroups\}/g,t.join(", ")).replace(/\{content\}/g,e).replace(/\{recentEntries\}/g,(s==null?void 0:s.join(`
`))||""),p=(await this.chat({systemPrompt:"你是一个分组建议助手，只返回分组列表。只能从已有分组中选择。",userMessage:r})).split(`
`).map(n=>n.trim().replace(/^[-*\d.]+\s*/,"")).filter(n=>n.length>0&&n.length<=16),y=new Set(t),g=p.filter(n=>y.has(n));return g.length>0?g.slice(0,3):[]}async suggestConnections(e){var y,g,m;if(!this.getActiveProvider().apiKey&&!((g=(y=this.config)==null?void 0:y.glm)!=null&&g.apiKey))throw new Error("AI API Key 未配置");const t=this.config,s=((m=t.connectionSuggestion)==null?void 0:m.connectionSuggestPrompt)||t.prompts.connectionSuggestion||`你是一个知识关联发现助手。请分析以下条目，找出可能有关联的条目对。

要求：
1. 找出 3-5 组有关联的条目对
2. 用一句话描述每对条目的关联
3. 返回格式：ID1 → ID2: 关联描述

最近条目列表：
{entries}`,o=e.map(i=>`[${i.id}] ${i.content.slice(0,100)}`).join(`
`),a=s.replace(/\{entries\}/g,o),r=await this.chat({systemPrompt:"你是一个知识关联发现助手。",userMessage:a}),h=[],p=r.split(`
`).filter(i=>i.trim());for(const i of p){const c=i.match(/\[?([^\]]+)\]?\s*[→>\-]\s*\[?([^\]:]+)\]?\s*:?\s*(.*)/);if(c){const[,n,d,u]=c;h.push({sourceId:n.trim(),targetId:d.trim(),description:(u||"").trim()})}}return h}}const I=new K;export{I as ai,I as default};
