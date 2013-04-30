#Calculate Paternity index.
1.formula
2.friendly UI
3.database-xml
##2.界面
  为了简化开发，使用Bootstrap框架做UI
##3.数据库
  采用XML作为数据库，每一个XML文件是一个单独的试剂盒。XML文件中，基因座是根节点，只有一级子节点-等位基因。例如：
```html
<?xml version="1.0" encoding="utf-8"?>
<allele>
	<a12>0.5</a12>
	<a13>0.6</a13>
	<a14>0.7</a14>
</allele>
```
