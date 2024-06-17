---
title: IOC-XML
shortTitle: IOC-XML
description: 
date: 2024-06-16 21:22:07
categories: [Spring]
tags: []
---

## 注入bean
### setter注入bean
```xml
  <!--id:用于给类做个标识-->
  <!--还有一个name属性作用域id一样，但可以添加特殊字符如/
      早期给Struts框架，目前几乎无人问津，故多使用id-->
	<!-- 若不配置ID，则getBean()时刻使用全类名获取	 -->
  <bean id="user" class="com.spring5.common_bean.User">
      <!--当该类有有参构造时，需要写此属性-->
      <constructor-arg name="user_name" value="qzy"/>
      <!--也可以通过索引来指定，但通常使用name更直观-->
      <constructor-arg index="1" value="123"/>
      <!--给User类注入属性（前提是有set方法）-->
      <property name="user_password" value="123456"/>
      <!--添加空值-->
      <property name="user_name">
          <null/>
      </property>
      <!--属性值包含特殊字符-->
      <property name="user_address">
          <value>
              <!--敲 CD 即可代码补全 -->
              <![CDATA[<<|常州|>>]]>
          </value>
      </property>
  </bean>
  
  <!-- 添加p名称空间在配置文件中 xmlns:p="http://www.springframework.org/schema/p" -->
  <!-- 进行属性注入，本质上还是用的set方法 -->
<!--   <bean id="book" class="com.spring5.common_bean.User" p:user_name="qwe" p:user_password="321" /> -->
```
### 引用外部已经声明的bean
```xml
  <bean id="userDao" class="com.spring5.dao.UserDaoImpl">
      <constructor-arg value="110"/>
  </bean>
  <bean id="userService" class="com.spring5.service.UserService">
      <!-- 此处ref值必须与上方的id（userDao）对应 -->
      <property name="userDao" ref="userDao"/>
  </bean>
```
### 内部bean
```xml
  <bean id="employee" class="com.spring5.common_bean.Employee">
    <property name="name" value="QinZhiyun"/>
    <property name="age" value="19"/>
    <!-- 内部bean方式注入属性 -->
    <property name="department">
      <bean class="com.spring5.common_bean.Department">
        <property name="dept_name" value="行政部"/>
      </bean>
    </property>
  </bean>
```
### 内联赋值
```xml
  <bean id="employee" class="com.spring5.common_bean.Employee">
      <property name="name" value="admin"/>
      <property name="age" value="0"/>
      <!-- 内联赋值，前提是employee有getDept_name方法 -->
      <property name="department" ref="department"/>
      <property name="department.dept_name" value="财务部"/>
  </bean>
  <bean id="department" class="com.spring5.common_bean.Department"/>
```
### 其它参数
```xml
<!--
    配置了id->则beanName为id值；若不配ID,则beanName为全类名；
    name属性由一个aliasMap的ConCurrentHashMap维护，若不配id,则name的第一个值为beanName
-->
<bean id="user" name="user2, user3" class="com.bean.User" scope="singleton" lazy-init="true" init-method="init" destroy-method="destroy">
    <!-- 此标签不仅仅用于构造方法 -->
    <constructor-arg name="id" value="1"/>
    <property name="name" value="userName"/>
</bean>
<!-- 起别名，相当于上面标签中的name-->
<alias name="user" alias="user4"/>
```
lazy-init:

- 当Spring容器创建的时候，不会立即创建Bean实例，等待用到时在创建Bean实例并存储到单例池中去，后续在使用该Bean直接从单例池获取即可，本质上该Bean还是单例的。
- 延迟加载只有在ApplicationContext下才有效
   - BeanFactory是延迟加载->调用getBean()才加载
   - ApplicationContext是立即加载->加载XML配置文件就加载

scope：

- singleton：单例，默认值，Spring容器创建的时候，就会进行Bean的实例化，并存储到容器内部的单例池中，每次getBean时都是从单例池中获取相同的Bean实例；
- prototype：原型，Spring容器初始化时不会创建Bean实例，当调用getBean时才会实例化Bean，每次getBean都会创建一个新的Bean实例。
- webmvc下有session和request（用不着），还有一个以后再说。

init-method:

- bean对象创建完毕后自动调用init()方法；**注意：构造方法执行早于init方法**

destroy-method:

- bean对象销毁时自动调用destroy()方法
#### 常见配置一览表
| Xml配置方式 | 功能描述 |
| --- | --- |
| `<bean id="" class="">` | Bean的id和全限定名配置 |
| `<bean name="">` | 通过name设置Bean的别名，通过别名也能直接获取到Bean实例 |
| `<bean scope="">` | Bean的作用范围，BeanFactory作为容器时取值singleton和prototype |
| `<bean lazy-init="">` | Bean的实例化时机，是否延迟加载。**BeanFactory作为容器时无效** |
| `<bean init-method="">` | Bean实例化后自动执行的初始化方法，method指定方法名 |
| `<bean destroy-method="">` | Bean实例销毁前的方法，method指定方法名 |
| `<bean autowire="byType">` | 设置自动注入模式，常用的有按照类型byType，按照名字byName |
| `<bean factory-bean="" factory-method=""/>` | 指定哪个工厂Bean的哪个方法完成Bean的创建 |

### 自动注入
```xml
<!-- 按类型自动注入时若有多个实现类则报错 -->
<bean id="userService" class="com.service.impl.UserServiceImpl" autowire="byType"/>
<bean id="userDao" class="com.dao.UserDao"/>

<!--    <bean id="userService" class="com.service.impl.UserServiceImpl" autowire="byName"/>-->
<!-- set方法需要改成setUserDao1 -->
<!--    <bean id="userDao1" class="com.dao.UserDao"/>-->
```
### 注入集合属性
```xml
  <!-- 为集合类型赋值-基本类型 -->
  <bean id="collections01" class="com.spring5.common_bean.Collections01">
    <property name="array">
      <array>
        <value>QinZhiyun</value>
        <value>秦智耘</value>
      </array>
    </property>
    <property name="list">
      <list>
        <value>数据结构</value>
        <value>设计模式</value>
      </list>
    </property>
    <property name="map">
      <map>
        <entry key="JAVA" value="java"/>
        <entry key="PHP" value="php"/>
      </map>
    </property>
    <property name="set">
      <set>
        <value>AAA</value>
        <value>BBB</value>
      </set>
    </property>
  </bean>
```
```xml
  <!-- 为集合内加入对象类型的值 -->
  <!-- 首先创建对象类型的值 -->
  <bean id="coll1" class="com.spring5.common_bean.coll">
      <property name="name" value="admin"/>
      <property name="password" value="123"/>
  </bean>
  <bean id="coll2" class="com.spring5.common_bean.coll">
      <property name="name" value="Administrator"/>
      <property name="password" value="123456"/>
  </bean>

  <!-- 把值加入集合中 -->
  <bean id="collections02" class="com.spring5.common_bean.Collections02">
      <property name="list">
          <list>
              <!-- 引用刚刚创建的coll1,coll2 -->
              <ref bean="coll1"/>
              <ref bean="coll2"/>
          </list>
      </property>
  </bean>
```
```xml
  <!--
			抽取集合:
      首先创建集合值 
	-->
  <util:list id="bookList">
      <value>Java编程思想</value>
      <value>JVM虚拟机深入理解</value>
      <value>Java核心技术卷I</value>
  </util:list>

  <!-- 将集合加入book.list -->
  <bean id="book" class="com.spring5.common_bean.Book">
      <property name="list" ref="bookList"/>
  </bean>
```
### 属性自动装配
```xml
  <!-- 
		 属性自动装配:
     有byName和byType两种
     如果是byName则要和下方dept对应
     如果是byType则不能出现两个Dept类的id
     实际开发中用不到这种方式，因为注解更方便
  -->
  <bean id="emp" class="com.spring5.auto_wire.Emp" autowire="byName"/>
  
  <!-- byName-->
  <bean id="dept" class="com.spring5.auto_wire.Dept">
      <property name="name" value="技术部门"/>
  </bean>
```
## Bean实例化方式
### 构造方法
传统，不做解释。
### 静态工厂
```java
public class MyStaticFactoryBean {
    public static User getUser() {
        System.out.println("静态工厂Bean……");
        return new User();
    }
}
```
```xml
<bean id="user0" class="com.factory.MyStaticFactoryBean" factory-method="getUser"/>
```
### 实例工厂
```java
public class MyFactoryBean {
    public Cat getCat(String brand) {
        System.out.println("实例工厂Bean");
        return new Cat(brand);
    }
}
```
```xml
    <!-- 配置实例工厂Bean -->
    <bean id="factory" class="com.factory.MyFactoryBean"/>
  	<!-- 配置实例工厂Bean的哪个方法作为工厂方法 -->
    <bean id="cat" class="com.bean.Cat" factory-bean="factory" factory-method="getCat">
        <!-- 只要是为了实例化对象而传递的参数都可以通过constructor-arg标签完成 -->
        <constructor-arg name="brand" value="波斯猫"/>
    </bean>
```
### 实现FactoryBean延迟实例化Bean

- 实现FactoryBean规范，延迟实例化Bean
   - 在加载配置文件时不实例化Bean，只记录需要实例化的信息	
   - 在调用getBean()时才会调用下面的getObject()创建Bean并存放在factoryBeanObjectCache的ConcurrentHashMap中
   - 下次再获取bean时会从这个map中获取，不会再调用getObject()。
```java
public class MyBean implements FactoryBean<Student> {
    //虽然类名是MyBean，但返回的是泛型中的Student类
    @Override
    public Student getObject() throws Exception {
        Student student = new Student();
        student.setName("qzy");
        return student;
    }

    @Override
    public Class<?> getObjectType() {
        return null;
    }

    @Override
    public boolean isSingleton() {
        return FactoryBean.super.isSingleton();
    }
}
```
```xml
  <!-- 工厂bean -->
  <bean id="myBean" class="com.spring5.factory_bean.MyBean"/>
```
#### 自定义Date格式注入
##### 方式1:自定义FactoryBean
```java
public class MyFactoryBeanDateImpl implements FactoryBean<Date> {

    private String date;

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public Date getObject() throws Exception {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        return format.parse(this.date);
    }

    @Override
    public Class<?> getObjectType() {
        return null;
    }
}
```
```xml
    <bean id="date" class="com.factory.MyFactoryBeanDateImpl">
        <property name="date" value="2002-10-27 17:10:27"/>
    </bean>
```
##### 方式2:本质是实例工厂
```xml
<bean id="simpleDateFormat" class="java.text.SimpleDateFormat">
	<constructor-arg name="pattern" value="yyyy-MM-dd HH:mm:ss"/>
</bean>
<bean id="date" factory-bean="simpleDateFormat" factory-method="parse">
	<constructor-arg name="source" value="2023-08-27 07:20:00"/>
</bean>
```
## Bean的生命周期
```java
public class AwareImpl implements ApplicationContextAware, BeanFactoryAware, BeanNameAware, BeanClassLoaderAware {
    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        System.out.println("beanFactory = " + beanFactory);
    }

    @Override
    public void setBeanName(String beanName) {
        System.out.println("beanName = " + beanName);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        System.out.println("applicationContext = " + applicationContext);
    }

    @Override
    public void setBeanClassLoader(ClassLoader classLoader) {
        System.out.println("classLoader = " + classLoader);
    }
}

```
```xml
    <bean id="awareImpl" class="com.qzy.aware.AwareImpl"/>
```
### 五步、七步
bean 生命周期有七步 （正常生命周期为五步，而配置后置处理器后为七步）

- （1）通过构造器创建 bean 实例（无参数构造）
- （2）为 bean 的属性设置值和对其他 bean 引用（调用 set 方法）
-    ③	把 bean 实例传递 bean 后置处理器的方法 postProcessBeforeInitialization
- （4）调用 bean 的初始化的方法（需要进行配置初始化的方法）
-    ⑤	把 bean 实例传递 bean 后置处理器的方法 postProcessAfterInitialization
- （6）bean 可以使用了（对象获取到了）
- （7）当容器关闭时候，调用 bean 的销毁的方法（需要进行配置销毁的方法）
```java
public class Life {
    private Integer age;

    public Life() {
        System.out.println("第一步 执行无参数构造创建 bean 实例");
    }

    public void setAge(Integer age) {
        this.age = age;
        System.out.println("第二步 调用 set 方法设置属性值");
    }

    public void initMethod() {
        System.out.println("第三步：执行初始化方法");
    }

    public void destroyMethod() {
        System.out.println("第五步 执行销毁的方法");
    }
}

```
```java
public class MyBeanPost implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("③：在初始化之前调用的方法");
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("⑤：在初始化之后调用的方法");
        return bean;
    }
}
```
```java
@Test
public void beanLifeTest() {
    ClassPathXmlApplicationContext context =
            new ClassPathXmlApplicationContext("lifebean.xml");

    Life life = context.getBean("life", Life.class);

    System.out.println("第四步 获取创建 bean 实例对象");

    //手动销毁bean的实例
    context.close();
    System.out.println("第七步 销毁 bean 实例对象");
}
```
### 十步
```java
public class Life10 implements InitializingBean, DisposableBean, BeanNameAware, ApplicationContextAware, BeanFactoryAware, BeanClassLoaderAware {
    private String name;
    public Life10() {
        System.out.println("1：构造方法创建对象");
    }

    public void setName(String name) {
        this.name = name;
        System.out.println("2：set注入属性");
    }

    //此方法需要配置(见XML配置文件->init-method="init()")
    public void init() {
        System.out.println("6：自定义的init()-bean初始化方法");
    }

    public void use() {
        System.out.println("8：可以使用了");
    }

    //此方法需要配置(见XML配置文件->destroy-method="destroyBean()")
    public void destroyBean() {
        System.out.println("10：自定义的destroy()-bean销毁方法");
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("5：InitializingBean =》 afterPropertiesSet()");
    }

    @Override
    public void setBeanClassLoader(ClassLoader classLoader) {
        System.out.println("3：检查Bean是否实现了（一系列）Aware接口-BeanClassLoaderAware");
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        System.out.println("3：检查Bean是否实现了（一系列）Aware接口-BeanFactoryAware");
    }

    @Override
    public void setBeanName(String s) {
        System.out.println("3：检查Bean是否实现了（一系列）Aware接口-BeanNameAware");
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        System.out.println("3：检查Bean是否实现了（一系列）Aware接口-ApplicationContextAware");
    }

    @Override
    public void destroy() throws Exception {
        System.out.println("9：销毁之前的动作 =》 实现DisposableBean->destroy()");
    }
}

```
```java
public class MyBeanPostProcessor10 implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("4：后处理器-回调before");
        return null;
    }
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("7：后处理器-回调after");
        return null;
    }
}
```
```xml
  <bean id="life10" class="com.qzy.life.Life10" init-method="init" destroy-method="destroyBean" p:name="LifeCycle"/>
  <bean class="com.qzy.life.MyBeanPostProcessor10"/>
```
## 环境配置
### 引入外部属性文件
```properties
prop.driverClass=com.mysql.jdbc.Driver
prop.url=jdbc:mysql://localhost:3306/atguigudb
prop.userName=root
prop.password=root
```
```xml
<!--导入用户模块配置文件-->
<import resource="classpath:UserModuleApplicationContext.xml"/>
<!--导入商品模块配置文件-->
<import resource="classpath:ProductModuleApplicationContext.xml"/>

<!-- 引入外部属性文件,使用${} -->
<context:property-placeholder location="jdbc.properties"/>

<!--配置连接池-->
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
  <property name="driverClassName" value="${prop.driverClass}"/>
  <property name="url" value="${prop.url}"/>
  <property name="username" value="${prop.userName}"/>
  <property name="password" value="${prop.password}"/>
</bean>

<!-- 自动完成Class.forName(……)并把connection注入IOC容器 -->
<bean id="clazz" class="java.lang.Class" factory-method="forName" c:className="com.mysql.cj.jdbc.Driver"/>
<bean id="connection" class="java.sql.DriverManager" factory-method="getConnection">
  <constructor-arg name="url" value="jdbc:mysql://localhost:3306/mybatis"/>
  <constructor-arg name="info">
    <props>
      <prop key="user">root</prop>
      <prop key="password">root</prop>
    </props>
  </constructor-arg>
</bean>
```
### 不同开发环境
```xml
    <!-- 选择不同的开发环境 -->
    <!-- 在主方法中：System.setProperty("spring.profiles.active", "dev") -->
    <beans profile="dev">
        <bean id="user" class="com.bean.User"/>
    </beans>
    <beans profile="test">
        <bean id="user" class="com.bean.User"/>
    </beans>
```
