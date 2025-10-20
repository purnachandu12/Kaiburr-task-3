import React, { useState } from 'react';
import { Layout, Button, Space, Typography, Modal } from 'antd';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import TaskForm from './TaskForm';
import { Task } from '../types/Task';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  onTaskCreated: (task: Task) => void;
}

const Header: React.FC<HeaderProps> = ({ onTaskCreated }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleTaskCreated = (task: Task) => {
    onTaskCreated(task);
    setShowTaskForm(false);
  };

  return (
    <>
      <AntHeader style={{ 
        background: '#fff', 
        padding: '0 24px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Space align="center">
          <Title level={3} style={{ margin: 0, color: '#7c3aed' }}>
            Task Management
          </Title>
        </Space>
        
        <Space>
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => setShowInfo(true)}
            aria-label="Show application information"
          >
            About
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowTaskForm(true)}
            aria-label="Create new task"
          >
            New Task
          </Button>
        </Space>
      </AntHeader>

      <Modal
        title="Create New Task"
        open={showTaskForm}
        onCancel={() => setShowTaskForm(false)}
        footer={null}
        width={600}
        destroyOnClose
      >
        <TaskForm
          onTaskCreated={handleTaskCreated}
          onCancel={() => setShowTaskForm(false)}
        />
      </Modal>

      <Modal
        title="About Task Management"
        open={showInfo}
        onCancel={() => setShowInfo(false)}
        footer={[
          <Button key="close" onClick={() => setShowInfo(false)}>
            Close
          </Button>
        ]}
        width={600}
      >
        <div style={{ lineHeight: '1.6' }}>
          <p>
            <strong>Task Management System</strong> is a web application for managing and executing shell commands.
          </p>
          <p>
            <strong>Features:</strong>
          </p>
          <ul>
            <li>Create, edit, and delete tasks</li>
            <li>Execute shell commands safely</li>
            <li>View command execution history and output</li>
            <li>Search tasks by name</li>
            <li>Command validation for security</li>
          </ul>
          <p>
            <strong>Security:</strong> The system validates commands to prevent execution of potentially dangerous operations.
          </p>
          <p>
            <strong>Accessibility:</strong> This application follows WCAG guidelines for accessibility.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Header;

