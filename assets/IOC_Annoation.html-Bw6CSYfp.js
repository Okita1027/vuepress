import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,b as t}from"./app-NwmlIrjp.js";const e={},p=t(`<h2 id="bean基本配置" tabindex="-1"><a class="header-anchor" href="#bean基本配置"><span>Bean基本配置</span></a></h2><h3 id="component" tabindex="-1"><a class="header-anchor" href="#component"><span>@Component</span></a></h3><ul><li>被该注解标识的类，会在指定扫描范围内被Spring加载并实例化</li><li>可以通过@Component注解的value属性指定当前Bean实例的beanName，也可以省略不写，不写的情况下为当前类名首字母小写</li></ul><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">//获取方式：applicationContext.getBean(&quot;userDao&quot;);</span>
<span class="token annotation punctuation">@Component</span><span class="token punctuation">(</span><span class="token string">&quot;userDao&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserDaoImpl</span> <span class="token keyword">implements</span> <span class="token class-name">UserDao</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token comment">//获取方式：applicationContext.getBean(&quot;userDaoImpl&quot;);</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserDaoImpl</span> <span class="token keyword">implements</span> <span class="token class-name">UserDao</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用注解对需要被Spring实例化的Bean进行标注，但是需要告诉Spring去哪找这些Bean，配置组件扫描路径</li></ul><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- 告知Spring框架去某个包及其子包下去扫描使用注解的类 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>component-scan</span> <span class="token attr-name">base-package</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.qzy.spring.pojo<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>对应的其它标签<br> | xml配置 | 注解 | 描述 |<br> | --- | --- | --- |<br> | <code>&lt;bean scope=&quot;&quot;&gt;</code> | @Scope | 标注Bean的作用范围，取值为singleton或prototype |<br> | <code>&lt;bean lazy-init=&quot;&quot;&gt;</code> | @Lazy | 标注Bean是否延迟加载，取值为true和false |<br> | <code>&lt;bean init-method=&quot;&quot;&gt;</code> | @PostConstrct | 标注Bean的实例化后执行的方法 |<br> | <code>&lt;bean destroy-method=&quot;&quot;&gt;</code> | @PreDestroy | 标注Bean的销毁前执行方法 |</li></ul><h4 id="衍生注解" tabindex="-1"><a class="header-anchor" href="#衍生注解"><span>衍生注解</span></a></h4><table><thead><tr><th>@Component衍生注解</th><th>描述</th></tr></thead><tbody><tr><td>@Repository</td><td>在Dao层类上使用</td></tr><tr><td>@Service</td><td>在Service层类上使用</td></tr><tr><td>@Controller</td><td>在Web层类上使用</td></tr></tbody></table><h2 id="bean依赖注入" tabindex="-1"><a class="header-anchor" href="#bean依赖注入"><span>Bean依赖注入</span></a></h2><table><thead><tr><th>@Value</th><th>用于字段或方法，注入普通数据类型</th></tr></thead><tbody><tr><td>@Autowired</td><td>用于字段或方法，根据类型注入引用数据</td></tr><tr><td>@Qualifier</td><td>用于字段或方法，结合@Autowired，根据名称注入</td></tr><tr><td>@Resource</td><td>用于字段或方法，根据类型或名称注入</td></tr></tbody></table><h3 id="value" tabindex="-1"><a class="header-anchor" href="#value"><span>@Value</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;qzy&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;yzq&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${jdbc.username}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${jdbc.username}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>property-placeholder</span> <span class="token attr-name">location</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>classpath:jdbc.properties<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="autowired" tabindex="-1"><a class="header-anchor" href="#autowired"><span>@Autowired</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">//使用在属性上直接注入</span>
<span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">UserDao</span> userDao<span class="token punctuation">;</span>

<span class="token comment">//使用在方法上直接注入</span>
<span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUserDao</span><span class="token punctuation">(</span><span class="token class-name">UserDao</span> userDao<span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>userDao<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Autowired</span>  <span class="token comment">//从容器中注入所有的userDao给List</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">yyy</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDao</span><span class="token punctuation">&gt;</span></span> userDaoList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;YYY：userDaoList = &quot;</span> <span class="token operator">+</span> userDaoList<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">//匹配当前Bean</span>
<span class="token annotation punctuation">@Repository</span><span class="token punctuation">(</span><span class="token string">&quot;userDao&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserDaoImpl</span> <span class="token keyword">implements</span> <span class="token class-name">UserDao</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token annotation punctuation">@Repository</span><span class="token punctuation">(</span><span class="token string">&quot;userDao2&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserDaoImpl2</span> <span class="token keyword">implements</span> <span class="token class-name">UserDao</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="qualifier" tabindex="-1"><a class="header-anchor" href="#qualifier"><span>@Qualifier</span></a></h3><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">//加在方法上可以替代Bean初始化时的set()方法，方法名可以不是setXXX();</span>
<span class="token annotation punctuation">@Autowired</span>  <span class="token comment">//从容器中注入userDao</span>
<span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;userDaoImplCopy&quot;</span><span class="token punctuation">)</span>	<span class="token comment">//根据名称注入</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">xxx</span><span class="token punctuation">(</span><span class="token class-name">UserDao</span> userDao<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;XXX：userDao = &quot;</span> <span class="token operator">+</span> userDao<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="resource" tabindex="-1"><a class="header-anchor" href="#resource"><span>@Resource</span></a></h3><p>该注解不是Spring下的，@Resource注解存在与于javax.annotation 包中，Spring对其进行了解析</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">//该注解默认按照名称自动装配，也可以手动指定名称</span>
<span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;userDaoImpl1&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">UserDao</span> userDao<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">//如果注解写在setter方法上默认取属性名进行装配。当找不到与名称匹配的bean时才按照类型进行装配。</span>
<span class="token annotation punctuation">@Resource</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setFather</span><span class="token punctuation">(</span><span class="token class-name">Father</span> father<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，如果name属性一旦指定，就只会按照名称进行装配。</p><h2 id="非自定义bean" tabindex="-1"><a class="header-anchor" href="#非自定义bean"><span>非自定义Bean</span></a></h2><p>非自定义Bean要通过工厂的方式进行实例化，使用@Bean标注方法即可，@Bean的属性为beanName，如不指定为当前工厂方法名称。注意：工厂方法所在类必须要被Spring管理。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">//将方法返回值Bean实例以@Bean注解指定的名称存储到Spring容器中</span>
<span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">&quot;dataSource&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">DruidDataSource</span> dataSource <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DruidDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dataSource<span class="token punctuation">.</span><span class="token function">setDriverClassName</span><span class="token punctuation">(</span><span class="token string">&quot;com.mysql.jdbc.Driver&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dataSource<span class="token punctuation">.</span><span class="token function">setUrl</span><span class="token punctuation">(</span><span class="token string">&quot;jdbc:mysql://localhost:3306/mybatis&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dataSource<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">&quot;root&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dataSource<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">&quot;root&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> dataSource<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果@Bean工厂方法需要参数的话，则有如下几种注入方式：</p><ul><li>使用@Autowired 根据类型自动进行Bean的匹配，@Autowired可以省略 ；</li><li>使用@Qualifier 根据名称进行Bean的匹配；</li><li>使用@Value 根据名称进行普通数据类型匹配。</li></ul><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token annotation punctuation">@Autowired</span> <span class="token comment">//根据类型匹配参数</span>
<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">objectDemo01</span><span class="token punctuation">(</span><span class="token class-name">UserDao</span> userDao<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>userDao<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">objectDemo02</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;userDao&quot;</span><span class="token punctuation">)</span> <span class="token class-name">UserDao</span> userDao<span class="token punctuation">,</span>
						   <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${jdbc.username}&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> username<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>userDao<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="完全注解开发" tabindex="-1"><a class="header-anchor" href="#完全注解开发"><span>完全注解开发</span></a></h2><h3 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration"><span>@Configuration</span></a></h3><p>用于标识该类为配置类，替代原有XML配置文件，该注解的作用：</p><ul><li>标识该类是一个配置类</li><li>具备@Component的作用。</li></ul><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">//默认为true:保证单例,false:关闭单例检查,可以加快启动速度</span>
<span class="token comment">//若一个组件依赖另一个组件则写true(比如User类依赖了Cat类),否则false</span>
<span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextConfig</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="componentscan" tabindex="-1"><a class="header-anchor" href="#componentscan"><span>@ComponentScan</span></a></h3><p>用于组件扫描配置，替代原有xml文件中的&lt;context:component-scan base-package=&quot;&quot;/&gt;</p><ul><li>base-package的配置方式： <ul><li>指定一个或多个包名：扫描指定包及其子包下使用注解的类。</li><li>不配置包名：扫描当前@componentScan注解配置类所在包及其子包下的类。</li></ul></li></ul><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@ComponentScan</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;com.qzy.spring.service&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;com.qzy.spring.dao&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextConfig</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="propertysource" tabindex="-1"><a class="header-anchor" href="#propertysource"><span>@PropertySource</span></a></h3><p>用于加载外部properties资源配置，替代原有xml中的 &lt;context:property-placeholder location=“”/&gt; 配置</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@ComponentScan</span>
<span class="token annotation punctuation">@PropertySource</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;classpath:jdbc.properties&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;classpath:xxx.properties&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextConfig</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="import" tabindex="-1"><a class="header-anchor" href="#import"><span>@Import</span></a></h3><p>用于加载其他配置类，替代原有XML中的<code>&lt;import resource=&quot;classpath:beans.xml&quot;/&gt;</code>配置</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@ComponentScan</span>
<span class="token annotation punctuation">@PropertySource</span><span class="token punctuation">(</span><span class="token string">&quot;classpath:jdbc.properties&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token class-name">OtherConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextConfig</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="primary" tabindex="-1"><a class="header-anchor" href="#primary"><span>@Primary</span></a></h3><p>用于标注相同类型的Bean优先被使用权，@Primary 是Spring3.0引入的，与@Component或@Bean一起使用，标注该Bean优先级更高，则在通过类型获取Bean或通过@Autowired根据类型进行注入时会选优先级更高的</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span><span class="token punctuation">(</span><span class="token string">&quot;userDao&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserDaoImpl</span> <span class="token keyword">implements</span> <span class="token class-name">UserDao</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token annotation punctuation">@Repository</span><span class="token punctuation">(</span><span class="token string">&quot;userDao2&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Primary</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserDaoImpl2</span> <span class="token keyword">implements</span> <span class="token class-name">UserDao</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">UserDao</span> <span class="token function">userDao01</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">UserDaoImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token annotation punctuation">@Bean</span>
<span class="token annotation punctuation">@Primary</span>
<span class="token keyword">public</span> <span class="token class-name">UserDao</span> <span class="token function">userDao02</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">UserDaoImpl2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="profile" tabindex="-1"><a class="header-anchor" href="#profile"><span>@Profile</span></a></h3><p>该注解的作用同于xml配置时学习profile属性<code>&lt;beans profile=&quot;test&quot;&gt;</code>，是进行环境切换使用的<br> @Profile 标注在类或方法上，标注当前产生的Bean从属于哪个环境，只有激活了当前环境，被标注的Bean才能被注册到Spring容器里，不指定环境的Bean，任何环境下都能注册到Spring容器里</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Repository</span><span class="token punctuation">(</span><span class="token string">&quot;userDao&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Profile</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserDaoImpl</span> <span class="token keyword">implements</span> <span class="token class-name">UserDao</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token annotation punctuation">@Repository</span><span class="token punctuation">(</span><span class="token string">&quot;userDao2&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserDaoImpl2</span> <span class="token keyword">implements</span> <span class="token class-name">UserDao</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用以下两种方式指定被激活的环境：</p><ul><li>使用命令行动态参数，虚拟机参数位置加载 -Dspring.profiles.active=test</li><li>使用代码的方式设置环境变量 System.setProperty(&quot;spring.profiles.active&quot;,&quot;test&quot;);</li></ul>`,55),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","IOC_Annoation.html.vue"]]),k=JSON.parse('{"path":"/frame/spring/Spring/IOC_Annoation.html","title":"IOC-注解","lang":"zh-CN","frontmatter":{"title":"IOC-注解","shortTitle":"IOC-注解","description":null,"date":"2024-06-16T21:23:27.000Z","categories":["Spring"],"tags":[]},"headers":[{"level":2,"title":"Bean基本配置","slug":"bean基本配置","link":"#bean基本配置","children":[{"level":3,"title":"@Component","slug":"component","link":"#component","children":[]}]},{"level":2,"title":"Bean依赖注入","slug":"bean依赖注入","link":"#bean依赖注入","children":[{"level":3,"title":"@Value","slug":"value","link":"#value","children":[]},{"level":3,"title":"@Autowired","slug":"autowired","link":"#autowired","children":[]},{"level":3,"title":"@Qualifier","slug":"qualifier","link":"#qualifier","children":[]},{"level":3,"title":"@Resource","slug":"resource","link":"#resource","children":[]}]},{"level":2,"title":"非自定义Bean","slug":"非自定义bean","link":"#非自定义bean","children":[]},{"level":2,"title":"完全注解开发","slug":"完全注解开发","link":"#完全注解开发","children":[{"level":3,"title":"@Configuration","slug":"configuration","link":"#configuration","children":[]},{"level":3,"title":"@ComponentScan","slug":"componentscan","link":"#componentscan","children":[]},{"level":3,"title":"@PropertySource","slug":"propertysource","link":"#propertysource","children":[]},{"level":3,"title":"@Import","slug":"import","link":"#import","children":[]},{"level":3,"title":"@Primary","slug":"primary","link":"#primary","children":[]},{"level":3,"title":"@Profile","slug":"profile","link":"#profile","children":[]}]}],"git":{"createdTime":1718621104000,"updatedTime":1718621104000,"contributors":[{"name":"Zhiyun Qin","email":"96156298+Okita1027@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.87,"words":1460},"filePathRelative":"frame/spring/Spring/IOC_Annoation.md","localizedDate":"2024年6月17日"}');export{d as comp,k as data};
