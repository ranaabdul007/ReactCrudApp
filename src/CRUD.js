import React,{useState,useEffect} from 'react'
import { Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faEdit, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';


const CRUD = () => {
  ///// Dummy Data
  const empdata=[
    {
     id:1,
     itemDescription:'Mobile',
     itemStatus : 'Active'
    },
    {
     id:2,
     name:'Mobile',
     itemDescription : 'Active'
    }
  ] 

  /////
  const [data,setData]= useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //// for new record
  const[itemName,setItemName]= useState('');
  const[itemDescription,setItemDescription]= useState('');  
  const[itemStatus,setItemStatus]= useState('');
  
////// for edit

const[editItemId,setEditItemId]= useState(''); 
const[editItemName,setEditItemName]= useState(''); 
const[editItemDescription,setEditItemDescription]= useState('');  
const[editItemStatus,setEditItemStatus]= useState('');


  const handleUpdate = () => {
     
    const url = `http://localhost:5133/api/Item/${editItemId}`;
    const data ={
        "itemId"   : editItemId,
        "itemName" : editItemName,
        "itemDescription" : editItemDescription,
        "itemStatus": editItemStatus
    }
    axios.put(url,data)
    .then((result)=>{
        getData();
        clear();
        toast.success('Item has been Updated');

    }).catch((error)=>{
        toast.error(error);
    })
  }

  useEffect(()=> {
     //setData(empdata);
     getData();
  },[])

  const getData = () => {
    axios.get('http://localhost:5133/api/Item')
    .then((result)=>{
        setData(result.data)
    })
    .catch((error)=>{
        console.log(error);
    })
  }
  const handleDelete=(id)=>{
    if(window.confirm("Are you sure you want to delete this Item"== true)){
       axios.delete(`http://localhost:5133/api/Item/${id}`)
       .then((result)=>{
        if(result.status===200){
            toast.success('Item has been deleted');
            getData();
        }
       }).catch((error)=>{
        toast.error(error);
    })
    }
    
}
 const handleSave = ()=> {
    const url='http://localhost:5133/api/Item';
    const data ={
        "itemName" : itemName,
        "itemDescription" : itemDescription,
        "itemStatus": itemStatus
        
    }
    axios.post(url,data)
    .then((result)=>{
        getData();
        clear();
        toast.success('Item has been added');

    }).catch((error)=>{
        toast.error(error);
    })

 }
const handleEdit=(id)=>{
    
    handleShow();
        axios.get(`http://localhost:5133/api/Item/${id}`)
        .then((result)=>{
            setEditItemName(result.data.itemName);
         setEditItemDescription(result.data.itemDescription);
        setEditItemStatus(result.data.itemStatus);
        

         setEditItemId(id);
         
        }).catch((error)=>{
         toast.error(error);
     })
    

    }

    const clear = () => {
        setItemName('');
        setItemStatus('');
        setItemDescription('');
        setEditItemName('');
        setEditItemDescription('');
        setEditItemStatus('');
        setEditItemId('');
     }

 return (
    <div>
       
      <Fragment>

        {/* new item form */}
      <br></br>
     <br></br>
     <div className='container' style={{ 
      border: '1px solid #ccc', 
      padding: '10px', 
      borderRadius: '5px', 
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}} >

      <div className='container' style={{ 
      border: '1px solid #ccc', 
      padding: '10px', 
      borderRadius: '5px', 
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}} >
        
        <h3 >Add New Item </h3>
        </div> 
      <br></br>
     <br></br>
        <div className='container' style={{ 
      border: '1px solid #ccc', 
      padding: '10px', 
      borderRadius: '5px', 
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
            <ToastContainer/>
        <Container>
      <Row>
      <Col><input type='text' className='form-control' placeholder='Enter Name'
       value={itemName} onChange={(e)=> setItemName(e.target.value)} required
       /></Col>
        <Col><input type='text' className='form-control' placeholder='Enter Description'
       value={itemDescription} onChange={(e)=> setItemDescription(e.target.value)} required
       /></Col>
        <Col><input type='text' className='form-control' placeholder='Enter Status'
        value={itemStatus} onChange={(e)=> setItemStatus(e.target.value)} required
        /></Col>
        
        
        <Col><button className='btn btn-primary' onClick={()=> handleSave()}>Submit</button> </Col>
      </Row>
     
    </Container>
    </div>
    </div>
    <div className='container' style={{ 
      border: '1px solid #ccc', 
      padding: '10px', 
      borderRadius: '5px', 
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}} >

    <div className='container' style={{ 
      border: '1px solid #ccc', 
      padding: '10px', 
      borderRadius: '5px', 
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}} >
        
        <h2>All Items</h2>
        </div> 
       
     <br></br>
     <br></br>
        <div className='container' style={{ 
      border: '1px solid #ccc', 
      padding: '10px', 
      borderRadius: '5px', 
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}} >
      

     
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Status</th>
          
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length > 0 ?
            data.map((item,index)=>{
                return(
        <tr key={index}>
            <td>{item.itemId}</td>
            <td>{item.itemName}</td>
          <td>{item.itemDescription}</td>
          <td>{item.itemStatus}</td>
          
          <td colSpan={2}>
            <button className='btn btn-primary' onClick={()=> handleEdit(item.itemId)}>
            <FontAwesomeIcon icon={faUserEdit} style={{ color: 'blue' }} />
                </button> &nbsp;
            
            <button className='btn btn-danger' onClick={()=> handleDelete(item.itemId)}>
            <FontAwesomeIcon icon={faTrash} style={{ color: 'grey' }}/>
            </button>
          </td>
        </tr> 
                )
            })
            :
            'Loading.....'
        }
       
        
      </tbody>
    </Table>
    </div>
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col><input type='text' name='editItemName' className='form-control' placeholder='Enter ItemName'
        value={editItemName} onChange={(e)=> setEditItemName(e.target.value)}
        /></Col>
        <Col><input type='text' name='editItemDescription' className='form-control' placeholder='Enter ItemDiscription'
        value={editItemDescription} onChange={(e)=> setEditItemDescription(e.target.value)}
        /></Col>
        
        <Col><input type='text' name='editItemStatus' className='form-control' placeholder='Enter Status'
        value={editItemStatus} onChange={(e)=> setEditItemStatus(e.target.value)}
        /></Col>
       
      </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </Fragment>
    </div>
    
  )
}

export default CRUD
