import { Button, Drawer, Typography } from 'antd';
import FoodList from '../../Components/FoodList';
import { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import OrderItem from '../../Components/OrderItem';

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const onSelectDish = () => {

  }
  return (
    <main>
      <div className='flex justify-between'>
        <Typography.Title level={4}>Choose Dishes</Typography.Title>
        <Button
          icon={!isOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setIsOpen(!isOpen)}
          // style={{
          //   fontSize: "16px",
          //   width: 64,
          //   height: 64,
          // }}
        />
      </div>

      <FoodList onClick={onSelectDish} type="view" />
      <Drawer
        title={"New order"}
        // width={720}
        width={window.screen.availWidth < 400 ? 320 : 520}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        closeIcon={null}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <OrderItem />
      </Drawer>
    </main>
  );
}
export default Dashboard;