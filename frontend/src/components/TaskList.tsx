import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Tag, 
  Modal, 
  message, 
  Popconfirm, 
  Tooltip,
  Badge,
  Typography
} from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  PlayCircleOutlined, 
  EyeOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Task, TaskExecution } from '../types/Task';
import TaskForm from './TaskForm';
import TaskExecutionModal from './TaskExecutionModal';
import dayjs from 'dayjs';

const { Text } = Typography;

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (id: string) => void;
  onTaskExecute: (id: string) => void;
  loading?: boolean;
  onRowClick?: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onTaskUpdate, 
  onTaskDelete, 
  onTaskExecute,
  loading = false,
  onRowClick,
}) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showExecutions, setShowExecutions] = useState(false);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await onTaskDelete(id);
      message.success('Task deleted successfully!');
    } catch (error) {
      message.error('Failed to delete task');
    }
  };

  const handleExecute = async (id: string) => {
    try {
      await onTaskExecute(id);
      message.success('Task executed successfully!');
    } catch (error) {
      message.error('Failed to execute task');
    }
  };

  const handleViewExecutions = (task: Task) => {
    setSelectedTask(task);
    setShowExecutions(true);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      sorter: (a: Task, b: Task) => a.id.localeCompare(b.id),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Task, b: Task) => a.name.localeCompare(b.name),
      render: (name: string) => (
        <Text strong>{name}</Text>
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      sorter: (a: Task, b: Task) => a.owner.localeCompare(b.owner),
    },
    {
      title: 'Command',
      dataIndex: 'command',
      key: 'command',
      ellipsis: true,
      render: (command: string) => (
        <Tooltip title={command}>
          <Text code>{command}</Text>
        </Tooltip>
      ),
    },
    {
      title: 'Executions',
      dataIndex: 'taskExecutions',
      key: 'executions',
      width: 120,
      render: (executions: TaskExecution[]) => (
        <Badge 
          count={executions.length} 
          showZero 
          color="blue"
        />
      ),
    },
    {
      title: 'Last Execution',
      dataIndex: 'taskExecutions',
      key: 'lastExecution',
      width: 150,
      render: (executions: TaskExecution[]) => {
        if (executions.length === 0) {
          return <Tag color="default">Never</Tag>;
        }
        const lastExecution = executions[executions.length - 1];
        return (
          <Tag color="green">
            {dayjs(lastExecution.endTime).format('MMM DD, HH:mm')}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (_, record: Task) => (
        <Space size="small">
          <Tooltip title="View Executions">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleViewExecutions(record)}
              aria-label={`View executions for task ${record.name}`}
            />
          </Tooltip>
          <Tooltip title="Execute Task">
            <Button
              icon={<PlayCircleOutlined />}
              size="small"
              type="primary"
              onClick={() => handleExecute(record.id)}
              aria-label={`Execute task ${record.name}`}
            />
          </Tooltip>
          <Tooltip title="Edit Task">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEdit(record)}
              aria-label={`Edit task ${record.name}`}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this task?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete Task">
              <Button
                icon={<DeleteOutlined />}
                size="small"
                danger
                aria-label={`Delete task ${record.name}`}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        loading={loading}
        onRow={(record) => ({
          onClick: () => onRowClick ? onRowClick(record.id) : handleViewExecutions(record),
          style: { cursor: 'pointer' },
        })}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} tasks`,
        }}
        scroll={{ x: 800 }}
        size="small"
      />

      <Modal
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        open={showTaskForm}
        onCancel={() => {
          setShowTaskForm(false);
          setEditingTask(null);
        }}
        footer={null}
        width={600}
        destroyOnClose
      >
        <TaskForm
          editingTask={editingTask}
          onTaskCreated={(task) => {
            onTaskUpdate(task);
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          onTaskUpdated={(task) => {
            onTaskUpdate(task);
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      </Modal>

      {selectedTask && (
        <TaskExecutionModal
          task={selectedTask}
          visible={showExecutions}
          onClose={() => {
            setShowExecutions(false);
            setSelectedTask(null);
          }}
        />
      )}
    </>
  );
};

export default TaskList;

