---
title: SpringMVC
shortTitle: SpringMVC
description: 
date: 2024-06-16 21:52:10
categories: [SpringMVC]
tags: []
---
## Javaweb三大组件及环境特点
| 组件 | 作用 | 特点 |
| --- | --- | --- |
| Servlet | 服务端小程序，负责接收客户端请求并作出响应的 | 单例对象，默认第一次访问创建，可以通过配置指定服务器启动就创建，Servlet创建完毕会执行初始化init方法。每个Servlet有一个service方法，每次访问都会执行service方法，但是缺点是一个业务功能就需要配置一个Servlet |
| Filter | 过滤器，负责对客户端请求进行过滤操作的 | 单例对象，服务器启动时就创建，对象创建完毕执行init方法，对客户端的请求进行过滤，符合要求的放行，不符合要求的直接响应客户端，执行过滤的核心方法doFilter |
| Listener | 监听器，负责对域对象的创建和属性变化进行监听的 | 根据类型和作用不同，又可分为监听域对象创建销毁和域对象属性内容变化的，根据监听的域不同，又可以分为监听Request域的，监听Session域的，监听ServletContext域的 |

## Spring整合web环境
在进行Java开发时要遵循三层架构+MVC，Spring操作最核心的就是Spring容器，web层需要注入Service，service层需要注入Dao（Mapper），web层使用Servlet技术充当的话，需要在Servlet中获得Spring容器，如下：
```java
AnnotationConfigApplicationContext applicationContext =
    new AnnotationConfigApplicationContext(ApplicationContextConfig.class);
AccountService accountService = (AccountService)applicationContext.getBean("accountService");
accountService.transferMoney("tom","lucy",100);
```
web层代码如果都去编写创建AnnotationConfigApplicationContext的代码，那么配置类重复被加载了，Spring容器也重复被创建了，不能每次想从容器中获得一个Bean都得先创建一次容器，这样肯定是不允许。所以，现在的诉求如下：

- ApplicationContext创建一次，配置类加载一次;
- 最好web服务器启动时，就执行第1步操作，后续直接从容器中获取Bean使用即可;
- ApplicationContext的引用需要在web层任何位置都可以获取到。

 实现方案：

- 在ServletContextListener的contextInitialized方法中执行ApplicationContext的创建。或在Servlet的init方法中执行ApplicationContext的创建，并给Servlet的load-on-startup属性一个数字值，确保服务器启动Servlet就创建
- 将创建好的ApplicationContext存储到ServletContext域中，这样整个web层任何位置就都可以获取到了

---

1. 导入坐标
```xml
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-web</artifactId>
  <version>5.3.23</version>
</dependency>
```

2. 配置ContextLoaderListener
```xml
<!-- 定义全局参数 -->
<context-param>
  <param-name>contextConfigLocation</param-name>
  <param-value>classpath:applicationContext.xml</param-value>
</context-param>
<!-- 配置Listener -->
<listener>
  <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
```

3. 在Servlet处理类中获取Spring容器
```java
ServletContext servletContext = request.getServletContext();
ApplicationContext app = WebApplicationContextUtils.getWebApplicationContext(servletContext);
```
## Spring整合Thymeleaf
```xml
<dependency>
    <groupId>org.thymeleaf</groupId>
    <artifactId>thymeleaf-spring6</artifactId>
    <version>3.1.1.RELEASE</version>
</dependency>
```
```xml
<!-- 配置Thymeleaf视图解析器 -->
<bean id="viewResolver" class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
    <property name="order" value="1"/>
    <property name="characterEncoding" value="UTF-8"/>
    <property name="templateEngine">
        <bean class="org.thymeleaf.spring5.SpringTemplateEngine">
            <property name="templateResolver">
                <bean class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
                    <!-- 视图前缀 -->
                    <property name="prefix" value="/WEB-INF/templates/"/>
                    <!-- 视图后缀 -->
                    <property name="suffix" value=".html"/>
                    <property name="templateMode" value="HTML5"/>
                    <property name="characterEncoding" value="UTF-8"/>
                </bean>
            </property>
        </bean>
    </property>
</bean>
```
## SpringMVC关键组件

- DispatcherServlet：**前端控制器**，不需要工程师开发，由框架提供 
   - 作用：统一处理请求和响应，整个流程控制的中心，由它调用其它组件处理用户的请求
- HandlerMapping：**处理器映射器**，不需要工程师开发，由框架提供
   - 作用：根据请求的url、method等信息查找Handler，即控制器方法
- Handler：**处理器**，需要工程师开发
   - 作用：在DispatcherServlet的控制下Handler对具体的用户请求进行处理
- HandlerAdapter：**处理器适配器**，不需要工程师开发，由框架提供
   - 作用：通过HandlerAdapter对处理器（控制器方法）进行执行
- ViewResolver：**视图解析器**，不需要工程师开发，由框架提供
   - 作用：进行视图解析，得到相应的视图，例如：ThymeleafView、InternalResourceView、RedirectView
- View：**视图**
   - 作用：将模型数据通过页面展示给用户

---

| 组件 | 描述 | 常用组件 |
| --- | --- | --- |
| 处理器映射器：HandlerMapping | 匹配映射路径对应的Handler，返回可执行的处理器链对象HandlerExecutionChain对象 | RequestMappingHandlerMapping |
| 处理器适配器：HandlerAdapter | 匹配HandlerExecutionChain对应的适配器进行处理器调用，返回视图模型对象 | RequestMappingHandlerAdapter |
| 视图解析器：ViewResolver | 对视图模型对象进行解析 |  InternalResourceViewResolver |

 ![image.png](https://gcore.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/spring/springmvc/202406171708295.png)

---

SpringMVC的默认组件在前端控制器 DispatcherServlet加载时，就会进行初始化操作，在进行初始化时，就会加载SpringMVC默认指定的一些组件，这些默认组件配置在 `DispatcherServlet.properties` 文件中，该文件存在于 `org\springframework\web\servlet\DispatcherServlet.properties`
![image.png](https://gcore.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/spring/springmvc/202406171708729.png)
这些默认的组件是在DispatcherServlet中进行初始化加载的，在DispatcherServlet中存在集合存储着这些组件，SpringMVC的默认组件会在 DispatcherServlet 中进行维护，**但是并没有存储在与SpringMVC的容器中**

```java
public class DispatcherServlet extends FrameworkServlet {
    //存储处理器映射器
    private List<HandlerMapping> handlerMappings;
    //存储处理器适配器
    private List<HandlerAdapter> handlerAdapters;
    //存储视图解析器
    private List<ViewResolver> viewResolvers;
    // ... 省略其他代码 ...
}
```

---

如果不想使用默认组件，替代方案是使用Spring Bean的方式进行配置，例如，在spring-mvc.xml中配置RequestMappingHandlerMapping
```xml
<bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping"/>
```
当Spring容器中配置了HandlerMapping，就不会加载默认的HandlerMapping策略了，原理：DispatcherServlet 在进行HandlerMapping初始化时，先从SpringMVC容器中找是否存在HandlerMapping，如果存在直接取出容器中的HandlerMapping，再存储到 DispatcherServlet 中的handlerMappings集合中去。
## SpringMVC执行流程
### 前端控制器初始化
前端控制器DispatcherServlet是SpringMVC的入口，也是SpringMVC的大脑，主流程的工作都是在此完成的。**DispatcherServlet 本质是个Servlet**，当配置了 load-on-startup 时，会在服务器启动时就执行创建和执行初始化init方法，每次请求都会执行service方法
DispatcherServlet 的初始化主要做了两件事：

- 获得了一个 SpringMVC 的 ApplicationContext容器；
- 注册了 SpringMVC的 九大组件。

![image.png](https://gcore.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/spring/springmvc/202406171709767.png)
SpringMVC 的ApplicationContext容器创建时机，Servlet 规范的 init(ServletConfig config) 方法经过子类重写，最终会调用 FrameworkServlet 抽象类的initWebApplicationContext() 方法，该方法中最终获得 一个根Spring容器（Spring产生的），一个子Spring容器（SpringMVC产生的)。
HttpServletBean 的初始化方法

```java
public final void init() throws ServletException {
    this.initServletBean();
}
```
FrameworkServlet的initServletBean方法
```java
protected final void initServletBean() throws ServletException {
    this.webApplicationContext = this.initWebApplicationContext();//初始化ApplicationContext
    this.initFrameworkServlet();//模板设计模式，供子类覆盖实现，但是子类DispatcherServlet没做使用
}
```
在initWebApplicationContext方法中体现的父子容器的逻辑关系
```java
//初始化ApplicationContext是一个及其关键的代码
protected WebApplicationContext initWebApplicationContext() {
    //获得根容器，其实就是通过ContextLoaderListener创建的ApplicationContext
    //如果配置了ContextLoaderListener则获得根容器，没配置获得的是null
    WebApplicationContext rootContext = 
        WebApplicationContextUtils.getWebApplicationContext(this.getServletContext());
    //定义SpringMVC产生的ApplicationContext子容器
    WebApplicationContext wac = null;
    if (wac == null) {
        //==>创建SpringMVC的子容器，创建同时将Spring的创建的rootContext传递了过去
        wac = this.createWebApplicationContext(rootContext);
    }
    //将SpringMVC产生的ApplicationContext子容器存储到ServletContext域中
    //key名是：org.springframework.web.servlet.FrameworkServlet.CONTEXT.DispatcherServlet
    if (this.publishContext) {
        String attrName = this.getServletContextAttributeName();
        this.getServletContext().setAttribute(attrName, wac);
    }
}
```
创建子容器的源码
```java
protected WebApplicationContext createWebApplicationContext(@Nullable ApplicationContext 
                                                            parent) {
    //实例化子容器ApplicationContext
    ConfigurableWebApplicationContext wac = 
        (ConfigurableWebApplicationContext)BeanUtils.instantiateClass(contextClass);
    //设置传递过来的ContextLoaderListener的rootContext为父容器
    wac.setParent(parent);
    //获得web.xml配置的classpath:spring-mvc.xml
    String configLocation = this.getContextConfigLocation();
    if (configLocation != null) {
        //为子容器设置配置加载路径
        wac.setConfigLocation(configLocation);
    }
    //初始化子容器(就是加载spring-mvc.xml配置的Bean)
    this.configureAndRefreshWebApplicationContext(wac);
    return wac;
}
```
子容器中的parent维护着父容器的引用
![image.png](https://gcore.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/spring/springmvc/202406171709170.png)
父容器和子容器概念和关系：

- 父容器：Spring 通过ContextLoaderListener为入口产生的applicationContext容器，内部主要维护的是applicationContext.xml（或相应配置类）配置的Bean信息。
- 子容器：SpringMVC通过DispatcherServlet的init() 方法产生的applicationContext容器，内部主要维护的是spring-mvc.xml（或相应配置类）配置的Bean信息，且内部还通过parent属性维护这父容器的引用。
- Bean的检索顺序：根据上面子父容器的概念，可以知道Controller存在与子容器中，而Controller中要注入Service时，会先从子容器本身去匹配，匹配不成功时在去父容器中去匹配，于是最终从父容器中匹配到的UserService，这样子父容器就可以进行联通了。但是父容器只能从自己容器中进行匹配，不能从子容器中进行匹配。

---

注册 SpringMVC的 九大组件，在初始化容器initWebApplicationContext方法中执行了onRefresh方法，进而执行了初始化策略initStrategies方法，注册了九个解析器组件。
```java
//DispatcherServlet初始化SpringMVC九大组件
protected void initStrategies(ApplicationContext context) {
    this.initMultipartResolver(context);//1、初始化文件上传解析器
    this.initLocaleResolver(context);//2、初始化国际化解析器
    this.initThemeResolver(context);//3、初始化模板解析器
    this.initHandlerMappings(context);//4、初始化处理器映射器
    this.initHandlerAdapters(context);//5、初始化处理器适配器
    this.initHandlerExceptionResolvers(context);//6、初始化处理器异常解析器
    this.initRequestToViewNameTranslator(context);//7、初始化请求视图转换器
    this.initViewResolvers(context);//8、初始化视图解析器
    this.initFlashMapManager(context);//9、初始化lashMapManager策略组件
}
```

---

以 this.initHandlerMappings(context) 为例，进一步看一下初始化处理器映射器的细节：
```java
//定义List容器存储HandlerMapping
private List<HandlerMapping> handlerMappings;
//初始化HandlerMapping的方法
private void initHandlerMappings(ApplicationContext context) {
    this.handlerMappings = null;//初始化集合为null
    //detectAllHandlerMappings默认为true，代表是否从所有容器中(父子容器)检测HandlerMapping
    if (this.detectAllHandlerMappings) {
        //从Spring容器中去匹配HandlerMapping
        Map<String, HandlerMapping> matchingBeans = BeanFactoryUtils.beansOfTypeIncludingAncestors(context, 
                                                                                                   HandlerMapping.class, true, false);
        //如果从容器中获取的HandlerMapping不为null就加入到事先定义好的handlerMappings容器中
        if (!matchingBeans.isEmpty()) {
            this.handlerMappings = new ArrayList(matchingBeans.values());
            AnnotationAwareOrderComparator.sort(this.handlerMappings);
        }
        //如果从容器中没有获得HandlerMapping，意味着handlerMappings集合是空的
        if (this.handlerMappings == null) {
            //加载默认的HandlerMapping，就是加载DispatcherServlet.properties文件中的键值对
            this.handlerMappings = this.getDefaultStrategies(context, HandlerMapping.class);
        } 
    } 
}
```
初始化后，映射信息就已经被封装到HandlerMapping中了
![image.png](https://gcore.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/spring/springmvc/202406171709495.png)

### 前端控制器执行主流程
当服务器启动时，DispatcherServlet 会执行初始化操作，接下来，每次访问都会执行service方法。
![前端控制器执行主流程](https://gcore.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/spring/springmvc/202406171708295.png "前端控制器执行主流程")
FrameworkServlet 复写了service(HttpServletRequest request, HttpServletResponse response) 、doGet(HttpServletRequest request, HttpServletResponse response)、doPost(HttpServletRequestrequest, HttpServletResponse response)等方法，这些方法都会调用processRequest方法。

```java
protected final void processRequest(HttpServletRequest request, HttpServletResponse response){
	this.doService(request, response);
}
```
进一步调用了doService方法，该方法内部又调用了doDispatch方法，而SpringMVC 主流程最核心的方法就是
doDispatch 方法。
```java
protected void doService(HttpServletRequest request, HttpServletResponse response) {
	this.doDispatch(request, response);
}
```
doDispatch方法源码：
```java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) {
    HttpServletRequest processedRequest = request;
    HandlerExecutionChain mappedHandler = null; //定义处理器执行链对象
    ModelAndView mv = null; //定义模型视图对象
    //匹配处理器映射器HandlerMapping，返回处理器执行链对象
    mappedHandler = this.getHandler(processedRequest);
    //匹配处理器适配器HandlerAdapter，返回处理器适配器对象
    HandlerAdapter ha = this.getHandlerAdapter(mappedHandler.getHandler());
    //执行Interceptor的前置方法preHandle
    mappedHandler.applyPreHandle(processedRequest, response);
    //处理器适配器执行控制器Handler，返回模型视图对象
    mv = ha.handle(processedRequest, response, mappedHandler.getHandler());
    //执行Interceptor的后置方法postHandle
    mappedHandler.applyPostHandle(processedRequest, response, mv);
    //获取视图渲染视图
    this.processDispatchResult(processedRequest, response, mappedHandler, mv, (Exception)dispatchException);
}
```
### SpringMVC的执行流程
1) 用户向服务器发送请求，请求被SpringMVC 前端控制器 DispatcherServlet捕获。
2) DispatcherServlet对请求URL进行解析，得到请求资源标识符（URI），判断请求URI对应的映射：
a) 不存在
i. 再判断是否配置了mvc:default-servlet-handler
ii. 如果没配置，则控制台报映射查找不到，客户端展示404错误
iii. 如果有配置，则访问目标资源（一般为静态资源，如：JS,CSS,HTML），找不到客户端也会展示404错误
b) 存在则执行下面的流程
3) 根据该URI，调用HandlerMapping获得该Handler配置的所有相关的对象（包括Handler对象以及Handler对象对应的拦截器），最后以HandlerExecutionChain执行链对象的形式返回。
4) DispatcherServlet 根据获得的Handler，选择一个合适的HandlerAdapter。
5) 如果成功获得HandlerAdapter，此时将开始执行拦截器的preHandler(…)方法【正向】
6) 提取Request中的模型数据，填充Handler入参，开始执行Handler（Controller)方法，处理请求。在填充Handler的入参过程中，根据你的配置，Spring将帮你做一些额外的工作：
a) HttpMessageConveter： 将请求消息（如Json、xml等数据）转换成一个对象，将对象转换为指定的响应信息
b) 数据转换：对请求消息进行数据转换。如String转换成Integer、Double等
c) 数据格式化：对请求消息进行数据格式化。 如将字符串转换成格式化数字或格式化日期等
d) 数据验证： 验证数据的有效性（长度、格式等），验证结果存储到BindingResult或Error中
7) Handler执行完成后，向DispatcherServlet 返回一个ModelAndView对象。
8) 此时将开始执行拦截器的postHandle(...)方法【逆向】。
9) 根据返回的ModelAndView（此时会判断是否存在异常：如果存在异常，则执行HandlerExceptionResolver进行异常处理）选择一个适合的ViewResolver进行视图解析，根据Model和View，来渲染视图。
10) 渲染视图完毕执行拦截器的afterCompletion(…)方法【逆向】。
11) 将渲染结果返回给客户端。
## SpringMVC请求处理
### 请求映射路径的配置
#### XML配置
```xml
<!--path：设置处理的请求地址 view-name：设置请求地址所对应的视图名称 -->
<mvc:view-controller path="/" view-name="index"/>
```
```xml
<!--
    当SpringMVC中设置任何一个view-controller时，其他控制器中的请求映射将全部失效，
		此时需要在SpringMVC的核心配置文件中设置开启mvc注解驱动的标签：
-->
<mvc:annotation-driven/>
```
#### @RequestMapping
主要使用在控制器的方法上，用于标识客户端访问资源路径，常用的属性有value、path、method、headers、params等。当@RequestMapping只有一个访问路径需要指定时，使用value属性、path属性或省略value和path，当有多个属性时，value和path不能省略。
```java
@RequestMapping(value = "/show")//使用value属性指定一个访问路径
public String show(){}
@RequestMapping(value = {"/show","/haohao","/abc"})//使用value属性指定多个访问路径
public String show(){}
@RequestMapping(path = "/show")//使用path属性指定一个访问路径
public String show(){}
@RequestMapping(path = {"/show","/haohao","/abc"})//使用path属性指定多个访问路径
public String show(){}
@RequestMapping("/show")//如果只设置访问路径时，value和path可以省略
public String show(){}
@RequestMapping({"/show","/haohao","/abc"})
public String show(){}
```
@RequestMapping可以写在类上，表示接下来的每个请求路径都以它为前缀，如下的访问路径为/prefix/index
```java
@Controller
@RequestMapping("/prefix")
public class WebController {
    @GetMapping("index")
    public String index() {
        return "index";
    }
}
```
##### method属性
当@RequestMapping 需要限定访问方式时，可以通过method属性设置，method属性是一个RequestMethod类型的数组，表示该请求映射能够匹配
多种请求方式的请求。
**注意：**若当前请求的请求地址满足请求映射的value属性，但是请求方式不满足method属性，
则浏览器报错405：Request method 'POST' not supported
```java
//请求地址是/show,且请求方式必须是POST才能匹配成功
@RequestMapping(value = "/show",method = RequestMethod.POST)
public String show(){}
```
method的属性值是一个枚举类型，源码如下：
```java
public enum RequestMethod {
    GET,
    HEAD,
    POST,
    PUT,
    PATCH,
    DELETE,
    OPTIONS,
    TRACE;
    private RequestMethod() {
    }
}
```
##### params属性
params属性通过请求的请求参数匹配请求映射，它是一个字符串类型的数组，可以通过四种表达式设置请求参数和请求映射的匹配关系。

| param | 要求请求映射所匹配的请求必须携带param请求参数 |
| --- | --- |
| !param | 要求请求映射所匹配的请求必须不能携带param请求参数 |
| param=value | 要求请求映射所匹配的请求必须携带param请求参数且param=value |
| param!=value | 要求请求映射所匹配的请求必须携带param请求参数但是param!=value |

注意：若当前请求满足@RequestMapping注解的value和method属性，但是不满足params属性，此时页面回报错400：`Parameter conditions "username, password!=123456" not met for actual request parameters: username={admin}, password={123456}`

##### headers属性
headers属性通过请求的请求头信息匹配请求映射，它是一个字符串类型的数组，可以通过四种表达式设置请求头信息和请求映射的匹配关系。

| "header" | 要求请求映射所匹配的请求必须携带header请求头信息 |
| --- | --- |
| "!header" | 要求请求映射所匹配的请求必须不能携带header请求头信息 |
| "header=value" | 要求请求映射所匹配的请求必须携带header请求头信息且header=value |
| "header!=value" | 要求请求映射所匹配的请求必须携带header请求头信息且header!=value |

**注意：**若当前请求满足@RequestMapping注解的value和method属性，但是不满足headers属性，此时页面显示404错误，即资源未找到。
##### 衍生注解
当请求方式是GET时，可以使用@GetMapping替代@RequestMapping，其它的请求方式也是一样。
### ant风格的路径
|  ？ | 表示任意的单个字符 |
| --- | --- |
| * | 表示任意的0个或多个字符 |
| ** | 表示任意层数的任意目录 |

**注意：**在使用**时，只能使用/**/xxx的方式
### 请求数据的接收
#### @RequestParam
@RequestParam是将请求参数和控制器方法的形参创建映射关系
@RequestParam注解一共有三个属性：

- value：指定为形参赋值的请求参数的参数名
- required：设置是否必须传输此请求参数，默认值为true
   - 若设置为true时，则当前请求必须传输value所指定的请求参数，若没有传输该请求参数，且没有设置defaultValue属性，则页面报错400：Required String parameter 'xxx' is not present；
   - 若设置为false，则当前请求不是必须传输value所指定的请求参数，若没有传输，则注解所标识的形参的值为null
- defaultValue：不管required属性值为true或false，当value所指定的请求参数没有传输**或传输的值为""**时，则使用默认值为形参赋值
#### @RequestHeader
@RequestHeader是将请求头信息和控制器方法的形参创建映射关系
@RequestHeader注解一共有三个属性：value、required、defaultValue，用法同@RequestParam
接收Http请求头数据，接收指定名称的请求头:
```java
@GetMapping("/headers")
public String headers(@RequestHeader("Accept-Encoding") String acceptEncoding) {
    System.out.println("Accept-Encoding:"+acceptEncoding);
    return "/index.jsp";
}
```
接收所有的请求头信息:
```java
@GetMapping("/headersMap")
public String headersMap(@RequestHeader Map<String, String> map) {
    map.forEach((k,v)->{
    	System.out.println(k+":"+v);
    });
    return "/index.jsp";
}
```
#### @CookieValue
@CookieValue是将cookie数据和控制器方法的形参创建映射关系
@CookieValue注解一共有三个属性：value、required、defaultValue，用法同@RequestParam
获得客户端携带的Cookie数据:
```java
@GetMapping("/cookies")
public String cookies(@CookieValue(value = "JSESSIONID", defaultValue = "") String jsessionid) {
    System.out.println(jsessionid);
    return "/index.jsp";
}
```
#### 基本类型数据
接收普通请求数据，当客户端提交的数据是普通键值对形式时，直接使用同名形参接收即可。
```java
@GetMapping("/show")
public String show(String username, int age){
    System.out.println(username+"=="+age);
    return "/index.jsp";
}
```
接收数组或集合数据，客户端传递多个同名参数时，可以使用数组接收。
注意：若多个同名参数仍然使用String接收，则结果为单个数据间使用逗号隔开的结果。
```java
@GetMapping("/show")
public String show(String[] hobbies) {
    for (String hobby : hobbies) {
    System.out.println(hobby);}
    return "/index.jsp";
}
```
客户端传递多个同名参数时，也可以使用单列集合接收，但是需要使用@RequestParam告知框架传递的参数是要同名设置的，不是对象属性设置的。
```java
@GetMapping("/show")
public String show(@RequestParam List<String> hobbies){
    for (String hobby : hobbies) {
    System.out.println(hobby);}
    return "/index.jsp";
}
```
接收数组或集合数据，客户端传递多个不同命参数时，也可以使用Map<String,Object> 进行接收，同样需要用@RequestParam 进行修饰。
```java
@PostMapping("/show")
public String show(@RequestParam Map<String,Object> params){
    params.forEach((key,value)->{
    	System.out.println(key+"=="+value);
    });
    return "/index.jsp";
}
```
#### 实体类型数据
只要提交的参数名称只要与Java的属性名一致，就可以进行自动封装
```java
public class User {
    private String username;
    private Integer age;
    private String[] hobbies;
    private Address address;
    //... 省略get和set方法 ... 
}
```
```java
@GetMapping("/show")
public String show(User user) {
    System.out.println(user);
    return "/index.jsp";
}
```
接收实体JavaBean属性数据，嵌套JavaBean数据：提交的参数名称用 . 去描述嵌套对象的属性关系即可
`localhost:8080/service?username=root&age=10&hobbies=eat&hobbies=sleep&address.city=tianjin&address.area=jinghai`
#### JSON格式数据
Json数据都是以请求体的方式提交的，且不是原始的键值对格式的，所以要使用@RequestBody注解整体接收该数据并使用Json工具（ jackson ）将Json格式的字符串转化为JavaBean进行操作。
```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.9.0</version>
</dependency>
```
```java
@PostMapping("/show")
public String show(@RequestBody String body) throws IOException {
	System.out.println(body);
    //获得ObjectMapper
    ObjectMapper objectMapper = new ObjectMapper();
    //将json格式字符串转化成指定的User
    User user = objectMapper.readValue(body, User.class);
    System.out.println(user);
    return "/index.jsp";
}
```
配置RequestMappingHandlerAdapter，指定消息转换器，就不用手动转换json格式字符串了。
```xml
<bean 
  class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
  <property name="messageConverters">
    <list>
      <bean 
        class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter"/>
    </list>
  </property>
</bean>
```
```java
@PostMapping("/show")
public String show(@RequestBody User user){
    System.out.println(user);
    return "/index.jsp";
}
```
#### RESTful风格数据
REST：**Re**presentational **S**tate **T**ransfer，表现层资源状态转移。
Restful风格的请求，常见的规则有如下三点：

- 用URI表示某个模块资源，资源名称为名词；
| 模块 | URI资源 |
| --- | --- |
| 用户模块 user | http://localhost/user |
| 商品模块 product | http://localhost/product |
| 账户模块 account | http://localhost/account |
| 日志模块 log | http://localhost/log |

- 用请求方式表示模块具体业务动作，例如：GET表示查询、POST表示插入、PUT表示更新、DELETE表示删除

![image.png](https://gcore.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/spring/springmvc/202406171709282.png)

- 用HTTP响应状态码表示结果，国内常用的响应包括三部分：**状态码、状态信息、响应数据**
```json
{
  "code":200,
  "message":"成功",
  "data":{
    "username":"admin",
    "age":12
  }
}
{
  "code":300,
  "message":"执行错误",
  "data":"",
}
```
Restful请求数据一般会在URL地址上携带，可以使用注解 @PathVariable(占位符参数名称)，请求URL资源地址包含多个参数的情况。
```java
@PostMapping("/user/{username}/{age}")
public String findUserByUsernameAndAge(@PathVariable("username") String username,
                                       @PathVariable("age") Integer age) {
    System.out.println(username+"=="+age);
    return "/index.jsp";
}
```
##### HiddenHttpMethodFilter
浏览器只支持发送get和post方式的请求,SpringMVC 提供了 HiddenHttpMethodFilter** **帮助我们**将 POST 请求转换为 DELETE 或 PUT 请求。**
HiddenHttpMethodFilter 处理put和delete请求的条件：

- 当前请求的请求方式必须为post 
- 当前请求必须传输请求参数_method

满足条件后HiddenHttpMethodFilter过滤器会将当前请求的请求方式转换为请求参数_method的值，因此请求参数**_method的值才是最终的请求方式。**
注册HiddenHttpMethodFilter：
```xml
<filter>
  <filter-name>HiddenHttpMethodFilter</filter-name>
  <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filterclass>
</filter>
<filter-mapping>
  <filter-name>HiddenHttpMethodFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```
**注意：**在web.xml中注册时，必须先注册CharacterEncodingFilter，再注册HiddenHttpMethodFilter！
原因：

- 在 CharacterEncodingFilter 中通过 request.setCharacterEncoding(encoding) 方法设置字符集的request.setCharacterEncoding(encoding) 方法要求前面不能有任何获取请求参数的操作。
- 而 HiddenHttpMethodFilter 恰恰有一个获取请求方式的操作：
   - `String paramValue = request.getParameter(this.methodParam);`
#### 文件上传的数据
接收文件上传的数据，文件上传的表单需要一定的要求，如下：

- 表单的提交方式必须是POST
- 表单的enctype属性必须是multipart/form-data
- 文件上传项需要有name属性
```xml
<form action="" enctype="multipart/form-data" method="post" >
  <input type="file" name="myFile">
</form>
```
服务器端，由于映射器适配器需要文件上传解析器，而该解析器默认未被注册，所以手动注册。
```xml
<!--配置文件上传解析器，注意：id的名字是固定写法，因为IOC容器根据id自动装配-->
<bean id="multipartResolver" 
  class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
  <property name="defaultEncoding" value="UTF-8"/><!--文件的编码格式 默认是ISO8859-1-->
  <property name="maxUploadSizePerFile" value="1048576"/><!--上传的每个文件限制的大小 单位字节-->
  <property name="maxUploadSize" value="3145728"/><!--上传文件的总大小-->
  <property name="maxInMemorySize" value="1048576"/><!--上传文件的缓存大小-->
</bean>
```
CommonsMultipartResolver底层使用的Apache的是Common-fileuplad等工具API进行的文件上传
```xml
<dependency>
  <groupId>commons-fileupload</groupId>
  <artifactId>commons-fileupload</artifactId>
  <version>1.4</version>
</dependency>
```
##### 上传

- 案例1：
```java
@PostMapping("/fileUp")
public String testFileUp(MultipartFile img, HttpSession session) throws IOException {
    //获取上传的文件的文件名
    String fileName = img.getOriginalFilename();
    //处理文件重名问题
    String hzName = null;
    if (fileName != null) {
        hzName = fileName.substring(fileName.lastIndexOf("."));
    } else {
        return "success";
    }
    fileName = UUID.randomUUID() + hzName;
    //获取服务器中img目录的路径
    ServletContext application = session.getServletContext();
    String imgPath = application.getRealPath("img");
    File file = new File(imgPath);
    if (!file.exists()) {
        file.mkdir();
    }
    String finalPath = imgPath + File.separator + fileName;
    //实现上传功能
    img.transferTo(new File(finalPath));
    return "success";
}
```

- 案例2：
```java
@ResponseBody
@PostMapping("/upload")
public String fileUpLoadController(
        //1.@RequestPart这个注解用在multipart/form-data表单提交请求的方法上。
        //2.支持的请求方法的方式MultipartFile，属于Spring的MultipartResolver类。这个请求是通过http协议传输的。
        //3.@RequestParam也同样支持multipart/form-data请求。
        //4.他们最大的不同是，当请求方法的请求参数类型不再是String类型的时候。
        //5.@RequestParam适用于name-valueString类型的请求域，@RequestPart适用于复杂的请求域（像JSON，XML）。
        @RequestPart("singleFile") MultipartFile singleFile,
        @RequestPart("multiFiles") MultipartFile[] multipartFiles) throws IOException {
    if (!singleFile.isEmpty()) {
        singleFile.transferTo(new File("F:/Cache/" + singleFile.getOriginalFilename()));
    }

    if (multipartFiles.length > 0) {
        for (MultipartFile multipartFile : multipartFiles) {
            if (!multipartFile.isEmpty()) {
                multipartFile.transferTo(new File("F:/Cache/" + multipartFile.getOriginalFilename()));
            }
        }
    }
    return "<h2>文件上传成功!</h2>";
}
```
##### 下载
```java
@RequestMapping("/fileDown")
public ResponseEntity<byte[]> testResponseEntity(HttpSession session) throws IOException {
    //获取ServletContext对象
    ServletContext servletContext = session.getServletContext();
    //获取服务器中文件的真实路径
    String realPath = servletContext.getRealPath("img");
    //在不知道文件系统的分隔符时可以使用以下方式
    realPath += File.separator + "1.jpg";
    //创建输入流
    InputStream is = new FileInputStream(realPath);
    //创建字节数组
    byte[] bytes = new byte[is.available()];
    //将流读到字节数组中
    is.read(bytes);
    //创建HttpHeaders对象设置响应头信息
    MultiValueMap<String, String> headers = new HttpHeaders();
    //设置要下载方式以及下载文件的名字
    headers.add("Content-Disposition", "attachment;filename=1.jpg");
    //设置响应状态码
    HttpStatus statusCode = HttpStatus.OK;
    //创建ResponseEntity对象
    ResponseEntity<byte[]> responseEntity = new ResponseEntity<>(bytes, headers, statusCode);
    //关闭输入流
    is.close();
    return responseEntity;
}
```
#### 解决获取请求参数的乱码问题
解决获取请求参数的乱码问题，可以使用SpringMVC提供的编码过滤器CharacterEncodingFilter，但是必须在web.xml中进行注册。
```xml
<!--配置springMVC的编码过滤器-->
<filter>
  <filter-name>CharacterEncodingFilter</filter-name>
  <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
  	<!-- 若忘记这两个参数的名字可以进去CharacterEncodingFilter类的构造方法查看 -->
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
    <init-param>
      <param-name>forceEncoding</param-name>
      <param-value>true</param-value>
    </init-param>
</filter>
<!-- 设置过滤路径为所有 -->
<filter-mapping>
  <filter-name>CharacterEncodingFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```
**注意：**SpringMVC中处理编码的过滤器一定要配置到其他过滤器之前，否则无效！
### 域对象共享数据
#### Javaweb常用对象获取
获得Javaweb常见原生对象，有时在我们的Controller方法中需要用到Javaweb的原生对象，例如：Request、Response等，我们只需要将需要的对象以形参的形式写在方法上，SpringMVC框架在调用Controller方法时，会自动传递实参：
```java
@GetMapping("/javawebObject")
public String javawebObject(HttpServletRequest request, HttpServletResponse response, HttpSession session){
    System.out.println(request);
    System.out.println(response);
    System.out.println(session);
    return "/index.jsp";
}
```
#### ServletAPI
##### 向request域共享数据
获得转发Request域中数据，在进行资源之间转发时，有时需要将一些参数存储到request域中携带给下一个资源
```java
@GetMapping("/request1")
public String request1(HttpServletRequest request){
    //存储数据
    request.setAttribute("username","admin");
    return "/request2";
}
@GetMapping("/request2")
public String request2(@RequestAttribute("username") String username){
    System.out.println(username);
    return "/index.jsp";
}
```
##### 向session域共享数据
```java
@RequestMapping("/testSession")
public String testSession(HttpSession session){
    session.setAttribute("testSessionScope", "hello,session");
    return "success";
}
```
##### 向application域共享数据
```java
@RequestMapping("/testApplication")
public String testApplication(HttpSession session){
    ServletContext application = session.getServletContext();
    application.setAttribute("testApplicationScope", "hello,application");
    return "success";
}
```
#### SpringMVC
##### ModelAndView
```java
@RequestMapping("/testModelAndView")
public ModelAndView testModelAndView() {
    /**
        * ModelAndView有Model和View的功能
        * Model主要用于向请求域共享数据
        * View主要用于设置视图，实现页面跳转
    */
    ModelAndView mav = new ModelAndView();
    //向请求域共享数据
    mav.addObject("testScope", "hello,ModelAndView");
    //设置视图，实现页面跳转
    mav.setViewName("success");
    return mav;
}
```
##### Model
```java
@RequestMapping("/testModel")
public String testModel(Model model) {
    model.addAttribute("testScope", "hello,Model");
    return "success";
}
```
##### Map
```java
@RequestMapping("/testMap")
public String testMap(Map<String, Object> map){
    map.put("testScope", "hello,Map");
    return "success";
}
```
##### ModelMap
```java
@RequestMapping("/testModelMap")
public String testModelMap(ModelMap modelMap){
    modelMap.addAttribute("testScope", "hello,ModelMap");
    return "success";
}
```
##### Model、ModelMap、Map的关系
Model、ModelMap、Map类型的参数其实本质上都是 BindingAwareModelMap 类型的
```java
public interface Model{}
public class ModelMap extends LinkedHashMap<String, Object> {}
public class ExtendedModelMap extends ModelMap implements Model {}
public class BindingAwareModelMap extends ExtendedModelMap {}
```
### 静态资源
#### Tomcat的DefaultServlet
```xml
<servlet>
  <servlet-name>default</servlet-name>
  <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
  <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
  <servlet-name>default</servlet-name>
  <url-pattern>/</url-pattern>
</servlet-mapping>
```
```xml
<servlet>
    <servlet-name>SpringMVC</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:spring-mvc.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>SpringMVC</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```
url-pattern配置为 / 的Servlet我们称其为缺省的Servlet，作用是当其他Servlet都匹配不成功时，就找缺省的Servlet，静态资源由于没有匹配成功的Servlet，所以会找缺省的DefaultServlet，该DefaultServlet具备二次去匹配静态资源的功能。但是我们配置DispatcherServlet后就将其覆盖掉了，而DispatcherServlet会将请求的静态资源的名称当成Controller的映射路径去匹配，即静态资源访问不成功了！

---

#### 静态资源请求的三种解决方案：

1. 再次激活Tomcat的DefaultServlet，Servlet的url-pattern的匹配优先级是：精确匹配>目录匹配>扩展名匹配>缺省匹配，所以可以指定某个目录下或某个扩展名的资源使用DefaultServlet进行解析：
```xml
<servlet-mapping>
  <servlet-name>default</servlet-name>
  <url-pattern>/img/*</url-pattern>
</servlet-mapping>
<servlet-mapping>
  <servlet-name>default</servlet-name>
  <url-pattern>*.html</url-pattern>
</servlet-mapping>
```

---

2. 在spring-mvc.xml中去配置静态资源映射，匹配映射路径的请求到指定的位置去匹配资源
```xml
<!-- mapping是映射资源路径，location是对应资源所在的位置 -->
<mvc:resources mapping="/img/*" location="/img/"/>
<mvc:resources mapping="/css/*" location="/css/"/>
<mvc:resources mapping="/css/*" location="/js/"/>
<mvc:resources mapping="/html/*" location="/html/"/>
```

3. 在spring-mvc.xml中去配置< mvc:default-servlet-handler >，该方式是注册了一个DefaultServletHttpRequestHandler 处理器，静态资源的访问都由该处理器去处理，这也是开发中使用最多的
```xml
<mvc:default-servlet-handler/>
```
##### 注解驱动<mvc:annotation-driven>
###### 问题分析
静态资源配置的**第二第三种**方式我们可以正常访问静态资源了，但是Controller又无法访问了，报错404
第二种方式是通过SpringMVC去解析mvc命名空间下的resources标签完成的静态资源解析，第三种方式式通过SpringMVC去解析mvc命名空间下的default-servlet-handler标签完成的静态资源解析，根据前面所学习的自定义命名空间的解析的知识，可以发现不管是以上哪种方式，最终都会注册SimpleUrl**HandlerMapping**。
```java
public BeanDefinition parse(Element element, ParserContext context) {
    //创建SimpleUrlHandlerMapping类型的BeanDefinition
    RootBeanDefinition handlerMappingDef =
        new RootBeanDefinition(SimpleUrlHandlerMapping.class);
    //注册SimpleUrlHandlerMapping的BeanDefinition
    context.getRegistry().registerBeanDefinition(beanName, handlerMappingDef);
}
```
结合组件浅析知识点，一旦SpringMVC容器中存在 HandlerMapping 类型的组件时，前端控制器DispatcherServlet在进行初始化时，就会从容器中获得HandlerMapping ，不再加载dispatcherServlet.properties中默认处理器映射器策略，也就意味着RequestMappingHandlerMapping不会被加载了。
###### 解决方案
手动将RequestMappingHandlerMapping也注册到SpringMVC容器中，这样DispatcherServlet在进行初始化时，就会从容器中同时获得RequestMappingHandlerMapping存储到DispatcherServlet中名为handlerMappings的List集合中，对@RequestMapping 注解进行解析。
```xml
<bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping"/>
```
要想使用@RequestMapping正常映射到资源方法，同时静态资源还能正常访问，还可以将请求json格式字符串和JavaBean之间自由转换，我们就需要在spring-mvc.xml中尽心如下配置：
```xml
<!-- 显示配置RequestMappingHandlerMapping -->
<bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping"/>
<!-- 显示配置RequestMappingHandlerAdapter -->
<bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
  <property name="messageConverters">
    <list>
      <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter"/>
    </list>
  </property>
</bean>
<!--配置DefaultServletHttpRequestHandler-->
<mvc:default-servlet-handler/>
```
###### 简化方案
<mvc:annotation-driven>是mvc的注解驱动，该标签内部会帮我们注册RequestMappingHandlerMapping、注册
RequestMappingHandlerAdapter并注入Json消息转换器等，上述配置就可以简化成如下：
```xml
<!--mvc注解驱动-->
<mvc:annotation-driven/>
<!--配置DefaultServletHttpRequestHandler-->
<mvc:default-servlet-handler/>
```
## SpringMVC响应处理
响应数据主要分为两大部分：

- 传统同步方式：准备好模型数据，在跳转到执行页面进行展示，此方式使用越来越少了，基于历史原因，一些旧项目还在使用；
- 前后端分离异步方式：前端使用Ajax技术+Restful风格与服务端进行Json格式为主的数据交互，目前市场上几乎都是此种方式了。
### @ResponseBody
服务器处理ajax请求之后，大多数情况都需要向浏览器响应一个java对象，此时必须将java对象转换为json字符串才可以响应到浏览器，之前我们使用操作json数据的jar包gson或jackson将java对象转换为json字符串。在SpringMVC中，我们可以直接使用@ResponseBody注解实现此功能。
@ResponseBody响应浏览器json数据的条件：

1. 导入jackson的依赖
```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.12.1</version>
</dependency>
```

2. SpringMVC的配置文件中设置开启mvc的注解驱动
```xml
<!--开启mvc的注解驱动-->
<mvc:annotation-driven />
```

3. 使用@ResponseBody注解标识控制器方法，在方法中，将需要转换为json字符串并响应到浏览器的java对象作为控制器方法的返回值，此时SpringMVC就可以将此对象直接转换为json字符串并响应到浏览器
```java
//响应浏览器list集合
@RequestMapping("/test/ResponseBody/json")
@ResponseBody
public List<User> testResponseBody(){
    User user1 = new User(1001,"admin1","123456",23,"男");
    User user2 = new User(1002,"admin2","123456",23,"男");
    User user3 = new User(1003,"admin3","123456",23,"男");
    List<User> list = Arrays.asList(user1, user2, user3);
    return list;
}
//响应浏览器map集合
@RequestMapping("/test/ResponseBody/json")
@ResponseBody
public Map<String, Object> testResponseBody(){
    User user1 = new User(1001,"admin1","123456",23,"男");
    User user2 = new User(1002,"admin2","123456",23,"男");
    User user3 = new User(1003,"admin3","123456",23,"男");
    Map<String, Object> map = new HashMap<>();
    map.put("1001", user1);
    map.put("1002", user2);
    map.put("1003", user3);
    return map;
}
//响应浏览器实体类对象
@RequestMapping("/test/ResponseBody/json")
@ResponseBody
public User testResponseBody(){
	return user;
}
```
### @RestController
@RestController注解是springMVC提供的一个复合注解，标识在控制器的类上，就相当于为类添加了@Controller注解，并且为其中的每个方法添加了@ResponseBody注解，也可以把两个注解@Controller和@ResponseBody都写在类上达到同样的效果。
## 拦截器
### interceptor与filter
SpringMVC的拦截器Interceptor规范，主要是对Controller资源访问时进行拦截操作的技术，当然拦截后可以进行权限控制，功能增强等都是可以的。拦截器有点类似 Javaweb 开发中的Filter，拦截器与Filter的区别如下图：
![image.png](https://gcore.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/spring/springmvc/202406171709657.png)

|   |  Filter | Interceptor |
| --- | --- | --- |
| 技术范畴 | Javaweb原生 | SpringMVC框架 |
| 拦截/过滤资源 | 可以对所有请求都过滤，包括任何Servlet、JSP、其它资源等 | 只对进入了SpringMVC管辖范围的才拦截，主要拦截Controller请求 |
| 执行时机 | 早于任何Servlet | 晚于DispatchServlet |

### HandlerInterceptor
实现了HandlerInterceptor接口，且被Spring管理的Bean都是拦截器，接口定义如下：
```java
public interface HandlerInterceptor {
    default boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return true;
    }

    default void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
    }

    default void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
    }
}
```
HandlerInterceptor接口方法的作用及其参数、返回值详解如下：
![image.png](https://gcore.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/spring/springmvc/202406171709317.png)

### 配置拦截器
```java
public class MyInterceptor1 implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("Controller方法执行之前...");
        return true;//放行
    }
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("Controller方法执行之后...");
    }
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("渲染视图结束，整个流程完毕...");
    }
}
```
```xml
<!-- 扫描拦截类 -->
<context:component-scan base-package="com.springmvc.interceptor"/>
<mvc:interceptors>
  <mvc:interceptor>
    <!-- /*表示拦截一层路径，/**表示拦截所有路径 -->
    <mvc:mapping path="/*"/>
    <!-- 不拦截的路径 -->
    <mvc:exclude-mapping path="/test/success"/>
    <!-- 引用拦截类 -->
    <ref bean="myInterceptor1"/>
  </mvc:interceptor>
  <!--
      若有多个拦截器，preHandle()都返回true
      此时多个拦截器的执行顺序和拦截器在SpringMVC的配置文件的配置顺序有关：
      preHandle()会按照配置的顺序执行，而postHandle()和afterCompletion()会按照配置的反序执行
  -->
  <!--
      preHandle()返回false和它之前的拦截器的preHandle()都会执行，postHandle()都不执行，
      返回false的拦截器之前的拦截器的afterCompletion()会执行
  -->
  <ref bean="secondInterceptor"/>
</mvc:interceptors>
```
### 多个拦截器
#### 拦截器三个方法执行顺序
当每个拦截器都是放行状态时，三个方法的执行顺序如下：
![image.png](https://gcore.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/spring/springmvc/202406171710137.png)
当Interceptor1和Interceptor2处于放行，Interceptor3处于不放行时，三个方法的执行顺序如下：
![image.png](https://gcore.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/spring/springmvc/202406171710743.png)
总结：

- 若每个拦截器的preHandle()都返回true：
   - 此时多个拦截器的执行顺序和拦截器在SpringMVC的配置文件的配置顺序有关；preHandle()会按照配置的顺序执行，而postHandle()和afterCompletion()会按照配置的反序执行。
- 若某个拦截器的preHandle()返回了false：
   - preHandle()返回false和它之前的拦截器的preHandle()都会执行，postHandle()都不执行，返回false的拦截器之前的拦截器的afterCompletion()会执行。
#### 多个拦截器执行顺序
拦截器执行顺序取决于 interceptor 的配置顺序
```xml
<mvc:interceptors>
  
  <mvc:interceptor>
    <mvc:mapping path="/*"/>
    <mvc:exclude-mapping path="/test/success"/>
    <ref bean="firstInterceptor"/>
  </mvc:interceptor>
	<!--  firstInterceptor会比secondInterceptor先执行，因为它更早配置  -->
  <mvc:interceptor>
    <mvc:mapping path="/*"/>
    <mvc:exclude-mapping path="/test/success"/>
    <ref bean="secondInterceptor"/>
  </mvc:interceptor>
  
</mvc:interceptors>
```
### 执行原理
![image.png](https://gcore.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/spring/springmvc/202406171710366.png)
请求到来时先会使用组件HandlerMapping去匹配Controller的方法（Handler)和符合拦截路径的Interceptor，Handler和多个Interceptor被封装成一个HandlerExecutionChain的对象。HandlerExecutionChain 定义如下：
```java
public class HandlerExecutionChain {
    //映射的Controller的方法
    private final Object handler;
    //当前Handler匹配的拦截器集合
    private final List<HandlerInterceptor> interceptorList;
    // ... 省略其他代码 ...
}
```
在DispatcherServlet的doDispatch方法中执行拦截器
```java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response){
    //根据请求信息获得HandlerExecutionChain
    HandlerExecutionChain mappedHandler = this.getHandler(request);
    //获得处理器适配器
    HandlerAdapter ha = this.getHandlerAdapter(mappedHandler.getHandler());
    //执行Interceptor的前置方法，前置方法如果返回false，则该流程结束
    if (!mappedHandler.applyPreHandle(request, response)) {
        return;
    }
    //执行handler，一般是HandlerMethod
    ModelAndView mv = ha.handle(processedRequest, response, mappedHandler.getHandler());
    //执行后置方法
    mappedHandler.applyPostHandle(processedRequest, response, mv);
    //执行最终方法
    this.triggerAfterCompletion(processedRequest, response, mappedHandler, e);
}
```
跟踪 HandlerExecutionChain的applyPreHandle方法源码：
```java
void applyPostHandle(HttpServletRequest request, HttpServletResponse response, @Nullable 
                     ModelAndView mv) throws Exception {
    //对interceptorList进行遍历，逆向遍历
    for(int i = this.interceptorList.size() - 1; i >= 0; --i) {
        //取出每一个Interceptor
        HandlerInterceptor interceptor = (HandlerInterceptor)this.interceptorList.get(i);
        //执行Interceptor的postHandle方法
        interceptor.postHandle(request, response, this.handler, mv);
    }
}
```
跟踪HandlerExecutionChain的triggerAfterCompletion方法源码：
```java
void triggerAfterCompletion(HttpServletRequest request, HttpServletResponse response, @Nullable 
                            Exception ex) {
    //逆向遍历interceptorList，遍历的个数为执行的applyPreHandle次数-1
    for(int i = this.interceptorIndex; i >= 0; --i) {
        //取出每一个Interceptor
        HandlerInterceptor interceptor = (HandlerInterceptor)this.interceptorList.get(i);
        try {
            //执行Interceptor的afterCompletion方法
            interceptor.afterCompletion(request, response, this.handler, ex);
        } catch (Throwable var7) {
            logger.error("HandlerInterceptor.afterCompletion threw exception", var7);
        }
    }
}
```
## 异常处理器
SpringMVC提供了一个处理控制器方法执行过程中所出现的异常的接口：HandlerExceptionResolver
HandlerExceptionResolver接口的实现类有：DefaultHandlerExceptionResolver和SimpleMappingExceptionResolver
### **基于配置的异常处理**
SpringMVC提供了自定义的异常处理器SimpleMappingExceptionResolver，使用方式：
```xml
<!-- 处理异常(XML方式) -->
<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
  <property name="exceptionMappings">
    <props>
      <!-- key:捕获的异常名;error:捕获异常后跳转到对应的逻辑视图名称 -->
      <prop key="java.lang.ArithmeticException">error</prop>
    </props>
  </property>
  <!-- exceptionAttribute:用于获取数据的键;exception:共享到请求域的数据 -->
  <property name="exceptionAttribute" value="exception"/>
</bean>
```
### 基于注解的异常处理
#### 自定义异常状态码
```java
@ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "这是自定义的异常状态码（403）")
public class ExceptionStatus extends RuntimeException {
    public ExceptionStatus() {
        
    }

    public ExceptionStatus(String message) {
        super(message);
    }
}
```
#### 异常处理器
```java
//@ControllerAdvice将当前类标识为异常处理的组件
@ControllerAdvice
public class ExceptionController {
    //@ExceptionHandler用于设置所标识方法处理的异常
    @ExceptionHandler(ArithmeticException.class)
    //ex表示当前请求处理中出现的异常对象
    public String handleArithmeticException(Exception ex, Model model){
        model.addAttribute("ex", ex);
        return "error";
    }
}
```
#### 全局异常配置
```java
@Slf4j
@Component
public class GlobalExceptionHandle implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        log.info("错误信息为：{}", ex.toString());
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("exception", ex.toString());
        //判定是否为某（自定义）异常
        if (ex instanceof ExceptionStatus) {
            modelAndView.setViewName("error/403");
        } else if (ex instanceof ArithmeticException) {
            modelAndView.setViewName("error");
        }
        return modelAndView;
    }
}
```
## 全注解开发
### 初始化类，代替web.xml
在Servlet3.0环境中，容器会在类路径中查找实现javax.servlet.ServletContainerInitializer接口的类，如果找到的话就用它来配置Servlet容器。 
Spring提供了这个接口的实现，名为SpringServletContainerInitializer，这个类反过来又会查找实现WebApplicationInitializer的类并将配置的任务交给它们来完成。Spring3.2引入了一个便利的WebApplicationInitializer基础实现，名为AbstractAnnotationConfigDispatcherServletInitializer。
当我们的类扩展了AbstractAnnotationConfigDispatcherServletInitializer并将其部署到Servlet3.0容器的时候，容器会自动发现它，并用它来配置Servlet上下文（Spring和SpringMVC的入口）。
```java
public class WebInit extends
    AbstractAnnotationConfigDispatcherServletInitializer {
    /**
    * 指定spring的配置类
	* 加载核心配置类创建ContextLoaderListener
    */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{SpringConfig.class};
    }
    /**
    * 指定SpringMVC的配置类
	* 加载核心配置类创建DispatcherServlet
    */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{WebConfig.class};
    }
    /**
    * 指定DispatcherServlet的映射规则，即url-pattern
    */
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
    /**
    * 添加过滤器
    */
    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
        encodingFilter.setEncoding("UTF-8");
        encodingFilter.setForceRequestEncoding(true);
        HiddenHttpMethodFilter hiddenHttpMethodFilter = new
            HiddenHttpMethodFilter();
        return new Filter[]{encodingFilter, hiddenHttpMethodFilter};
    }
}
```
### SpringConfig配置类，代替spring的配置文件
```java
@Configuration
public class SpringConfig {
    
}
```
### WebConfig配置类，代替SpringMVC的配置文件
```java
@Configuration
//扫描组件
@ComponentScan("com.springmvc")
//开启MVC注解驱动
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    //配置视图控制
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
    }

    //使用默认的servlet处理静态资源
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    //配置文件上传解析器
    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setDefaultEncoding("UTF-8");
        multipartResolver.setMaxUploadSize(3145728);
        multipartResolver.setMaxUploadSizePerFile(1048576);
        multipartResolver.setMaxInMemorySize(1048576);
        return multipartResolver;
    }

    //配置拦截器
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        FirstInterceptor firstInterceptor = new FirstInterceptor();
        //拦截/以外的所有请求;注意：Spring的写法是/**,而原生Servlet的写法是/*
        registry.addInterceptor(firstInterceptor).addPathPatterns("/**").excludePathPatterns("/", "/login");
    }

    //配置异常映射
    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
        SimpleMappingExceptionResolver exceptionResolver = new SimpleMappingExceptionResolver();
        Properties prop = new Properties();
        prop.setProperty("java.lang.ArithmeticException", "error");
        //设置要捕获的异常映射
        exceptionResolver.setExceptionMappings(prop);
        //设置共享异常信息的键
        exceptionResolver.setExceptionAttribute("ex");
        resolvers.add(exceptionResolver);
    }

    //配置跨域请求
    @Override
    public void addCorsMappings(CorsRegister registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:7070")
            .allowCredentials(true);
    }

    //@Bean将方法的返回值作为IOC容器的bean
    //配置生成模板解析器
    @Bean
    public ITemplateResolver templateResolver() {
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        // ServletContextTemplateResolver需要一个ServletContext作为构造参数，可通过 WebApplicationContext 的方法获得
        ServletContextTemplateResolver templateResolver = new ServletContextTemplateResolver(webApplicationContext.getServletContext());
        templateResolver.setPrefix("/WEB-INF/templates/");
        templateResolver.setSuffix(".html");
        templateResolver.setCharacterEncoding("UTF-8");
        templateResolver.setTemplateMode(TemplateMode.HTML);
        return templateResolver;
    }
    //形参用到的bean需要匹配参数名与方法名对应的方法
    //生成模板引擎并为模板引擎注入模板解析器
    @Bean
    public SpringTemplateEngine templateEngine(ITemplateResolver templateResolver) {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);
        return templateEngine;
    }
    //生成视图解析器并为解析器注入模板引擎
    @Bean
    public ViewResolver viewResolver(SpringTemplateEngine templateEngine) {
        ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
        viewResolver.setCharacterEncoding("UTF-8");
        viewResolver.setTemplateEngine(templateEngine);
        return viewResolver;
    }
}
```
