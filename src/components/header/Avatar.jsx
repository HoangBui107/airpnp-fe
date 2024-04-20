const Avatar = ({src}) =>{
    return(
        <img 
        className="rounded-full" 
        height="30" 
        width="30" 
        src={src || 'https://github.com/AntonioErdeljac/next13-airbnb-clone/blob/master/public/images/placeholder.jpg?raw=true'} 
        alt=""/>
    )
}
export default Avatar;