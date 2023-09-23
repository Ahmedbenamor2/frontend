import { Form, useActionData, useNavigation } from 'react-router-dom';
import classes from './AddProjectPopup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useInfo } from '../contexts/InfoContext';



const AddProjectPopup = ({ trigger, onClosePopup }) => {
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const errorData = useActionData();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [position, setPosition] = useState({ x: 300, y: 10 });
    const {openModal,setMessage}=useInfo();


    const handleDragStart = (event) => {
        const offsetX = event.clientX - position.x;
        const offsetY = event.clientY - position.y;
    
        const handleDragMove = (e) => {
          const newX = e.clientX - offsetX;
          const newY = e.clientY - offsetY;
          setPosition({ x: newX, y: newY });
        };
    
        const handleDragEnd = () => {
          document.removeEventListener('mousemove', handleDragMove);
          document.removeEventListener('mouseup', handleDragEnd);
        };
    
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
      };


    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

     useEffect(() => {
         if (errorData && errorData.length > 0) {
             setError(
                 alert(errorData)
             );
         } else {
             setError(''); 
         }
     }, [errorData]);

    const submitHandler = () => {
        if (navigation.state !== 'submitting') {
            onClosePopup(); // Close the popup
            setTitle('');
            setDescription('');
            setMessage('Project added successfully!');
            openModal();
        }
    };

    const isSubmitDisabled = title.trim() === '' || description.trim() === '';

    return trigger ? (
        <div className={classes.popup}>
            {error}
            <div className={classes.popupInner} style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleDragStart}>
                <button onClick={onClosePopup}><FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
                <h4>Add a new project</h4>
                <Form method='post' onSubmit={submitHandler}>
                    <div className={classes.formElement}>
                        <label>title:</label>
                        <input type='text' name='title' value={title} onChange={handleTitleChange} />
                    </div>
                    <div className={classes.formElement}>
                        <label>description:</label>
                        <textarea rows='6' cols='40' name='description' value={description} onChange={handleDescriptionChange}>
                        </textarea>
                    </div>
                    <div className={classes.formElement}>
                        <button disabled={isSubmitDisabled}>{navigation.state === 'submitting' ? 'Submitting...' : 'Add Project'}</button>
                    </div>
                </Form>
            </div>
            
        </div>
    ) : ''
}

export default AddProjectPopup;


