---
title: 函数式编程
shortTitle: 函数式编程
description: Java函数式编程（Lambda、Stream）
#icon: /icon/basic/java.png
date: 2024-05-06 09:06:01
categories: [Java, basic]
tags: [Java]
---
## 概念
### 函数化对象

函数本无形，也就是它代表的规则：位置固定、不能传播。

若要有形，让函数的规则能够传播，需要将函数化为对象。

```java
class MyClass {
    static int add(int a, int b) {
        return a + b;
    }
} 
```

```java
public interface Lambda {
    int calculate(int a, int b);
}

Lambda add = (a, b) -> a + b; // 它已经变成了一个 lambda 对象
```

区别

* 前者是纯粹的一条两数加法规则，它的位置是固定的，要使用它，需要通过 `MyClass.add` 找到它，然后执行
* 而后者（add 对象）的位置是可以变化的，想去哪里就去哪里，哪里要用到这条加法规则，把它传递过去
* 接口的目的是为了将来用它来执行函数对象，此接口中**只能有一个方法定义**

函数化为对象的比喻

- 之前是大家要统一去西天取经
- 现在是每个菩萨、罗汉拿着经书，入世传经

> ***P.S.***
>
> * 大部分文献都说 lambda 是匿名函数，但这个说法需要进行补充
> * 至少在 java 里，虽然 lambda 表达式本身不需要起名字，但必须提供一个对应的接口

### 行为参数化





```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private String name;
    private int age;
    private String sex;
}
```







## 语法



## Stream API



## 实际应用



## 实现原理

