import React, { useState } from 'react';
import { Form, Input, Button, Modal, message, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Task, CreateTaskRequest } from '../types/Task';

interface TaskFormProps {
  onTaskCreated: (task: Task) => void;
  editingTask?: Task | null;
  onTaskUpdated?: (task: Task) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  onTaskCreated, 
  editingTask, 
  onTaskUpdated, 
  onCancel 
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const isEditing = !!editingTask;

  const handleSubmit = async (values: CreateTaskRequest) => {
    setLoading(true);
    try {
      // Basic command validation - prevent dangerous commands
      const dangerousCommands = ['rm', 'del', 'format', 'fdisk', 'mkfs', 'dd', 'shutdown', 'reboot', 'halt'];
      const command = values.command.toLowerCase();
      
      for (const dangerous of dangerousCommands) {
        if (command.includes(dangerous)) {
          message.error(`Command contains potentially dangerous operation: ${dangerous}`);
          setLoading(false);
          return;
        }
      }

      // Additional validation for shell injection
      if (command.includes('&&') || command.includes('||') || command.includes(';') || command.includes('|')) {
        message.error('Command contains potentially unsafe shell operators');
        setLoading(false);
        return;
      }

      if (isEditing && onTaskUpdated) {
        onTaskUpdated({ ...values, taskExecutions: editingTask.taskExecutions });
      } else {
        onTaskCreated(values);
      }
      
      form.resetFields();
      message.success(isEditing ? 'Task updated successfully!' : 'Task created successfully!');
    } catch (error) {
      message.error('Failed to save task');
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        id: editingTask.id,
        name: editingTask.name,
        owner: editingTask.owner,
        command: editingTask.command,
      });
    }
  }, [editingTask, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={editingTask || {}}
    >
      <Form.Item
        label="Task ID"
        name="id"
        rules={[
          { required: true, message: 'Please enter task ID' },
          { min: 1, message: 'Task ID must be at least 1 character' }
        ]}
      >
        <Input 
          placeholder="Enter unique task ID" 
          disabled={isEditing}
          aria-label="Task ID"
        />
      </Form.Item>

      <Form.Item
        label="Task Name"
        name="name"
        rules={[
          { required: true, message: 'Please enter task name' },
          { min: 2, message: 'Task name must be at least 2 characters' }
        ]}
      >
        <Input 
          placeholder="Enter task name" 
          aria-label="Task Name"
        />
      </Form.Item>

      <Form.Item
        label="Owner"
        name="owner"
        rules={[
          { required: true, message: 'Please enter owner name' },
          { min: 2, message: 'Owner name must be at least 2 characters' }
        ]}
      >
        <Input 
          placeholder="Enter owner name" 
          aria-label="Task Owner"
        />
      </Form.Item>

      <Form.Item
        label="Command"
        name="command"
        rules={[
          { required: true, message: 'Please enter command' },
          { min: 3, message: 'Command must be at least 3 characters' }
        ]}
      >
        <Input.TextArea 
          placeholder="Enter shell command (e.g., echo Hello World)" 
          rows={3}
          aria-label="Shell Command"
        />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            icon={!isEditing ? <PlusOutlined /> : undefined}
            aria-label={isEditing ? 'Update Task' : 'Create Task'}
          >
            {isEditing ? 'Update Task' : 'Create Task'}
          </Button>
          {onCancel && (
            <Button onClick={onCancel} aria-label="Cancel">
              Cancel
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;

