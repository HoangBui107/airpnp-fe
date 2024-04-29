import React from "react";
import Card from"../card/Card"

function List( {posts} ) {
    return (
      <div className="flex flex-col gap-8 border border-gray-200 rounded-2xl">
        {posts.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    ); 
  }
  
  export default List;
