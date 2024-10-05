
<h1>CompilerJs </h1>

CompilerJs is Node JS library use to compile code for programming languages like C/C++, Java, Python.

  

<h2>Setting Up Compilers</h2>

In order to compile any programming language , you need to first have the compiler for that programming language in the server machine.


<h4>Documentation</h4>


<h5>1) Require compilerJs </h5>

  

```javascript

import  { init }  from '@00sukhjeet00/compilerjs';

init();

```

init() creates a folder named code in your project directory which is used for storage purpose.

Before using other methods , make sure to call init() method.

  

<h5>2) C and C++ </h5>

  

```javascript

//Implementation for windows

const  envData  =  { ext :  "g++",options:{timeout:5000}}  // (uses g++ command to compile )

//Implementation for Linux and Mac OS(Timeout functionlity is not implemented)

const  envData  =  { ext :  "gcc", options:{timeout:5000}  }  // ( uses gcc command to compile )

compileCPP(envData  ,  code  ,(data)=>  {

console.log(data)

//data.error = error message

//data.output = output value

})

```

  

<h5>3) C and C++ with inputs </h5>

  

```javascript

//Implementation for windows Linux and Mac OS(Timeout functionlity is not implemented)

const  envData  =  { ext :  "g++",options:{timeout:5000}}  // (uses g++ command to compile )

//Implementation for Linux and Mac OS(Timeout functionlity is not implemented)

const  envData  =  { ext :  "gcc"  ,options:{timeout:5000}};  // ( uses gcc command to compile )

compileCPPWithInput(envData  ,  code  ,  input  ,  (data)=>  {

console.log(data);

});

```

  

<h5>4) Java</h5>

  

```javascript

var  envData  =  { ext:"java"  ,options:{timeout:5000}  };

compileJava(  envData  ,  code  ,(data)=>{

console.log(data);

});

```

  

<h5>5) Java with inputs</h5>

  

```javascript

const  envData  =  { ext:"java"  ,options:{timeout:5000}  };

compilerJs.compileJavaWithInput(  envData  ,  code  ,  input  ,(data)=>{

console.log(data);

});

```

<h5>6) Python</h5>

  

```javascript

const  envData  =  { ext:"py"  ,options:{timeout:5000}  };

compilePython(  envData  ,  code  ,(data)=>{

console.log(data);

});

```

  

<h5>7) Python with inputs</h5>

  

```javascript

const  envData  =  { ext:"py"  options: {timeout:5000}  };

compilePythonWithInput(  envData  ,  code  ,  input  ,(data)=>{

console.log(data);

});

```

<h2>Timeout functionality</h2>

Timeout help to run program for particular time (in ms). It support window and linux system. Timeout can be used similarly in C/C++, Java, Python as showen below.

  

```javascript

const  envData={ ext:  "py", options:  {timeout:5000}  }  // timeout: 5 running program for 5 sec.

```

  

<h2>Demo Code</h2>

<h4>Python:</h4>

  

```javascript

import  { init, compilePy }  from '@00sukhjeet00/compilerjs'

init()

const  envData  =  { ext:  'py', options:  { timeout:  1000  }  }

const  code=`print('hello')`

compilePy(envData,  code,  (data)  =>  {

if  (data.error)

console.log(data.error)

else

{

if  (data.timeout)

console.log('TLE')

else

console.log(data.out)

}

})

```

<p>Similar code structure for other languages</p>
