import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [posts,setPosts] = useState([]);
  const [title,setTitle] = useState("");
  const [author,setAuthor] = useState("");
  const [des,setDesc] = useState("");
  const url = "http://23a99e5444e7.ngrok.io"




  const getData = async () => {
    const result = await axios.get(url + "/posts");
    setPosts(result.data);
  }

  const addData = async () => {
    const obj = {
      title:title,
      author:author,
      desc:des
    }
    const res = await axios.post(url + "/posts",obj)
    let state = posts;
    let temp = state.concat(res)
    setPosts(temp)
    
  }

  useEffect(() => {
   getData()
  }, [posts.length])


  const _handleEdit = async (id) => {
    const obj = {
      title:title,
      author:author,
      desc:des
    }
    const res = await axios.put(url + '/posts/' + id,obj)
    let state = posts;
    let temp = state.concat(res)
    setPosts(temp)

  }

  const _handleDelete  = async(id) => {
    const res = posts.filter(i => i._id !== id)  
    setPosts(res)
    await axios.delete(url + '/posts/' + id);

  }

  const _handleAdd = () => {
    addData();
  }

  const _handleBindingData = (obj) => {
    setTitle(obj.title)
    setAuthor(obj.author)
    setDesc(obj.desc)
  }

  return (
    <div  className='container'>     
        <div className="information-container">
          <form className="form-container">
            <label>Title : </label><input onChange={(text) => setTitle(text.target.value)} value={title} title="Title :"></input>
            <label>Author : </label><input onChange={(text) => setAuthor(text.target.value)} value={author} title="Title :"></input>
            <label>Description : </label><input onChange={(text) => setDesc(text.target.value)} value={des} title="Title :"></input>
          </form>
          <button onClick={_handleAdd} className="button" title="edit">ADD</button>      
          <button onClick={() => {setTitle("");setAuthor("");setDesc("")}} className="button" title="edit">REFRESH</button>              
        
        </div>   
       
        {posts.map(item => {
          return(
            <div onClick={() =>_handleBindingData(item)} className="ul-container">     
                <div key={item._id} className="list-result" style={{margin:40}}>
                  <span className="li-item"><b>Title :</b> {item.title}</span>
                  <span className="li-item"><b>Author :</b> {item.author}</span>
                  <span className="li-item"><b>Description :</b> {item.desc}</span>                
                </div>     
                <button onClick={() =>_handleEdit(item._id)} className="button" title="edit">Edit</button>      
                  <button onClick={() => _handleDelete(item._id)} className="button" title="edit">Delete</button>
            </div>
          )
        })}

        
    </div>
  );
}


export default App;
