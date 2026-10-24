// src/components/DataState.jsx
import React from 'react';

export default function DataState({ loading, error, isEmpty, emptyMessage, children }) {
  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center', color: '#9ca3af' }}>⏳ Đang tải dữ liệu...</div>;
  }
  if (error) {
    return <div style={{ padding: '20px', textAlign: 'center', color: '#f87171' }}>⚠️ Lỗi: {error}</div>;
  }
  if (isEmpty) {
    return <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>📭 {emptyMessage || 'Không có dữ liệu hiển thị'}</div>;
  }
  return children;
}