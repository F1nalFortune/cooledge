import React from 'react';

const Item = ({ id, name, condition  }) => (
  <ul>
    <li>
      {name}
    </li>
    <li>
      {condition}
    </li>
  </ul>

)

export default Item;
