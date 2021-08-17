#CompilerJs 
CompilerJs is Node JS library use to compile code for programing languages like C/C++, Java, Python.
Currently support Window and Linux

Setting Up Compilers 
====================
Inorder to compile any programming language , you need to first have the compiler for that programming language in the server machine.

<h4>C and C++</h4>
<ol>
<li><b>Installation :</b>You need GCC compiler that can compile programs from your cmd/terminal
    <ul>
    <li>Windows - You can get <a href="http://www.mingw.org/">MinGw</a> . </li>
    <li>Linux - Most of the linux versions are installed with gcc by default. If you haven't got , Take a look at <a href="http://gcc.gnu.org/wiki/InstallingGCC">Installing GCC</a> . </li>
    </ul>
</li>
<li><b>Testing the Environment :</b>After installing , set your environment variables for accessing the GCC command lines from any directory
    <ul>
    <li>Windows - create a c file in a directory , execute <br/> 
    <i><b>g++ filename.c -o output.exe<br/>
    output.exe</b></i><br/>
    then you will get the output of the program</li>
    <li>Linux - create a c file in a directory , execute <br/>
    <i><b>gcc filename.c -o output.out<br/>
    ./output.out</b></i><br />
    then you will get the output of the program</li>
    </ul>
</ol>

<h4>Java</h4>
<ol>
<li><b>Installion :</b> You need JDK ( Java Development Kit ) to compile Java programs.Click <a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html"> here </a> to download JDK for various platforms.</li>
<li><b>Testing the Environment :</b>After installing , set your environment variables for accessing the javac command lines from any directory
<ul>
<li>Create a Java file named Main.java with main function<br/>
<i><b>javac Main.java <br />
java Main </b></i><br/>
then you will get the output of the program.
</li>
</ul>
</ol>

<h4>Python</h4>
<ol>
<li><b>Installation :</b> You can get and install Python from <a href="https://www.python.org/download/"> here </a></li>
<li><b>Testing the Environment :</b>After installing , set your environment variables for accessing python command lines from any directory
<ul>
<li>Create a python file hello.py and execute <br/>
<i><b>python hello.py</b></i><br/>
then you will get the output of the program.
</li>
</ul>
</ol>

Documentation
=============
<h5>1)Require compilerJs </h5>

```javascript
const compilerJs = require('compileJs');
compilerJs.init();
```
init() creates a folder named code in your project directory which is used for storage purpose.
Before using other methods , make sure to call init() method.

<h5>2)C and C++ </h5>

```javascript
    //if windows  
    const envData = { OS : "windows" , ext : "g++"}; // (uses g++ command to compile )
    //else
    const envData = { OS : "linux" , ext : "gcc" }; // ( uses gcc command to compile )
    compilerJs.compileCPP(envData , code ,(data)=> {
        res.send(data);
        //data.error = error message 
        //data.output = output value
    });
    
    //res is the response object
```

<h5>3)C and C++ with inputs </h5>

```javascript
    //if windows  
    const envData = { OS : "windows" , ext : "g++"}; // (uses g++ command to compile )
    //else
    const envData = { OS : "linux" , ext : "gcc" }; // ( uses gcc command to compile )
    compilerJs.compileCPPWithInput(envData , code , input , (data)=> {
        res.send(data);
    });
```

<h5>4)Java</h5>

```javascript
    //if windows  
    var envData = { OS : "windows",ext:"java"}; 
    //if linux
    var envData = { OS : "linux",ext:"java" }; 
    compilerJs.compileJava( envData , code ,(data)=>{
        res.send(data);
    });    
```

<h5>5)Java with inputs</h5>

```javascript
    //if windows  
    const envData = { OS : "windows",ext:"java"}; 
    //if linux
    const envData = { OS : "linux" ,ext:"java"}; 
    compilerJs.compileJavaWithInput( envData , code , input ,(data)=>{
        res.send(data);
    });
```
<h5>6)Python</h5>

```javascript
    //if windows  
    const envData = { OS : "windows", ext:"py"}; 
    //if linux
    const envData = { OS : "linux" , ext:"py"}; 
    compilerJs.compilePython( envData , code ,(data)=>{
        res.send(data);
    });    
```

<h5>7)Python with inputs</h5>

```javascript
    //if windows  
    const envData = { OS : "windows", ext:"py"}; 
    //if linux
    const envData = { OS : "linux" , ext:"py"}; 
    compilerJs.compilePythonWithInput( envData , code , input ,(data)=>{
        res.send(data);        
    });
```
<h5>Optional Timeout functionality</h5>
<p>
Timeout help to run program for perticular time (in sec). It support window and linux system. Timeout can be used similarly in C/C++, Java, Python as showen below. Timeout option return true or false.
</p>
```javascript
//if windows
	const envData={OS: "window", ext: "py", options: {timeout:5} } // timeout: 5 running program for 5 sec.
	
//if linux
	const envData={OS: "linux", ext: "py", options: {timeout:5} } // timeout: 5 running program for 5 sec.
```

<h2>Demo Code</h2>
<h3>Python:</h3>
```javascript
	const CompilerJS = require('compilerJs')
	const code =  `i=input()\nprint('Hello World ',i)`
	const envData = { OS:'windows', ext: 'py', options: { timeout: 5 } }
	const input='1'
	CompilerJS.init()
	CompilerJS.compilePyWithInput(envData, code,input, (data) => {
		if (data.error)
			console.log(data.error)
		else
			console.log(data.output)
	})
```