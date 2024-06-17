import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,b as t}from"./app-NwmlIrjp.js";const e={},p=t(`<h2 id="yaml简介" tabindex="-1"><a class="header-anchor" href="#yaml简介"><span>YAML简介</span></a></h2><p>YAML（YAML Ain&#39;t Markup Language），一种数据序列化格式。具有容易阅读、容易与脚本语言交互、以数据为核心，重数据轻格式的特点。<br> 常见的文件扩展名有两种：</p><ul><li>.yml格式（主流）</li><li>.yaml格式</li></ul><h2 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用"><span>基本使用</span></a></h2><p>常见的数据书写格式</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">boolean</span><span class="token punctuation">:</span> <span class="token boolean important">TRUE</span>  						<span class="token comment">#TRUE,true,True,FALSE,false，False均可</span>
<span class="token key atrule">float</span><span class="token punctuation">:</span> <span class="token number">3.14</span>    						<span class="token comment">#6.8523015e+5  #支持科学计数法</span>
<span class="token key atrule">int</span><span class="token punctuation">:</span> <span class="token number">123</span>       						<span class="token comment">#0b1010_0111_0100_1010_1110    #支持二进制、八进制、十六进制</span>
<span class="token key atrule">null</span><span class="token punctuation">:</span> <span class="token null important">~</span>        						<span class="token comment">#使用~表示null</span>
<span class="token key atrule">string</span><span class="token punctuation">:</span> HelloWorld      			<span class="token comment">#字符串可以直接书写</span>
<span class="token key atrule">string2</span><span class="token punctuation">:</span> <span class="token string">&quot;Hello World&quot;</span>  			<span class="token comment">#可以使用双引号包裹特殊字符</span>
<span class="token key atrule">date</span><span class="token punctuation">:</span> <span class="token datetime number">2018-02-17</span>        			<span class="token comment">#日期必须使用yyyy-MM-dd格式</span>
<span class="token key atrule">datetime</span><span class="token punctuation">:</span> <span class="token datetime number">2018-02-17T15:02:31+08:00</span>  <span class="token comment">#时间和日期之间使用T连接，最后使用+代表时区</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>yaml格式中也可以表示数组，在属性名书写位置的下方使用减号作为数据开始符号，每行书写一个数据，减号与数据间空格分隔。</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">subject</span><span class="token punctuation">:</span>
	<span class="token punctuation">-</span> Java
	<span class="token punctuation">-</span> 前端
	<span class="token punctuation">-</span> 大数据
<span class="token key atrule">enterprise</span><span class="token punctuation">:</span>
	<span class="token key atrule">name</span><span class="token punctuation">:</span> itcast
    <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">16</span>
    <span class="token key atrule">subject</span><span class="token punctuation">:</span>
    	<span class="token punctuation">-</span> Java
        <span class="token punctuation">-</span> 前端
        <span class="token punctuation">-</span> 大数据
<span class="token key atrule">likes</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>王者荣耀<span class="token punctuation">,</span>刺激战场<span class="token punctuation">]</span>			<span class="token comment">#数组书写缩略格式</span>
<span class="token key atrule">users</span><span class="token punctuation">:</span>							 <span class="token comment">#对象数组格式一</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Tom
   	<span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">4</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Jerry
    <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">5</span>
<span class="token key atrule">users</span><span class="token punctuation">:</span>							 <span class="token comment">#对象数组格式二</span>
  <span class="token punctuation">-</span>  
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Tom
    <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">4</span>
  <span class="token punctuation">-</span>   
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Jerry
    <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">5</span>			    
<span class="token key atrule">users2</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> name<span class="token punctuation">:</span>Tom <span class="token punctuation">,</span> age<span class="token punctuation">:</span><span class="token number">4</span> <span class="token punctuation">}</span> <span class="token punctuation">,</span> <span class="token punctuation">{</span> name<span class="token punctuation">:</span>Jerry <span class="token punctuation">,</span> age<span class="token punctuation">:</span><span class="token number">5</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span>	<span class="token comment">#对象数组缩略格式</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">person</span><span class="token punctuation">:</span>
  <span class="token comment">## 单引号：输出 \\n</span>
  <span class="token comment">## 双引号：输出 换行</span>
  <span class="token key atrule">userName</span><span class="token punctuation">:</span> <span class="token string">&#39;名字\\n&#39;</span>
  <span class="token key atrule">boss</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">birth</span><span class="token punctuation">:</span> 2002/10/27
  <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">19</span>
  <span class="token key atrule">pet</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> 喵喵
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">10.50</span>
  <span class="token key atrule">interests</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> 游戏<span class="token punctuation">,</span>音乐 <span class="token punctuation">]</span>
  <span class="token comment">##  animal: [猫,狗]</span>
  <span class="token key atrule">animal</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> 猫
    <span class="token punctuation">-</span> 狗
  <span class="token key atrule">score</span><span class="token punctuation">:</span>
    <span class="token key atrule">语文</span><span class="token punctuation">:</span>
      <span class="token key atrule">first</span><span class="token punctuation">:</span> <span class="token number">99</span>
    <span class="token key atrule">数学</span><span class="token punctuation">:</span>
      <span class="token key atrule">second</span><span class="token punctuation">:</span> <span class="token number">88</span>
    <span class="token key atrule">英语</span><span class="token punctuation">:</span>
      <span class="token key atrule">third</span><span class="token punctuation">:</span> <span class="token number">77</span>
  <span class="token key atrule">salarys</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token number">10000</span><span class="token punctuation">,</span><span class="token number">20000</span><span class="token punctuation">,</span><span class="token number">30000</span> <span class="token punctuation">]</span>
  <span class="token key atrule">allPets</span><span class="token punctuation">:</span>
    <span class="token key atrule">dog</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 二哈<span class="token punctuation">,</span><span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">12.3</span> <span class="token punctuation">}</span>
      <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 旺财<span class="token punctuation">,</span><span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">32.1</span> <span class="token punctuation">}</span>
    <span class="token key atrule">cat</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 小猫<span class="token punctuation">,</span><span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">5.5</span> <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 大猫<span class="token punctuation">,</span><span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">10.5</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>总结</strong></p><ol><li>yaml语法规则 <ul><li>大小写敏感</li><li>属性层级关系使用多行描述，每行结尾使用冒号结束</li><li>使用缩进表示层级关系，同层级左侧对齐，只允许使用空格（不允许使用Tab键）</li><li>属性值前面添加空格（属性名与属性值之间使用冒号+空格作为分隔）</li><li>#号 表示注释</li></ul></li><li>注意属性名冒号后面与数据之间有一个<strong>空格</strong></li><li>字面值、对象数据格式、数组数据格式</li></ol><h2 id="数据引用" tabindex="-1"><a class="header-anchor" href="#数据引用"><span>数据引用</span></a></h2><p>使用引用格式来定义数据</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">baseDir</span><span class="token punctuation">:</span> /usr/local/fire <span class="token comment">## 相当于定义变量</span>
<span class="token key atrule">center</span><span class="token punctuation">:</span>
    <span class="token key atrule">dataDir</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>baseDir<span class="token punctuation">}</span>/data
    <span class="token key atrule">tmpDir</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>baseDir<span class="token punctuation">}</span>/tmp
    <span class="token key atrule">logDir</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>baseDir<span class="token punctuation">}</span>/log
    <span class="token key atrule">msgDir</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>baseDir<span class="token punctuation">}</span>/msgDir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：在书写字符串时，如果需要使用转义字符，需要将数据字符串使用双引号包裹起来</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">lesson</span><span class="token punctuation">:</span> <span class="token string">&quot;Spring\\tboot\\nlesson&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,16),l=[p];function c(i,o){return a(),s("div",null,l)}const r=n(e,[["render",c],["__file","YAML.html.vue"]]),d=JSON.parse('{"path":"/frame/spring/SpringBoot/yaml.html","title":"YAML","lang":"zh-CN","frontmatter":{"title":"YAML","shortTitle":"YAML","description":null,"date":"2024-06-16T22:00:58.000Z","categories":[],"tags":["YAML"]},"headers":[{"level":2,"title":"YAML简介","slug":"yaml简介","link":"#yaml简介","children":[]},{"level":2,"title":"基本使用","slug":"基本使用","link":"#基本使用","children":[]},{"level":2,"title":"数据引用","slug":"数据引用","link":"#数据引用","children":[]}],"git":{"createdTime":1718621104000,"updatedTime":1718621104000,"contributors":[{"name":"Zhiyun Qin","email":"96156298+Okita1027@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.14,"words":642},"filePathRelative":"frame/spring/SpringBoot/yaml.md","localizedDate":"2024年6月17日"}');export{r as comp,d as data};