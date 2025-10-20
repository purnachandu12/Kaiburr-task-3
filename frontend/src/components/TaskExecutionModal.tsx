import React from 'react';
import { Modal, Table, Tag, Typography, Space, Button, Tooltip } from 'antd';
import { PlayCircleOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Task, TaskExecution } from '../types/Task';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

interface TaskExecutionModalProps {
  task: Task;
  visible: boolean;
  onClose: () => void;
}

const TaskExecutionModal: React.FC<TaskExecutionModalProps> = ({ 
  task, 
  visible, 
  onClose 
}) => {
  const columns = [
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 180,
      render: (startTime: string) => (
        <Space>
          <ClockCircleOutlined />
          <Text>{dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </Space>
      ),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      width: 180,
      render: (endTime: string) => (
        <Space>
          <CheckCircleOutlined />
          <Text>{dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </Space>
      ),
    },
    {
      title: 'Duration',
      key: 'duration',
      width: 120,
      render: (_, record: TaskExecution) => {
        const start = dayjs(record.startTime);
        const end = dayjs(record.endTime);
        const duration = end.diff(start, 'second', true);
        return (
          <Tag color="blue">
            {duration.toFixed(2)}s
          </Tag>
        );
      },
    },
    {
      title: 'Output',
      dataIndex: 'output',
      key: 'output',
      ellipsis: true,
      render: (output: string) => (
        <Tooltip title={output}>
          <Text code style={{ maxWidth: 200, display: 'block' }}>
            {output}
          </Text>
        </Tooltip>
      ),
    },
  ];

  return (
    <Modal
      title={
        <Space>
          <PlayCircleOutlined />
          <Title level={4} style={{ margin: 0 }}>
            Task Executions: {task.name}
          </Title>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>
      ]}
      width={800}
      destroyOnClose
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <div>
          <Text strong>Task ID: </Text>
          <Text code>{task.id}</Text>
        </div>
        <div>
          <Text strong>Owner: </Text>
          <Text>{task.owner}</Text>
        </div>
        <div>
          <Text strong>Command: </Text>
          <Text code>{task.command}</Text>
        </div>
        
        <div>
          <Text strong>Total Executions: </Text>
          <Tag color="blue">{task.taskExecutions.length}</Tag>
        </div>

        {task.taskExecutions.length > 0 ? (
          <Table
            columns={columns}
            dataSource={task.taskExecutions}
            rowKey={(record, index) => `${record.startTime}-${index}`}
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} executions`,
            }}
            size="small"
            scroll={{ x: 600 }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Text type="secondary">No executions found for this task.</Text>
          </div>
        )}
      </Space>
    </Modal>
  );
};

export default TaskExecutionModal;

