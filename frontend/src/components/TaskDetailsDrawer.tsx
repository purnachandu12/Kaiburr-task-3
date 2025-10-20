import React, { useEffect, useState } from 'react';
import { Drawer, Descriptions, Tag, Typography, Divider, Spin, Alert } from 'antd';
import dayjs from 'dayjs';
import { Task } from '../types/Task';
import { taskApi } from '../services/api';

const { Text } = Typography;

interface TaskDetailsDrawerProps {
  taskId: string | null;
  open: boolean;
  onClose: () => void;
}

const TaskDetailsDrawer: React.FC<TaskDetailsDrawerProps> = ({ taskId, open, onClose }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!taskId || !open) return;
      setLoading(true);
      setError(null);
      try {
        const data = await taskApi.getTaskById(taskId);
        setTask(data);
      } catch (e) {
        setError('Failed to load task details.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [taskId, open]);

  return (
    <Drawer
      title={task ? `Task Details — ${task.name}` : 'Task Details'}
      open={open}
      onClose={onClose}
      width={520}
      destroyOnClose
    >
      {loading && (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <Spin />
        </div>
      )}
      {error && (
        <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />
      )}
      {task && !loading && !error && (
        <>
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="ID">
              <Text code>{task.id}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {task.name}
            </Descriptions.Item>
            <Descriptions.Item label="Owner">
              {task.owner}
            </Descriptions.Item>
            <Descriptions.Item label="Command">
              <Text code>{task.command}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Executions">
              <Tag color="blue">{task.taskExecutions.length}</Tag>
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left" style={{ marginTop: 24 }}>Recent Executions</Divider>
          {task.taskExecutions.length === 0 ? (
            <Text type="secondary">No executions yet.</Text>
          ) : (
            <div style={{ display: 'grid', gap: 12 }}>
              {task.taskExecutions.slice().reverse().slice(0, 5).map((ex, idx) => (
                <div key={`${ex.startTime}-${idx}`} style={{
                  border: '1px solid #f0f0f0',
                  borderRadius: 6,
                  padding: 12,
                  background: '#fafafa'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text strong>{dayjs(ex.startTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <Tag color="green">{`${dayjs(ex.endTime).diff(dayjs(ex.startTime), 'second', true).toFixed(2)}s`}</Tag>
                  </div>
                  <Text code style={{ whiteSpace: 'pre-wrap' }}>{ex.output}</Text>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Drawer>
  );
};

export default TaskDetailsDrawer;


