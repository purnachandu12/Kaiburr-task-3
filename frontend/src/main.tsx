import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, theme as antdTheme } from 'antd'
import 'antd/dist/reset.css'
import App from './App.tsx'
import './index.css'

// Configure Ant Design theme for a minimal, neutral aesthetic
const theme = {
  algorithm: [antdTheme.defaultAlgorithm],
  token: {
    // Primary palette switched to purple
    colorPrimary: '#7c3aed', // purple-600
    colorInfo: '#7c3aed',
    colorSuccess: '#16a34a',
    colorWarning: '#d97706',
    colorError: '#dc2626',
    colorText: '#0f172a',
    colorTextSecondary: '#334155',
    colorBgLayout: '#f8fafc',
    colorBgContainer: '#ffffff',
    colorBorder: '#e2e8f0',
    borderRadius: 8,
    fontSize: 16, // base font size up
    lineHeight: 1.6,
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      headerHeight: 72,
    },
    Button: {
      controlHeight: 40,
      borderRadius: 8,
      fontSize: 16,
    },
    Input: {
      controlHeight: 40,
      borderRadius: 8,
      fontSize: 16,
    },
    Select: {
      controlHeight: 40,
      borderRadius: 8,
      fontSize: 16,
    },
    Table: {
      fontSize: 16,
      headerBg: '#f1f5f9',
    },
    Card: {
      borderRadiusLG: 10,
      headerHeight: 56,
    },
    Tag: {
      fontSize: 14,
    },
    Badge: {
      fontSize: 14,
    },
  },
} as const

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)

