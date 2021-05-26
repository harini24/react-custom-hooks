import { useState } from 'react';
import useHttp from '../../hooks/use-httpReq'
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {


  const { isLoading, error, sendReq: sendTasksReq } = useHttp()

  const craeteTasks = (taskText,obj) => {
    const generatedId = obj.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }
  const enterTaskHandler = async (taskText) => {

    sendTasksReq({
      url: 'https://react-burger-builder-29b01-default-rtdb.firebaseio.com//tasks.json',
      method: 'POST',
      body: { text: taskText },
      headers: {
        'Content-Type': 'application/json',
      }
    }, craeteTasks.bind(this,taskText));

  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
