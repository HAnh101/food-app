import { Button, List, Radio } from 'antd'
import { IFood, INewFood, Tag } from '../../type'
import FoodItem from '../../Components/FoodItem'
import { PlusOutlined } from '@ant-design/icons'
import FoodForm from '../../Components/FoodForm'
import { useCallback, useEffect, useState } from 'react'
import { createFood, getFood, updateFoodById } from '../../API'
import { LIMIT_DISPLAY_ITEM_PER_PAGE, FOOD_CATEGORY } from '../../utils/constants'
import { Form } from 'antd'
import FoodList from '../../Components/FoodList'



function Management() {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<number | null>(null)
 
    const [form] = Form.useForm()

    const onClose = () => {
        setIsOpen(false)
        form.resetFields()
        selectedItem !== null && setSelectedItem(null)
    }

    const onSubmit = async (data: INewFood | IFood) => {
        try {
            // let resp;
            if(selectedItem) {
                await updateFoodById(data as IFood)
            } else {
                await createFood(data as INewFood)                
            }
            // onGetFoodData()
            onClose();
        } catch (error) {
            console.log(__filename, error);
            
        }
        
    }


    return (
        <main>
            <div>
                <Button
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => setIsOpen(true)}
                >
                    Create new dish
                </Button>
            </div>
            <br />
            <FoodList 
                onEdit={(id: number) => {
                    setSelectedItem(id)
                    setIsOpen(true)
                }}
            />
            <FoodForm
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={onSubmit}
                selectedItemId={selectedItem}
                form={form}
            />
        </main>
    )
}

export default Management