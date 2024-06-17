---
title: 场景整合
shortTitle: 场景整合
description: 
date: 2024-06-16 21:59:17
categories: [SpringBoot]
tags: []
---
**以后用到什么新技术,就导入xxx-starter再去配置文件写点相关的东西就行**
## 数据源
```xml
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>druid-spring-boot-starter</artifactId>
  <version>1.2.8</version>
</dependency>
<!-- SpringBoot3.0以上版本使用下面这个 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-3-starter</artifactId>
    <version>1.2.22</version>
</dependency>
```
```yaml
## 配置通用数据源，不写则默认为SpringBoot默认的配置： com.zaxxer.hikari.HikariDataSource
#spring:
##  datasource:
##    driver-class-name: com.mysql.cj.jdbc.Driver
##    username: root
##    password: root
##    url: jdbc:mysql://localhost:3306/springboot?serverTimezone=UTC

#配置德鲁伊专用数据源
spring:
  datasource:
    druid:
      driver-class-name: com.mysql.cj.jdbc.Driver
      username: root
      password: root
      url: jdbc:mysql://localhost:3306/springboot?serverTimezone=UTC
```
```yaml
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    ## Druid的其他属性配置
    druid:
      ## 初始化时建立物理连接的个数
      initial-size: 5
      ## 连接池的最小空闲数量
      min-idle: 5
      ## 连接池最大连接数量
      max-active: 20
      ## 获取连接时最大等待时间，单位毫秒
      max-wait: 60000
      ## 申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。
      test-while-idle: true
      ## 既作为检测的间隔时间又作为testWhileIdel执行的依据
      time-between-eviction-runs-millis: 60000
      ## 销毁线程时检测当前连接的最后活动时间和当前时间差大于该值时，关闭当前连接(配置连接在池中的最小生存时间)
      min-evictable-idle-time-millis: 30000
      ## 用来检测数据库连接是否有效的sql 必须是一个查询语句(oracle中为 select 1 from dual)
      validation-query: select 'x'
      ## 申请连接时会执行validationQuery检测连接是否有效,开启会降低性能,默认为true
      test-on-borrow: false
      ## 归还连接时会执行validationQuery检测连接是否有效,开启会降低性能,默认为true
      test-on-return: false
      ## 是否缓存preparedStatement, 也就是PSCache,PSCache对支持游标的数据库性能提升巨大，比如说oracle,在mysql下建议关闭。
      pool-prepared-statements: false
      ## 置监控统计拦截的filters，去掉后监控界面sql无法统计，stat: 监控统计、Slf4j:日志记录、waLL: 防御sqL注入
      filters: stat,wall,slf4j
      ## 要启用PSCache，必须配置大于0，当大于0时，poolPreparedStatements自动触发修改为true。在Druid中，不会存在Oracle下PSCache占用内存过多的问题，可以把这个数值配置大一些，比如说100
      max-pool-prepared-statement-per-connection-size: -1
      ## 合并多个DruidDataSource的监控数据
      use-global-data-source-stat: true
      ## 通过connectProperties属性来打开mergeSql功能；慢SQL记录
      connect-properties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=5000

      web-stat-filter:
        ## 是否启用StatFilter默认值true
        enabled: true
        ## 添加过滤规则
        url-pattern: /*
        ## 忽略过滤的格式
        exclusions: /druid/*,*.js,*.gif,*.jpg,*.png,*.css,*.ico

      stat-view-servlet:
        ## 是否启用StatViewServlet默认值true
        enabled: true
        ## 访问路径为/druid时，跳转到StatViewServlet
        url-pattern: /druid/*
        ## 是否能够重置数据
        reset-enable: false
        ## 需要账号密码才能访问控制台，默认为root
        login-username: druid
        login-password: druid
        ## IP白名单
        allow: 127.0.0.1
        ## IP黑名单（共同存在时，deny优先于allow）
        deny:

```
## Mybatis
```yaml
mybatis:
  config-location: classpath:mybatis/mybatis-config.xml
  mapper-locations: classpath:mybatis/mapper/*.xml
  type-aliases-package: com.qzy.springboot.bean
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```
## JUnit5
依赖：

- 单元测试
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-test</artifactId>
  <scope>test</scope>
</dependency>
```

- 日志
```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <scope>provided</scope>
</dependency>
```
使用：
```java
@Slf4j
@SpringBootTest
public class MyJunit5Test {
    //表示方法是测试方法。但是与JUnit4的@Test不同，
    //他的职责非常单一不能声明任何属性，拓展的测试将会由Jupiter提供额外测试
    @Test
    @DisplayName("测试1")//将测试名展示成“测试1”而不是方法名"test01"
    void test01() {
        System.out.println("第一个测试方法");
    }

    //让这个测试重复执行3次
    @RepeatedTest(3)
    void test02() {
        System.out.println("这是一个可以重复的测试");
    }

    @BeforeEach
    void testBeforeEach() {
        System.out.println("每个单元测试之前执行");
    }

    @AfterEach
    void testAfterEach() {
        System.out.println("每个单元测试之后执行");
    }

    @BeforeAll
    //这里注意是 静态方法
    static void testBeforeAll() {
        System.out.println("所有单元测试之前执行");
    }

    @AfterAll
    //这里注意是 静态方法
    static void testAfterAll() {
        System.out.println("所有单元测试之后执行");
    }

    @Test
    @Disabled
    void testDisabled() {
        System.out.println("这个方法并不会被执行...");
    }

    @Test
    //@SneakyThrows可以用来偷偷抛出已检查的异常而不在方法的throws子句中实际声明这一点
    @SneakyThrows
    //在指定时间过后会
    @Timeout(value = 3, unit = TimeUnit.SECONDS)
    void testTimeout() {
        System.out.println("这个方法即将休眠5秒...");
        Thread.sleep(5000);
    }

    @Test
    //表示单元测试类别，类似于JUnit4中的@Categories
    @Tag("2")
    void testTag() {
        System.out.println("这个测试方法的标签是 哈哈哈");
    }
	
	//参数化测试
	@ParameterizedTest
	//指定要传入的值,详情见源码
    @ValueSource(ints = {1, 2, 3, 4, 5})
    //将上方的值依次传入value
	void parameterizedTest(int value) {
        System.out.println("value = " + value);
    }

    @ParameterizedTest
	//参数化测试-将方法的返回值传入str
    @MethodSource("method")
    void parameterizedMethodTest(String str) {
        System.out.println("str = " + str);
	}

    static String[] method() {
        return new String[]{"str1", "str2"};
    }

}
```
```java
@SpringBootTest
public class MyJunit5AssertionsTest {

    static int add(int a, int b) {
        return a + b;
    }

    @Test
    @DisplayName("基本断言")
    void testCalc() {
        int res = add(1, 2);
        //判断值
        Assertions.assertEquals(3, res);
        System.out.println("res = " + res);
        //判空
        Assertions.assertNull(null);
        //判断地址
        Assertions.assertSame(new Object(), new Object());
        //注意这下面的代码不会执行，原因是上面的断言已经出错
        boolean flag = true;
        Assertions.assertTrue(flag);
        System.out.println("flag = " + flag);
    }

    @Test
    @DisplayName("组合断言")
    void testAll() {
        //必须两个条件都满足才成功
        Assertions.assertAll("Math",
                () -> Assertions.assertEquals(1, 1),
                () -> Assertions.assertFalse(false && true));
    }

    @Test
    @DisplayName("异常断言")
    void testException() {
        //判定必定会有异常发生
        Assertions.assertThrows(ArithmeticException.class,
                () -> System.out.println("1/0 = " + 1 / 0));
    }

    @Test
    @DisplayName("超时断言")
    void testTimeout() {
        //若测试方法时间超过1s将会抛出异常
        Assertions.assertTimeout(Duration.ofMillis(1000), () -> Thread.sleep(2000));
    }

    @Test
    @DisplayName("快速失败")
    void testFail() {
        Assertions.fail("这个方法直接失败！");
    }

}
```
```java
@DisplayName("A stack")
public class TestingAStackDemo {
    Stack<Object> stack;

    @Test
    @DisplayName("is instantiated with new Stack()")
    void isInstantiatedWithNew() {
        new Stack<>();
        /*
          外层的Test不能驱动内层的Before(After)Each/All
         */
        assertNull(stack);
    }

    //表示嵌套的测试
    @Nested
    @DisplayName("when new")
    class WhenNew {

        @BeforeEach
        void createNewStack() {
            stack = new Stack<>();
        }

        @Test
        @DisplayName("is empty")
        void isEmpty() {
            assertTrue(stack.isEmpty());
        }

        @Test
        @DisplayName("throws EmptyStackException when popped")
        void throwsExceptionWhenPopped() {
            assertThrows(EmptyStackException.class, stack::pop);
        }

        @Test
        @DisplayName("throws EmptyStackException when peeked")
        void throwsExceptionWhenPeeked() {
            assertThrows(EmptyStackException.class, stack::peek);
        }

        @Nested
        @DisplayName("after pushing an element")
        class AfterPushing {

            String anElement = "an element";

            @BeforeEach
            void pushAnElement() {
                stack.push(anElement);
            }

            /**
             * 内层的Test可以驱动外层的Before(After)Each/All
             */
            @Test
            @DisplayName("it is no longer empty")
            void isNotEmpty() {
                assertFalse(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when popped and is empty")
            void returnElementWhenPopped() {
                assertEquals(anElement, stack.pop());
                assertTrue(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when peeked but remains not empty")
            void returnElementWhenPeeked() {
                assertEquals(anElement, stack.peek());
                assertFalse(stack.isEmpty());
            }
        }
    }
}
```
## 接口文档
### **OpenAPI 3 与 Swagger**
Swagger 可以快速生成**实时接口**文档，方便前后开发人员进行协调沟通。遵循 **OpenAPI** 规范。
文档：[https://springdoc.org/v2/](https://springdoc.org/v2/)
### OpenAi3架构
![OpenAI3架构](https://gcore.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/spring/springboot/202406171714615.png)
### 整合

1. 导入场景
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.1.0</version>
</dependency>
```

2. 配置
```properties
## /api-docs endpoint custom path 默认 /v3/api-docs
springdoc.api-docs.path=/api-docs

## swagger 相关配置在  springdoc.swagger-ui
## swagger-ui custom path
springdoc.swagger-ui.path=/swagger-ui.html

springdoc.show-actuator=true
```
### 使用
#### **常用注解**
|     注解     |     标注位置      |          作用          |
| :----------: | :---------------: | :--------------------: |
|     @Tag     |   Controller类    |   标识controller作用   |
|  @Parameter  |       参数        |      标识参数作用      |
| @Parameters  |       参数        |      参数多重说明      |
|   @Schema    | model层的JavaBean | 描述模型作用及每个属性 |
|  @Operation  |       方法        |      描述方法作用      |
| @ApiResponse |       方法        |    描述响应状态码等    |



#### docket配置
如果有多个Docket，配置如下
```java
@Bean
public GroupedOpenApi publicApi() {
    return GroupedOpenApi.builder()
        .group("springshop-public")
        .pathsToMatch("/public/**")
        .build();
}
@Bean
public GroupedOpenApi adminApi() {
    return GroupedOpenApi.builder()
        .group("springshop-admin")
        .pathsToMatch("/admin/**")
        .addMethodFilter(method -> method.isAnnotationPresent(Admin.class))
        .build();
}
```
#### OpenAPI配置
```java
  @Bean
  public OpenAPI springShopOpenAPI() {
      return new OpenAPI()
              .info(new Info().title("SpringShop API")
              .description("Spring shop sample application")
              .version("v0.0.1")
              .license(new License().name("Apache 2.0").url("http://springdoc.org")))
              .externalDocs(new ExternalDocumentation()
              .description("SpringShop Wiki Documentation")
              .url("https://springshop.wiki.github.org/docs"));
  }
```
### Springfox 迁移
#### 注解变化
| 原注解 | 现注解 | 作用 |
| :-: | :-: | :-: |
| @Api  | @Tag | 描述Controller |
| @ApiIgnore  | @Parameter(hidden = true) ||
|@Operation(hidden = true)|||
|@Hidden | 描述忽略操作 ||
| @ApiImplicitParam | @Parameter | 描述参数 |
| @ApiImplicitParams  | @Parameters | 描述参数 |
| @ApiModel | @Schema | 描述对象 |
| @ApiModelProperty(hidden = true) | @Schema(accessMode = READ_ONLY) | 描述对象属性 |
| @ApiModelProperty | @Schema | 描述对象属性 |
| @ApiOperation(value = "foo", notes = "bar") | @Operation(summary = "foo", description = "bar") | 描述方法 |
| @ApiParam  | @Parameter | 描述参数 |
| @ApiResponse(code = 404, message = "foo")  | @ApiResponse(responseCode = "404", description = "foo") | 描述响应 |

#### Docket配置

1. 以前写法
```java
  @Bean
  public Docket publicApi() {
      return new Docket(DocumentationType.SWAGGER_2)
              .select()
              .apis(RequestHandlerSelectors.basePackage("org.github.springshop.web.public"))
              .paths(PathSelectors.regex("/public.*"))
              .build()
              .groupName("springshop-public")
              .apiInfo(apiInfo());
  }

  @Bean
  public Docket adminApi() {
      return new Docket(DocumentationType.SWAGGER_2)
              .select()
              .apis(RequestHandlerSelectors.basePackage("org.github.springshop.web.admin"))
              .paths(PathSelectors.regex("/admin.*"))
              .apis(RequestHandlerSelectors.withMethodAnnotation(Admin.class))
              .build()
              .groupName("springshop-admin")
              .apiInfo(apiInfo());
  }
```

2. 新的写法
```java
  @Bean
  public GroupedOpenApi publicApi() {
      return GroupedOpenApi.builder()
              .group("springshop-public")
              .pathsToMatch("/public/**")
              .build();
  }
  @Bean
  public GroupedOpenApi adminApi() {
      return GroupedOpenApi.builder()
              .group("springshop-admin")
              .pathsToMatch("/admin/**")
              .addOpenApiMethodFilter(method -> method.isAnnotationPresent(Admin.class))
              .build();
  }
```

3. 添加OpenAPI组件
```java
  @Bean
  public OpenAPI springShopOpenAPI() {
      return new OpenAPI()
              .info(new Info().title("SpringShop API")
              .description("Spring shop sample application")
              .version("v0.0.1")
              .license(new License().name("Apache 2.0").url("http://springdoc.org")))
              .externalDocs(new ExternalDocumentation()
              .description("SpringShop Wiki Documentation")
              .url("https://springshop.wiki.github.org/docs"));
  }
```
