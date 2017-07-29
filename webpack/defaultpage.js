import React, { Component } from 'react';
import {render} from 'react-dom';


function tick() {  
  render(
  	<div>
    	<h2>Default page  , local time: {new Date().toLocaleTimeString()}.</h2>
    </div>,
    document.getElementById('root')
  );
}

tick();
setInterval(tick, 1000);


