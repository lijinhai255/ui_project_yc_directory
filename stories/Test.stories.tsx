import type { Meta, StoryObj } from '@storybook/react';

const TestComponent = () => (
  <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
    <h3>Test Component</h3>
    <p>这是一个测试组件，用来验证 Storybook 是否正常工作。</p>
    <button
      onClick={() => alert('按钮点击成功!')}
      style={{
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      测试按钮
    </button>
  </div>
);

const meta: Meta<typeof TestComponent> = {
  title: 'Test/Test',
  component: TestComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};