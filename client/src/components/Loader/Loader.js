import React from 'react';
import loaderGif from '../../img/loader.gif';

export default function Loader({ marginTop, marginBottom }) {

  let style = {
    marginTop: marginTop,
    marginBottom: marginBottom
  }

  return (
    <div>
      <img src={loaderGif} alt='loader' width='100px' style={style}/>
    </div>
  );
}