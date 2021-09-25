<h1>CompilerJs </h1>
CompilerJs is Node JS library use to compile code for programing languages like C/C++, Java, Python.
<br/>Support Mac OS(Timeout functionality is not implemented), Windows and Linux System.

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
const compilerJs = require('@00sukhjeet00/compilerjs');
compilerJs.init();
```
init() creates a folder named code in your project directory which is used for storage purpose.
Before using other methods , make sure to call init() method.

<h5>2)C and C++ </h5>

```javascript
    //Implementation for windows  
    const envData = { ext : "g++",options:{timeout:5000}} // (uses g++ command to compile )
    //Implementation for Linux and Mac OS(Timeout functionlity is not implemented)
    const envData = { OS : "linux" , ext : "gcc" } // ( uses gcc command to compile )
    compilerJs.compileCPP(envData , code ,(data)=> {
        console.log(data)
        //data.error = error message 
        //data.output = output value
    })
```

<h5>3)C and C++ with inputs </h5>

```javascript
    //Implementation for windows Linux and Mac OS(Timeout functionlity is not implemented)
    const envData = { ext : "g++",options:{timeout:5000}} // (uses g++ command to compile )
    
    //Implementation for  Linux and Mac OS(Timeout functionlity is not implemented)
    const envData = { ext : "gcc" ,options:{timeout:5000}}; // ( uses gcc command to compile )
    
    compilerJs.compileCPPWithInput(envData , code , input , (data)=> {
       	console.log(data);
    });
```

<h5>4)Java</h5>

```javascript
    var envData = { ext:"java" ,options:{timeout:5000} }; 
    compilerJs.compileJava( envData , code ,(data)=>{
        console.log(data);
    });    
```

<h5>5)Java with inputs</h5>

```javascript
    const envData = { ext:"java" ,options:{timeout:5000} }; 
    compilerJs.compileJavaWithInput( envData , code , input ,(data)=>{
        console.log(data);
    });
```
<h5>6)Python</h5>

```javascript
    const envData = { ext:"py" ,options:{timeout:5000} }; 
    compilerJs.compilePython( envData , code ,(data)=>{
        console.log(data);
    });    
```

<h5>7)Python with inputs</h5>

```javascript
    const envData = { ext:"py" options: {timeout:5000} }; 
    compilerJs.compilePythonWithInput( envData , code , input ,(data)=>{
        console.log(data);        
    });
```
<h2>Timeout functionality</h2>
Timeout help to run program for perticular time (in ms). It support window and linux system. Timeout can be used similarly in C/C++, Java, Python as showen below. 

```javascript
	const envData={ ext: "py", options: {timeout:5000} } // timeout: 5 running program for 5 sec.
```

<h2>Demo Code</h2>
<h4>Python:</h4>

```javascript
	const compilerJS = require('@00sukhjeet00/compilerjs')
	compilerJs.init()
	const envData = { ext: 'py', options: { timeout: 1 } }
	const code=`print('hello')`
	compilerJs.compilePy(envData, code, (data) => {
    		if (data.error)
        		console.log(data.error)
    		else
		{
        		if (data.timeout)
            			console.log('TLE')
        		else
            			console.log(data.out)
    		}
	})
```
