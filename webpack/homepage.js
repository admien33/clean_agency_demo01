import React, { Component } from 'react';
import {render} from 'react-dom';

import FilterableListPosts from './components/FilterableListPosts';


function tick() {  
  render(
  	<div>
    	<h2> Home page  , local time: {new Date().toLocaleTimeString()}.</h2>
    </div>,
    document.getElementById('root')
  );
}

tick();
setInterval(tick, 1000);

render(
  <FilterableListPosts />,
  document.getElementById('container_posts')
);




