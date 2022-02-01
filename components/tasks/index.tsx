import { useEffect, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm, message, Form, Input, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import CommonInput from '../commonInput';
import { CheckValidations, destructureInputState, RequiredValidation } from '../../helpher';
import CommonSelect from '../commonSelect';
const { Option } = Select;
const { TextArea } = Input;

interface tastItem {
    id: number,
    taskName: string,
    project: string,
    comments: string,
    date: Date;
}

interface inputWithError {
    value: string,
    error: boolean,
    message: string
}

interface optionType {
    value: string,
    label: string
}

const commonInputValue: inputWithError = { value: '', error: false, message: '' }

const Tasks = () => {

    const [taskList, setTaskList] = useState([] as tastItem[]);
    const [createTaskPopup, setCreateTaskPopup] = useState(false as boolean);
    const [editTaskPopup, setEditTaskPopup] = useState(false as boolean);

    const [SelectedTaskForEdit, setSelectedTaskForEdit] = useState({} as tastItem);

    const [taskName, setTaskName] = useState(commonInputValue as inputWithError);
    const [projectList, setProjectList] = useState([
        { value: 'Project 1', label: 'Project 1' },
        { value: 'Project 2', label: 'Project 2' },
    ] as optionType[]);

    const [projectName, setProjectName] = useState(commonInputValue as inputWithError);
    const [comments, setComments] = useState('' as string);

    useEffect(() => {
        setTaskList(() => [1, 2,].map((item, index) => ({
            id: item,
            taskName: `Task ${item}`,
            project: `Project ${item}`,
            comments: `Sample Comment ${item}`,
            date: new Date()
        })));
    }, []);

    const handleEdit = (data: tastItem) => {
        setEditTaskPopup(true);
        setSelectedTaskForEdit(data);
        setProjectName(prev => ({ ...prev, ...commonInputValue, value: data.project }));
        setTaskName(prev => ({ ...prev, ...commonInputValue, value: data.taskName }));
        setComments(data.comments);
    }

    const handleDelete = (data: tastItem) => {
        setTaskList((prev) => {
            return [...prev].filter(item => item.id !== data.id);
        })
        message.success('Task Deleted Successfully')
    }

    const columns = [
        {
            title: "Task ID",
            dataIndex: "id",
            key: "1",
            align: "center" as 'center'
        },
        {
            title: "Task Name",
            dataIndex: "taskName",
            key: "2",
        },
        {
            title: "Project",
            dataIndex: "project",
            key: "3",
        },
        {
            title: "Comments",
            dataIndex: "comments",
            key: "4",
        },
        {
            title: "Task Edit",
            key: "task-edit",
            render: (data: tastItem) => <Button key={'edit-button'} onClick={() => handleEdit(data)}>Edit</Button>
        },
        {
            title: "Task Delete",
            key: "task-delete",
            render: (data: tastItem) => <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => handleDelete(data)}
                okText="Yes"
                cancelText="No"
            >
                <Button>Delete</Button>
            </Popconfirm>
        }
    ];

    const handleCloseCreate = () => {
        setCreateTaskPopup(false);
        setTaskName(prev => ({ ...prev, ...commonInputValue }));
        setProjectName(prev => ({ ...prev, ...commonInputValue }));
        setComments('');
    }

    const handleCreateTask = () => {
        if (CheckValidations([
            RequiredValidation(taskName, setTaskName),
            RequiredValidation(projectName, setProjectName),
        ])) {
            setTaskList(prev => {
                let sortedTask = prev.sort((a, b) => a.id - b.id);
                let value = {
                    id: (sortedTask[taskList.length - 1].id) + 1,
                    taskName: taskName.value,
                    project: projectName.value,
                    comments: comments,
                    date: new Date()
                }
                return [...prev, value]
            })
            message.success('Task Created Successfully')
            handleCloseCreate()
        }
    }

    const handleCloseEdit = () => {
        setEditTaskPopup(false);
        setTaskName(prev => ({ ...prev, ...commonInputValue }));
        setProjectName(prev => ({ ...prev, ...commonInputValue }));
        setComments('');
    }

    const handleEditTask = () => {
        if (CheckValidations([
            RequiredValidation(taskName, setTaskName),
            RequiredValidation(projectName, setProjectName),
        ])) {
            setTaskList(prev => {
                let task: number = [...prev].findIndex((task: tastItem) => task.id === SelectedTaskForEdit.id);
                let clonedTasks = [...prev]
                if (task != -1) {
                    clonedTasks[task].taskName = taskName.value;
                    clonedTasks[task].comments = comments;
                    clonedTasks[task].project = projectName.value;
                }
                return [...clonedTasks]
            })
            message.success('Task Updated Successfully')
            handleCloseEdit()
        }
    }

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 24,
        },
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): any => {
        let { name = '', value = '' } = event.target;
        switch (name) {
            case 'taskName': return setTaskName(prev => ({ ...prev, ...commonInputValue, value }));
            case 'projectName': return setProjectName(prev => ({ ...prev, ...commonInputValue, value }));
            case 'comments': return setComments(value);
        }
    }


    return <div className='task-container'>
        <Button icon={<PlusCircleOutlined color='green' />} onClick={() => setCreateTaskPopup(true)}>Create New</Button>

        <Table columns={columns} rowKey={'id'} dataSource={taskList} sticky />

        <Modal
            visible={createTaskPopup}
            title="Create Task"
            centered
            onOk={handleCreateTask}
            onCancel={handleCloseCreate}
            footer={[
                <Button key="back" onClick={handleCloseCreate}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" htmlType='submit' onClick={handleCreateTask}>
                    Create
                </Button>
            ]}
        >
            <Form {...layout} layout='vertical' name="control-hooks" onFinish={handleCreateTask}>
                <CommonInput label='Task Name' {...destructureInputState(taskName)} onChange={handleFormChange} name='taskName' required placeholder='Enter Task Name' />
                <CommonSelect label='Profile Name' options={projectList} {...destructureInputState(projectName)} onChange={handleFormChange} name='projectName' required placeholder='Enter Project Name' />

                <label>Comments</label>
                <textarea name='comments' value={comments} rows={4} placeholder='Enter the Comments' onChange={handleFormChange} >
                </textarea>
            </Form>
        </Modal>

        <Modal
            visible={editTaskPopup}
            title="Edit Task"
            centered
            onOk={handleEditTask}
            onCancel={handleCloseEdit}
            footer={[
                <Button key="back" onClick={handleCloseEdit}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" htmlType='submit' onClick={handleEditTask}>
                    Update
                </Button>
            ]}
        >
            <Form {...layout} layout='vertical' name="control-hooks" onFinish={handleEditTask}>
                <CommonInput label='Task Name' {...destructureInputState(taskName)} onChange={handleFormChange} name='taskName' required placeholder='Enter Task Name' />
                <CommonSelect label='Profile Name' options={projectList} {...destructureInputState(projectName)} onChange={handleFormChange} name='projectName' required placeholder='Enter Project Name' />

                <label>Comments</label>
                <textarea name='comments' value={comments} rows={4} placeholder='Enter the Comments' onChange={handleFormChange} >
                </textarea>
            </Form>
        </Modal>
    </div>;
};

export default Tasks;