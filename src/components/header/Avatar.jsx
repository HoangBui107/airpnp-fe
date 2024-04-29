const Avatar = ({src}) =>{
    return(
        <img 
        className="rounded-full" 
        height="35" 
        width="35" 
        src={src || 'https://github.com/AntonioErdeljac/next13-airbnb-clone/blob/master/public/images/placeholder.jpg?raw=true'} 
        alt=""/>
    )
}
export default Avatar;