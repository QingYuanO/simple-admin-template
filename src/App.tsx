import { Button, Space } from 'antd';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Space wrap>
        <Button type='primary'>Primary Button</Button>
        <Button>Default Button</Button>
        <Button type='dashed'>Dashed Button</Button>
        <Button type='text'>Text Button</Button>
        <Button type='link'>Link Button</Button>
        <Home />
      </Space>
    </div>
  );
}

export default App;
