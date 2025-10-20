import React, { useState, useEffect } from 'react';
import { Layout, Card, Space, message, Spin, Alert, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { Task } from './types/Task';
import { taskApi } from './services/api';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TaskList from './components/TaskList';
import TaskDetailsDrawer from './components/TaskDetailsDrawer';

const { Content } = Layout;

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await taskApi.getAllTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setError('Failed to load tasks. Please check if the backend server is running.');
      message.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchLoading(true);
    try {
      const searchResults = await taskApi.searchTasksByName(query);
      setTasks(searchResults);
      if (searchResults.length === 0) {
        message.info('No tasks found matching your search');
      }
    } catch (error) {
      console.error('Error searching tasks:', error);
      message.error('Failed to search tasks');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearSearch = () => {
    loadTasks();
  };

  const handleTaskCreated = async (task: Task) => {
    try {
      await taskApi.saveTask(task);
      await loadTasks();
      message.success('Task created successfully!');
    } catch (error) {
      console.error('Error creating task:', error);
      message.error('Failed to create task');
    }
  };

  const handleTaskUpdate = async (task: Task) => {
    try {
      await taskApi.saveTask(task);
      await loadTasks();
      message.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      message.error('Failed to update task');
    }
  };

  const handleTaskDelete = async (id: string) => {
    try {
      await taskApi.deleteTask(id);
      await loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  const handleTaskExecute = async (id: string) => {
    try {
      await taskApi.executeTask(id);
      await loadTasks();
    } catch (error) {
      console.error('Error executing task:', error);
      throw error;
    }
  };

  const openDetailsFor = (id: string) => {
    setSelectedTaskId(id);
    setDetailsOpen(true);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header onTaskCreated={handleTaskCreated} />
      
      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>Tasks</h2>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={loadTasks}
                  loading={loading}
                  aria-label="Refresh tasks"
                >
                  Refresh
                </Button>
              </div>
              
              <SearchBar
                onSearch={handleSearch}
                onClear={handleClearSearch}
                loading={searchLoading}
              />
            </Space>
          </Card>

          {error && (
            <Alert
              message="Connection Error"
              description={error}
              type="error"
              showIcon
              action={
                <Button size="small" onClick={loadTasks}>
                  Retry
                </Button>
              }
            />
          )}

          <Card>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Spin size="large" />
                <div style={{ marginTop: 16 }}>Loading tasks...</div>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onTaskUpdate={handleTaskUpdate}
                onTaskDelete={handleTaskDelete}
                onTaskExecute={handleTaskExecute}
                loading={searchLoading}
                onRowClick={(id) => openDetailsFor(id)}
              />
            )}
          </Card>
          <TaskDetailsDrawer
            taskId={selectedTaskId}
            open={detailsOpen}
            onClose={() => setDetailsOpen(false)}
          />
        </Space>
      </Content>
    </Layout>
  );
};

export default App;

