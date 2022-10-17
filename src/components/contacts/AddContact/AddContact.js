import React , {useState , useEffect} from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from "../../../components/Spinner/Spinner";


let AddContact = ()=> {
  let navigate = useNavigate();
  
  let[state , setState] = useState({
    loading : false,
    contact : {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: ""
    },
    errorMessage : "",
    groups : []
  });
  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
      ...state.contact,
        [event.target.name] : event.target.value
      }
    });
  }
  useEffect(() => {
    async function ApiCall() {
      try{
        setState({...state, loading: true});
       
        let response = await ContactService.getGroups();
        console.log(response.data);
        setState({...state, loading: false, groups: response.data});
        

      }
      catch(error){
        setState({state, loading: false, errorMessage: error.message});
      }
    }
    ApiCall();
  },[]);

  let submitForm = async (event) => {
    event.preventDefault();
    try{
      let response = await ContactService.createContact(state.contact);
      //console.log(response.data);
      if(response){
        navigate('/contacts/list', {replace: true});
      }
    }
    catch(error){
      setState({state, loading: false, errorMessage: error.message});
      navigate('/contacts/add', {replace: false});
    }
  }
  
  let {loading , contact , errorMessage, groups} = state;
  return (
    <>
    {
       loading ? <Spinner/> : <>
       {/*<pre>{JSON.stringify(state.contact)}</pre>*/}
      <section className='add-contact p-3'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <p className='h4 text-success fw-bold'>Create Contact</p>
              {/*<p className='fst-italic'>lorem</p>*/}
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <form onSubmit={submitForm}>
                <div className='mb-2'>
                <input required="required" name="name"  value={contact.name} onChange={updateInput} type="text" className='form-control' placeholder='Name'/>
                </div>
                <div className='mb-2'>
                <input required="required" name="photo"  value={contact.photo} onChange={updateInput} type="text" className='form-control' placeholder='Photo Url'/>
                </div>
                <div className='mb-2'>
                <input required="required" name="mobile"  value={contact.mobile} onChange={updateInput} type="number" className='form-control' placeholder='Mobile'/>
                </div>
                <div className='mb-2'>
                <input required="required" name="email"  value={contact.email} onChange={updateInput} type="email" className='form-control' placeholder='Email'/>
                </div>
                <div className='mb-2'>
                <input required="required" name="company"  value={contact.company} onChange={updateInput} type="text" className='form-control' placeholder='Company'/>
                </div>
                <div className='mb-2'>
                <input required="required" name="title"  value={contact.title} onChange={updateInput} type="text" className='form-control' placeholder='Title'/>
                </div>
                <div className='mb-2'>
                  <select required="required" name="groupId"  value={contact.groupId} onChange={updateInput} className='form-control'>
                    <option value="">Select a Group</option>
                    {
                      groups.length > 0 &&
                       groups.map(group => {
                        return(
                          <option key={group.id} value={group.id}>{group.name}</option>
                        )
                       })
                    }
                  </select> 
                </div>
                <div className='mb-2'>
                <input type="submit" className='btn btn-success' value="Create"/>
                <Link to="/contacts/list" className='btn btn-dark ms-2'>Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

       </>
    }
      
    </>
  );
}

export default AddContact;